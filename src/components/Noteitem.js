// import React from 'react'
import React, { useContext } from "react";
import noteContext from "../context/notes/notecontext";
import "../styles/Noteitem.css";

const Noteitem = (props) => {
  const { note, updatenote } = props;
  const a = useContext(noteContext);
  const { deletenote } = a;

  return (
    <div className="note-col">
      <div className="note-card">
        <div className="note-header">
          <h3 className="note-title">{note.title}</h3>
          {note.tag && <span className="note-badge">{note.tag}</span>}
        </div>

        <p className="note-desc">{note.description}</p>

        <div className="note-actions">
          <button
            className="note-icon"
            title="Edit"
            onClick={() => updatenote(note)}
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            className="note-icon"
            title="Delete"
            onClick={() => {
              deletenote(note._id);
              props.showAlert("Deleted Successfully", "success");
            }}
          >
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Noteitem;
