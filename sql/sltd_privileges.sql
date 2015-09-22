-- 丢弃角色所有权限
revoke all on sltd_authors, sltd_author_seq, sltd_article_seq from test;
-- 丢弃角色
drop role if exists test;


-- 建立角色
create role test login noreplication encrypted password '098f6bcd4621d373cade4e832627b4f6';

-- 建立角色权限
grant select, insert, update on sltd_authors to test;
grant select, update, usage on sltd_author_seq, sltd_article_seq to test;
