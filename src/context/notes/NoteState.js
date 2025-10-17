import React, { useState } from "react";
import NoteContext from "./notecontext";
const NoteState = (props) => {
  //     const s1={
  //         "name":"nvp",
  //         "class":"5p"
  //     }
  //     const [state, setstate] = useState(s1);
  //    const  update=()=>{
  //         setTimeout(() => {
  //             setstate({
  //                     "name":"nvp nanguneri ",
  //                    "class":"5p"
  //             })
  //         }, 3000);
  //     }

  const host = "http://localhost:5000";
  const startnotes = [];

  const [notes, setNote] = useState(startnotes);
// getting all the node


  const getNotes =async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
      // body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
console.log(json);
setNote(json);
  };



  // function for adding the node

  const addNote =async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
            },
      body: JSON.stringify({title, description, tag}),
    });
    const note =await  response.json();

      console.log(note)

    // console.log("adding the nwe node");
 
    setNote(notes.concat(note)); // to show the respose even when the db is down
    // getNotes();//to avoid the duplicate notes deletion 
    // cancat()--> it is used to add the object in the array and retrun the updated array
  };

  // function for deleting the node

  const deletenote = async(id) => {
    console.log("the   deleting started" + id);
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')      },
    });
    const json = response.json();
    console.log(json);

    const newnotes = notes.filter((note) => {
      return note._id !== id;
    }); //here we are taking notes which did't have this id
    setNote(newnotes);

  };

  // function for editing the node

  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updation/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
localStorage.getItem('token')   },
      body: JSON.stringify({title, description, tag}),
    });
    const json =  await response.json();
    let newnotes=JSON.parse(JSON.stringify(notes))//it the fetched node value which will be in json so converting it 
    
    // this because when the backend is slow also the value will be appear to for there convient
    for (let index = 0; index < notes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title= title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNote(newnotes);
  };

  return (
    <NoteContext.Provider
      value={{
        // state:state,//through this way we are passing the object
        // update:update

        notes,
        setNote,
        addNote,
        deletenote,
        editnote,
        getNotes
      }}
    >
      {props.children}
      {/* what ever components that comes under  this provider can acess this states*/}
    </NoteContext.Provider>
  );
};

export default NoteState;
