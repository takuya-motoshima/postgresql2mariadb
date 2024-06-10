const reservedKeywords = require('./reservedKeywords');

/**
 * Replace PostgreSQL reserved word enclosure(double quotes to back quotes).
 * @param {string} str String.
 * @return {string} String with replacement of reserved word enclosures.
 */
let re;
module.exports = str => {
  if (!re)
    // Generate regular expressions to extract reserved keywords in PostgreSQL.
    re = new RegExp(`"(${reservedKeywords.join('|')})"`, 'ig');

  // Replace double quotes in enclosed characters with back quotes.
  return str.replace(re, matched => matched.replace(/"/g, '`'));
}