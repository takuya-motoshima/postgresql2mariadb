/**
 * Mapping between PostgreSQL data types and MySQL data types.
 * The first element is a regular expression matching the PostgreSQL data type, and the second element is the MariaDB data type.
 * @link https://www.postgresql.org/docs/8.1/datatype.html
 * @link https://dev.mysql.com/doc/workbench/en/wb-migration-database-postgresql-typemapping.html
 */
module.exports = [
  // to int. NOTE: Fix so that `int` does not match `point` type.
  [/(?:(?<!po)int(?!(?:eger|erval))4?(?![28])|integer|serial4?(?![28]))/, 'int'],
  // [/(?:int(?!(?:eger|erval))4?(?![28])|integer|serial4?(?![28]))/, 'int'],

  // to smallint.
  [/(?:smallint|int2|serial2|smallserial)/, 'smallint'],

  // to bigint.
  [/(?:bigint|int8|serial8|bigserial)/, 'bigint'],

  // to bit.
  [/(?:varbit|bit(?: varying)?)(\(\d+\))?/, 'bit$1'],

  // to tinyint.
  [/bool(?:ean)?/, 'tinyint(1) unsigned'],

  // to float.
  [/(?:real|float4)/, 'float'],
  
  // to double.
  [/(?:double precision|float8)/, 'double'],

  // to decimal.
  [/(?:numeric|decimal)(\(\d+(,\d+)?\))?/, 'decimal$1'],
  [/money/, 'decimal(19,2)'],

  // to char.
  [/(?:national )?(?:char(?!acter)|character(?! varying))(\(\d+\))?/, 'char$1'],

  // to varchar.
  [/(?:national )?(?:varchar|character varying)(\(\d+\))?/, 'varchar$1'],

  // to time. NOTE: `/(?:interval|time(?!stamp)(?:tz)?)(\(\d+\))?(?: with(?:out)? time zone)?/` matches `time` after the PostgreSQL `timestamp` type below, so Negative lookbehind(`(?<!PatternB)PatternA`) to avoid the match.
  [/(?:interval|(?<!with(?:out)? )time(?!stamp)(?:tz)?)(\(\d+\))?(?: with(?:out)? time zone)?/, 'time$1'],
  // [/(?:interval|time(?!stamp)(?:tz)?)(\(\d+\))?(?: with(?:out)? time zone)?/, 'time$1'],

  // to datetime.
  [/timestamp(?:tz)?(?:\(\d+\))?(?: with(?:out)? time zone)?/, 'datetime'],

  // to longblob.
  [/bytea/, 'longblob'],

  // to text.
  [/text/, 'text'],

  // to varchar.
  [/(?:cidr|inet)/, 'varchar(43)'],
  [/macaddr/, 'varchar(17)'],
  [/uuid/, 'varchar(36)'],

  // to longtext.
  [/(?:xml|jsonb?|tsvector|tsquery|array|point|txid_snapshot)/, 'longtext'],

  // to linestring.
  [/(?:line|lseg|path)/, 'linestring'],

  // to polygon.
  [/(?:box|polygon|circle)/, 'polygon'],
];