import React,{useContext, useEffect} from 'react'
import noteContext from '../context/notes/notecontext';
import Notes from './Notes';
import Addnote from './Addnote';
const Home = (props) => {
  const a = useContext(noteContext);
  const {notes,setNotes}=a;//doing the deconstuction 
// useEffect(() => {//instead of componentdidmount
// a.update();

//eslint-disable-next-line 

// which ignores the rules for the current code  line with any syntax 
// as here we need not to specify the input in the []
// }, [])
  return (
    <div>





<Notes showAlert={props.showAlert}/>


    </div>
  )
}

export default Home
