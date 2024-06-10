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
declare const _default: (line: string) => string;
export default _default;
