-- 丢弃角色所有权限
revoke all on i_authors, i_articles, i_author_seq, i_article_seq from solitude;
-- 丢弃角色
drop role if exists solitude;


-- 建立角色
create role solitude login noreplication encrypted
                                    password 'd886556df778e2d84abd1cda3bbc99a3';
-- 建立角色权限
grant select, insert, update on i_authors, i_articles to solitude;
grant select, update, usage on i_author_seq, i_article_seq to solitude;
