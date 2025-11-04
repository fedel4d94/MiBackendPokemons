Node.js no es un framework ni un lenguaje.
Es un entorno de ejecución que permite correr JavaScript del lado del servidor.

➡️ En pocas palabras:
Gracias a Node.js, podés usar JavaScript (que antes solo servía en el navegador) para construir:

APIs y backends
servidores web
procesos en background
automatizaciones, CLI tools, etc.


1. El primer paso para iniciar un proyecto con Node es:
npm init o npm init -y ( es mas rapido.)
2. Instalamos dependencias. npm i body-parser cors express mongodb mongoose
   1. body-parse permite q las solicitudes devuelvan un body en json.
   2. cors conexiones cruzadas, de distintos puertos hacia nuestro servidor.
   3. express nuestro framework facilita crear servidores y endpoints
   4. mongodb es nuestra base
   5. mongoose nuestro odm, es como una capa para comunicarnos facilmente con nuestra base. Un ODM como Mongoose traduce documentos de MongoDB (JSON) en objetos de JavaScript que podés manipular directamente en tu código.
3. Instalar dependencias de desarrollo (esto no pasa cuando el proyecto lo movemos a un productivo.) Son solo para desarrollo
   1. dotenv. sirve para manejar variables de entorno (como contraseñas, claves API, URLs, etc.) de forma segura y separada del código.
   2. nodemon. es un watcher, refresca el proyecto cuando tenes un cambio.
   3. npm-check-updates
4. Todo esto nos crea los package.json q son las recetas de nuestro proyecto.
5. vamos al package.json y ponemos "type": "module" (esto nos permite usar module.js y utilizar import)
6. Crear index.js y configurar (crear el servidor).
7. Incluir scrips en package.json
8. Configurar Middlewares de body-parser
9. Configurar conexion a BD
   1.  Previamente habia q descargar el mongodb comunity edition y el compass
   2.  Hay que configurar estas variables de inicio como para acceder a la base de distintas terminales entiendo.
   3.  Tener armado el db.js con la conexion creada.
10. Crear las variables de entorno en .env y config.js

<<< CODING >>>

1. Creamos modelos. y los necesitamos para configurar rutas, controllers, middlawares
2. Creamos los controladores.
3. Los servicios.
4. npm i express-session jsonwebtoken para la validacion de usuario. npm i bcrypt 

Cuando iniciás un proyecto con Node.js para el backend, lo hacés porque querés construir la parte del servidor de una aplicación, es decir, la que:

Procesa las solicitudes que llegan desde el frontend (por ejemplo, una web o app móvil).

Gestiona datos, lógica de negocio y seguridad.

Se comunica con bases de datos o servicios externos.

Devuelve respuestas (por ejemplo, datos en formato JSON) al cliente.

🚀 ¿Por qué usar Node.js?

Porque permite crear servidores rápidos, escalables y livianos, usando JavaScript

Además, al crear un proyecto con Node (por ejemplo con npm init o frameworks como Express), podés:

Instalar dependencias con npm (gestor de paquetes).

Crear endpoints (rutas) como /api/usuarios, /api/login, etc.

Implementar lógica como autenticación, validaciones o integración con una base de datos.



<<<< EJEMPLOS DE CODIGOS DE ERROR >>>>
1. GET -> 200 OK, 404 Not Found.
2. POST -> 201 Created, 400 bad request, 409 duplicado
3. PUT/PATCH -> 200 ok, 404, 400, 409
4. DELETE -> 200, 404, 
5. 500 -> internal server error, inesperaod.