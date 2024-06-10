const fs = require('fs');
const path = require('path');
const os = require('os');
const readline = require('readline');
const {program} = require('commander');
const removePostgreSQLCastOperator = require('./removePostgreSQLCastOperator');
const replaceTypePostgreSQL2MariaDB = require('./replaceTypePostgreSQL2MariaDB');
const replaceCreateIndexPostgreSQL2MariaDB = require('./replaceCreateIndexPostgreSQL2MariaDB');
const replaceSequencePostgreSQL2MariaDB = require('./replaceSequencePostgreSQL2MariaDB');
const replaceTextTypePrimaryKeyWithVarchar768 = require('./replaceTextTypePrimaryKeyWithVarchar768');
const replaceForeignKeySourceColumnType = require('./replaceForeignKeySourceColumnType');
const replaceReservedWordEnclosurePostgreSQL2MariaDB = require('./replaceReservedWordEnclosurePostgreSQL2MariaDB');

/**
 * Migrate PostgreSQL to MariaDB.
 */
// Get Arguments.
const options = program
  .requiredOption('-i, --in <filepath>', 'Input file path (PostgreSQL dump)')
  .requiredOption('-o, --out <filepath>', 'Output file path (MariaDB dump)')
  .parse()
  .opts();

const processLineByLine = async () => {
  // Create file read stream.
  const readable = fs.createReadStream(path.join(__dirname, `../${options.in}`));

  // Creating a file write stream.
  const writable = fs.createWriteStream(path.join(__dirname, `../${options.out}`))

  // Interface configuration.
  const rl = readline.createInterface({input: readable, output: writable, terminal: false});

  // Process line by line.
  for await (let line of rl) {
    if (!line.trim()) {
      // If the line is empty, output a blank line and go to the next line.
      writable.write(`${line}${os.EOL}`);
      continue;
    } else if (/^SET/.test(line))
      // If the line starts with `SET`, do not output and go to the next line.
      continue;
    else if (/^SELECT pg_catalog\.set/.test(line))
      // If the line starts with `SELECT pg_catalog.set`, do not output and go to the next line.
      continue;

    // Delete the `public` schema.
    line = line.replace(/public\./, '');

    // Delete the PostgreSQL cast operator (::type name).
    line = removePostgreSQLCastOperator(line);

    // Replace PostgreSQL data types with MariaDB data types.
    line = replaceTypePostgreSQL2MariaDB(line);

    // Replace the `to_hex` function in PostgreSQL with the `hex` function in MariaDB.
    line = line.replace(/to_hex/, 'hex');

    // Replace `ALTER TABLE ONLY` syntax with `ALTER TABLE`.
    line = line.replace(/ALTER TABLE ONLY/, 'ALTER TABLE');

    // Replace PostgreSQL's `SEQUENCE`-based numbering process with MariaDB's numbering process.
    line = replaceSequencePostgreSQL2MariaDB(line)
    
    // Replaces the `CREATE INDEX` syntax. `ON table_name USING btree` moves `USING btree` before `ON`.
    line = replaceCreateIndexPostgreSQL2MariaDB(line);

    // Replace PostgreSQL reserved word enclosure(double quotes to back quotes).
    line = replaceReservedWordEnclosurePostgreSQL2MariaDB(line);

    // Output converted line.
    writable.write(`${line}${os.EOL}`);
  }

  // Finish writing.
  writable.end();

  // Read the output file.
  const filepath = path.join(__dirname, `../${options.out}`);
  let contents = fs.readFileSync(filepath, {encoding: 'utf8'});

  // Replace the primary key constrained column type of type `text` with `varchar(768)` inside the `CREATE TABLE` statement.
  contents = replaceTextTypePrimaryKeyWithVarchar768(contents);

  // Replace the type of the foreign key source column inside the `CREATE TABLE` statement with the type of the foreign key destination column.
  contents = replaceForeignKeySourceColumnType(contents);

  // Overwrite file.
  fs.writeFileSync(filepath, contents, {encoding: 'utf8'});
  console.log('END');
}

processLineByLine();