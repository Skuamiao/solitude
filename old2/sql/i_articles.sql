-- 丢 articles 表
drop table if exists i_articles cascade;

-- 建 articles 表
create table i_articles (
    id integer default i_gen_id('article_seq') primary key,
    title varchar(27) not null,
    content text,
    drafted boolean default true,
    canceled boolean default false,
    establish timestamp with time zone default current_timestamp,
    modify timestamp with time zone default current_timestamp,
    publish timestamp with time zone,
    tags smallint[],
    author_id integer not null references authors
);
