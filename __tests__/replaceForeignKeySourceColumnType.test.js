const {core} = require('../dist/build.common');

test.each([
  [
    "CREATE TABLE destination (\n    destination_id varchar(32) DEFAULT md5((concat(hex(nextval(destination_id_seq)), 'salt'))) NOT NULL\n);\n\nCREATE TABLE source (\n    source_id varchar(32) DEFAULT md5((concat(hex(nextval(source_id_seq)), 'salt'))) NOT NULL,\n    destination_id text\n);\n\nALTER TABLE ONLY source\n    ADD CONSTRAINT source_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES destination(destination_id);",
    "CREATE TABLE destination (\n    destination_id varchar(32) DEFAULT md5((concat(hex(nextval(destination_id_seq)), 'salt'))) NOT NULL\n);\n\nCREATE TABLE source (\n    source_id varchar(32) DEFAULT md5((concat(hex(nextval(source_id_seq)), 'salt'))) NOT NULL,\n    destination_id varchar(32)\n);\n\nALTER TABLE ONLY source\n    ADD CONSTRAINT source_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES destination(destination_id);",
  ],
])('"%s" => "%s"', (str, expected) => {
  const actual = core.replaceForeignKeySourceColumnType(str);
  expect(actual).toBe(expected);
});