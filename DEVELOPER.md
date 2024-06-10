## Comparing PostgreSQL and MariaDB
hash():
- MariaDB
    ```sql
    select md5(hex(12345));
    -- f0204e1d3ee3e4b05de4e2ddbd39e076
    ```
- PostgreSQL
    ```sql
    select md5(to_hex(12345));
    -- f0204e1d3ee3e4b05de4e2ddbd39e076
    ```

nextval():
- MariaDB
    ```sql
    create sequence sample_seq
        start with 1
        increment by 1
        no minvalue
        no maxvalue
        cache 1;
    select md5((concat(hex(nextval(sample_seq)), 'spmapi contracts salt')));
    -- | a820e6447543419ce655574e034ddfa1                                               |
    -- | 60a5a856a6ce8fbb32f905dd502607a0                                               |
    -- | b1d6c42d96b2a8bae1cbc75694a93e39                                               |
    ```
- PostgreSQL
    ```sql
    create sequence public.sample_seq
        start with 1
        increment by 1
        no minvalue
        no maxvalue
        cache 1;
    select md5((to_hex(nextval('public.sample_seq'::regclass)) || 'spmapi contracts salt'::text));
    -- a820e6447543419ce655574e034ddfa1
    -- 60a5a856a6ce8fbb32f905dd502607a0
    -- b1d6c42d96b2a8bae1cbc75694a93e39
    ```
## PostgreSQL dump
```sh
# Connection information of PostgreSQL DB.
host=DB host name
user=DB user name
db=DB name

# Connect to PostgreSQL DB.
psql -h $host -U $user -d $db

# Dump only schema from PostgreSQL.
pg_dump --no-owner --no-privileges --no-tablespaces --disable-dollar-quoting --schema-only -h $host -U $user -d $db > ~/schema.sql

# Dump only data from PostgreSQL.
pg_dump --no-owner --no-privileges --no-tablespaces --disable-dollar-quoting --column-inserts --data-only -h $host -U $user -d $db > ~/data.sql

# Dump schema and data from PostgreSQL.
pg_dump --no-owner --no-privileges --no-tablespaces --disable-dollar-quoting --column-inserts -h $host -U $user -d $db > ~/schema\&data.sql
```

## Troubleshooting
- `ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near 'SEQUENCE sample_seq`:  
    Update the version of MariaDB to 10.3 or higher. `SEQUENCE` is supported by MariaDB 10.3 or higher.

<!-- ## Referenced site
- [PostgreSQLのデータをMySQLに移行する #postgres - Qiita](https://qiita.com/artifactsauce/items/f9fdee98a258b349dc06)
- [PostgreSQL から MySQL (MariaDB) へデータを移す #mariadb - Qiita](https://qiita.com/ekzemplaro/items/281507a10efd5257079a) -->
