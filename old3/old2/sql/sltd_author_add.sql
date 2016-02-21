-- drop function if exists sltd_author_add(email varchar(27), password text, nickname varchar(12));

/*  author 添加
*/
create or replace function sltd_author_add(varchar(28), text, varchar(12))
returns integer as $$
declare
    rt integer = 1;
begin
    begin
        insert into sltd_authors (email, password, nickname, establish) values($1, $2, $3, current_timestamp);
    exception
        when unique_violation then
            rt = 0;
        -- 未捕获异常
    end;
    return rt;
end;
$$ language plpgsql strict;
