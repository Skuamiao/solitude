drop function if exists i_tag_modify
    (id smallint, name varchar(23), author_id integer, article_ids integer[]);

/*  author 添加
*/
create function i_tag_modify(smallint, varchar(23), integer, integer[])
returns integer as $$
declare
    rt integer = 1;
begin
    begin
        update i_tags set (name, author_id, article_ids, modify)
                                = ($2, $3, $4, current_timestamp) where id = $1;
    exception
        -- 标签名重复
        when unique_violation then
            rt = 0;
        -- 标签字符数超过限制
        when string_data_right_truncation then
            rt = -1;
        -- 未捕获异常
    end;
    return rt;
end;
$$ language plpgsql strict;
