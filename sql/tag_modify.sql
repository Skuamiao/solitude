drop function if exists tag_modify
    (id smallint, name varchar(23), author_id integer, article_ids integer[]);

/*  author 添加
*/
create function tag_modify(smallint, varchar(23), integer, integer[])
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        update tags set (name, author_id, article_ids) = ($2, $3, $4)
                                                                where id = $1;
    exception
        -- 标签名重复
        when unique_violation then
            rc = 0;
        -- 标签字符数超过限制
        when string_data_right_truncation then
            rc = -1;
        -- 未捕获异常
    end;
    return rc;
end;
$$ language plpgsql strict;
