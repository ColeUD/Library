const myLibrary = [];

// Constructor
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead === "true"; // Convert string to boolean
}

// Add a method to the Book prototype to toggle the read status
Book.prototype.toggleReadStatus = function () {
    this.hasRead = !this.hasRead; // Flip the boolean value
};

// Save library to localStorage
function saveLibrary() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// Load library from localStorage
function loadLibrary() {
    const storedLibrary = localStorage.getItem("myLibrary");
    if (storedLibrary) {
        const parsedLibrary = JSON.parse(storedLibrary);
        parsedLibrary.forEach(book => {
            myLibrary.push(new Book(book.title, book.author, book.pages, book.hasRead));
        });
    }
}

// Function to add a book to the library
function addBookToLibrary(title, author, pages, hasRead) {
    const newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    saveLibrary(); // Save to localStorage
    displayBooks(); // Refresh the display
}

// Function to display all books on the page
function displayBooks() {
    const bookDisplay = document.getElementById("book-display");
    bookDisplay.innerHTML = ""; // Clear existing content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.hasRead ? "Read" : "Not read yet"}</p>
            <button onclick="toggleBookReadStatus(${index})">Toggle Read Status</button>
            <button onclick="removeBook(${index})">Remove</button>
        `;
        bookDisplay.appendChild(bookCard);
    });
}

// Function to toggle the read status of a book
function toggleBookReadStatus(index) {
    myLibrary[index].toggleReadStatus(); // Toggle the read status
    saveLibrary(); // Save the updated library to localStorage
    displayBooks(); // Refresh the display
}

// Function to remove a book by index
function removeBook(index) {
    myLibrary.splice(index, 1); // Remove the book from the array
    saveLibrary(); // Save the updated library
    displayBooks(); // Refresh the display
}

// Show the form
const newBookBtn = document.getElementById("new-book-btn");
const formContainer = document.getElementById("form-container");
const newBookForm = document.getElementById("new-book-form");
const cancelBtn = document.getElementById("cancel-btn");

newBookBtn.addEventListener("click", () => {
    formContainer.classList.remove("hidden"); // Show the form
});

// Hide the form
cancelBtn.addEventListener("click", () => {
    formContainer.classList.add("hidden"); // Hide the form
});

// Handle form submission
newBookForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const hasRead = document.getElementById("hasRead").value;

    // Add the new book to the library
    addBookToLibrary(title, author, pages, hasRead);

    // Reset and hide the form
    newBookForm.reset();
    formContainer.classList.add("hidden");
});

// Load the library from localStorage when the page loads
loadLibrary();
displayBooks();
