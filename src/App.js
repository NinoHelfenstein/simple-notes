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
  const updateHandler = debounce((text, title) => updateNotes(text, title));
  function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }
  function updateNotes(title, text) {
    let updatedNotes = [...notes];
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === currentNote.id) {
        updatedNotes[i].title = title;
        updatedNotes[i].text = text;
        setNotes(updatedNotes);
        break;
      }
    }
  }
  return (
    <>
      <Sidebar noteClickHandler={noteClickHandler} notes={notes} />
      <CurrentNote currentNote={currentNote} updateHandler={updateHandler} />
    </>
  );
}
