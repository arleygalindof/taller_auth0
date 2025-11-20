# 🧱 Proyecto: Web Client + Spring Boot Backend con Zero Trust (JWT/Auth0)
## 📌 Descripción General

Este proyecto implementa un sistema de mensajer铆a simple compuesto por
un **cliente web** (HTML, CSS, JS) y un **backend en Spring Boot**,
siguiendo principios de **Zero Trust** mediante autenticaci贸n y
autorizaci贸n basada en **JWT** usando Auth0.

El usuario puede: - Enviar mensajes desde un formulario web. - Listar
los 煤ltimos 10 mensajes almacenados en memoria. - Autenticarse v铆a Auth0
antes de acceder al backend.

# 🏗️ Arquitectura del Sistema

------------------------------------------------------------------------

    +-----------------------+         +-----------------------------+
    |    Cliente Web        | ----->  |      Spring Boot API        |
    |  (HTML + JS + CSS)    |         |   (/api/messages secured)   |
    +-----------------------+         +-----------------------------+
                |                                |
                |  fetch() con JWT               |
                |                                |
                v                                |
          Auth0 Universal Login  <---------------+
                (OAuth2 / OIDC)

### Componentes

#### **Frontend**

🔹   HTML básico.
🔹   JavaScript interactuando con Auth0.
🔹   Obtiene un **Access Token** y lo envía en cada request.

#### **Backend (Spring Boot)**

🔹   Endpoint `POST /api/messages` para guardar mensajes.
🔹   Endpoint `GET /api/messages` para devolver los 煤ltimos 10 mensajes.
🔹   Seguridad con:
    🔹   Validación JWT.
    🔹   Configuración de CORS.
    🔹   Filtro de autorización.

🔹 1. Cliente Web (HTML + JS + CSS)

El cliente incluye:

Campo de texto para ingresar mensajes.

Botón “Enviar”.

Llamadas fetch() autenticadas a la API usando JWT.

Renderizado de los 10 mensajes más recientes.

🔹 2. Backend (Spring Boot)

API REST que expone dos endpoints protegidos:

Método	Endpoint	Descripción
POST	/api/messages	Recibe un mensaje y lo almacena en memoria.
GET	/api/messages	Devuelve los últimos 10 mensajes.

Los mensajes se almacenan con la siguiente estructura:

{
  "message": "texto",
  "clientIp": "X.X.X.X",
  "timestamp": "2025-11-19T20:00:00"
}

🔹 3. Seguridad (Zero Trust + JWT/Auth0)

El backend:

Exige JWT válido en cada request.

Valida firma, issuer y audiencia.

No confía en sesiones anteriores.

Rechaza cualquier solicitud sin token válido.

🔐 Implementación de Zero Trust
✔ Never trust, always verify

Creación de la aplicación 

<img width="1331" height="603" alt="image" src="https://github.com/user-attachments/assets/b4a9a547-66c6-497c-af4c-669002952138" />

Configuración

<img width="692" height="149" alt="image" src="https://github.com/user-attachments/assets/32666ba3-fb4d-4001-b763-985941499267" />

<img width="704" height="153" alt="image" src="https://github.com/user-attachments/assets/76bbee02-5d4a-4f63-bc1f-0d8813cd7008" />

<img width="702" height="153" alt="image" src="https://github.com/user-attachments/assets/0e0a3127-b838-4a96-928e-666841b989ca" />

<img width="710" height="155" alt="image" src="https://github.com/user-attachments/assets/8174d15c-50ad-404d-b98f-0cbfe2dd3119" />


Creación del API

<img width="1336" height="726" alt="image" src="https://github.com/user-attachments/assets/70fa4ee6-d5e0-4cbd-b866-f9ba88e3223b" />

Cada solicitud al backend exige un JWT válido.
No existen sesiones persistentes ni confianza implícita.

✔ Autenticación y autorización por request

Además de la creación del usuario en la plataforma AUTH0, se debe crear un usuario para el inicio de sesión (puede usarse el mismo correo)

<img width="1541" height="441" alt="image" src="https://github.com/user-attachments/assets/8f4282aa-f7f7-4de3-872a-5449c6a9522c" />

Se debe autorizar la aplicación para el funcionamiento y evitar el error 401

<img width="692" height="958" alt="image" src="https://github.com/user-attachments/assets/9d9e6bc3-5f99-4f27-9b30-7d7cabd7db6e" />

Validación por CURL

<img width="1454" height="391" alt="image" src="https://github.com/user-attachments/assets/f810441f-e599-4462-8317-486400114d23" />

Incluso si el usuario refresca la página (F5), el cliente debe obtener un token nuevamente.
Esto es el comportamiento esperado bajo Zero Trust.

✔ Superficie mínima de exposición

Solo /api/messages está disponible.

No existe ningún endpoint público del backend.

El cliente está completamente separado del servidor.

✔ Validación estricta

El backend verifica issuer, audience y firma de tokens**    

Si cualquier parte falla → genera error 401 Unauthorized.

### `POST /api/messages`

Guarda un mensaje en memoria.\
Requiere JWT válido.

#### Body JSON:

``` json
{
  "message": "Hola mundo"
}
```

------------------------------------------------------------------------

### `GET /api/messages`

Retorna los últimos 10 mensajes.

#### Respuesta:

``` json
[
  {
    "message": "Hola",
    "clientIp": "127.0.0.1",
    "timestamp": "2025-11-19T20:15:33"
  }
]
```

------------------------------------------------------------------------

## Configuración de Seguridad (Spring Boot)

Incluye:

-   `SecurityConfig.java`
-   Validación de JWT
-   CORS configurado
-   Protección de `/api/**`

------------------------------------------------------------------------

## Ejecución del Proyecto

### 1. Backend

``` bash
mvn spring-boot:run
```

### 2. Frontend

Usar Live Server o similar:

    http://127.0.0.1:5500/client/index.html

------------------------------------------------------------------------

### Aplicación en ejecución

<img width="792" height="644" alt="image" src="https://github.com/user-attachments/assets/a4df97a1-6d88-4a8c-9d9b-71c53a585d38" />


## Referencias

-   https://auth0.com/blog/spring-boot-authorization-tutorial-secure-an-api-java/
-   Documentación Auth0 SPA SDK

------------------------------------------------------------------------

Desarrollado como ejercicio de aplicación de **Zero Trust** y seguridad
API.
