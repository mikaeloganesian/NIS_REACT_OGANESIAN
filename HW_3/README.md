# HW_3 — Admin

SPA административной панели на **React + TypeScript**, **Redux Toolkit**, **RTK Query**, **React Router**, **i18next** (ru / en). Backend: [DummyJSON](https://dummyjson.com/docs).

## Запуск

```bash
cd HW_3
npm install
npm run dev
```

Сборка и превью:

```bash
npm run build
npm run preview
```

## Демо-вход

Используйте любого пользователя с [dummyjson.com/users](https://dummyjson.com/users), например:

- **username:** `emilys`  
- **password:** `emilyspass`

## Архитектура (Feature-Sliced Design)

Слои (импорты только «вниз»: `app` → `pages` → `widgets` → `features` → `entities` → `shared`):

| Слой | Назначение |
|------|------------|
| **app** | Провайдеры (Redux, Persist, i18n, роутер), `ErrorBoundary`, синхронизация настроек с DOM/i18n, bootstrap сессии |
| **pages** | Композиция экранов (lazy-loaded) |
| **widgets** | Крупные блоки UI: `MainLayout`, `ProductsCatalog` (каталог = поиск + сетка + пагинация) |
| **features** | Слайсы `auth`, `settings`; форма логина; `products-catalog` (хук `useProductsCatalog`, панель поиска, сетка, пагинация) |
| **entities** | Типы домена (`User`, `Product`), UI-карточка товара `ProductCard` |
| **shared** | UI-кит, RTK Query API (`dummyJsonApi`), i18n JSON, утилиты, хуки `useAppDispatch` / `useAppSelector` |

### Данные и API

- **RTK Query** (`shared/api/dummy-json-api.ts`): `POST /auth/login`, `GET /auth/me`, `GET /products`, `GET /products/search`, `GET /products/:id`. Заголовок `Authorization: Bearer` берётся из Redux.
- **Redux**: слайс `auth` (токены и пользователь), слайс `settings` (язык, тема, размер страницы каталога). **redux-persist** для `auth` и `settings` в `localStorage`.
- После перезагрузки при наличии токена вызывается `GET /auth/me` для восстановления сессии.

### Маршруты

- Публичные: `/login`, `/register` (заглушка).
- Приватные (layout с сайдбаром): `/`, `/products`, `/products/:id`, `/profile`, `/settings`, `/logout`, а также `*` → 404 внутри приложения для неизвестных путей под layout.

### Скриншоты для сдачи

Добавьте ключевые сценарии (логин, каталог, карточка товара, настройки, тёмная тема) в каталог `docs/screenshots/` и при необходимости обновите список ниже.

- `docs/screenshots/` — разместите PNG/JPEG вручную перед сдачей.

## Скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Режим разработки (Vite) |
| `npm run build` | `tsc` + production-сборка |
| `npm run preview` | Превью production-сборки |
| `npm run lint` | ESLint |
