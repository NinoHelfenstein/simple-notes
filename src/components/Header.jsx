function Header() {
  return (
    <div className="header">
      <div className="userlogo">
        <div id="firstUsernameLetter">N</div>
      </div>
      <input
        type="text"
        name="searchBar"
        id="searchBar"
        className="searchBar"
        placeholder="Search"
      />
      <div className="newNoteButton">
        <img src="new.svg" alt="Create a new Note" />
      </div>
    </div>
  );
}
export default Header;
