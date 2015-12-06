-- drop set_article
drop function if exists i_article_add(title varchar(27), content text,
                drafted boolean, tags smallint[], author_id integer);

create function i_article_add(varchar(27), text, boolean, smallint[], integer)
returns integer as $$
declare
    rt integer = 1;
begin
    begin
        -- raise notice '% % % %', title, content, state, author_id;
        if drafted then
            insert into i_articles (title, content, tags, author_id)
                                    values($1, $2, $4, $5);
        else
            insert into
                i_articles (title, content, drafted, publish, tags, author_id)
                values($1, $2, $3, current_timestamp, $4, $5);
        end if;
    exception
        -- title 长度超过限制
        when string_data_right_truncation then
            rt = 0;
    end;
    return rt;
end;
$$ language plpgsql strict;
