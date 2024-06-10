/**
 * Replaces the `CREATE INDEX` syntax. `ON table_name USING btree` moves `USING btree` before `ON`.
 * @param {string} line String.
 * @return {string} String replaced by MariaDB's Create Index syntax.
 */
declare const _default: (line: string) => string;
export default _default;
