import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/notecontext";
import "../styles/Addnote.css";

const Addnote = (props) => {
  const a = useContext(noteContext);
  const { addNote } = a; //doing the deconstuction
  const [note, setnote] = useState({ Title: "", description: "", tag: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.Title, note.description, note.tag);

    setnote({ Title: " ", description: " ", tag: "" });
    // after adding we are giving the alert that we added the note
    props.showAlert("Added Successfully", "success");
  };
  const onchange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value,
    });
    // it will keep the note variable as it is, if any changes are happening then it will affect only that particular field
  };
  return (
    <div className="addnote-card">
      <div className="addnote-inner">
        <h1 className="addnote-heading">Add your note</h1>

        <form className="addnote-form" onSubmit={handleclick}>
          <label className="addnote-label" htmlFor="Title">
            Title
          </label>
          <input
            type="text"
            className="addnote-input"
            id="Title"
            name="Title"
            placeholder="e.g. Meeting Notes"
            value={note.Title}
            onChange={onchange}
            minLength={5}
            required
          />

          <label className="addnote-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="addnote-textarea"
            id="description"
            name="description"
            placeholder="e.g. Discussed project timeline..."
            value={note.description}
            onChange={onchange}
            minLength={5}
            required
          ></textarea>

          <label className="addnote-label optional" htmlFor="tag">
            Tag (Optional)
          </label>
          <input
            type="text"
            className="addnote-input"
            id="tag"
            name="tag"
            placeholder="e.g. work"
            value={note.tag}
            onChange={onchange}
          />

          <div className="addnote-actions">
            <button
              disabled={
                note.Title.trim().length < 5 ||
                note.description.trim().length < 5
              }
              type="submit"
              className="addnote-button"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
