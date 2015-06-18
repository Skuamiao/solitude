drop function if exists author_modify
        (author_id integer, email varchar(27), password text, name varchar(27));

/*  author 编辑
*/
create function author_modify
        (author_id integer, email varchar(27), password text, name varchar(27))
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        update authors set (email, password, name, modify)
                                = ($2, $3, $4, current_timestamp) where id = $1;
    exception
        when unique_violation then
            rc = 0;
        -- 未捕获异常
    end;
    return rc;
end;
$$ language plpgsql strict;
