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
