drop function if exists author_exist(str text);

/*  author 存在
*/
create function author_exist(str text) returns text as $$
declare
    name text;
begin
    select name from authors
                where $1 = (encode(digest(email, 'sha1'), 'hex') || password)
                                                                    into name;
    return name;
end;
$$ language plpgsql strict;
/*
create function author_exist(str text) returns text as $$
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
*/
