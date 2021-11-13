# Bulk Purchase Web Application 

Web application based on MERN stack - MongoDB, Express.js, React.js, and Node.js.

## Introduction

- Frontend in ​ **React.js**
- Backend using ​ **Express.js​** which implements a ​ **REST​** API
- Database in ​ **MongoDB**

The app proposes to solve a major problem that the students of our college face. There are
times when one wants to buy an item, only to find that buying them in bulk would make it much
cheaper as opposed to buying a single unit. The app will have an option for sellers to host their
products along with the minimum bulk dispatch quantity. Various customers can select from
the listed products and order them with their own required quantity. When enough orders are
placed for the product and bulk quantity requirements are met, the vendor can dispatch the
order.

## To Run
Run Mongo daemon:

```less
sudo mongod
```

Mongo will be running on port 27017.

To create a database:

```less
mongo
```

This will open the mongo shell. Type in ```use users``` to create a new database called users.

Run Express:

```less
cd backend/
npm install
npm start
```

Run React:

```less
cd frontend
npm install
npm start
```

Navigate to localhost:3000/ in your browser.
