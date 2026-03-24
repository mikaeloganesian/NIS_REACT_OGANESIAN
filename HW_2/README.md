# Отчёт

## Архитектура и TypeScript (5 баллов)

### Полная типизация
- Все компоненты и функции полностью типизированы
- Использованы типы: `Pet`, `PetState`, `PetMood`, `PetSpecies`
- Интерфейсы для пропсов и контекста определены
- Нет использования `any`
- Нет `@ts-ignore` или `@ts-nocheck`

### Корректная структура директорий
```
src/
 ├─ components/
 │   ├─ PetCard/
 │   │    ├─ PetCard.tsx
 │   │    ├─ PetCard.module.scss
 │   │    └─ types.ts
 │   ├─ PetActions/
 │   │    └─ ActionButton.styled.ts
 │   └─ EventLog/
 │        └─ EventLog.tsx
 │
 ├─ context/
 │    └─ EventContext.tsx
 │
 ├─ hooks/
 │    ├─ usePetLifecycle.ts
 │    └─ useEventLog.ts
 │
 ├─ data/
 │    └─ pets.json
 │
 ├─ pages/
 │    └─ Dashboard.tsx
 │
 ├─ styles/
 │    └─ global.scss
 │
 ├─ types/
 │    └─ Pet.ts
 │
 ├─ App.tsx
 └─ main.tsx
```

---

## Хуки React

### useState + useEffect, useRef для DOM-эффектов (5 баллов)

**useState:**
- `Dashboard.tsx`: `useState` для `pets`, `loading`, `selectedSpecies`, `eventLogOpen`
- `EventContext.tsx`: `useState` для `events`

**useEffect:**
- `Dashboard.tsx`: загрузка данных с задержкой
- `PetCard.tsx`: обновление настроения при изменении энергии
- `PetCard.tsx`: эффект для аватара через `useRef`
- `usePetLifecycle.ts`: таймер энергии

**useRef:**
- `PetCard.tsx:67`: `avatarRef` для DOM-эффекта (динамическая тень аватара)
- `usePetLifecycle.ts:14`: `energyRef` для отслеживания актуального значения энергии

---

### useReducer в карточке (10 баллов)

**Реализация:**
- `PetCard.tsx:20-63`: `petReducer` с обработкой действий
- `PetCard.tsx:76`: использование `useReducer` для управления состоянием
- Обработка действий: `FEED`, `LEVEL_UP`, `CHEER`, `RESET`, `SET_ENERGY`, `SET_MOOD`

---

### Оптимизация через useMemo + useCallback и React.memo (5 баллов)

**useMemo:**
- `Dashboard.tsx:37-42`: мемоизация `filteredPets`
- `Dashboard.tsx:44-47`: мемоизация `uniqueSpecies`

**useCallback:**
- `PetCard.tsx:78-96`: все обработчики действий обёрнуты в `useCallback`
- `PetCard.tsx:98-104`: `setEnergy` и `setMood` обёрнуты в `useCallback`
- `Dashboard.tsx:49-55`: обработчики событий обёрнуты в `useCallback`
- `EventContext.tsx:15-22`: `addEvent` и `clearEvents` обёрнуты в `useCallback`

**React.memo:**
- `PetCard.tsx:215`: компонент обёрнут в `React.memo`

---

### 2 кастомных хука (10 баллов)

**1. usePetLifecycle:**
- Файл: `src/hooks/usePetLifecycle.ts`
- Уменьшает энергию каждые N секунд
- Использует `useRef` для актуального значения
- Параметры: `energy`, `setEnergy`, `intervalSeconds`

**2. useEventLog:**
- Файл: `src/hooks/useEventLog.ts`
- Экспортирует хук из `EventContext`
- Предоставляет доступ к событиям и методам

---

## Функциональность

### Загрузка, отображение, фильтрация (5 баллов)

**Загрузка данных:**
- `Dashboard.tsx:23-35`: загрузка из `pets.json` с задержкой 1.5 сек
- Используется `useEffect` и `async/await`

**Skeleton Loader:**
- `Dashboard.tsx:99-107`: отображение скелетона во время загрузки
- Используется Material UI `Skeleton`

**Отображение в сетке:**
- `Dashboard.tsx:98`: компонент в `Box` с классом `dashboard-grid`
- `global.scss`: CSS Grid с `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`

**Фильтрация:**
- `Dashboard.tsx:76-95`: Material UI `Select` для фильтрации по видам
- `Dashboard.tsx:37-42`: мемоизированная фильтрация через `useMemo`

---

### Таймер энергии (5 баллов)

**Реализация:**
- `usePetLifecycle.ts`: кастомный хук для таймера
- Уменьшение энергии каждые 5 секунд на 5 единиц
- Использует `setInterval` с очисткой
- Обновление настроения при изменении энергии
- При `energy = 0` → настроение `inactive`
- При `energy <= 20` → настроение `sad`

---

### Лог событий -> useContext + EventContext (10 баллов)

**EventContext:**
- `src/context/EventContext.tsx`: создание контекста
- `EventProvider` оборачивает приложение
- Методы: `addEvent`, `clearEvents`
- Состояние: массив строк `events`

**useEventLog:**
- Кастомный хук для работы с контекстом
- Экспортирован из `src/hooks/useEventLog.ts`
- Используется в `PetCard` и `EventLog`

**EventLog компонент:**
- `src/components/EventLog/EventLog.tsx`
- Material UI `Drawer` для боковой панели
- Отображение событий с временными метками
- Кнопка очистки событий

---

### Рабочие действия питомца (5 баллов)

**Feed:**
- `PetCard.tsx:78-81`: увеличивает энергию на 20
- Добавляет событие в лог
- Максимум энергии: 100

**Level Up:**
- `PetCard.tsx:83-86`: увеличивает уровень на 1
- Добавляет событие в лог

**Cheer:**
- `PetCard.tsx:88-91`: улучшает настроение (inactive→sad→neutral→content→happy)
- Добавляет событие в лог

**Reset:**
- `PetCard.tsx:93-96`: сбрасывает к исходному состоянию
- Восстанавливает `originalEnergy`, `originalMood`, `originalLevel`
- Добавляет событие в лог

Все действия создают записи в логе событий.

---

## Стилизация

### SCSS + module.scss (5 баллов)

**SCSS (глобальный):**
- Файл: `src/styles/global.scss`
- Используется для базовой сетки приложения
- Стили для `.dashboard-container`, `.dashboard-grid`, `.dashboard-header`

**Module SCSS:**
- Файл: `src/components/PetCard/PetCard.module.scss`
- Импортирован в `PetCard.tsx:6`
- Используется через `styles.card`, `styles.avatar`, `styles.info` и т.д.

---

### Inline styles (5 баллов)

**Реализация:**
- `PetCard.tsx:143-150`: динамический `borderColor` в зависимости от настроения
- `PetCard.tsx:157-159`: динамическая `opacity` для аватара
- `PetCard.tsx:137`: динамическая тень через `useRef` (inline style)

---

### styled-components (5 баллов)

**Реализация:**
- Файл: `src/components/PetActions/ActionButton.styled.ts`
- Использует `@emotion/styled` (совместимо со styled-components)
- Компонент `ActionButton` с вариантами: `feed`, `levelup`, `cheer`, `reset`
- Динамические стили на основе пропсов
- Используется в `PetCard.tsx:182-209`

---

### Material UI (5 баллов)

**Компоненты Material UI:**
- `Dashboard.tsx`: `Box`, `Select`, `MenuItem`, `FormControl`, `InputLabel`, `Skeleton`, `Button`
- `EventLog.tsx`: `Drawer`, `Box`, `Typography`, `IconButton`, `List`, `ListItem`, `ListItemText`, `Divider`, `Button`
- Иконки: `MenuIcon`, `CloseIcon`, `DeleteIcon`

**Использование:**
- Панель событий: `Drawer`
- Фильтрация: `Select` с `MenuItem`
- Skeleton Loader: `Skeleton`
- Кнопки: `Button` с иконками

---

## Итого

| Категория | Требование | Баллы |
|-----------|------------|-------|
| **Архитектура и TS** | Полная типизация, корректная структура директорий | 5 |
| **Хуки React** | useState + useEffect, useRef для DOM-эффектов | 5 |
| | useReducer в карточке | 10 |
| | Оптимизация через useMemo + useCallback и React.memo | 5 |
| | 2 кастомных хука | 10 |
| **Функциональность** | Загрузка, отображение, фильтрация | 5 |
| | Таймер энергии | 5 |
| | Лог событий -> useContext + EventContext | 10 |
| | Рабочие действия питомца | 5 |
| **Стилизация** | SCSS + module.scss | 5 |
| | Inline styles | 5 |
| | styled-components | 5 |
| | Material UI | 5 |
| **Итого:** | | 80 |