import * as React from "react";
import "../styles/NoteForm.css";

const NoteForm = (props) => {
  const [openNoteId, setOpenNoteId] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState("#FFFFFF");

  const handleClick = (e) => {
    e.preventDefault();
    setOpenNoteId(!openNoteId);
  };

  const handleColorSelect = (color, e) => {
    e.preventDefault();
    setSelectedColor(color);
    props.setInputColor(color); // Asumiendo que tienes esta función en los props
    setOpenNoteId(false);
  };

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  async function handleSubmit(event) {
    event.preventDefault();
    const content = { title, body, color: props.inputColor };
    // Esperar a que la nota se cree antes de resetear el formulario
    const result = await props.createNote(content);
    if (result) {
      setTitle("");
      setBody("");
      props.setInputColor("#FFFFFF");
      setSelectedColor("#FFFFFF");
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="keepSectionContainer__note"
      style={{ backgroundColor: selectedColor }}
    >
      <div className="keepSectionContainer__note-input">
        <input
          type="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="keepSectionContainer__input-text text-title"
          placeholder="Title"
        />
        <input
          name="content"
          className="keepSectionContainer__input-text text-content"
          placeholder="Your note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>

      <div className="keepSectionContainer__input-buttons">
        <div className="colorContainer__inputKeep">
          <button
            onClick={handleClick}
            className="keepSectionContainer__input-button "
          >
            <img src={props.colorSvg} alt="" />
          </button>
          <div
            className={
              openNoteId
                ? "note__colorsContainer"
                : "note__colorsContainer none"
            }
          >
            <div className="note__colors">
              {props.color1.map((color, index) => (
                <a
                  onClick={(e) => handleColorSelect(color.color, e)}
                  key={index}
                  id={color.id}
                  className="note__color-1"
                  style={{ backgroundColor: color.color }}
                ></a>
              ))}
            </div>
            <div className="note__colors">
              {props.color2.map((color, index) => (
                <a
                  onClick={(e) => handleColorSelect(color.color, e)}
                  key={index}
                  className="note__color-2"
                  style={{ backgroundColor: color.color }}
                ></a>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className=" buttonGeneral keepSectionContainer__input-button"
        >
          <strong>Keep it!</strong>
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
