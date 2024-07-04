
const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();




public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
 
  if (username && password) {
   
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer with same username already exists!"});    
    }
}
  return res.status(404).json({message: "Unable to register customer."});


});


// Get the book list available in the shop
public_users.get('/books',function (req, res) {

    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    get_books
    .then(() => console.log("Task 10"))
    .catch((err) => {console.error(err);});
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const get_book_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if(book) {
      resolve(res.send(book));
    }
    reject(res.status(404).json({messgae:"ISBN not found"}));

    get_book_isbn.then(function() {
      console.log("Task 11 resolved");
    }).catch(function() {
      console.log("Task 11 rejected");
    });
 });
 });
 
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const get_books = new Promise((resolve, reject) => {
    let booksbyauthor = [];
      let isbns = Object.keys(books);
      isbns.forEach((isbn) => {
        if(books[isbn]["author"] === req.params.author) {
          booksbyauthor.push({"isbn":isbn,
                              "title":books[isbn]["title"],
                              "reviews":books[isbn]["reviews"]});
      }
      resolve(res.send(JSON.stringify({books}, null, 4)));
        });
  
        get_books
        .then(() => console.log("Task 12"))
        .catch((err) => {console.error(err);});
  
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
  //Write your code here
  let booksbytitle = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["title"] === req.params.title) {
      booksbytitle.push({"isbn":isbn,
                          "author":books[isbn]["author"],
                          "reviews":books[isbn]["reviews"]});
    }
  });
  resolve(res.send(JSON.stringify({books}, null, 4)));
});

      get_books
      .then(() => console.log("Task 13"))
      .catch((err) => {console.error(err);});
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"])
});


module.exports.general = public_users;
