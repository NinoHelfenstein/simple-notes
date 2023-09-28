import { useState } from "react";
function Header({ onSearch, newNoteHandler }) {
  const [search, setSearch] = useState("");
  function handleSearch(e) {
    setSearch(e.target.value);
    e.preventDefault();
    onSearch(e);
  }
  return (
    <div className="header">
      <div className="userlogo">
        <div id="firstUsernameLetter">N</div>
      </div>
      <div className="searchWrapper">
        <img className="searchIcon" src="search.svg" alt="Search Icon" />
        <input
          type="text"
          id="searchBar"
          className="searchBar"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          tabIndex={1}
        />
      </div>
      <button className="newNoteButton" onClick={newNoteHandler} tabIndex={2}>
        <img src="new.svg" alt="Create a new Note" />
      </button>
    </div>
  );
}
export default Header;
