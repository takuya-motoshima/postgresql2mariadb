import fs from 'fs';
import path from 'path';
import os from 'os';
import readline from 'readline';
import {program} from 'commander';
import * as core from '~/core';

/**
 * PostgreSQL to MariaDB Migration CLI. Migration of INSERT queries is not supported at this time.
 */
export default async () => {
  try {
    // Get Arguments.
    const options = program
      .requiredOption('-i, --in <filepath>', 'Input file path (PostgreSQL dump).')
      .requiredOption('-o, --out <filepath>', 'Output file path (MariaDB dump).')
      .option('-d, --debug', 'Debug mode. Default is false.')
      .parse(process.argv)
      .opts();

    // Input and output file paths.
    const inFilepath = path.join(__dirname, `../${options.in}`);
    const outFilepath = path.join(__dirname, `../${options.out}`);
    if (!fs.existsSync(inFilepath))
      throw new Error(`Input file not found (${inFilepath})`);

    // Create file read stream.
    const readable = fs.createReadStream(inFilepath);

    // Creating a file write stream.
    const writable = fs.createWriteStream(outFilepath)

    // Interface configuration.
    const rl = readline.createInterface({input: readable, output: writable, terminal: false});

    // Process line by line.
    let lineNo = 0;
    for await (let line of rl) {
      ++lineNo;
      if (options.debug)
        console.log(`${lineNo}: ${line}`);
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
      line = core.removePostgreSQLCastOperator(line);

      // Replace PostgreSQL data types with MariaDB data types.
      line = core.replaceTypePostgreSQL2MariaDB(line);

      // Replace the `to_hex` function in PostgreSQL with the `hex` function in MariaDB.
      line = line.replace(/to_hex/, 'hex');

      // Replace `ALTER TABLE ONLY` syntax with `ALTER TABLE`.
      line = line.replace(/ALTER TABLE ONLY/, 'ALTER TABLE');

      // Replace PostgreSQL's `SEQUENCE`-based numbering process with MariaDB's numbering process.
      line = core.replaceSequencePostgreSQL2MariaDB(line)
      
      // Replaces the `CREATE INDEX` syntax. `ON table_name USING btree` moves `USING btree` before `ON`.
      line = core.replaceCreateIndexPostgreSQL2MariaDB(line);

      // Replace PostgreSQL reserved word enclosure(double quotes to back quotes).
      line = core.replaceReservedWordEnclosurePostgreSQL2MariaDB(line);

      // Output converted line.
      writable.write(`${line}${os.EOL}`);
    }

    // Finish writing.
    writable.end();

    // Read the output file.
    let contents = fs.readFileSync(outFilepath, {encoding: 'utf8'});

    // Replace the primary key constrained column type of type `text` with `varchar(768)` inside the `CREATE TABLE` statement.
    contents = core.replaceTextTypePrimaryKeyWithVarchar768(contents);

    // Replace the type of the foreign key source column inside the `CREATE TABLE` statement with the type of the foreign key destination column.
    contents = core.replaceForeignKeySourceColumnType(contents);

    // Overwrite file.
    fs.writeFileSync(outFilepath, contents, {encoding: 'utf8'});
    console.log('END');
  } catch (err: any) {
    console.error(`ERROR: ${err.message||'Unknown error'}`);
  }
}