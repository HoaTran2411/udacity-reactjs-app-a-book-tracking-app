import "../App.css";

export const CategoryBook = ({ listBook, titleListBook, handleChangeShelf }) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{titleListBook}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {listBook?.map(book => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage:
                                                `url(${book?.imageLinks?.thumbnail})`,
                                        }}
                                    >
                                    </div>
                                    <div className="book-shelf-changer">
                                        <select
                                            defaultValue={book.shelf ? book.shelf : "none"}
                                            onChange={(e) => handleChangeShelf(e, book)}>
                                            <option value="nothing" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book?.title}</div>
                                <div className="book-authors">{book?.authors}</div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}