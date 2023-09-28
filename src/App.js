import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import CurrentNote from "./components/CurrentNote";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const localData = localStorage.getItem("notesStorage");
    return localData
      ? JSON.parse(localData)
      : [
          {
            id: new Date().getTime(),
            title: "Empty Note",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum! Provident similique",
            lastEdited: new Date().getTime(),
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("notesStorage", JSON.stringify(notes));
  }, [notes]);

  const [initialCurrentNote, setInitialCurrentNote] = useState(() => {
    return notes.reduce((prevNote, currentNote) => {
      if (
        !prevNote ||
        new Date(currentNote.lastEdited) > new Date(prevNote.lastEdited)
      ) {
        return currentNote;
      }
      return prevNote;
    }, null);
  });

  function noteClickHandler(clickedItem) {
    setInitialCurrentNote(clickedItem);
  }
  function updateNotes(id, note) {
    if (!note.title && !note.text) {
      return;
    }
    const noteIndex = notes.findIndex((n) => n.id === id);
    const updatedNotes = [
      ...notes.slice(0, noteIndex),
      { ...notes[noteIndex], title: note.title, text: note.text },
      ...notes.slice(noteIndex + 1),
    ];
    setNotes(updatedNotes);
  }

  function newNoteHandler() {
    const newNotes = notes;
    let newNote = {
      id: new Date().getTime(),
      title: "Empty Note",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum! Provident similique",
      lastEdited: new Date().getTime(),
    };
    newNotes.push(newNote);
    setNotes(newNotes);
    setInitialCurrentNote(newNote);
  }

  function deleteNoteHandler() {
    if (notes.length === 1) {
      console.log("length = 1");
      const defaultNote = {
        id: new Date().getTime(),
        title: "Empty Note",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum! Provident similique",
        lastEdited: new Date().getTime(),
      };
      setNotes([defaultNote]);
      setInitialCurrentNote(defaultNote);
    } else {
      const noteIndex = notes.findIndex((n) => n.id === initialCurrentNote.id);
      const updatedNotes = notes;
      updatedNotes.splice(noteIndex, 1);
      setNotes(updatedNotes);
      setInitialCurrentNote(updatedNotes[noteIndex && noteIndex - 1]);
    }
  }

  return (
    <>
      <Sidebar
        noteClickHandler={noteClickHandler}
        notes={notes}
        newNoteHandler={newNoteHandler}
      />
      <CurrentNote
        initialCurrentNote={initialCurrentNote}
        updateNotes={updateNotes}
        deleteNoteHandler={deleteNoteHandler}
      />
    </>
  );
}
