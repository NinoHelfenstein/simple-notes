import { useState, useEffect } from "react";

function CurrentNote({ initialCurrentNote, updateNotes, deleteNoteHandler }) {
  const [note, setNote] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      updateNotes(initialCurrentNote.id, note);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [note]);
  useEffect(() => {
    setNote((note) => ({
      ...note,
      ...{ title: initialCurrentNote.title, text: initialCurrentNote.text },
    }));
  }, [initialCurrentNote]);
  const date = new Date(initialCurrentNote.lastEdited);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="currentNote">
      <button className="bin" tabIndex={5} onClick={deleteNoteHandler}>
        <img src="bin.svg" alt="Icon to delete notes" />
      </button>
      <div
        className="currentTitle"
        id="Title"
        onInput={(e) =>
          setNote((note) => ({
            ...note,
            ...{ title: e.target.innerText },
          }))
        }
        tabIndex={3}
        contentEditable
        suppressContentEditableWarning
      >
        {initialCurrentNote.title}
      </div>
      <div className="currentLastEdited">{formattedDate}</div>
      <div
        className="currentText"
        id="Text"
        onInput={(e) =>
          setNote((note) => ({
            ...note,
            ...{ text: e.target.innerText },
          }))
        }
        tabIndex={4}
        contentEditable
        suppressContentEditableWarning
      >
        {initialCurrentNote.text}
      </div>
    </div>
  );
}

export default CurrentNote;
