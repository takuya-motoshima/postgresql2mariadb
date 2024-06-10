const typeMapping = require('./typeMapping');

/**
 * Delete the PostgreSQL cast operator (::type name).
 * @param {string} line String.
 * @return {string} String with postgreSQL cast operator removed.
 */
let re;
module.exports = line => {
  if (!re) {
    // Generate regular expressions matching PostgreSQL's cast operator.
    const patterns = [];
    for (let [re] of typeMapping)
      patterns.push(`(?:${re.source})`);

    // Add cast operators for undefined types in typeMapping.
    for (let pattern of ['regclass'])
      patterns.push(`(?:${pattern})`)
    re = new RegExp(`::(?:${patterns.join('|')})`, 'ig');
  }

  // Remove PostgreSQL cast operator from strings.
  return line.replace(re, '');
}