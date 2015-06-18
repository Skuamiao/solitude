-- 丢 authors 表
drop table if exists authors;

-- 建 authors 表
create table authors (
    id integer default gen_id('author_seq') primary key, -- 主键 id
    email varchar(27) not null unique, -- 邮箱
    password text not null, -- 密码，sha-1
    name varchar(27) unique, -- 程序处理时默认以邮箱赋值
    canceled boolean default false, -- 是否被取消，比如删除
    establish timestamp with time zone not null, -- 建立时间
    modify timestamp with time zone default current_timestamp -- 编辑时间
);
