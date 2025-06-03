import { useState, useEffect } from "react";

export default function useFetchFet(url) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, [url]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setIsLoading(false);
    }
  };

  const createNote = async (content) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setNotes((prevNotes) => [...prevNotes, data.note]);
      return data;
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const moveToNotes = async (noteId) => {
    try {
      const response = await fetch(`${url}/${noteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deleted: false }),
      });

      if (response.ok) {
        // Actualizamos el estado local moviendo la nota a las notas
        setNotes(
          notes.map((note) =>
            note.id === noteId ? { ...note, deleted: false } : note
          )
        );
      }
    } catch (error) {
      console.error("Error moving note to notes:", error);
    }
  };

  const moveToTrash = async (noteId) => {
    try {
      const response = await fetch(`${url}/${noteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deleted: true }),
      });

      if (response.ok) {
        // Actualizamos el estado local moviendo la nota a la papelera
        setNotes(
          notes.map((note) =>
            note.id === noteId ? { ...note, deleted: true } : note
          )
        );
      }
    } catch (error) {
      console.error("Error moving note to trash:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${url}/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Actualizamos el estado local eliminando la nota
        setNotes(notes.filter((note) => note.id !== noteId));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const changeNoteColor = async (noteId, color, event) => {
    if (event) {
      event.stopPropagation();
    }
    try {
      const response = await fetch(`${url}/${noteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: color }),
      });

      if (response.ok) {
        // Actualizamos el estado local cambiando el color de la nota

        setNotes(
          notes.map((note) =>
            note.id === noteId ? { ...note, color: color } : note
          )
        );
      }
    } catch (error) {
      console.error("Error changing note color:", error);
    }
  };

  return {
    notes,
    isLoading,
    deleteNote,
    moveToTrash,
    createNote,
    moveToNotes,
    changeNoteColor,
  };
}
