import { useEffect } from "react";
function CurrentNote({ currentNote, updateNotes }) {
  // function inputHandler(event) {
  //   console.log(event.target.value);
  //   // let title = document.querySelector(".currentTitle").innerHTML;
  //   // let text = document.querySelector(".currentText").innerHTML;
  //   // updateHandler(title, text);
  // }
  useEffect(() => {
    const textarea = document.getElementById("textArea");
    const end = textarea.value.length;
    console.log("useEffect");
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.setSelectionRange(end, end);
  }, []);

  const inputHandler = debounce((event) => updateNotes(event));
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function autoResize(event) {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    console.log(event.target.scrollHeight);
  }
  return (
    <div className="currentNote">
      <input
        className="currentTitle"
        name="title"
        defaultValue={currentNote.title}
        onChange={inputHandler}
      ></input>
      <div className="currentLastEdited">{currentNote.time}</div>
      <textarea
        className="currentText"
        name="text"
        id="textArea"
        defaultValue={currentNote.text}
        onChange={inputHandler}
        onInput={autoResize}
        autoFocus
      ></textarea>
    </div>
  );
}
export default CurrentNote;
