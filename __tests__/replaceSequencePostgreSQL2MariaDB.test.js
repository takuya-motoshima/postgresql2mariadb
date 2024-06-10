const {core} = require('../dist/build.common');

test.each([
  // Pure PostgreSQL.
  ["column_name text DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL,", "column_name varchar(32) DEFAULT md5((concat(hex(nextval(sequence_name)), 'salt'))) NOT NULL,"], 
  ["column_name bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL,", "column_name bigint DEFAULT nextval(sequence_name) NOT NULL,"],

  // PostgreSQL without public schema.
  ["column_name text DEFAULT md5((to_hex(nextval('sequence_name'::regclass)) || 'salt'::text)) NOT NULL,", "column_name varchar(32) DEFAULT md5((concat(hex(nextval(sequence_name)), 'salt'))) NOT NULL,"], 
  ["column_name bigint DEFAULT nextval('sequence_name'::regclass) NOT NULL,", "column_name bigint DEFAULT nextval(sequence_name) NOT NULL,"],
])('"%s" => "%s"', (str, expected) => {
  const actual = core.replaceSequencePostgreSQL2MariaDB(str);
  expect(actual).toBe(expected);
});