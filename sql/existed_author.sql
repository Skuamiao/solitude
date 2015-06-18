drop function if exists existed_author(str text) cascade;

/*  author 存在
*/
create function existed_author(str text) returns text as $$
declare
    row record;
begin
    select email, name from authors
                where str = (encode(digest(email, 'sha1'), 'hex') || password)
                into row;
    if row.name is not null then
        return row.name;
    else
        return row.email;
    end if;
end;
$$ language plpgsql strict;
