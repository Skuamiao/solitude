drop function
    if exists author_add(email varchar(27), password text, name varchar(27));

/*  author 添加
*/
create function author_add(varchar(27), text, varchar(27))
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        if name = '' then
            insert into authors (email, password, name, establish)
                                        values($1, $2, $1, current_timestamp);
        else
            insert into authors (email, password, name, establish)
                                        values($1, $2, $3, current_timestamp);
        end if;
    exception
        when unique_violation then
            rc = 0;
        -- 未捕获异常
    end;

    return rc;
end;
$$ language plpgsql strict;
