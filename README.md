# MarcadoresLanding

Landing page con autenticación via Supabase.

## Configuración

1. Clonar el repo e instalar dependencias:

```bash
npm install
```

2. Crear `src/environments/environment.local.ts` con tus credenciales de Supabase:

```ts
export const environment = {
  production: true,
  supabaseUrl: 'https://tu-proyecto.supabase.co',
  supabaseAnonKey: 'tu-anon-key',
};
```

> El archivo `environment.local.ts` está en `.gitignore` para no exponer claves.
> Durante `ng serve` y `ng build --configuration=production` se usa automáticamente en lugar de `environment.ts`.

## Auth Routes

### `/auth/reset-password`

Página para recuperación de contraseña. Al llegar desde el email de Supabase:

1. Lee el token del hash (`#access_token=...&type=recovery`) o query (`?auth_code=...&type=recovery`)
2. Setea la sesión via `supabase.auth.setSession()` o `exchangeCodeForSession()`
3. Muestra formulario para ingresar nueva contraseña
4. Llama a `supabase.auth.updateUser({ password })`

### `/auth/confirm`

Página de confirmación de email. Al llegar desde el email de verificación:

1. Lee el token y confirma la sesión
2. Muestra mensaje de éxito y redirige al home

### Configuración en Supabase

En **Authentication > Settings**:

| Campo | Valor |
|---|---|
| `SITE_URL` | `http://localhost:4200` |
| `Redirect URLs` | `http://localhost:4200/auth/reset-password` |
| | `http://localhost:4200/auth/confirm` |

Al llamar `resetPasswordForEmail()`:

```ts
supabase.auth.resetPasswordForEmail('user@mail.com', {
  redirectTo: 'http://localhost:4200/auth/reset-password'
})
```

## Development server

```bash
ng serve
```

Navegar a `http://localhost:4200/`.

## Build

```bash
ng build --base-href="/marcadores_landing/" --configuration=production
```

Los artefactos quedan en `dist/marcadores_landing/browser/`.

## Deploy a GitHub Pages

```bash
ng build --base-href="/marcadores_landing/" --configuration=production
npx angular-cli-ghpages --dir=dist/marcadores_landing/browser
```

El sitio queda disponible en `https://dilmer23.github.io/marcadores_landing/`.

Asegurate de que en **Settings > Pages** del repo la fuente sea la branch `gh-pages`.
