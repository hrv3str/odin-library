// Global variables

const addButton = document.getElementById('add-button');
const shelf = [];

// Book constructor
function Book(title, author, numPages, notRead) {
    this.title = title;
    this.author = author;
    this.numPages = Number(numPages);
    this.notRead = notRead;
}

Book.prototype.getTitle = function() {
    return `"${this.title}"`;
}