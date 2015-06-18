drop function if exists cancel_author(author_id integer);

/*  author 取消
*/
create function cancel_author(author_id integer)
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
