/**
 * Mapping between PostgreSQL data types and MySQL data types.
 * The first element is a regular expression matching the PostgreSQL data type, and the second element is the MariaDB data type.
 * @link https://www.postgresql.org/docs/8.1/datatype.html
 * @link https://dev.mysql.com/doc/workbench/en/wb-migration-database-postgresql-typemapping.html
 */
declare const _default: [RegExp, string][];
export default _default;
