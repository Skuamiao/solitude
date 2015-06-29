drop function if exists author_cancel(author_id integer);

/*  author 取消
*/
create function author_cancel(integer)
returns integer as $$
declare
    rc integer = 1;
begin
    begin
        update authors set (canceled) = (true) where id = $1;
        -- 未捕获异常
    end;
    return rc;
end;
$$ language plpgsql strict;
