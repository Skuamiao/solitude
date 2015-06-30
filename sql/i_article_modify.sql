-- drop set_article
drop function if exists i_article_modify(id integer, title varchar(27),
            content text, drafted boolean, tags smallint[], author_id integer);

create function i_article_modify(integer, varchar(27), text,
                                                boolean, smallint[], integer)
returns integer as $$
declare
    rt integer = 1;
    r record;
begin
    begin
        -- raise notice '% % % %', title, content, state, author_id;
        select publish, drafted from i_articles where id = $1 into r;
        if r.publish is null and not r.drafted then
            update articles
                set(title, content, drafted, tags, author_id, modify, publish)
                = ($2, $3, $4, $5, $6, current_timestamp, current_timestamp)
                where id = $1;
        else
            update i_articles
                        set(title, content, drafted, tags, author_id, modify)
                        = ($2, $3, $4, $5, $6, current_timestamp)
                        where id = $1;
        end if;
    exception
        -- title 长度超过限制
        when string_data_right_truncation then
            rt = 0;
    end;
    return rt;
end;
$$ language plpgsql strict;
