```sh
$ npm test

> postgresql2mariadb@1.0.0 test
> jest

 PASS  __tests__/replaceTypePostgreSQL2MariaDB.test.js
  ✓ "column_name int" => "column_name int" (4 ms)
  ✓ "column_name integer" => "column_name int" (2 ms)
  ✓ "column_name int4" => "column_name int" (8 ms)
  ✓ "column_name serial" => "column_name int"
  ✓ "column_name serial4" => "column_name int" (1 ms)
  ✓ "column_name smallint" => "column_name smallint" (1 ms)
  ✓ "column_name int2" => "column_name smallint" (1 ms)
  ✓ "column_name serial2" => "column_name smallint" (1 ms)
  ✓ "column_name smallserial" => "column_name smallint" (1 ms)
  ✓ "column_name bigint" => "column_name bigint" (1 ms)
  ✓ "column_name int8" => "column_name bigint" (2 ms)
  ✓ "column_name serial8" => "column_name bigint" (1 ms)
  ✓ "column_name bigserial" => "column_name bigint" (1 ms)
  ✓ "column_name bit" => "column_name bit" (2 ms)
  ✓ "column_name bit(12)" => "column_name bit(12)" (1 ms)
  ✓ "column_name bit varying" => "column_name bit" (1 ms)
  ✓ "column_name bit varying(12)" => "column_name bit(12)"
  ✓ "column_name varbit" => "column_name bit" (1 ms)
  ✓ "column_name bool" => "column_name tinyint(1) unsigned" (1 ms)
  ✓ "column_name boolean" => "column_name tinyint(1) unsigned" (5 ms)
  ✓ "column_name real" => "column_name float" (1 ms)
  ✓ "column_name float4" => "column_name float" (10 ms)
  ✓ "column_name double precision" => "column_name double"
  ✓ "column_name float8" => "column_name double"
  ✓ "column_name decimal" => "column_name decimal" (1 ms)
  ✓ "column_name decimal(12)" => "column_name decimal(12)"
  ✓ "column_name decimal(12,34)" => "column_name decimal(12,34)" (1 ms)
  ✓ "column_name numeric" => "column_name decimal"
  ✓ "column_name numeric(12)" => "column_name decimal(12)"
  ✓ "column_name numeric(12,34)" => "column_name decimal(12,34)"
  ✓ "column_name money" => "column_name decimal(19,2)" (1 ms)
  ✓ "column_name char" => "column_name char" (6 ms)
  ✓ "column_name char(12)" => "column_name char(12)"
  ✓ "column_name character" => "column_name char"
  ✓ "column_name character(12)" => "column_name char(12)"
  ✓ "column_name national character" => "column_name char" (1 ms)
  ✓ "column_name national character(12)" => "column_name char(12)"
  ✓ "column_name varchar" => "column_name varchar" (2 ms)
  ✓ "column_name varchar(12)" => "column_name varchar(12)"
  ✓ "column_name character varying" => "column_name varchar"
  ✓ "column_name character varying(12)" => "column_name varchar(12)" (1 ms)
  ✓ "column_name national character varying" => "column_name varchar" (1 ms)
  ✓ "column_name national character varying(12)" => "column_name varchar(12)" (1 ms)
  ✓ "column_name time" => "column_name time" (2 ms)
  ✓ "column_name time(12)" => "column_name time(12)" (1 ms)
  ✓ "column_name time(12) without time zone" => "column_name time(12)" (1 ms)
  ✓ "column_name time without time zone" => "column_name time"
  ✓ "column_name time with time zone" => "column_name time"
  ✓ "column_name time(12) with time zone" => "column_name time(12)" (1 ms)
  ✓ "column_name timetz" => "column_name time"
  ✓ "column_name interval" => "column_name time"
  ✓ "column_name interval(12)" => "column_name time(12)"
  ✓ "column_name timestamp" => "column_name datetime" (1 ms)
  ✓ "column_name timestamp(12)" => "column_name datetime"
  ✓ "column_name timestamp without time zone" => "column_name datetime" (1 ms)
  ✓ "column_name timestamp(12) without time zone" => "column_name datetime"
  ✓ "column_name timestamp(12) with time zone" => "column_name datetime"
  ✓ "column_name timestamp with time zone" => "column_name datetime"
  ✓ "column_name timestamptz" => "column_name datetime"
  ✓ "column_name bytea" => "column_name longblob"
  ✓ "column_name text" => "column_name text"
  ✓ "column_name cidr" => "column_name varchar(43)"
  ✓ "column_name inet" => "column_name varchar(43)" (1 ms)
  ✓ "column_name macaddr" => "column_name varchar(17)"
  ✓ "column_name uuid" => "column_name varchar(36)"
  ✓ "column_name xml" => "column_name longtext" (3 ms)
  ✓ "column_name json" => "column_name longtext" (1 ms)
  ✓ "column_name jsonb" => "column_name longtext" (1 ms)
  ✓ "column_name tsvector" => "column_name longtext"
  ✓ "column_name tsquery" => "column_name longtext"
  ✓ "column_name array" => "column_name longtext"
  ✓ "column_name point" => "column_name longtext"
  ✓ "column_name txid_snapshot" => "column_name longtext"
  ✓ "column_name line" => "column_name linestring"
  ✓ "column_name lseg" => "column_name linestring"
  ✓ "column_name path" => "column_name linestring"
  ✓ "column_name box" => "column_name polygon"
  ✓ "column_name polygon" => "column_name polygon" (1 ms)
  ✓ "column_name circle" => "column_name polygon"

 PASS  __tests__/removePostgreSQLCastOperator.test.js
  ✓ "value::int" => "value" (7 ms)
  ✓ "value::integer" => "value" (6 ms)
  ✓ "value::int4" => "value"
  ✓ "value::serial" => "value" (1 ms)
  ✓ "value::serial4" => "value"
  ✓ "value::smallint" => "value"
  ✓ "value::int2" => "value"
  ✓ "value::serial2" => "value" (1 ms)
  ✓ "value::smallserial" => "value" (4 ms)
  ✓ "value::bigint" => "value" (1 ms)
  ✓ "value::int8" => "value" (1 ms)
  ✓ "value::serial8" => "value" (1 ms)
  ✓ "value::bigserial" => "value"
  ✓ "value::bit" => "value"
  ✓ "value::bit(12)" => "value" (7 ms)
  ✓ "value::bit varying" => "value"
  ✓ "value::bit varying(12)" => "value" (1 ms)
  ✓ "value::varbit" => "value"
  ✓ "value::bool" => "value"
  ✓ "value::boolean" => "value"
  ✓ "value::real" => "value" (1 ms)
  ✓ "value::float4" => "value"
  ✓ "value::double precision" => "value"
  ✓ "value::float8" => "value"
  ✓ "value::decimal" => "value"
  ✓ "value::decimal(12)" => "value" (1 ms)
  ✓ "value::decimal(12,34)" => "value"
  ✓ "value::numeric" => "value"
  ✓ "value::numeric(12)" => "value"
  ✓ "value::numeric(12,34)" => "value" (1 ms)
  ✓ "value::money" => "value"
  ✓ "value::char" => "value"
  ✓ "value::char(12)" => "value" (1 ms)
  ✓ "value::character" => "value" (2 ms)
  ✓ "value::character(12)" => "value"
  ✓ "value::national character" => "value"
  ✓ "value::national character(12)" => "value" (1 ms)
  ✓ "value::varchar" => "value"
  ✓ "value::varchar(12)" => "value" (1 ms)
  ✓ "value::character varying" => "value"
  ✓ "value::character varying(12)" => "value"
  ✓ "value::national character varying" => "value" (1 ms)
  ✓ "value::national character varying(12)" => "value" (1 ms)
  ✓ "value::time" => "value" (1 ms)
  ✓ "value::time(12)" => "value"
  ✓ "value::time(12) without time zone" => "value"
  ✓ "value::time without time zone" => "value"
  ✓ "value::time with time zone" => "value" (1 ms)
  ✓ "value::time(12) with time zone" => "value"
  ✓ "value::timetz" => "value" (1 ms)
  ✓ "value::interval" => "value"
  ✓ "value::interval(12)" => "value"
  ✓ "value::timestamp" => "value"
  ✓ "value::timestamp(12)" => "value"
  ✓ "value::timestamp without time zone" => "value" (1 ms)
  ✓ "value::timestamp(12) without time zone" => "value"
  ✓ "value::timestamp(12) with time zone" => "value" (1 ms)
  ✓ "value::timestamp with time zone" => "value"
  ✓ "value::timestamptz" => "value" (1 ms)
  ✓ "value::bytea" => "value"
  ✓ "value::text" => "value" (1 ms)
  ✓ "value::cidr" => "value"
  ✓ "value::inet" => "value" (1 ms)
  ✓ "value::macaddr" => "value"
  ✓ "value::uuid" => "value"
  ✓ "value::xml" => "value" (1 ms)
  ✓ "value::json" => "value"
  ✓ "value::jsonb" => "value" (1 ms)
  ✓ "value::tsvector" => "value" (1 ms)
  ✓ "value::tsquery" => "value"
  ✓ "value::array" => "value"
  ✓ "value::point" => "value"
  ✓ "value::txid_snapshot" => "value" (1 ms)
  ✓ "value::line" => "value" (1 ms)
  ✓ "value::lseg" => "value"
  ✓ "value::path" => "value" (1 ms)
  ✓ "value::box" => "value"
  ✓ "value::polygon" => "value" (1 ms)
  ✓ "value::circle" => "value"

 PASS  __tests__/replaceForeignKeySourceColumnType.test.js
  ✓ "CREATE TABLE destination (
    destination_id varchar(32) DEFAULT md5((concat(hex(nextval(destination_id_seq)), 'salt'))) NOT NULL
);

CREATE TABLE source (
    source_id varchar(32) DEFAULT md5((concat(hex(nextval(source_id_seq)), 'salt'))) NOT NULL,
    destination_id text
);

ALTER TABLE ONLY source
    ADD CONSTRAINT source_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES destination(destination_id);" => "CREATE TABLE destination (
    destination_id varchar(32) DEFAULT md5((concat(hex(nextval(destination_id_seq)), 'salt'))) NOT NULL
);

CREATE TABLE source (
    source_id varchar(32) DEFAULT md5((concat(hex(nextval(source_id_seq)), 'salt'))) NOT NULL,
    destination_id varchar(32)
);

ALTER TABLE ONLY source
    ADD CONSTRAINT source_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES destination(destination_id);" (7 ms)

 PASS  __tests__/replaceTextTypePrimaryKeyWithVarchar768.test.js
  ✓ "CREATE TABLE public.sample1 (
    sample1_id text DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL,
    sample1_name text
);

ALTER TABLE ONLY public.sample1
    ADD CONSTRAINT sample1_pkey PRIMARY KEY (sample1_id);" => "CREATE TABLE public.sample1 (
    sample1_id varchar(768) DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL,
    sample1_name text
);

ALTER TABLE ONLY public.sample1
    ADD CONSTRAINT sample1_pkey PRIMARY KEY (sample1_id);" (2 ms)
  ✓ "CREATE TABLE public.sample2 (
    sample2_id text,
    sample2_name text
);

ALTER TABLE ONLY public.sample2
    ADD CONSTRAINT sample2_pkey PRIMARY KEY (sample2_id);" => "CREATE TABLE public.sample2 (
    sample2_id varchar(768),
    sample2_name text
);

ALTER TABLE ONLY public.sample2
    ADD CONSTRAINT sample2_pkey PRIMARY KEY (sample2_id);" (1 ms)
  ✓ "CREATE TABLE public.sample3 (
    sample3_id bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL,
    sample3_name text
);

ALTER TABLE ONLY public.sample3
    ADD CONSTRAINT sample3_pkey PRIMARY KEY (sample3_id);" => "CREATE TABLE public.sample3 (
    sample3_id bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL,
    sample3_name text
);

ALTER TABLE ONLY public.sample3
    ADD CONSTRAINT sample3_pkey PRIMARY KEY (sample3_id);" (1 ms)

 PASS  __tests__/replaceReservedWordEnclosurePostgreSQL2MariaDB.test.js
  ✓ ""position" text DEFAULT ''::text NOT NULL," => "`position` text DEFAULT ''::text NOT NULL," (10 ms)

 PASS  __tests__/replaceCreateIndexPostgreSQL2MariaDB.test.js
  ✓ "CREATE INDEX index_name ON public.table_name USING btree (column_name);" => "CREATE INDEX index_name USING btree ON public.table_name (column_name);" (3 ms)

 PASS  __tests__/replaceSequencePostgreSQL2MariaDB.test.js
  ✓ "column_name text DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL," => "column_name varchar(32) DEFAULT md5((concat(hex(nextval(sequence_name)), 'salt'))) NOT NULL," (5 ms)
  ✓ "column_name bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL," => "column_name bigint DEFAULT nextval(sequence_name) NOT NULL," (1 ms)
  ✓ "column_name text DEFAULT md5((to_hex(nextval('sequence_name'::regclass)) || 'salt'::text)) NOT NULL," => "column_name varchar(32) DEFAULT md5((concat(hex(nextval(sequence_name)), 'salt'))) NOT NULL," (12 ms)
  ✓ "column_name bigint DEFAULT nextval('sequence_name'::regclass) NOT NULL," => "column_name bigint DEFAULT nextval(sequence_name) NOT NULL,"

Test Suites: 7 passed, 7 total
Tests:       168 passed, 168 total
Snapshots:   0 total
Time:        1.911 s, estimated 3 s
Ran all test suites.
```