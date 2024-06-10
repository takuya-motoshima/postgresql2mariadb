const {core} = require('../dist/build.common');

test.each([
  ['CREATE INDEX index_name ON public.table_name USING btree (column_name);', 'CREATE INDEX index_name USING btree ON public.table_name (column_name);']
])('"%s" => "%s"', (str, expected) => {
  const actual = core.replaceCreateIndexPostgreSQL2MariaDB(str);
  expect(actual).toBe(expected);
});