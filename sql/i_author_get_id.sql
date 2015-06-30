-- drop get_author_id
drop function if exists i_author_get_id(str text);

/* create get author id
*/
create function i_author_get_id(text) returns integer as $$
declare
    rid integer;
begin
    select id from authors
                where $1 = (encode(digest(email, 'sha1'), 'hex') || password)
                                                                    into rid;
    return rid;
end;
$$ language plpgsql strict;
