drop function if exists i_author_modify
        (author_id integer, email varchar(27), password text, name varchar(27));

/*  author 编辑
*/
create function i_author_modify(integer, varchar(27), text, varchar(27))
returns integer as $$
declare
    rt integer = 1;
begin
    begin
        update i_authors set (email, password, name, modify)
                                = ($2, $3, $4, current_timestamp) where id = $1;
    exception
        when unique_violation then
            rt = 0;
        -- 未捕获异常
    end;
    return rt;
end;
$$ language plpgsql strict;
