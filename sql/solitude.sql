/* extensions, tables, functions, privileges */
-- 丢 pgcrypto 扩展
drop extension if exists pgcrypto cascade;

-- 建 pgcrypto 扩展
create extension pgcrypto;

drop sequence if exists author_seq, article_seq cascade;
create sequence author_seq;
create sequence article_seq;

drop function if exists gen_id(seq text) cascade;

/*  id 生成
    1. 生成一个 6 位随机数
    2. 确认没有存在过; 如果存在，重复 1，2；如果不存在 3
    3. 使用这个数
*/
create function gen_id(seq text) returns integer as $$
begin
    return round(random() * 1000) + nextval(seq);
end;
$$ language plpgsql strict;

-- drop get_author_id
drop function if exists get_author_id(str text) cascade;

/* create get author id
*/
create function get_author_id(str text) returns integer as $$
declare
    rid integer;
begin
    select id from authors
                where str = (encode(digest(email, 'sha1'), 'hex') || password)
                into rid;
    return rid;
end;
$$ language plpgsql strict;

drop function if exists existed_author(str text) cascade;

/*  author 存在
*/
create function existed_author(str text) returns text as $$
declare
    row record;
begin
    select email, name from authors
                where str = (encode(digest(email, 'sha1'), 'hex') || password)
                into row;
    if row.name is not null then
        return row.name;
    else
        return row.email;
    end if;
end;
$$ language plpgsql strict;

drop function
    if exists add_author(email varchar(27), password text, name varchar(17))
cascade;

/*  author 添加
*/
create function add_author(email varchar(27), password text, name varchar(17))
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        if name = '' then
            insert into authors (email, password, establish)
                                    values(email, password, current_timestamp);
        else
            insert into authors (email, password, name, establish)
                            values(email, password, name, current_timestamp);
        end if;
    exception
        when unique_violation then
            rc = 0;
        when others then
            rc = -1; -- 未预测异常
    end;

    return rc;
end;
$$ language plpgsql strict;

-- drop set_article
drop function if exists add_article(title varchar(27), content text,
                drafted boolean, tags smallint[], author_id integer) cascade;

/*  article 添加 605429
*/
create function add_article(title varchar(27), content text, drafted boolean,
                                            tags smallint[], author_id integer)
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        -- raise notice '% % % %', title, content, state, author_id;
        if drafted then
            insert into articles (title, content, establish, tags, author_id)
            values(title, content, current_timestamp, tags or null, author_id);
        else
            insert into
                articles (title, content, drafted, establish, publish,
                                                                tags, author_id)
                values(title, content, drafted, current_timestamp,
                                    current_timestamp, tags or null, author_id);
        end if;
    exception
        -- title 长度超过限制
        when string_data_right_truncation then
            rc = 0;
        when others then
            rc = -1; -- 非预测异常
    end;
    return rc;
end;
$$ language plpgsql strict;

-- 丢 authors 表
drop table if exists authors cascade;

-- 建 authors 表
create table authors (
    id integer default gen_id('author_seq') primary key,
    email varchar(27) not null unique,
    password text not null,
    name varchar(17) unique,
    canceled boolean default false,
    establish timestamp with time zone not null,
    modify timestamp with time zone default current_timestamp
);

-- 丢 articles 表
drop table if exists articles cascade;

-- 建 articles 表
create table articles (
    id integer default gen_id('article_seq') primary key,
    title varchar(27) not null,
    content text,
    drafted boolean default true,
    canceled boolean default false,
    establish timestamp with time zone not null,
    modify timestamp with time zone default current_timestamp,
    publish timestamp with time zone,
    tags smallint[],
    author_id integer not null references authors
);

-- 丢弃角色所有权限
revoke all on authors, articles, author_seq, article_seq from solitude;
-- 丢弃角色
drop role if exists solitude;


-- 建立角色
create role solitude login noreplication encrypted password 'solitude8296';
-- 建立角色权限
grant select, insert, update on authors, articles to solitude;
grant select, update, usage on author_seq, article_seq to solitude;
