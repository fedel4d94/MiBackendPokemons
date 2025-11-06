# Pokemon Backend API

Este es un backend API RESTful para gestionar una base de datos de Pokémon. El sistema permite la gestión de usuarios, pokémon y sus tipos, con autenticación mediante JWT.
Crea usuarios, logueate con JWT y administra pokémon y sus tipos. 

Qué podés hacer:
- Registrar usuarios y autenticarte.
- Crear, listar, actualizar y eliminar pokémon.
- Crear, listar, actualizar y eliminar tipos de pokémon.
- Proteger rutas sensibles para que sólo usuarios autorizados puedan modificar datos.

## Estructura de la Base de Datos

### Colección: Pokémon

```javascript
{
  name: String,        // Nombre del pokémon (único, 4-20 caracteres)
  description: String, // Descripción del pokémon [4-200] caracteres
  tipo: String,        // Debe ser uno de los ya cargados - tipoPokemonModel.js
  habilidades: String, // Libre, puede ser cualquier String [4-50] caracteres
  nivel: Number,       // de 1 a 1000
  peso: Number,        // de 1 a 5000
  rarity: String,      // debe ser uno de ["Comun", "Poco comun", "Raro", "Legendario", "Mitico"]
}
```

### Colección: Users

```javascript
{
  name: String,       // Nombre de 2 a 40 caracteres
  lastName: String,   // de 2 a 40 caracteres
  email: String,      // Correo electrónico (único) de 6-40 caracteres
  age: Number,        // 16 a 110
  password: String,   // La password debe contener entre 6 y 12 caracteres, 1 mayuscula, 1 minuscula y al menos 1 numero.
}
```

### Colección: TipoPokemon

```javascript
{
  name: String,       // Nombre del tipo , 4-20 caracteres
  description: String // Descripción del tipo, 4-100 caracteres
}
```

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB (mongoose)
- JWT (jsonwebtoken)
- bcrypt
- cors
- body-parser
- express-session

## Instalación y Ejecución

1. Clona el repositorio:

```bash
git clone <url-del-repositorio>
cd Tu-ruta-local
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MONGODB_URI=<tu-uri-de-mongodb>
JWT_SECRET=<tu-clave-secreta-para-jwt>
PORT=3000

Ejemplo

PORT = 3000
MONGODB_URI = mongodb://localhost/
UTN_DB = [nombre de base]
SECRET = "MiSecreto"
```

4. Inicia el servidor:

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## Endpoints Disponibles

### Usuarios

- POST `/api/user/create` - Crear nuevo usuario
- POST `/api/user/login` - Iniciar sesión
- GET `/api/user/` - Obtener todos los usuarios (requiere token)
- DELETE `/api/user/delete/:id` - Eliminar usuario (requiere token)
- PUT `/api/user/update/:id` - Actualizar usuario (requiere token)

### Pokémon

- POST `/api/pokemon/create` - Crear nuevo pokémon
- GET `/api/pokemon/` - Obtener todos los pokémon
- PUT `/api/pokemon/update/:id` - Actualizar pokémon
- DELETE `/api/pokemon/delete/:id` - Eliminar pokémon

### Tipos de Pokémon

- POST `/api/tipopokemon/create` - Crear nuevo tipo
- GET `/api/tipopokemon/` - Obtener todos los tipos
- PUT `/api/tipopokemon/update/:id` - Actualizar tipo
- DELETE `/api/tipopokemon/delete/:id` - Eliminar tipo

## Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT. Para acceder a estos endpoints:

1. Primero realiza login para obtener el token
2. Incluye el token en el header de las peticiones:
3. Header -> Bearer -> Bearer Token
4. Ingresa tu token obtenido en el login para realizar las proximas peticiones


# Ejemplos de datos MOCK para endpoints POST

## 1. Crear Usuario (POST /api/user/create)
```json
{
  "name": "Ash",
  "lastName": "Ketchum",
  "email": "ash.ketchum@pokemon.com",
  "age": 18,
  "password": "Pikachu.123"
}
```

## 1. Login Usuario (POST /api/user/login)
```json
{
  "email": "ash.ketchum@pokemon.com",
  "password": "Pikachu.123"
}
```

## 2. Crear Pokémon (POST /api/pokemon/create)
```json
{
  "name": "Pikachu",
  "description": "Ratón eléctrico adorable y poderoso",
  "tipo": "Electrico",
  "habilidades": "Impactrueno, Cola férrea",
  "nivel": 25,
  "peso": 6,
  "rarity": "Poco comun"
}
```

## 3. Crear Tipo de Pokémon (POST /api/tipopokemon/create)
```json
{
  "name": "Electrico",
  "description": "Tipo especializado en ataques eléctricos y alta velocidad"
}
```

### Ejemplos adicionales de Pokémon
```json
{
  "name": "Charizard",
  "description": "Dragon de fuego muy poderoso",
  "tipo": "Fuego",
  "habilidades": "Lanzallamas, Vuelo",
  "nivel": 36,
  "peso": 90,
  "rarity": "Raro"
}
```

```json
{
  "name": "Mewtwo",
  "description": "Pokemon legendario creado geneticamente",
  "tipo": "Psiquico",
  "habilidades": "Psíquico, Bola sombra",
  "nivel": 70,
  "peso": 122,
  "rarity": "Legendario"
}
```

### Ejemplos adicionales de Tipos
```json
{
  "name": "Fuego",
  "description": "Tipo especializado en ataques de fuego y poder ofensivo"
}
```

```json
{
  "name": "Agua",
  "description": "Tipo versátil con buenos ataques y defensa"
}
```

### Ejemplos adicionales de Usuarios
```json
{
  "name": "Misty",
  "lastName": "Waterflower",
  "email": "misty.gym@pokemon.com",
  "age": 19,
  "password": "Starmie123"
}
```

```json
{
  "name": "Brock",
  "lastName": "Harrison",
  "email": "brock.gym@pokemon.com",
  "age": 21,
  "password": "Onix123"
}
```

Notas:
- Todos los campos respetan las validaciones definidas en los modelos
- Las contraseñas cumplen con el requisito de mayúscula, minúscula y número
- Los tipos de Pokémon deben crearse antes de crear Pokémon que los usen
- Las rarities solo pueden ser: ["Comun", "Poco comun", "Raro", 3
- "Legendario", "Mitico"]