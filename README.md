## Introducción

**Estilo Canino** es una app de peluquería canina, en esta los usuarios se pueden registar, crear un perfil de cliente y pueden registar un perro para posteriormente reservar un turno con un peluquero canino que tambien este registrado en la app.

Esta app cuenta con 3 roles distintos.

**Cliente:**
acciones:
-registrarse como usuario
-ver información del usuario
-editar perfil del usuario
-cambio de contraseña
-hacer logout
-ver sus perros
-registrar un nuevo perro a su nombre
-editar un perro(solo debe poder editar a los perros del usuario propio)
-ver turnos disponibles por peluquero, en cierta fecha(tomar la fecha de hoy si no se envia
nada en los filtros)
-pedir un turno para cierto peluquero
-ver sus turnos tomados(agregar filtro para ver turnos por perro)
-cancelar un turno

**Peluquero:**
los usuarios con rol “peluquero” deben poder acceder a endpoints para realizar las
siguientes acciones:
-ver la información del usuario
-editar el perfil del usuario
-cambio de contraseña
-hacer logout
-ver todos los turnos que tiene en cierta fecha (tomar la fecha de hoy si no se envia nada en
los filtros)
-cancelar un turno
-ver todas las mascotas por usuario
-crear un turno para una mascota de cualquier usuario, para si mismo (para el peluquero de
la cuenta)

**Administrador:**
los usuarios con rol “admin” deben poder acceder a endpoints para realizar las siguientes
acciones:
-ver la información del usuario
-editar el perfil del usuario
-cambio de contraseña
-hacer logout
-crear un usuario peluquero.
-eliminar un usuario peluquero o cliente.
-cancelar un turno
-ver todos los turnos tomados, ordenados por peluquero, en cierta fecha
-crear un turno para una mascota de cualquier usuario y cualquier peluquero

**Tecnologías:**
Back End: node.js, express, dotenv, moongoose, JWT, bcrypt, nodemon, morgan, cors.

DB: mongoDB
