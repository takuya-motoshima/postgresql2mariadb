# postgresql2mariadb
PostgreSQL to MariaDB Migration CLI. Migration of INSERT queries is not supported at this time.

## Overview
- Read the PostgreSQL dump file line by line.
    - If the line is empty, output a blank line and go to the next line.
    - If the line starts with `SET`, do not output and go to the next line.
    - If the line starts with `SELECT pg_catalog.set`, do not output and go to the next line.
    - Delete the `public` schema.
    - Delete the PostgreSQL cast operator (::type name).
    - Replace PostgreSQL data types with MariaDB data types.
    - Replace the `to_hex` function in PostgreSQL with the `hex` function in MariaDB.
    - Replace `ALTER TABLE ONLY` syntax with `ALTER TABLE`.
    - Replace PostgreSQL's `SEQUENCE`-based numbering process with MariaDB's numbering process.
    - Replaces the `CREATE INDEX` syntax. `ON table_name USING btree` moves `USING btree` before `ON`.
    - Output converted line.
- Replace the primary key constrained column type of type `text` with `varchar(768)` inside the `CREATE TABLE` statement.
- Replaces the type of a column defined as a foreign key destination inside a `CREATE TABLE` statement with the type of the foreign key source.

## Installation
```sh
npm install -g postgresql2mariadb
```

## Usage
### Run migration
Output MariaDB schema based on PostgreSQL schema.
```sh
npx postgresql2mariadb -i sample/postgresql_schema.sql -o sample/mariadb_schema.sql
```

Options:
- -i, --in &lt;filepath&gt;: Input file path (PostgreSQL dump).
- -o, --out &lt;filepath&gt;: Output file path (MariaDB dump).
- -d, --debug: Debug mode. Default is false.
- -h, --help: display help for command

### Help
```sh
npx postgresql2mariadb -h
```

## Class Reference
[https://takuya-motoshima.github.io/postgresql2mariadb/](https://takuya-motoshima.github.io/postgresql2mariadb/)

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)
