-- 丢弃所有表
drop table if exists authors cascade;

-- 丢弃所有扩展
drop extension if exists pgcrypto cascade;

-- 丢弃所有函数
drop function if exists sha1(text) cascade;
-- drop function if exists gen_id() cascade;


create extension pgcrypto;
/*
create function sha1(text)
returns bytea as
$$
begin
    return digest($1, 'sha1');
end
$$
language plpgsql strict immutable;
*/
/*
create function gen_id() returns integer as
$$

$$
language sql strict immutable;
*/

-- 建 authors 表
create table authors (
    id varchar(6) primary key,
    email varchar(27) not null,
    passowrd bytea not null,
    name varchar(13) default '',
    avatar text default '',
    created timestamp with time zone not null
);
