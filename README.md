# Estilo Canino API

<div style="text-align: justify">

<hr/>

## Introducción

**Estilo Canino** es una APP de peluquería canina donde podes registrar a tus perros y solicitar un turno con un peluquero. En este repositorio se encuentra la API REST con la cual el frontend obtiene toda la información de usuarios, sus respectivos perros y turnos conectada a mongoDB.

## Modelo de clases

Las clases que maneja estilo canino para administrar sus usuarios son las siguientes:

#### 1. User

Es la persona que utiliza la aplicación, capaz crear perros , editarlos y borrarlos, iniciar sesión y evidentemente, registrarse.

**Atributos**

|  Nombre  |  Tipo  |
| :------: | :----: | --------------- |
|   \_id   | string |
|   name   | string |
|  email   | string |
| password | string |
|   age    | string |
|   role   |  ref   | ref modelo Role |

#### 2. Dog

**Atributos**

| Nombre |  Tipo  |
| :----: | :----: | --------------- |
|  \_id  | string |
|  name  | string |
|  age   | string |
| breed  | string |
| owner  |  -id   | ref modelo User |

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


|   Caso    | Status |             Respuesta              |
| :-------: | :----: | :--------------------------------: |
|   Exito   |  200   |              { user }              |
| Not Found |  404   |    { message: 'no user found' }    |
|   Fallo   |  401   | { message: 'incorrect password' }  |
|   Fallo   |  500   | { message: 'Server Error' } |


##### Crear un usuario

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


#####  `GET /dog`


<hr />
```
