-- 丢弃角色所有权限
revoke all on authors, articles, author_seq, article_seq from solitude;
-- 丢弃角色
drop role if exists solitude;


-- 建立角色
create role solitude login noreplication encrypted
                                    password 'd886556df778e2d84abd1cda3bbc99a3';
-- 建立角色权限
grant select, insert, update on authors, articles to solitude;
grant select, update, usage on author_seq, article_seq to solitude;
