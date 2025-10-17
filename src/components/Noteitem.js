// import React from 'react'
import React,{useContext, useEffect, useState} from 'react'
import noteContext from '../context/notes/notecontext';




const Noteitem = (props) => {
  // const {showAlert}=props;
    const a = useContext(noteContext);
    const {deletenote}=a;//doing the deconstuction 
  const   {note,updatenote}=props
      return (
    <div className='col-md-4'>
  

      <div className="card my-3" >
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deletenote(note._id);
      props.showAlert("Deleted Successfully","success");
   }} ></i> 
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)

    }}></i>
    
     </div>

</div>
    </div>
  )
}

export default Noteitem
