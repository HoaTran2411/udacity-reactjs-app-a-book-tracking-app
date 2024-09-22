import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import _ from "lodash";
import { getAll, update, search } from "./BooksAPI.js";
import "./App.css";
import { SearchBook } from "./components/SearchBook.js";
import { Home } from "./components/Home.js";

function App() {
  const [listBook, setListbook] = useState([]);
  const [listBookSearch, setListBookSearch] = useState([]); //danh sach book search
  const [queryText, setQueryText] = useState(''); //tu khoa tim kiem
  const [loadingPage, setLoadingPage] = useState(false);

  // Get list books to show in main screen
  useEffect(() => {
    const getListBook = async () => {
      const response = await getAll();
      setListbook(response);
    };
    getListBook();
  }, []);

  // Update shelf of book
  const handleChangeShelf = (event, book) => {
    const changedShelf = event.target.value;
    update(book, changedShelf);
    if (changedShelf === "none") {
      setListbook(listBook.filter((item) => item.id !== book.id));
    } else {
      book.shelf = changedShelf;
      setListbook(
        listBook.filter((item) => item.id !== book.id).concat(book)
      );
    }
  }

  // Search book
  useEffect(() => {
    if (!queryText) {
      setListBookSearch([]);
      return;
    }
    // Call API search by using debounce
    const debouncedSearchBook = _.debounce((searchText) => {
      const getListBookSearch = async () => {
        setLoadingPage(true);
        const response = await search(searchText, 30);
        if (response.error?.length > 0) {
          setListBookSearch([]);
        } else {
          setListBookSearch(response);
        }
      };
      getListBookSearch();
    }, 500);

    debouncedSearchBook(queryText);
    setLoadingPage(true);

    return () => {
      debouncedSearchBook.cancel();
    }
  }, [queryText]);

  // Handle changing text event when input for searching book
  const handleChangeTextSearchBook = (e) => {
    setQueryText(e.target.value);
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element=
          {<Home listBook={listBook} handleChangeShelf={handleChangeShelf} />} />
        <Route path="/search" element=
          {<SearchBook
            listBookSearch={listBookSearch}
            handleChangeShelf={handleChangeShelf}
            queryText={queryText}
            loadingPage={loadingPage}
            handleChangeTextSearchBook={handleChangeTextSearchBook} />}
        />
      </Routes>
    </div>
  );
}

export default App;