/**
 * JS for the library App.
 */

window.onload = function(){

    const myLibrary = [];

    function Book(title, author, pageCount, read){
        //Constructor
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
        this.readMarkup = "Not read yet!";
        if(this.read){
            this.readMarkup = "Read already!";
        }
    }

    function addBookToLibrary(book){
        myLibrary.push(book);
    }


    firfire = new Book("Firfire", "Buddhisagar", 554, true);
    ular = new Book("Ular", "Nayan Raj Pandey", 80, true);
    sumnima = new Book("Sumnima", "BP Koirala", 205, false);

    addBookToLibrary(firfire);
    addBookToLibrary(ular);
    addBookToLibrary(sumnima);

    console.log(myLibrary);

    let bookCount = 0;
    myLibrary.forEach(book => {
        console.table(book);
        //Add each book to our wrapper as a new div container.
        let eachBookDiv = document.createElement("div");
        eachBookDiv.classList.add("book-wrapper");
        eachBookDiv.setAttribute("id", `book-${bookCount+1}`);
        //Prepare the markup for the book.
        eachBookDiv.innerText = getBookMarkup(book);
        console.log(eachBookDiv);
        //Append this element to our collection container.
        document.getElementById("library-book-collection-wrapper").appendChild(eachBookDiv);
        bookCount++;
    });



    function getBookMarkup(book){
        return (book.title + "\n - Author: " + book.author + "\n - Pages:" + book.pageCount + "\n - Read? " + book.readMarkup);
    }

    document.getElementById("add-book-btn").addEventListener("click", function(){
        openAddBookForm();
        hideAddBookBtn();

    })

    function openAddBookForm(){
        document.getElementById("add-book-form-dialog").setAttribute("open", true);
    }

    function hideAddBookBtn(){
        document.getElementById("add-book-btn").setAttribute('display', false);
    }

}