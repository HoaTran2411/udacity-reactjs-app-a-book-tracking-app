import { Link } from "react-router-dom";
import "../App.css";
import { CategoryBook } from "./CategoryBook.js";

export const Home = ({ listBook, handleChangeShelf }) => {

  const currentlyReadingBooks = listBook.filter(book => book.shelf === "currentlyReading");
  const wantToReadBooks = listBook.filter(book => book.shelf === "wantToRead");
  const readBooks = listBook.filter(book => book.shelf === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <CategoryBook
            listBook={currentlyReadingBooks}
            titleListBook="Currently Reading"
            handleChangeShelf={handleChangeShelf} />
          <CategoryBook
            listBook={wantToReadBooks}
            titleListBook="Want to Read"
            handleChangeShelf={handleChangeShelf} />
          <CategoryBook
            listBook={readBooks}
            titleListBook="Read"
            handleChangeShelf={handleChangeShelf} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}