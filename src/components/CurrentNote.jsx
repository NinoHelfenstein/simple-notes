import { useState, useEffect } from "react";

function CurrentNote({ initialCurrentNote, updateNotes }) {
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
    console.log("initialCurrentNote");
    setNote((note) => ({
      ...note,
      ...{ title: initialCurrentNote.title, text: initialCurrentNote.text },
    }));
  }, [initialCurrentNote]);
  return (
    <div className="currentNote">
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
      <div className="currentLastEdited">{initialCurrentNote.time}</div>
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
