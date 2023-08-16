function CurrentNote({ currentNote, updateHandler }) {
  function inputHandler() {
    console.log("input handler");
    let title = document.querySelector(".currentTitle").innerHTML;
    let text = document.querySelector(".currentText").innerHTML;
    updateHandler(title, text);
  }

  return (
    <div className="currentNote">
      <div
        className="currentTitle"
        contentEditable="true"
        onInput={() => inputHandler()}
      >
        {currentNote.title}
      </div>
      <div className="currentLastEdited">{currentNote.time}</div>
      <div
        className="currentText"
        contentEditable="true"
        onInput={() => inputHandler()}
      >
        {currentNote.text}
      </div>
    </div>
  );
}
export default CurrentNote;
