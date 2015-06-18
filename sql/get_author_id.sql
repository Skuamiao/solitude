-- drop get_author_id
drop function if exists get_author_id(str text) cascade;

/* create get author id
*/
create function get_author_id(str text) returns integer as $$
declare
    rid integer;
begin
    select id from authors
                where str = (encode(digest(email, 'sha1'), 'hex') || password)
                into rid;
    return rid;
end;
$$ language plpgsql strict;
