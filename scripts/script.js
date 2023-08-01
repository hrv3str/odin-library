// Global variables

const addButton = document.getElementById('add-button');
const bookContainer = document.getElementById('book-container');
const shelf = [];
const formScreen = document.getElementById('form-screen');
const addForm = document.getElementById('book-form')

class Book {
  // Book constructor
  constructor(title, author, numPages, notRead) {
    this.title = title;
    this.author = author;
    this.numPages = Number(numPages);
    this.notRead = notRead;
  };

  // update button text method
  updateNotReadButtonText() {
    if (this.notRead) {
      this.notReadButton.textContent = 'not read';
    } else {
      this.notReadButton.textContent = 'read';
    }
  };

  // create book card method
  createCard() {
    this.bookCard = document.createElement('div');
    this.bookCard.classList.add('book-card', 'rounded', 'border-shadow');
    
    const paraTitle = document.createElement('p');
    paraTitle.textContent = `"${this.title}"`
    this.bookCard.appendChild(paraTitle);
    
    const paraAuthor = document.createElement('p');
    paraAuthor.textContent = this.author;
    this.bookCard.appendChild(paraAuthor);
    
    const paraPages = document.createElement('p');
    paraPages.textContent = `${this.numPages} pages`;
    this.bookCard.appendChild(paraPages);
    
    this.notReadButton = document.createElement('div')
    this.notReadButton.classList.add('border-shadow', 'rounded','button', 'control');
    this.updateNotReadButtonText();
    this.bookCard.appendChild(this.notReadButton);

    this.deleteButton = document.createElement('div');
    this.deleteButton.classList.add('border-shadow', 'rounded','button', 'control');
    this.deleteButton.textContent = 'remove';
    this.bookCard.appendChild(this.deleteButton);
  
    bookContainer.appendChild(this.bookCard);

    this.notReadButton.addEventListener('click', this.toggleRead.bind(this));
    this.deleteButton.addEventListener('click', this.remove.bind(this));
  }

  // toggle 'not read' state
  toggleRead() {
    switch (this.notRead) {
      case true:
        this.notRead = false;
        break;
      case false:
        this.notRead = true;
        break;
    }
    this.updateNotReadButtonText();
  };

  // get inedx of book
  getIndex() {
    return shelf.indexOf(this);
  };

  // remove book
  remove() {
    this.notReadButton.removeEventListener('click', this.toggleRead.bind(this));
    this.deleteButton.removeEventListener('click', this.remove.bind(this));
    bookContainer.removeChild(this.bookCard);
    shelf.splice(this.getIndex(), 1);
    console.log(`shelf is now ${shelf}`);
  }
}

// Adding the book
function addBook() {
// Getting form visible
    formScreen.classList.remove('no-visible');
//  Promise to handle the form
    function submitForm() {  
      return new Promise(function(resolve, reject) {
        addForm.addEventListener('submit', function(event) {
          event.preventDefault();
//  Processing form input
          let title = addForm.elements.title.value;
          let author = addForm.elements.author.value;
          let numPages = addForm.elements.numPages.value;
          let notRead = addForm.elements.notRead.checked;
  
          if (title.trim() === '' || author.trim() === '') {
            reject('Please fill in all fields.');
            return;
          }
//  Creating new Book object with the form data and placing book card
          let newBook = new Book(title, author, numPages, notRead);
          shelf.push(newBook);
          newBook.createCard();
// Removing and reseting the form
          formScreen.classList.add('no-visible');
          addForm.reset();
          
          setTimeout(function() {
            resolve('Form submitted successfully');
          }, 2000);
        });
      });
    }
  
    return submitForm();
  }
  

// Event listeners
addButton.addEventListener('click', addBook);