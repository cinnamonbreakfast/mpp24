#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE postgres;
    SELECT postgres;
    create table public.users
    (
        id          varchar not null
            constraint users_pk
                primary key,
        username    varchar not null
            constraint users_pk2
                unique,
        full_name   varchar,
        secret_code varchar
    );

    alter table public.users
        owner to postgres;
EOSQL