/**
 * Replaces the `CREATE INDEX` syntax. `ON table_name USING btree` moves `USING btree` before `ON`.
 * @param {string} line String.
 * @return {string} String replaced by MariaDB's Create Index syntax.
 */
module.exports = line => {
  return line.replace(/(CREATE INDEX ..*?) (ON ..*?) (USING btree)/, '$1 $3 $2')
}