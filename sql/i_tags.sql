-- 丢 tags 表
drop table if exists i_tags cascade;

-- 建 tags 表
create table i_tags (
    id smallserial primary key,
    name varchar(23) not null unique,
    canceled boolean default false,
    establish timestamp with time zone default current_timestamp,
    modify timestamp with time zone default current_timestamp,
    author_id integer not null references authors,
    article_ids integer[]
);
