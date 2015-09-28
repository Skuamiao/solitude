-- 丢弃角色所有权限
revoke all on sltd_authors, sltd_author_seq, sltd_article_seq from test;
-- 丢弃角色
drop role if exists test;


-- 建立角色
create role test login noreplication encrypted password '16d7a4fca7442dda3ad93c9a726597e4';

-- 建立角色权限
grant select, insert, update on sltd_authors to test;
grant select, update, usage on sltd_author_seq, sltd_article_seq to test;
