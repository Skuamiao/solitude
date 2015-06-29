-- drop set_article
drop function if exists article_add(title varchar(27), content text,
                drafted boolean, tags smallint[], author_id integer);

/*  article 添加 605429
*/
create function article_add(title varchar(27), content text, drafted boolean,
                                            tags smallint[], author_id integer)
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        -- raise notice '% % % %', title, content, state, author_id;
        if drafted then
            insert into articles (title, content, establish, tags, author_id)
                                    values($1, $2, current_timestamp, $4, $5);
        else
            insert into
                articles (title, content, drafted, establish, publish,
                                                                tags, author_id)
                values($1, $2, $3, current_timestamp,
                                                    current_timestamp, $4, $5);
        end if;
    exception
        -- title 长度超过限制
        when string_data_right_truncation then
            rc = 0;
    end;
    return rc;
end;
$$ language plpgsql strict;
