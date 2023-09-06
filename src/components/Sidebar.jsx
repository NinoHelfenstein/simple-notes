import { useState } from "react";
import Header from "./Header";
import NoteListItem from "./NoteListItem";
function Sidebar({ noteClickHandler, notes, newNoteHandler }) {
  const [query, setQuery] = useState("");
  function onSearch(e) {
    console.log("onSearch(search) search:", e.target.value);
    setQuery(e.target.value);
  }

  return (
    <div className="sidebar">
      <Header onSearch={onSearch} newNoteHandler={newNoteHandler} />
      <div className="notesListWrapper">
        {[...notes]
          .sort((a, b) => b.lastEdited - a.lastEdited)
          .filter((item) => {
            return item.title.toLowerCase().includes(query.toLowerCase());
          })
          .map((item) => (
            <NoteListItem
              key={item.id}
              item={item}
              noteClickHandler={noteClickHandler}
            />
          ))}
      </div>
    </div>
  );
}
export default Sidebar;
