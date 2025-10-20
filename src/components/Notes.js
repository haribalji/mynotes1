import React, { useContext, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import noteContext from "../context/notes/notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import "../styles/Notes.css";
// import bootstrap from "bootstrap"
// window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const { showAlert } = props;
  const a = useContext(noteContext);
  const { notes, getNotes, editnote } = a; //doing the deconstuction
  const ref = useRef(null);
  const ref2 = useRef(null);

  const [note, setnote] = useState({ etitle: "", edescription: "", etag: "" });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") != null) {
      // console.log("hi");
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const [currid, setcurrid] = useState("");
  const updatenote = (currentnote) => {
    console.log("it is clicked");
    ref.current.click(); //where useref is refering that will be clicked

    // now just displaying the current
    setnote({
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
    setcurrid(currentnote._id);
  };

  const handleclick = (e) => {
    console.log("updating the note", note);
    e.preventDefault();
    console.log(currid);
    editnote(currid, note.etitle, note.edescription, note.etag);
    ref2.current.click(); //where useref is refering that will be clicked

    props.showAlert("Updated Successfully", "success");

    // getNotes();
  };
  const onchange = (e) => {
    setnote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const booksRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (booksRef.current) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        booksRef.current.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="notes-wrapper">
      <div className="books-background" ref={booksRef}>
        <div className="book book1"></div>
        <div className="book book2"></div>
        <div className="book book3"></div>
        <div className="book book4"></div>
        <div className="book book5"></div>
      </div>
      <div className="content-ontop">
        <Addnote showAlert={props.showAlert} />

        {/* <!-- Button trigger modal -->                          d-none is used hide this element  */}
        <button
          type="button"
          ref={ref}
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Launch demo modal
        </button>

        {/* <!-- Modal --> */}
        {ReactDOM.createPortal(
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-3">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="modal-close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="Title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
                      aria-describedby="emailHelp"
                      placeholder="Enter Title"
                      onChange={onchange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onchange}
                      minLength={5}
                      required
                    ></textarea>

                    {/* <input type=\"text\" className=\"form-control\" id=\"edescription\" value={note.edescription} name=\"edescription\" placeholder=\"description\" onChange={onchange} minLength={5} required  /> */}
                  </div>
                  <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      value={note.etag}
                      placeholder="tag"
                      onChange={onchange}
                      minLength={5}
                      required
                    />
                  </div>

                  {/* <button type=\"submit\" className=\"btn btn-primary\" onClick={handleclick}>Add note</button> */}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-rounded"
                  ref={ref2}
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                  type="button"
                  onClick={handleclick}
                  className="btn btn-primary btn-rounded"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>, document.body)}
        {/* istead of onclick if we use onsubmit if will work */}

        <section className="notes-section">
          <h2 className="notes-heading">Your Notes</h2>

          {notes.length === 0 ? (
            <h4 className="notes-empty">Start taking your Notes</h4>
          ) : (
            <div className="notes-grid">
              {notes.map((note) => (
                <Noteitem
                  key={note._id}
                  updatenote={updatenote}
                  showAlert={props.showAlert}
                  note={note}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Notes;
