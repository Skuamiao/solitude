-- 丢弃所有表
drop table if exists authors cascade;

-- 丢弃所有扩展
drop extension if exists pgcrypto cascade;

-- 丢弃所有函数
drop function if exists gen_id() cascade;


create extension pgcrypto;

/*
    1. 生成一个 6 位随机数
    2. 确认没有存在过; 如果存在，重复 1，2；如果不存在 3
    3. 使用这个数
*/
create function gen_id() returns integer as $$
declare
    aid integer;
    rid integer;
begin
    loop
        -- 1
        select round(random() * 1000000) into aid;
        if(aid < 100000) then
            select aid + 100000 into aid;
        end if;
        -- 2
        exit when not exists(select id from authors where aid = id);
    end loop;
    -- 4
    return aid;
end;
$$ language plpgsql strict;


-- 建 authors 表
create table authors (
    id integer default gen_id() primary key,
    email varchar(27) not null unique,
    password bytea not null,
    name varchar(13) default '' unique,
    avatar text default '',
    created timestamp with time zone default current_timestamp
);
