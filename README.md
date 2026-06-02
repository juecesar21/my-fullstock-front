# FullStock Frontend

## Descripción

FullStock es una tienda online para desarrolladores web, construida con **React**, **TypeScript** y **Vite**. El proyecto implementa una arquitectura moderna y modular, con rutas protegidas, contexto global para autenticación, carrito y temas, y una experiencia de usuario responsiva y accesible.

---

## Estructura del Proyecto

```
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── icons/
│   │   └── ui/
│   ├── contexts/
│   ├── lib/
│   ├── models/
│   ├── providers/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── constants.ts
│   ├── main.tsx
│   ├── router.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone <git@github.com:juecesar21/my-fullstock-front.git>
   cd <my-fullstock-front>
   ```

2. **Instala dependencias:**
   ```sh
   npm install
   ```

3. **Ejecuta el proyecto en modo desarrollo:**
   ```sh
   npm run dev
   ```

---

## Scripts principales

- `npm run dev` — Inicia el servidor de desarrollo con Vite.
- `npm run build` — Compila la aplicación para producción.
- `npm run preview` — Sirve la versión de producción localmente.

---

## Servicios

Todas las funciones de la carpeta [`src/services`](src/services) hacen peticiones a una API local que esta configurado en el archivo [`constants.ts`](src/constants.ts) usando fetch:

- **Autenticación:**  
  [`auth.service.ts`](src/services/auth.service.ts) gestiona login, registro y logout usando fetch y cookies.
- **Productos:**  
  [`product.service.ts`](src/services/product.service.ts) obtiene y devuelve productos del backend.
- **Categorías:**  
  [`category.service.ts`](src/services/category.service.ts) obtiene y devuelve categorias del backend.
- **Carrito:**  
  [`cart.service.ts`](src/services/cart.service.ts) obtiene y gestiona el carrito en el backend.
- **Órdenes:**  
  [`order.service.ts`](src/services/order.service.ts) crea órdenes en la backend .
- **User:**  
  [`user.service.ts`](src/services/user.service.ts) actualiza datos del usuario.

---

## Principales funcionalidades

- **Catálogo de productos** por categorías (Polos, Tazas, Stickers).
- **Carrito de compras** persistente.
- **Checkout** con formulario de contacto y resumen de orden.
- **Autenticación** (registro, login, logout).
- **Gestión de temas** (claro/oscuro/sistema).
- **Rutas protegidas y manejo de errores 404.**
- **Componentes reutilizables** (botones, inputs, contenedores, separadores, etc).

---

## Contextos globales

- [`auth.context.ts`](src/contexts/auth.context.ts) — Estado y acciones de autenticación.
- [`cart.context.ts`](src/contexts/cart.context.ts) — Estado y acciones del carrito.
- [`theme.context.ts`](src/contexts/theme.context.ts) — Estado y acciones del tema visual.

---

## Estilos

- Utiliza **CSS Modules** y una arquitectura escalable de carpetas para estilos globales y utilidades.
- CSS Custom Properties para colores, tipografía, espaciado y bordes.

---

## Linting y calidad de código

- Configuración recomendada de ESLint en [`eslint.config.js`](eslint.config.js).
- Soporte para reglas de React y TypeScript, incluyendo type-checking.

---

## Créditos y licencia

Este proyecto es un template educativo para Codeable.  
Licencia: MIT.

---

## Contacto y soporte

Para dudas o soporte, abre un issue en el repositorio o contacta al equipo de Codeable.
