-- drop function if exists sltd_gen_id(seq text);

/*  id 生成
    生成一个最多 3 位的随机数，加上一个自增长的数
*/
create or replace function sltd_gen_id(text) returns integer as $$
declare
    rid integer;
begin
    rid = round(random() * 1000) + nextval($1);
    if exists(select 1 from sltd_authors where id = rid) then
        return rid + 1;
    end if;
    return rid;
end;
$$ language plpgsql strict;
