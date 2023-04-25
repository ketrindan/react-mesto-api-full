# Место (фронтенд + бэкенд)
## ***Проектная работа курса [Яндекс.Практикум](https://practicum.yandex.ru/)***

### **Описание**
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположен в директории `backend/`, а фронтенд - в `frontend/`. 

Это один из этапов работы над проектом Mesto:

1. [Mesto](https://github.com/ketrindan/mesto)
2. [Mesto (проект на React)](https://github.com/ketrindan/mesto-react)
3. [Mesto (проект на React с авторизацией и регистрацией)](https://github.com/ketrindan/react-mesto-auth) 
4. [Mesto (бэкенд)](https://github.com/ketrindan/express-mesto-gha)
5. Mesto (объединенный проект на React с фронтендом и бэкендом) - *текущий репозиторий*

### **Функционал**
* Регистрация и авторизация пользователя
* Добавление карточек с фото
* Удаление своих карточек
* Подтверждение удаления карточки (попап)
* Добавление и удаление лайков
* Просмотр фото в полном размере
* Редактирование профиля и аватара
* Валидация форм

### **Технологии**
* HTML, CSS
* Flex-box верстка
* Адаптивная верстка
* Организация по БЭМ
* JavaScript (ООП, промисы и HTTP-запросы, Fetch API)
* React (CRA, JSX, функциональные компоненты и хуки)
* JWT, Local Storage
* Минификация и транспиляция JS Babel
* Webpack
* сервер на Ubuntu в Яндекс.Облаке
* ssh-ключи для доступа к серверу
* Node.js, express.js
* MongoDB, Mongoose
* Менеджер процессов на сервере pm2
* Раздача фронтенда через nginx
* Файрвол ufw
* SSL-сертификаты от Letsencrypt

[Макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0-1)

  
### **Демо**
Frontend  https://mesto.ketrindan.nomoredomainsclub.ru \
Backend  https://api.mesto.ketrindan.nomoredomainsclub.ru

### **Инструкция по установке и сборке**
1. Клонировать репозиторий
```
git clone git@github.com:ketrindan/react-mesto-api-full.git
```
2. Установить пакеты

для фронтенда
```
cd react-mesto-api-full
cd frontend
npm install
```
для бэкенда
```
cd react-mesto-api-full
cd backend
npm install
```

3. Запустите части приложения на разных портах (измените значение `baseUrl` в `frontend/src/utils/utils.js` на адрес локального порта, на котором запущен бэкенд - http://localhost:3000.
При необходимости добавляйте нужные адреса вида 'http://localhost:PORT' (где PORT - порт, на котором запущен фронтенд) в список `allowedCors` в `backend/app.js`.

# Фронтенд

`npm start` - запуск проекта в режиме разработки

Чтобы открыть проект в браузере, перейдите на [http://localhost:3000](http://localhost:3000).

При сохранении изменений страница автоматически перезагружается.


`npm run build` - запуск сборки проекта, проект будет собран в папку `build`

`npm run deploy` - деплой проекта на Github Pages

# Бэкенд
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

### **Планы по доработке**
* доработать структуру переменных окружения
