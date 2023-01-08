'use strict';

let bookList = [];

window.addEventListener('load', () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector('.book-list');
  const root = document.getElementById('root');

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 && searchField.value && root.insertAdjacentHTML('beforeend', BookList(bookList));

  var bookListItems = document.getElementsByClassName("book-list__item");
  //Add eventlisteners to the books
  for (var i = 0; i < bookListItems.length; i++) {
    bookListItems[i].addEventListener('mouseover', (e) => {
      // Converts the HTMLCollection to an array so indexOf can be used to find the index of the hovered book
      let index = Array.prototype.indexOf.call(e.target.parentNode.children, e.target);
      let book = getBook(bookList[index].id)
      book.then(function (result){
        renderInfoBox(result, e.target);
      })
    });
    
    bookListItems[i].addEventListener('mouseout', () => {
      let infoElement = document.getElementById("bookInfo")
      infoElement && infoElement.remove();
    });
  }
}

function renderInfoBox(book, node) {

  let infoElement = document.getElementById("bookInfo")
  infoElement && infoElement.remove();

  let html = `<div id="bookInfo" class="book-info absolute border-2 border-black bg-white w-auto p-5 mx-auto"><h1>Book Information</h1>`;
  html+=`<p>Author: ${book.author}</p><p>Pages: ${book.pages}</p><p>Release date: ${book.releaseDate}</p><img class="max-w-3xl" src="${book.coverImage}">`
  html += `</div>`;

  node.insertAdjacentHTML('afterend', html)
}