-- 丢 authors 表
drop table if exists sltd_authors;

-- 建 authors 表
create table sltd_authors (
    id integer default sltd_gen_id('author_seq') primary key, -- 主键 id
    email varchar(28) not null unique, -- 邮箱
    password text not null, -- 密码，sha-1
    nickname varchar(12) unique, -- 程序处理时默认以邮箱赋值
    canceled boolean default false, -- 是否被取消，比如删除
    establish timestamp with time zone not null, -- 建立时间
    modify timestamp with time zone default current_timestamp -- 编辑时间
);
