import * as React from "react";

const TrashedNotes = (props) => {
  const handleDelete = (noteId) => {
    props.deleteNote(noteId);
  };

  const handleRecover = (noteId) => {
    props.moveToNotes(noteId);
  };

  const deletedNotes = props.notes.filter((note) => note.deleted === true);

  return (
    <>
      {deletedNotes.map((note) => (
        <article
          style={{ backgroundColor: note.color }}
          key={note.id}
          className={`note ${
            props.expandedNoteIds.includes(note.id) ? "expanded" : ""
          }`}
          onClick={() => props.toggleExpand(note.id)}
        >
          <div className="note__text">
            <span className="note__title">{note.title}</span>
            <p className="note__content">{note.body}</p>
          </div>
          <div className="note__buttons">
            <button
              className="note__button"
              onClick={() => handleDelete(note.id)}
            >
              <img className="note__colorSvg" src={props.trashSvg} alt="" />
            </button>
            <button
              onClick={() => handleRecover(note.id)}
              className="note__button"
            >
              <img className="note__colorSvg" src={props.recoverSvg} alt="" />
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default TrashedNotes;
