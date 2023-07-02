# Estilo Canino API

<div style="text-align: justify">

<hr/>

## Introducción

**Estilo Canino** es una APP de peluquería canina donde podes registrar a tus perros y solicitar un turno con un peluquero. En este repositorio se encuentra la API REST con la cual el frontend obtiene toda la información de usuarios, sus respectivos perros y turnos conectada a mongoDB.

## Modelo de clases

Las clases que maneja estilo canino para administrar sus usuarios son las siguientes:

#### 1. User

Es la persona que utiliza la aplicación, capaz crear perros , editarlos y borrarlos, iniciar sesión y evidentemente, registrarse.
Tambien estan los usuarios de tipo peluquero y administrador. Todos son capaces de registrar un nuevo turno.
Los usuarios de tipo administrador tiene acceso a edpoints que los otros no.


**Atributos**

|  Nombre  |  Tipo  |
| :------: | :----: |
|    id    | string |
|   name   | string |
|  email   | string |
| password | string |
|   age    | string |
|   role   |  ref   |

#### 2. Dog

**Atributos**

| Nombre |  Tipo  |
| :----: | :----: |
|   id   | string |
|  name  | string |
|  age   | string |
| breed  | string |
| owner  |   id   |

#### 3. Role

En este modelo al iniciarse por primera vez la app,se crean 3 roles
"cliente" "peluquero" y "administrador", luego el bucle no se vuelve a ejecutar, a menos que se borren los roles de la base de datos por algun motivo
**Atributos**

| Nombre |  Tipo  |
| :----: | :----: |
|  name  | string |

#### 4. Turn

En este modelo se guardan todos los turnos, son fechas de 1 y dos digitos.
se relaciona con los modelos dog, perro y usuarios del tipo cliente y peluquero
**Atributos**

|    Nombre    |  Tipo   |
| :----------: | :-----: |
|     date     | string  |
|    month     | string  |
|     year     | string  |
|     day      | string  |
|     time     | string  |
|     dog      | string  |
|   groomer    | string  |
|    client    | string  |
|    client    | string  |
| availability | Boolean |
|    state     | Boolean |

<hr />

## Endpoints

#### 1. Acciones de usuario

##### Obtener el usuario loggeado

##### `Post  /auth/signin`

En el body de la request:

````js
{
    email: string,
    password: string
}

```

|   Caso    | Status |             Respuesta              |
| :-------: | :----: | :--------------------------------: |
|   Exito   |  200   |              { user }              |
| Not Found |  404   |    { message: 'no user found' }    |
|   Fallo   |  401   | { message: 'incorrect password' }  |
|   Fallo   |  500   | { message: 'Server Error' } |


   #### 2.  Crear un usuario

   ##### `POST /auth/signup`

En el body de la request:

```js
{
    name: string,
    age: string,
    email: string,
    password: string,
    role: [string]  de no enviarse nada se crea con el rol cliente
}
````

Si los datos del cuerpo de la request están correctos, se creará el usuario en la base de datos con un \_id autogenerado por mongoDB.

#### 2. Acciones de dogs

#### `POST /dog`

##### Crear un nuevo perro

En el body de la request:

```js
{

    name: string,
    age: string
    breed: string
    ownweId: se crea con el id guardado en jwt
}
```

##### `GET /dog/id`

espera un id de perro en el params y devuelve un dog

|   Caso    | Status |          Respuesta           |
| :-------: | :----: | :--------------------------: |
|   Exito   |  200   |           { dog }            |
| Not Found |  404   | { message: 'dog not found' } |
|   Fallo   |  500   | { message: 'Server Error' }  |

##### `GET /dog`

espera un id que es obtenido mediante el middleware verifyToken, retorna todos los dogs asociados al dueño

| Caso  | Status |          Respuesta          |
| :---: | :----: | :-------------------------: |
| Exito |  200   |          { dogs }           |
| Fallo |  500   | { message: 'Server Error' } |

##### `GET /dog/alldogs`

En el body de la request:

```js
{
  ownweId: string;
}
```

esta funcion es para cuando el administrador quiere crear un turno para cualquier peluquero y cualquier usuario

| Caso  | Status |          Respuesta          |
| :---: | :----: | :-------------------------: |
| Exito |  200   |          { dogs }           |
| Fallo |  500   | { message: 'Server Error' } |

##### `PUT /dog/dogID`

En el body de la request:

```js
{

    name: string,
    age: string
    breed: string

}
```

el id del dueño es obtenido mediante el token

| Caso  | Status |          Respuesta          |
| :---: | :----: | :-------------------------: |
| Exito |  200   | 'Dog updated successfully'  |
| Fallo |  500   | { message: 'Server Error' } |

##### `DELETE /dog/dogID`

espera el id del perro por params y el id del dueño es obtenido mediante el token

|   Caso    | Status |          Respuesta          |
| :-------: | :----: | :-------------------------: |
|   Exito   |  200   | 'Dog updated successfully'  |
| Not Found |  404   |       'dog not found'       |
|   Fallo   |  500   | { message: 'Server Error' } |

#### 3. Acciones de turnos

##### Crear un nuevo turno

##### `POST /turn/create`

En el body de la request:

```js
{
date: string,
 month:string    ,
year: string,
day:string,
time:string,
groomer:string,
dog:string,
client:string


}
```

| Caso  | Status |                          Respuesta                          |
| :---: | :----: | :---------------------------------------------------------: |
| Exito |  200   |                        '{savedTurn}'                        |
| Fallo |  400   |                   'Invalid date and time'                   |
| Fallo |  400   |           'Selected date and time is in the past'           |
| Fallo |  400   |      'Turn already exists for the given date and time'      |
| Fallo |  400   | 'Cannot schedule a turn within 1 hour of the previous turn' |
| Fallo |  500   |                    'Error creating turn'                    |

##### Consuta turnos disponibles por peluqueroid

##### `POST /turn`

En el body de la request:

```js
{
date: string,
 month:string,
year: string,
day:string,
time:string,
groomerID:string,

}
```

// Generar una lista de horarios disponibles para el día seleccionado
const allSlots = [
"09:00",
"10:00",
"11:00",
"12:00",
"13:00",
"14:00",
"15:00",
];
Realizar una consulta para obtener las citas reservadas para el día y el peluquero específico
Eliminar los horarios que ya están reservados

| Caso  | Status |            Respuesta            |
| :---: | :----: | :-----------------------------: |
| Exito |  200   |        {availableSlots}         |
| Fallo |  500   | 'Error getting available turns' |

##### Consulta todos los tunos de menor a mayor fecha

##### `GEt /turn/turns`

| Caso  | Status |       Respuesta       |
| :---: | :----: | :-------------------: |
| Exito |  200   |        {Turns}        |
| Fallo |  500   | 'Error getting turns' |

##### Consulta todos los tunos de menor a mayor fecha

##### `GEt /turn/alls`

traer todos los turnos por fecha y peluquero especifico

En el body de la request:

```js
{
date: string,
 month:string    ,
year: string,
groomerID:string,

}
```

| Caso  | Status |       Respuesta       |
| :---: | :----: | :-------------------: |
| Exito |  200   |        {Turns}        |
| Fallo |  500   | 'Error getting turns' |

##### `POST /turn/allclient`

traer todos los turnos por cliente especifico

En el body de la request:

```js
{
clientId: string,
}
```

| Caso  | Status |       Respuesta       |
| :---: | :----: | :-------------------: |
| Exito |  200   |        {Turns}        |
| Fallo |  500   | 'Error getting turns' |

##### `POST /turn/alldog`

todos los turnos por perro especifico

En el body de la request:

```js
{
dogId: string,
}
```

| Caso  | Status |       Respuesta       |
| :---: | :----: | :-------------------: |
| Exito |  200   |        {Turns}        |
| Fallo |  500   | 'Error getting turns' |

##### `DELETE /turn/dogId`

borra un turno por id

|   Caso    | Status |          Respuesta          |
| :-------: | :----: | :-------------------------: |
|   Exito   |  200   | 'Turn deleted successfully' |
| Not Found |  404   |      'Turn not found'       |
|   Fallo   |  500   |    'Error deleting turn'    |

#### 4. Acciones de Users

##### Crear un nuevo usuario con rol peluquero hay que tener rol administrador para poder pasar el middleware

##### `POST /user`

```js
{

 name:string,
 email:string,
 password:string,
age:string,
role: [string]
}
```

| Caso  | Status |       Respuesta       |
| :---: | :----: | :-------------------: |
| Exito |  200   |      'New user'       |
| Fallo |  500   | 'Error creating user' |

##### `POST /user/all`

trae todos los usuarios sin filtra por roles

|   Caso    | Status |        Respuesta         |
| :-------: | :----: | :----------------------: |
|   Exito   |  200   |         'Users'          |
| Not Found |  500   | 'Error retrieving users' |

##### `GET /user`

se usa el id guardado en token para obtener la informacion del usuario

|   Caso    | Status |        Respuesta         |
| :-------: | :----: | :----------------------: |
|   Exito   |  200   |         'Users'          |
| Not Found |  404   |     'User not found'     |
|   Fallo   |  500   | 'Error retrieving users' |

##### `PUT /user/id`

no todos los datos son necesarios, de no mandar alguno se conserva sus antiguos valores
el id se obtiene mediante el token (middleware verifyToken)

```js
{

 name:string,
 email:string,
 password:string,
age:string,
}
```

##### `DELETE /user`

borrar un usuario por el id ingresado por body

```js
{

 id:string,
}
```

|   Caso    | Status |              Respuesta              |
| :-------: | :----: | :---------------------------------: |
|   Exito   |  200   |     'User deleted successfully'     |
| Not Found |  404   |          'User not found'           |
|   Fallo   |  403   | 'You can't delete your own account' |
|   Fallo   |  500   |        'Error deleting user'        |

<hr />
