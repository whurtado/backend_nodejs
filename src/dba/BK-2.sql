/* 
usuario = william
tarea = BK-2
*/

//insert permisos

insert into permission values(default,'crear_usuario',now(), now());
insert into permission values(default,'ver_usuario',now(), now());
insert into permission values(default,'editar_usuario',now(), now());

insert into permission values(default,'crear_rol',now(), now());
insert into permission values(default,'ver_rol',now(), now());
insert into permission values(default,'editar_rol',now(), now());
insert into module (id, name) values (8, 'SMTP');

insert into status (id,name, "moduleId") values(default, 'ACTIVO', 8);
insert into status (id,name, "moduleId") values(default, 'INACTIVO', 8);
insert into module (id, name) values (8, 'SMTP');

insert into status (id,name, "moduleId") values(default, 'ACTIVO', 8);
insert into status (id,name, "moduleId") values(default, 'INACTIVO', 8);
