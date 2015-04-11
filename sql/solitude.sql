-- 丢弃所有扩展
drop extension if exists pgcrypto cascade;


-- 丢弃所有表
drop table if exists authors cascade;


-- 丢弃所有函数
drop function if exists gen_id() cascade;

drop function 
    if exists set_author(email varchar(27), password text, name varchar(17)) 
    cascade;


-- 建立 pgcrypto 扩展
create extension pgcrypto;


/*  id 生成
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
    -- 3
    return aid;
end;
$$ language plpgsql strict;

/*  author 添加
*/
create function set_author(email varchar(27), password text, name varchar(17)) 
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        insert into authors (email, password, name) 
            values(email, password, name);
    exception
        when unique_violation then
            rc = 0;
        when others then
            rc = -1;
    end;
    return rc;
end;
$$ language plpgsql strict;


-- 建 authors 表
create table authors (
    id integer default gen_id() primary key,
    email varchar(27) not null unique,
    password text not null,
    name varchar(17) default '' unique,
    -- avatar text default '',
    created timestamp with time zone default current_timestamp
);


-- 丢弃角色所有权限
revoke all on authors from solitude;
-- 丢弃角色
drop role if exists solitude;


-- 建立角色
create role solitude login noreplication encrypted password 'se8296';
-- 建立角色权限
grant select, insert, update on authors to solitude;

