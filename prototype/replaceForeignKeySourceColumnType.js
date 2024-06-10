/**
 * Replace the type of the foreign key source column inside the `CREATE TABLE` statement with the type of the foreign key destination column.
 * @param {string} str String.
 * @return {string} A string in which the type of the foreign key source column is replaced by the type of the foreign key destination column.
 */
module.exports = str => {
  // Find foreign key constraints.
  const foreignKeyConstraints = str.match(/ALTER TABLE[^;]*FOREIGN KEY[^;]*;/ig);
  if (!foreignKeyConstraints)
    return str;
  
  let re;
  for (let foreignKeyConstraint of foreignKeyConstraints) {
    // Get foreign key source and destination table names and column names
    const [sourceTable, sourceColumn, destinationTable, destinationColumn] = foreignKeyConstraint
      .match(/ALTER TABLE(?: ONLY)? (?:public\.)?([a-z_][a-z_0-9]+)\s+ADD CONSTRAINT (?:..*) FOREIGN KEY \(([a-z_][a-z_0-9]+)\) REFERENCES (?:public\.)?([a-z_][a-z_0-9]+)\(([a-z_][a-z_0-9]+)\);/i)
      .slice(1);

    // Get the foreign key destination column type name from inside the `CREATE TABLE` statement of the foreign key destination table
    // NOTE: In the case of the second regular expression you commented out, if there is another column between `CREATE TABLE (` and the desired column, the desired column could not be retrieved.
    re = new RegExp(`CREATE TABLE (?:public\.)?${destinationTable} \\([\\s\\S]*?\\s${destinationColumn} (..*?)[\\s,][^;]*;`, 'i');
    // re = new RegExp(`CREATE TABLE (?:public\.)?${destinationTable} \\(\\s+${destinationColumn} (..*?)[\\s,][^;]*;`, 'i');
    const [destinationType] = str.match(re).slice(1);

    // Get the `CREATE TABLE` statement of the foreign key source and the definition of the foreign key source column.
    re = new RegExp(`CREATE TABLE (?:public\.)?${sourceTable} \\([\\s\\S]*?\\s(${sourceColumn} ..*?)[\\s,][^;]*?;`, 'i');
    const [createTableStatement, columnDefinition] = str.match(re);

    // Replace the type of the foreign key source column with the type of the foreign key destination column.
    str = str.replace(createTableStatement, createTableStatement.replace(columnDefinition, `${sourceColumn} ${destinationType}`));
  }
  return str;
}