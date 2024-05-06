## Instalasi Node

```
npm init -y
```

## Preparation

Installation dependencies

```
npm i -S prisma express multer body-parser bcrypt nodemon jsonwebtoken
```

Initialitation Prisma

```
npx prisma init
```

## Script

```json
"scripts": {
    "start": "nodemon src/server.js",
    "migrate": "prisma migrate dev",
    "migrate:reset": "prisma migrate reset"
},
```

## Endpoint

Base Url: `localhost:8000`

- Admin : `/admin/`

| Method | Url         | Description                                      |
| ------ | ----------- | ------------------------------------------------ |
| GET    | /get/getAll | Digunakan untuk mendapatkan semua data admin     |
| GET    | /:id        | Digunakan untuk mendapatkan data admin sesuai id |
| POST   | /           | Digunakan untuk membuat data admin               |
| POST   | /auth       | Digunakan untuk login                            |
| PUT    | /:id        | Digunakan untuk update data admin                |
| DELETE | /:id        | Digunakan untuk menghapus data admin             |

- Food : `/food/`

| Method | Url         | Description                                        |
| ------ | ----------- | -------------------------------------------------- |
| GET    | /get/getAll | Digunakan untuk mendapatkan semua data makanan     |
| GET    | /:id        | Digunakan untuk mendapatkan data makanan sesuai id |
| POST   | /           | Digunakan untuk membuat data makanan               |
| PUT    | /:id        | Digunakan untuk update data makanan                |
| DELETE | /:id        | Digunakan untuk menghapus data makanan             |

- Order : `/order/`

| Method | Url | Description                                  |
| ------ | --- | -------------------------------------------- |
| GET    | /   | Digunakan untuk mendapatkan semua data Order |
| POST   | /   | Digunakan untuk membuat data Order           |
