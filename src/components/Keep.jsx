import * as React from "react";
import "../styles/Keep.css";
import Note from "./Note";
import InputNote from "./NoteForm";
import useFetch from "../hooks/useFetch";
import llavesSvg from "../assets/llaves.svg";
import trashSvg from "../assets/trash.svg";
import NoteLoading from "./LoadingNotes";
import colorSvg from "../assets/color.svg";
import TrashedNotes from "./TrashedNotes";
import recoverSvg from "../assets/Recover.svg";

const Keep = (props) => {
  const [inputColor, setInputColor] = React.useState("#FFFFFF");
  const [expandedNoteIds, setExpandedNoteIds] = React.useState([]);
  const user = localStorage.getItem("username") || "Guest";

  const toggleExpand = (noteId) => {
    setExpandedNoteIds((prevIds) => {
      if (prevIds.includes(noteId)) {
        return prevIds.filter((id) => id !== noteId);
      } else {
        return [...prevIds, noteId];
      }
    });
  };

  const {
    notes,
    isLoading,
    deleteNote,
    moveToTrash,
    createNote,
    moveToNotes,
    changeNoteColor,
  } = useFetch(
    `https://codeable-keep-api-production.up.railway.app/api/${user}/notes`
  );

  const [keep, setKeep] = React.useState(false);
  const colors1 = [
    {
      color: "#FFFFFF",
    },
    {
      color: "#F28B82",
    },
    {
      color: "#FBBC04",
    },
    {
      color: "#FFF475",
    },
    {
      color: "#CCFF90",
    },
  ];
  const colors2 = [
    {
      color: "#A7FFEB",
    },
    {
      color: "#CBF0F8",
    },
    {
      color: "#AECBFA",
    },
    {
      color: "#D7AEFB",
    },
    {
      color: "#FDCFE8",
    },
  ];

  return (
    <>
      <header className="keepHeaderContainer">
        <p className="keepHeaderContainer__p">
          Welcome to Vars Keep <strong>{user}</strong>
        </p>
        <button
          onClick={() => {
            props.onLogout();
          }}
          className="keepHeaderContainer__button buttonGeneral"
        >
          {" "}
          <strong>Exit</strong>{" "}
        </button>
      </header>
      <section className="keepSectionContainer">
        <aside className="keepSectionContainer__aside">
          <div className="aside__buttonContainer">
            <button
              onClick={() => setKeep(false)}
              className={
                keep
                  ? "keepSectionContainer__button "
                  : "keepSectionContainer__button  notes"
              }
            >
              <img src={llavesSvg} alt="" /> Notes{" "}
            </button>
            <button
              onClick={() => setKeep(true)}
              className={
                keep
                  ? "keepSectionContainer__button  trash"
                  : "keepSectionContainer__button "
              }
            >
              <img src={trashSvg} alt="" />
            </button>
          </div>
        </aside>

        <main className="keepSectionContainer__main">
          {keep ? (
            <>
              <div className="trashNotesContainer">
                <TrashedNotes
                  toggleExpand={toggleExpand}
                  expandedNoteIds={expandedNoteIds}
                  trashSvg={trashSvg}
                  recoverSvg={recoverSvg}
                  notes={notes}
                  deleteNote={deleteNote}
                  moveToNotes={moveToNotes}
                />
              </div>
            </>
          ) : (
            <>
              <InputNote
                inputColor={inputColor}
                setInputColor={setInputColor}
                changeNoteColor={changeNoteColor}
                colorSvg={colorSvg}
                color1={colors1}
                color2={colors2}
                createNote={createNote}
              />
              <div className="notesContainer">
                {isLoading ? (
                  <NoteLoading />
                ) : notes.length === 0 ? (
                  <h1 className="notesContainer__title">No notes</h1>
                ) : (
                  <Note
                    toggleExpand={toggleExpand}
                    expandedNoteIds={expandedNoteIds}
                    trashSvg={trashSvg}
                    colorSvg={colorSvg}
                    changeNoteColor={changeNoteColor}
                    color1={colors1}
                    color2={colors2}
                    notes={notes}
                    moveToTrash={moveToTrash}
                  />
                )}
              </div>
            </>
          )}
        </main>
      </section>
    </>
  );
};
export default Keep;
