-- drop set_article
drop function if exists add_article(title varchar(27), content text,
                drafted boolean, tags smallint[], author_id integer) cascade;

/*  article 添加 605429
*/
create function add_article(title varchar(27), content text, drafted boolean,
                                            tags smallint[], author_id integer)
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        -- raise notice '% % % %', title, content, state, author_id;
        if drafted then
            insert into articles (title, content, establish, tags, author_id)
            values(title, content, current_timestamp, tags or null, author_id);
        else
            insert into
                articles (title, content, drafted, establish, publish,
                                                                tags, author_id)
                values(title, content, drafted, current_timestamp,
                                    current_timestamp, tags or null, author_id);
        end if;
    exception
        -- title 长度超过限制
        when string_data_right_truncation then
            rc = 0;
        when others then
            rc = -1; -- 非预测异常
    end;
    return rc;
end;
$$ language plpgsql strict;
