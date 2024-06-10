/**
 * Replace the type of the foreign key source column inside the `CREATE TABLE` statement with the type of the foreign key destination column.
 * @param {string} str String.
 * @return {string} A string in which the type of the foreign key source column is replaced by the type of the foreign key destination column.
 */
export default (str: string): string => {
  // Find foreign key constraints.
  const foreignKeyConstraints = str.match(/ALTER TABLE[^;]*FOREIGN KEY[^;]*;/ig);
  if (!foreignKeyConstraints)
    return str;
  
  let re;
  let matches;
  for (let foreignKeyConstraint of foreignKeyConstraints) {
    // Get foreign key source and destination table names and column names
    matches = foreignKeyConstraint.match(/ALTER TABLE(?: ONLY)? (?:public\.)?([a-z_][a-z_0-9]+)\s+ADD CONSTRAINT (?:..*) FOREIGN KEY \(([a-z_][a-z_0-9]+)\) REFERENCES (?:public\.)?([a-z_][a-z_0-9]+)\(([a-z_][a-z_0-9]+)\);/i);
    if (!matches)
      continue;
    const [sourceTable, sourceColumn, destinationTable, destinationColumn] = matches.slice(1);

    // Get the foreign key destination column type name from inside the `CREATE TABLE` statement of the foreign key destination table
    // NOTE: In the case of the second regular expression you commented out, if there is another column between `CREATE TABLE (` and the desired column, the desired column could not be retrieved.
    re = new RegExp(`CREATE TABLE (?:public\.)?${destinationTable} \\([\\s\\S]*?\\s${destinationColumn} (..*?)[\\s,][^;]*;`, 'i');
    // re = new RegExp(`CREATE TABLE (?:public\.)?${destinationTable} \\(\\s+${destinationColumn} (..*?)[\\s,][^;]*;`, 'i');
    matches = str.match(re);
    if (!matches)
      continue;
    const [destinationType] = matches.slice(1);

    // Get the `CREATE TABLE` statement of the foreign key source and the definition of the foreign key source column.
    re = new RegExp(`CREATE TABLE (?:public\.)?${sourceTable} \\([\\s\\S]*?\\s(${sourceColumn} ..*?)[\\s,][^;]*?;`, 'i');
    matches = str.match(re);
    if (!matches)
      continue;
    const [createTableStatement, columnDefinition] = matches;

    // Replace the type of the foreign key source column with the type of the foreign key destination column.
    str = str.replace(createTableStatement, createTableStatement.replace(columnDefinition, `${sourceColumn} ${destinationType}`));
  }
  return str;
}