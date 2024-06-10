const {core} = require('../dist/build.common');

test.each([
  ["\"position\" text DEFAULT ''::text NOT NULL,", "`position` text DEFAULT ''::text NOT NULL,"]
])('"%s" => "%s"', (str, expected) => {
  const actual = core.replaceReservedWordEnclosurePostgreSQL2MariaDB(str);
  expect(actual).toBe(expected);
});