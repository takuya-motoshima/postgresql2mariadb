const {core} = require('../dist/build.common');

test.each([
  [
    "CREATE TABLE public.sample1 (\n    sample1_id text DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL,\n    sample1_name text\n);\n\nALTER TABLE ONLY public.sample1\n    ADD CONSTRAINT sample1_pkey PRIMARY KEY (sample1_id);",
    "CREATE TABLE public.sample1 (\n    sample1_id varchar(768) DEFAULT md5((to_hex(nextval('public.sequence_name'::regclass)) || 'salt'::text)) NOT NULL,\n    sample1_name text\n);\n\nALTER TABLE ONLY public.sample1\n    ADD CONSTRAINT sample1_pkey PRIMARY KEY (sample1_id);",
  ],
  [
    "CREATE TABLE public.sample2 (\n    sample2_id text,\n    sample2_name text\n);\n\nALTER TABLE ONLY public.sample2\n    ADD CONSTRAINT sample2_pkey PRIMARY KEY (sample2_id);",
    "CREATE TABLE public.sample2 (\n    sample2_id varchar(768),\n    sample2_name text\n);\n\nALTER TABLE ONLY public.sample2\n    ADD CONSTRAINT sample2_pkey PRIMARY KEY (sample2_id);",
  ],
  [
    "CREATE TABLE public.sample3 (\n    sample3_id bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL,\n    sample3_name text\n);\n\nALTER TABLE ONLY public.sample3\n    ADD CONSTRAINT sample3_pkey PRIMARY KEY (sample3_id);",
    "CREATE TABLE public.sample3 (\n    sample3_id bigint DEFAULT nextval('public.sequence_name'::regclass) NOT NULL,\n    sample3_name text\n);\n\nALTER TABLE ONLY public.sample3\n    ADD CONSTRAINT sample3_pkey PRIMARY KEY (sample3_id);",
  ],
])('"%s" => "%s"', (str, expected) => {
  const actual = core.replaceTextTypePrimaryKeyWithVarchar768(str);
  expect(actual).toBe(expected);
});