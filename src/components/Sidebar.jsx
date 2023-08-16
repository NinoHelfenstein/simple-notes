import Header from "./Header";
import NoteListItem from "./NoteListItem";
function Sidebar({ noteClickHandler, notes }) {
  return (
    <div className="sidebar">
      <Header />
      <div className="notesListWrapper">
        {notes.map((item) => (
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
