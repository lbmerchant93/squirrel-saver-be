# Squirrel Save - BE
#### * ~ The app designed to help squirrel away money in order to help build your savings. ~ *
This project is designed as a prototype for a savings plan application. The project is used by the developer to demonstrate and expand on his knowledge/use of TypeScript, GraphQL, Express, Prisma, and Firebase. 

### Contributors
- Lucas Merchant - Software Developer: [github profile](https://github.com/lbmerchant93)

### Stack

**Build**: TypeScript, GraphQL, Express, Prisma, Firebase, Apollo-Server-Express, 

**Deployment**: Render

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)

## Introduction
This app was created based off the following savings plan steps:
1. Set a savings range, currently set to a savings range of $1 to $100. (Capability to manipulate this is a future iteration.)
2. Each day that you work, draw a random number from the savings range. This number is the amount of money you will set aside into your savings. This number is then removed from the drawing possibilities until the savings range is completed.
3. Repeat drawing until you have drawn all numbers.
4. Once you have drawn all numbers in the savings range, the summation of the savings range will be the total you have contributed to your savings e.g. with a savings range of $1 to $100, the summation will total $5050!

The app is not connected to your bank account so it is currently up to the user to actually set aside or transfer any money into their savings.

---

## Features

### Prisma:
A TypeScript ORM used to help app read and write data to the database in an intuitive and safe way. Generates resolvers used for querying data. Can create additional resolvers that manipulate the generated CRUD resolvers. 

### PostgreSQL:
An object relational database system.

### GraphQL:
Language used for querying data.

### Firebase:
Firebase Admin SDK used for authenitication and authorization. Checks the token received from the front end to make sure the user is logged in and only able to manipulate their data. 

### Apollo-Server-Express:
A production-ready, self-documenting GraphQL API that can use data from any source.

[Back to Top of Page](#table-of-contents)
