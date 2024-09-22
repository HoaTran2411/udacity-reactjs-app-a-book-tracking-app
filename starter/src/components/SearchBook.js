import { Link } from "react-router-dom";
import "../App.css";
import { CategoryBook } from "./CategoryBook.js";

export const SearchBook = ({ handleChangeShelf, listBookSearch, queryText, handleChangeTextSearchBook, loadingPage }) => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={queryText}
                        onChange={(e) => handleChangeTextSearchBook(e)}
                    />
                </div>
            </div>
            {loadingPage && <p>Loading...</p>}
            <div className="search-books-results">
                <ol className="books-grid">
                    <CategoryBook
                        listBook={listBookSearch}
                        titleListBook="Searching result"
                        handleChangeShelf={handleChangeShelf} />
                </ol>
                {listBookSearch.length < 1 && <p className="result-search">No search results found!</p>  }
            </div>
        </div>
    )
}