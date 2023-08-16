function NoteListItem({ item, noteClickHandler }) {
  return (
    <div className="noteListItem" onClick={() => noteClickHandler(item)}>
      <div className="title">{item.title}</div>
      <div className="text">{item.text}</div>
      <div className="time">{item.time}</div>
    </div>
  );
}
export default NoteListItem;
