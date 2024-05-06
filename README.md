## Instalasi

```
npm init -y
```

## Preparation

```
npm i -S prisma express multer body-parser bcrypt nodemon jsonwebtoken
```

```
npx prisma init
```

## Script

```
"scripts": {
    "start": "nodemon src/server.js",
    "migrate": "prisma migrate dev",
    "migrate:reset": "prisma migrate reset"
},
```

## Endpoint

Base Url: `localhost:8000`

- Admin : `/admin`

| Method | Url         |
| ------ | ----------- |
| GET    | /getAll     |
| GET    | /find/:id   |
| POST   | /add        |
| PUT    | /update/:id |
| DELETE | /delete/:id |
