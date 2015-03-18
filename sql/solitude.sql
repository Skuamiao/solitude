-- 丢弃所有表
drop table if exists authors cascade;

-- 丢弃所有扩展
drop extension if exists pgcrypto cascade;

create extension pgcrypto;

create or replace function sha1(text) returns text as
$$
    select encode(digest($1, 'sha1'), 'hex')
$$
language sql strict immutable;

-- 建 authors 表
create table authors (
    id varchar(6),
    email varchar(27),
    passowrd char(40),
    name varchar(13),
    avatar text
);
