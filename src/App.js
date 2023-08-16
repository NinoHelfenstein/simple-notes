import { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import CurrentNote from "./components/CurrentNote";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const localData = localStorage.getItem("notesStorage");
    return localData
      ? JSON.parse(localData)
      : localStorage.setItem(
          "notesStorage",
          `[{"id": "0", "title": "Empty Note", "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum! Provident similique","time": "Feb 8, 2023"}]`
        );
  });
  useEffect(() => {
    localStorage.setItem("notesStorage", JSON.stringify(notes));
  }, [notes]);
  const [currentNote, setCurrentNote] = useState(() => {
    return notes.reduce((prevNote, currentNote) => {
      if (!prevNote || new Date(currentNote.time) > new Date(prevNote.time)) {
        return currentNote;
      }
      return prevNote;
    }, null);
  });
  function noteClickHandler(clickedItem) {
    setCurrentNote(clickedItem);
  }
  function updateNotes(event) {
    console.log("updateNotes");
    const target = event.target.name;
    const value = event.target.value;
    const noteIndex = notes.findIndex((n) => n.id === currentNote.id);
    const updatedNotes = [
      ...notes.slice(0, noteIndex),
      { ...notes[noteIndex], [target]: value },
      ...notes.slice(noteIndex + 1),
    ];

    setNotes(updatedNotes);
  }
  return (
    <>
      <Sidebar noteClickHandler={noteClickHandler} notes={notes} />
      <CurrentNote currentNote={currentNote} updateNotes={updateNotes} />
    </>
  );
}
