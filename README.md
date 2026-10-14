# 🐶 Agenda de Gabi´s pets

Aplicación web de agendamiento con clientes con sistema de autenticación, 
usuario protegido y gestión completa de contenido, como: agenda publica y privada, creacion de clientes, etc.

🔗 **[Ver demo en vivo]()**

---

## Funcionalidades

- Landing page, donde muestra informacion basica y agenda publica.
- Panel de administracion.
- Clientes, para crear, actualizar y mantener su informacion.
- Citas, crear citas, actualizar (tienen estados) y trasabilidad en la agenda privada.
- Busqueda de clientes.
- Autenticacion para usuarios seleccionados o de la empresa.
- Diseño responsive (Mobile First).

## Roles

| Rol | Permisos |
|---|---|
| Dueño | Ver todo y manejo de todo |

## Stack tecnológico

- **Frontend:** React + Vite + SCSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Deploy:** Vercel
- **Diseño:** Figma

## Correr localmente

1. Clona el repositorio

2. Instala dependencias
   npm install

3. Crea un archivo .env.local con tus variables de Supabase
   VITE_SUPABASE_URL=tu_url
   VITE_SUPABASE_KEY=tu_anon_key

4. Corre el proyecto
   npm run dev

## Variables de entorno necesarias

| Variable | Descripción |
|---|---|
| VITE_SUPABASE_URL | URL del proyecto en Supabase |
| VITE_SUPABASE_KEY | Anon key de Supabase |