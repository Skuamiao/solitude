drop function if exists gen_id(seq text);

/*  id 生成
    生成一个最多 3 位的随机数，加上一个自增长的数
*/
create function gen_id(text) returns integer as $$
begin
    return round(random() * 1000) + nextval($1);
end;
$$ language plpgsql strict;
