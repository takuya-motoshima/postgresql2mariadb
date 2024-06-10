/**
 * Replace PostgreSQL's `SEQUENCE`-based numbering process with MariaDB's numbering process.
 * - Example 1:
 *     - Before :column_name text DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL,
 *     - After  :column_name varchar(32) DEFAULT md5((concat(hex(nextval(sequence_name)), 'salt'))) NOT NULL,
 * - Example 2:
 *     - Before :column_name bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL,
 *     - After  :column_name bigint DEFAULT nextval(sequence_name) NOT NULL,
 * @param {string} line String.
 * @return {string} String replaced with MariaDB numbering process.
 */
module.exports = line => {
  let matches;
  if (matches = line.match(/([a-z_][a-z_0-9]+) text DEFAULT md5\(\((?:to_)?hex\(nextval\('(?:public\.)?([a-z_][a-z_0-9]+)'(?:\::..*)?\)\)\s+\|\|\s+'(..*)'(?:\::text)?\)\)/i)) {
    const [chapter, column, sequence, salt] = matches;
    return line.replace(chapter, `${column} varchar(32) DEFAULT md5((concat(hex(nextval(${sequence})), '${salt}')))`);
  } else if (matches = line.match(/([a-z_][a-z_0-9]+) (..*) DEFAULT nextval\('(?:public\.)?(..*)'(?:\::..*)?\)/i)) {
    const [chapter, column, type, sequence] = matches;
    return line.replace(chapter, `${column} ${type} DEFAULT nextval(${sequence})`);
  } else
    return line;
}