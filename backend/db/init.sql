
CREATE TABLE IF NOT EXISTS public.users
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

