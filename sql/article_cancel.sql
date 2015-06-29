-- drop set_article
drop function if exists article_cancel(id integer, author_id integer);

create function article_cancel(integer, integer)
returns integer as $$
declare
    rc integer = 1;
begin
    -- raise notice '% % % %', title, content, state, author_id;
    update articles set(canceled) = (true) where id = $1;
    return rc;
end;
$$ language plpgsql strict;
