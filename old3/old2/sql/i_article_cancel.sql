-- drop set_article
drop function if exists i_article_cancel(id integer, author_id integer);

create function i_article_cancel(integer, integer)
returns integer as $$
declare
    rt integer = 1;
begin
    -- raise notice '% % % %', title, content, state, author_id;
    update i_articles set(canceled) = (true) where id = $1;
    return rt;
end;
$$ language plpgsql strict;
