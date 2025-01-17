const {core} = require('../dist/build.common');

test.each([
  ['column_name int', 'column_name int'],
  ['column_name integer', 'column_name int'],
  ['column_name int4', 'column_name int'],
  ['column_name serial', 'column_name int'],
  ['column_name serial4', 'column_name int'],
  ['column_name smallint', 'column_name smallint'],
  ['column_name int2', 'column_name smallint'],
  ['column_name serial2', 'column_name smallint'],
  ['column_name smallserial', 'column_name smallint'],
  ['column_name bigint', 'column_name bigint'],
  ['column_name int8', 'column_name bigint'],
  ['column_name serial8', 'column_name bigint'],
  ['column_name bigserial', 'column_name bigint'],
  ['column_name bit', 'column_name bit'],
  ['column_name bit(12)', 'column_name bit(12)'],
  ['column_name bit varying', 'column_name bit'],
  ['column_name bit varying(12)', 'column_name bit(12)'],
  ['column_name varbit', 'column_name bit'],
  ['column_name bool', 'column_name tinyint(1) unsigned'],
  ['column_name boolean', 'column_name tinyint(1) unsigned'],
  ['column_name real', 'column_name float'],
  ['column_name float4', 'column_name float'],
  ['column_name double precision', 'column_name double'],
  ['column_name float8', 'column_name double'],
  ['column_name decimal', 'column_name decimal'],
  ['column_name decimal(12)', 'column_name decimal(12)'],
  ['column_name decimal(12,34)', 'column_name decimal(12,34)'],
  ['column_name numeric', 'column_name decimal'],
  ['column_name numeric(12)', 'column_name decimal(12)'],
  ['column_name numeric(12,34)', 'column_name decimal(12,34)'],
  ['column_name money', 'column_name decimal(19,2)'],
  ['column_name char', 'column_name char'],
  ['column_name char(12)', 'column_name char(12)'],
  ['column_name character', 'column_name char'],
  ['column_name character(12)', 'column_name char(12)'],
  ['column_name national character', 'column_name char'],
  ['column_name national character(12)', 'column_name char(12)'],
  ['column_name varchar', 'column_name varchar'],
  ['column_name varchar(12)', 'column_name varchar(12)'],
  ['column_name character varying', 'column_name varchar'],
  ['column_name character varying(12)', 'column_name varchar(12)'],
  ['column_name national character varying', 'column_name varchar'],
  ['column_name national character varying(12)', 'column_name varchar(12)'],
  ['column_name time', 'column_name time'],
  ['column_name time(12)', 'column_name time(12)'],
  ['column_name time(12) without time zone', 'column_name time(12)'],
  ['column_name time without time zone', 'column_name time'],
  ['column_name time with time zone', 'column_name time'],
  ['column_name time(12) with time zone', 'column_name time(12)'],
  ['column_name timetz', 'column_name time'],
  ['column_name interval', 'column_name time'],
  ['column_name interval(12)', 'column_name time(12)'],
  ['column_name timestamp', 'column_name datetime'],
  ['column_name timestamp(12)', 'column_name datetime'],
  ['column_name timestamp without time zone', 'column_name datetime'],
  ['column_name timestamp(12) without time zone', 'column_name datetime'],
  ['column_name timestamp(12) with time zone', 'column_name datetime'],
  ['column_name timestamp with time zone', 'column_name datetime'],
  ['column_name timestamptz', 'column_name datetime'],
  ['column_name bytea', 'column_name longblob'],
  ['column_name text', 'column_name text'],
  ['column_name cidr', 'column_name varchar(43)'],
  ['column_name inet', 'column_name varchar(43)'],
  ['column_name macaddr', 'column_name varchar(17)'],
  ['column_name uuid', 'column_name varchar(36)'],
  ['column_name xml', 'column_name longtext'],
  ['column_name json', 'column_name longtext'],
  ['column_name jsonb', 'column_name longtext'],
  ['column_name tsvector', 'column_name longtext'],
  ['column_name tsquery', 'column_name longtext'],
  ['column_name array', 'column_name longtext'],
  ['column_name point', 'column_name longtext'],
  ['column_name txid_snapshot', 'column_name longtext'],
  ['column_name line', 'column_name linestring'],
  ['column_name lseg', 'column_name linestring'],
  ['column_name path', 'column_name linestring'],
  ['column_name box', 'column_name polygon'],
  ['column_name polygon', 'column_name polygon'],
  ['column_name circle', 'column_name polygon'],
])('"%s" => "%s"', (str, expected) => {
  const actual = core.replaceTypePostgreSQL2MariaDB(str);
  expect(actual).toBe(expected);
});