/**
 * Replace the primary key constrained column type of type `text` with `varchar(768)` inside the `CREATE TABLE` statement.
 * @param {string} str String.
 * @return {string} A string with the type of the primary key of type `text` replaced with `varchar(768)`.
 */
module.exports = str => {
  // Find primary key constraint.
  const primaryConstraints = str.match(/ALTER TABLE[^;]*PRIMARY KEY[^;]*;/ig);
  if (!primaryConstraints)
    return str;

  for (let primaryConstraint of primaryConstraints) {
    // Get table and column names from primary key constraints.
    const [_, table, column] = primaryConstraint.match(/ALTER TABLE(?: ONLY)? (?:public\.)?([a-z_][a-z_0-9]+)\s+ADD CONSTRAINT (?:..*) PRIMARY KEY \(([a-z_][a-z_0-9]+)\)[^;]*;/i);

    // Get a primary key column definition of type `text` from a `CREATE TABLE` statement.
    // NOTE: In the case of the second regular expression you commented out, if there is another column between `CREATE TABLE (` and the desired column, the desired column could not be retrieved.
    const re = new RegExp(`CREATE TABLE (?:public\.)?${table} \\([\\s\\S]*?\\s(${column} text)[\\s,][^;]*;`, 'i');
    // const re = new RegExp(`CREATE TABLE (?:public\.)?${table} \\(\\s+(${column} text)[\\s,][^;]*;`, 'i');
    const matches = str.match(re);
    if (!matches)
        // Primary key inside `CREATE TABLE` statement is not of type `text`.
        continue;
    const [createTableStatement, columnDefinition] = str.match(re);

    // Replace `text` type primary key with `varchar(768)`.
    str = str.replace(createTableStatement, createTableStatement.replace(columnDefinition, `${column} varchar(768)`));
  }
  return str;
}