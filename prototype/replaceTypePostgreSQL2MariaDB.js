const typeMapping = require('./typeMapping');

/**
 * Replace PostgreSQL data types with MariaDB data types.
 * @param {string} line String.
 * @return {string} String replaced with MariaDB data type.
 */
module.exports = line => {
  // Find a type mapping that matches the PostgreSQL data type in the string.
  const found = typeMapping.find(([re]) => {
    const matches = line.match(new RegExp(`(?<= )${re.source}`, 'i'));
    return matches && matches[0];
  });
  if (!found)
    // If the string does not contain PostgreSQL data types.
    return line;

  // Replace PostgreSQL data types with MariaDB data types.
  const [re, replacement] = found;
  return line.replace(new RegExp(`(?<= )${re.source}`, 'i'), replacement);
}