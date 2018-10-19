# What the lunch?
> Presented at [codetalks.de](https://codetalks.de) October 2018

![](https://res.cloudinary.com/adonisjs/image/upload/q_100/v1539927873/what-the-lunch.png)

What the lunch is an app expected to the run within the company to share restaurants with your colleagues and help them choose something tasty for the lunch.

The app is built on top of [AdonisJs](https://adonisjs.com/) and for the sake of simplicity we render everything on the server and try to avoid the front-end tools or frameworks completely.


## Stack

1. [AdonisJs](https://adonisjs.com/) ( main framework )
2. [TailwindCSS](https://tailwindcss.com/) ( For css and styling )
3. [Cleave.js](https://nosir.github.io/cleave.js) for formatting inputs.
4. [Zepto.js](https://zeptojs.com/) for selectign DOM elements.


## Setup

1. Clone the repo.
2. Run `npm install`.
3. Run `adonis migration:run` to migrate database.
4. Run `adonis seed` to add dummy data.
