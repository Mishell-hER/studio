# Guía de Despliegue para LogisticX

Este es un proyecto Next.js que utiliza el App Router. Debido a sus características modernas (Server Components, Server Actions, etc.), **no es compatible con la exportación estática (`next export`) que requiere GitHub Pages** para funcionar correctamente.

## Opción Recomendada: Vercel

La forma más sencilla y recomendada de desplegar esta aplicación es utilizando **Vercel**, la plataforma creada por los desarrolladores de Next.js.

### Pasos para el Despliegue en Vercel:

1.  **Regístrate en Vercel**:
    -   Ve a [vercel.com](https://vercel.com) y crea una cuenta. Es gratis y puedes registrarte usando tu cuenta de GitHub.

2.  **Importa tu Repositorio**:
    -   Desde tu panel de Vercel, haz clic en "**Add New...**" > "**Project**".
    -   Busca e importa tu repositorio de GitHub donde se encuentra este proyecto.

3.  **Configura y Despliega**:
    -   Vercel detectará automáticamente que es un proyecto Next.js y pre-configurará los ajustes de compilación por ti. No necesitas cambiar nada.
    -   Haz clic en el botón "**Deploy**".

¡Y eso es todo! Vercel compilará tu aplicación y la desplegará en una URL pública. Cada vez que hagas un `git push` a tu rama principal, Vercel redesplegará los cambios automáticamente.
