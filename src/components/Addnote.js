import React,{useContext, useEffect, useState} from 'react'
import noteContext from '../context/notes/notecontext';

const Addnote = (props) => {
    const a = useContext(noteContext);
    const {addNote}=a;//doing the deconstuction 
    const [note, setnote] = useState({Title:"",description:"",tag:""})
 const   handleclick=(e)=>{
    e.preventDefault();
    addNote(note.Title,note.description,note.tag);

    setnote({Title:" ",description:" ",tag:""});
    // after adding we are giving the alert that we added the note
    props.showAlert("Added Successfully","success");

    }
    const onchange=(e)=>{
  setnote({
    ...note,[e.target.name]:e.target.value
  })
// it will keep the note variable as it is, if any changes are happening then it will affect only that particular field
    }
  return (
    <div className="container my-4">

    <h1>Add your note

    </h1>


    <form>
<div className="form-group">
  <label htmlFor="Title">Title - min 5 characters</label>
  <input type="text" className="form-control" id="Title"  name="Title" aria-describedby="emailHelp" value={note.Title} onChange={onchange} minLength={5} required />
</div>
<div className="form-group my-4">
  <label htmlFor="description">Description-  min 5 characters</label>
  {/* <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required /> */}
  <textarea className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required></textarea>

</div>
<div className="form-group my-4">
  <label htmlFor="tag">Tag</label>
  <input type="text" className="form-control" id="tag" name="tag"  value={note.tag}onChange={onchange} minLength={5} required />
</div>

<button  disabled={note.Title.length<5|| note.description.length<5}type="submit" className="btn btn-primary" onClick={handleclick}>Add note</button>
</form>
</div>

  )
}

export default Addnote
