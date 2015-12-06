drop function if exists i_author_cancel(author_id integer);

/*  author 取消
*/
create function i_author_cancel(integer)
returns integer as $$
declare
    rt integer = 1;
begin
    begin
        update i_authors set (canceled) = (true) where id = $1;
        -- 未捕获异常
    end;
    return rt;
end;
$$ language plpgsql strict;
