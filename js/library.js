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

    //addBookToLibrary(firfire);
    //addBookToLibrary(ular);
    //addBookToLibrary(sumnima);

    refreshBooks();

    console.log(myLibrary);

    

    function refreshBooks(){
        if(myLibrary.length === 0){
            console.log("HERE");
            document.getElementById("library-book-collection-wrapper").innerHTML = "<div id = 'no-books-found-wrapper'>No Books found in your collection!</div>";
        }else{
            let bookCount = 0;
            //Reset the book collection wrapper div.
            document.getElementById("library-book-collection-wrapper").innerHTML="";
            myLibrary.forEach(book => {
                //console.table(book);
                //Add each book to our wrapper as a new div container.
                let eachBookDiv = document.createElement("div");
                let eachBookTitleElem = document.createElement("h2");
                eachBookTitleElem.innerHTML = `${getBookTitle(book)} <hr />`;
                eachBookDiv.classList.add("book-wrapper");
                eachBookDiv.setAttribute("id", `book-${bookCount}`);
                //Prepare the markup for the book.
                eachBookDiv.innerHTML = `${getBookMarkup(book)}`;
                eachBookDiv.prepend(eachBookTitleElem);
                //Append this element to our collection container.
                document.getElementById("library-book-collection-wrapper").appendChild(eachBookDiv);
                bookCount++;
            });

        }
        showAddBookBtn();
    }
    


    function getBookTitle(book){
        return book.title;
    }


    function getBookMarkup(book){
        return ("- Author: " + book.author + "<br /> - Pages:" + book.pageCount + "<br /> - " + book.readMarkup);
    }

    document.getElementById("add-book-btn").addEventListener("click", function(){
        openAddBookFormDialog();
        hideAddBookBtn();

    })

    function openAddBookFormDialog(){
        document.getElementById("add-book-form-dialog").setAttribute("open", true);
    }

    function closeAddBookFormDialog(){
        document.getElementById("add-book-form-dialog").close();
    }

    function hideAddBookBtn(){
        document.getElementById("add-book-btn").style.display="none";
    }

    function showAddBookBtn(){
        document.getElementById("add-book-btn").style.display="flex";
    }


    document.getElementById("add-book-form").addEventListener("submit", function(e){

        //See which button was clicked.
        console.log(e.target);
        e.preventDefault();
        //Get the form data from the element.
        let formBookTitle = document.getElementById("form_book_title").value;
        let formBookAuthor = document.getElementById("form_book_author").value;
        let formBookPageCount = document.getElementById("form_page_count").value;
        let formBookRead = document.getElementById("form_read_book").checked;
        
        // Now, create a new book object based on the input data.
        userInputBook = new Book(formBookTitle,formBookAuthor,formBookPageCount, formBookRead);

        // Now, add the book to the array.
        myLibrary.push(userInputBook);

        // Clear the form & Close the form dialog.
        clearAddBookFormFields();
        closeAddBookFormDialog();

        //Refresh the library.
        refreshBooks();

    });

    
    document.getElementById("add_book_form_close_inp_btn").addEventListener("click", function(e){
        document.getElementById("add-book-form-dialog").close();

        //Show the Add Book Button.
        showAddBookBtn();
    });


    function clearAddBookFormFields(){
        document.getElementById("form_book_title").value="";
        document.getElementById("form_book_author").value = "";
        document.getElementById("form_page_count").value = "";
        document.getElementById("form_read_book").checked = false;
    }
    
}