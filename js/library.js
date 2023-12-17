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
        this.readMarkup = getBookReadMarkup(this);
    }

    function addBookToLibrary(book){
        myLibrary.push(book);
    }

    refreshBooks();
    

    function refreshBooks(){
        if(myLibrary.length === 0){
            document.getElementById("library-book-collection-wrapper").innerHTML = "<div id = 'no-books-found-wrapper'>No Books found in your collection!</div>";
        }else{
            let bookCount = 0;
            //Reset the book collection wrapper div.
            document.getElementById("library-book-collection-wrapper").innerHTML="";
            myLibrary.forEach(book => {
                //Add each book to our wrapper as a new div container.
                let eachBookDiv = document.createElement("div");
                let eachBookTitleElem = document.createElement("h2");
                eachBookTitleElem.innerHTML = `${getBookTitle(book)} <hr />`;
                eachBookDiv.classList.add("book-wrapper");
                //See if this book is marked as read.
                if(book.read){
                    eachBookDiv.classList.add("read-book");
                }else{
                    eachBookDiv.classList.add("not-read-book");
                }
                eachBookDiv.setAttribute("id", `book-${bookCount}`);
                //Prepare the markup for the book.
                eachBookDiv.innerHTML = `${getBookMarkup(book)}<br />`;
                eachBookDiv.prepend(eachBookTitleElem);

                // Also, create a button to delete this entry.
                let deleteBookBtnElem = document.createElement("input");
                deleteBookBtnElem.setAttribute("type", "button");
                deleteBookBtnElem.setAttribute("value", "Delete this book!");
                deleteBookBtnElem.classList.add("delete-book-btn");
                deleteBookBtnElem.setAttribute("data-id", `${bookCount}`);
                //Append the delete book button to the eachBookDiv markup.
                eachBookDiv.appendChild(deleteBookBtnElem);

                //Also, create a button to mark the book as read/unread.
                let markReadUnreadBtnElem = document.createElement("input");
                markReadUnreadBtnElem.setAttribute("type", "button");
                if(book.read){
                    markReadUnreadBtnElem.setAttribute("value", "Mark book as Not Read");
                }else{
                    markReadUnreadBtnElem.setAttribute("value", "Mark book as Read");
                }
                markReadUnreadBtnElem.classList.add("mark-read-unread-btn");
                markReadUnreadBtnElem.setAttribute("data-id", `${bookCount}`);
                //Append the mark as read/unread button to the eachBookDiv Markup.
                eachBookDiv.appendChild(markReadUnreadBtnElem);

                //Append this element to our collection container.
                document.getElementById("library-book-collection-wrapper").appendChild(eachBookDiv);
                bookCount++;
            });

        }
        showAddBookBtn();
        addDeleteBookEventListener();
        markReadUnreadEventListener();
    }
    
    function addDeleteBookEventListener(){
        let allBookDeleteBtns = document.getElementsByClassName("delete-book-btn");
        for(let i = 0; i<allBookDeleteBtns.length; i++){
            allBookDeleteBtns[i].addEventListener("click", function(e){
                //Get the data-id of the button clicked.
                // The data-id is the index of our array which we need to remove.
                toRemoveBookIndex = e.target.getAttribute("data-id");
                removeBookFromLibrary(toRemoveBookIndex);
                refreshBooks();
            });
        }
    }

    function markReadUnreadEventListener(){
        let allBookMarkReadUnreadBtns = document.getElementsByClassName("mark-read-unread-btn");
        for(let j = 0; j<allBookMarkReadUnreadBtns.length; j++){
            allBookMarkReadUnreadBtns[j].addEventListener("click", function(e){
                // Get the index of the book we are trying to mark.
                toUpdateBookIndex = e.target.getAttribute("data-id");
                //Get the book object from our array.
                toUpdateBook = myLibrary[toUpdateBookIndex];
                toggleBookReadStatus(toUpdateBook);
                toUpdateBook.readMarkup = getBookReadMarkup(toUpdateBook);
                refreshBooks();
            });
        }
    }

    function getBookReadMarkup(book){
        if(book.read){
            return "Read already!";
        }else{
            return "Not read yet!";
        }
    }

    function toggleBookReadStatus(book){
        if(book.read){
            book.read = false;
        }else{
            book.read = true;
        }
    }

    function removeBookFromLibrary(toRemoveIndex){
        myLibrary.splice(toRemoveIndex, 1);
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