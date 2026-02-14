let myLibrary = [];

const container = document.querySelector(".container");
const form = document.querySelector(".add-new-book");
const dialog = document.querySelector("dialog");
const showDialog = document.querySelector(".showDialog");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pageInput = document.querySelector("#number-of-page-input");
const readInput = document.querySelector("#read-input");


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
    myLibrary.forEach(book =>{
    const newDiv = document.createElement("div");
    newDiv.textContent = `${book.title} by ${book.author} - ${book.page} pages`;

    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "Delete";
    buttonDelete.dataset.id = book.bookId;

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

    buttonRead.addEventListener("click", (e) => {
        const bookId = e.target.dataset.id;

        const book = myLibrary.find((book) => book.bookId === bookId);
        book.toggleRead();

        displayBook();  
    })



    container.appendChild(newDiv);
    newDiv.appendChild(buttonDelete);
    newDiv.appendChild(buttonRead);
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
    dialog.close();
    form.reset();
});



