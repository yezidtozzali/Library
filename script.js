let myLibrary = [];

const container = document.querySelector(".container");
const form = document.querySelector(".add-new-book");
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector(".show-dialog");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pageInput = document.querySelector("#number-of-page-input");
const readInput = document.querySelector("#read-input");
const closeButton = document.querySelector(".close-button");


function Book(title, author, page, read){
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.bookId = crypto.randomUUID();

};

Book.prototype.toggleRead = function(){
    if(this.read){
        this.read = false;
    } else {
        this.read = true;
    }
};
 

function addBookToLibrary(title, author, page, read){
    const newBook = new Book(title, author, page, read);

    myLibrary.push(newBook);

};



function displayBook(){
    container.innerHTML = "";

    if(myLibrary.length === 0){
        const noBook = document.createElement("p");
        noBook.textContent = "add some books to your library"
        noBook.classList.add("no-book");
        container.appendChild(noBook);
    }

    

    myLibrary.forEach(book =>{
    const newDiv = document.createElement("div");
    newDiv.classList.add("book-card");

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-display");

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    const titleH4 = document.createElement("h4");
    titleH4.classList.add("title-info");
    titleH4.textContent = book.title;

    const authorInfo = document.createElement("p");
    authorInfo.classList.add("author-info");
    authorInfo.textContent = book.author;

    const pageInfo = document.createElement("p");
    pageInfo.classList.add("page-info");
    pageInfo.textContent = `${book.page} pages`;


    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("delete-button");
    buttonDelete.textContent = "Delete";
    buttonDelete.dataset.id = book.bookId;

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    buttonDelete.addEventListener("click", (e) =>{
        const bookId = e.target.dataset.id;

        const result = myLibrary.filter(book => {
            return book.bookId !== bookId
        });
        myLibrary = result;

        displayBook();
    })

    const buttonRead = document.createElement("button");
    buttonRead.textContent = book.read ? "Read" : "Not Read";
    buttonRead.dataset.id = book.bookId;
    buttonRead.classList.add("status-button");
    buttonRead.classList.add(book.read ? "read" : "not-read")

    buttonRead.addEventListener("click", (e) => {
        const bookId = e.target.dataset.id;

        const book = myLibrary.find((book) => book.bookId === bookId);
        book.toggleRead();

        displayBook();  
    })



    container.appendChild(newDiv);
    newDiv.appendChild(bookCard);
    bookCard.appendChild(bookInfo);
    bookInfo.appendChild(titleH4);
    bookInfo.appendChild(authorInfo);
    bookInfo.appendChild(pageInfo);
    newDiv.appendChild(buttons);
    buttons.appendChild(buttonDelete);
    buttons.appendChild(buttonRead);
    });

    
};




showDialog.addEventListener("click", () =>{
    dialog.showModal();
});

form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const page = pageInput.value;
    const read = readInput.checked;

    addBookToLibrary(title, author, page, read);
    displayBook();
    container.lastChild.classList.add("new-book");
    dialog.close();
    form.reset();
});

closeButton.addEventListener("click", () =>{
    dialog.close();
    form.reset();
});


displayBook();