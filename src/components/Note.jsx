import "../styles/Note.css";
import React, { useState } from "react";

const Note = (props) => {
  // Crear un objeto para almacenar el estado de apertura de cada nota
  const [openNoteStates, setOpenNoteStates] = useState({});

  const handleClick = (noteId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenNoteStates((prev) => ({
      ...prev,
      [noteId]: !prev[noteId],
    }));
  };

  const activeNotes = props.notes.filter((note) => !note.deleted);

  return (
    <>
      {activeNotes.map((note) => (
        <article
          id={note.id}
          key={note.id}
          style={{ backgroundColor: note.color }}
          className={`note ${
            props.expandedNoteIds.includes(note.id) ? "expanded" : ""
          }`}
          onClick={() => props.toggleExpand(note.id)}
        >
          <div className="note__text">
            <span className="note__title">{note.title}</span>
            <p className="note__content">{note.body}</p>
          </div>
          <div
            className={
              openNoteStates[note.id]
                ? "note__colorsContainer"
                : "note__colorsContainer none"
            }
          >
            <div className="note__colors">
              {props.color1.map((color, index) => (
                <button
                  onClick={(e) =>
                    props.changeNoteColor(note.id, color.color, e)
                  }
                  key={index}
                  id={color.id}
                  className="note__color-1"
                  style={{ backgroundColor: color.color }}
                ></button>
              ))}
            </div>
            <div className="note__colors">
              {props.color2.map((color, index) => (
                <button
                  onClick={(e) =>
                    props.changeNoteColor(note.id, color.color, e)
                  }
                  key={index}
                  className="note__color-2"
                  style={{ backgroundColor: color.color }}
                ></button>
              ))}
            </div>
          </div>
          <div className="note__buttons">
            <button
              onClick={(e) => handleClick(note.id, e)}
              className="note__button"
            >
              <img className="note__colorSvg" src={props.colorSvg} alt="" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                props.moveToTrash(note.id);
              }}
              className="note__button"
            >
              <img className="note__colorSvg" src={props.trashSvg} alt="" />
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default Note;
