# This is the frontend part of the Bookshelf application
This was written with the React, combined with Tailwind CSS for styling (with a little bit of DaisyUI), and Typescript for syntax for types.

## How to start the project
In the project directory, run:
```npm install```

then

```npm start```

The app now Runs in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

I've populated the database with some data, just for testing/viewing purposes, with the user login:
```
Username: Bookshelf
Pass: pass
```

### Small guide
When you first access the app, you can either log in with the credentials above, or create your own user. Note that this doesn't really have any validation, as long as your passwords match and the username doesn't already exist.

"Bok-søk" is the overview over all the books from Nasjonalbiblioteket (National Library of Norway), [National Library of Norway](https://api.nb.no/), using endpoint ```https://api.nb.no/catalog/v1/items```. Here you can search for books/authors etc, and choose how many books you want to show per page (you can navigate to next and previous page at the bottom left). Clicking on the rows in this overview will open a modal of the book, with some information about it, as well as a button to add it to your own personal library. The table headers that have a underline are sortable, and if you click the name, it will sort by that column.

"Min bokhylle" is your personal own library, which will be different from user to user. Here you can either favorite the books, or deleting them. You can also click on these rows to open a modal with info. This table also has sort function on the underlined headers.

"Rediger bruker" is where you can edit/change your user information.

A smaller screen will give you a burger menu in the navigation bar instead, with a dropdown for the navigation instead.

### TODO: what I'd like to do:
- Validation for user registration and editing, as well as an error message when you're unable to create/edit it.
- Admin page for removing users etc
- I also wanted to make a page for manually adding a book to your own personal library (as this still wouldn't be possible to see for other users, since it would only be connected to this user, and the overview fetches from Nasjonalbiblioteket), for books you own that aren't in the Nasjonalbiblioteket's database.
- Functionality to set a book as read, along with the read date.
