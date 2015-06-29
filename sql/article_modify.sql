-- drop set_article
drop function if exists article_modify(id integer, title varchar(27),
            content text, drafted boolean, tags smallint[], author_id integer);

create function article_modify(integer, varchar(27), text,
                                                boolean, smallint[], integer)
returns integer as $$
declare
    rc integer = 1;
    r record;
begin
    begin
        -- raise notice '% % % %', title, content, state, author_id;
        select publish, drafted from articles where id = $1 into r;
        if r.publish is null and not r.drafted then
            update articles
                set(title, content, drafted, tags, author_id, modify, publish)
                = ($2, $3, $4, $5, $6, current_timestamp, current_timestamp)
                where id = $1;
        else
            update articles
                        set(title, content, drafted, tags, author_id, modify)
                        = ($2, $3, $4, $5, $6, current_timestamp)
                        where id = $1;
        end if;
    exception
        -- title 长度超过限制
        when string_data_right_truncation then
            rc = 0;
    end;
    return rc;
end;
$$ language plpgsql strict;
