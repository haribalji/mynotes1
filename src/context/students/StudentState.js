import React, { useState,useEffect } from "react";
//     const { addStudent } = context;

import StudentContext from "./studentcontext";  // Correct
import { Navigate } from "react-router-dom";
const StudentState = (props) => {
  const host = "http://localhost:5000";
  const initialStudents = [];

  const [students, setStudents] = useState(initialStudents);
  // const [student, setStudent] = useState(null);

  const [student, setStudent] = useState(null);


// Fetch Student Details


const fetchStudent = async () => {
  try {
      const response = await fetch(`${host}/api/students/fetchallstudents`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"), 
          },
      });

      // Check if response is not JSON
      const text = await response.text();
      try {
          const data = JSON.parse(text);
          if (!response.ok) {
              throw new Error(data.error || "Failed to fetch student data");
          }
          console.log("ho");

          console.log(data);
          setStudent(data.length > 0 ? data[0] : null);
      } catch (jsonError) {
          console.error("Error parsing JSON:", text);
          throw new Error("Invalid JSON response from server");
      }

  } catch (error) {
      console.error("Error fetching student:", error.message);
      setStudent(null);
  }
};













  // Fetch all students       fetchallstudents
  const getStudents = async () => {
    const response = await fetch(`${host}/api/students/fetchallstudents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setStudents(json);
  };

  // Add a student
  // const addStudent = async (name, classNum, age, phone) => {
  //   const response = await fetch(`${host}/api/students/addstudent`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({ name, classNum, age, phone }),
  //   });

  //   // const student = await response.json();
  //   // setStudents(students.concat(student));
  // };
  const addStudent = async (name, classNum, age, phone) => {
    try {
      const response = await fetch(`${host}/api/students/addstudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
          class: Number(classNum),
          age: Number(age),
          phone: String(phone)
        })
      });
  
      const result = await response.json();
      console.log("Server response:", result);
      // if(result.success){
      // navigate("/home");
      // }
    
      // if (!response.ok) {
      //   console.error("Error:", result);
      //   return;
      // }
  
      // If the request is successful, update state
      setStudents([...students, result]);
      return result;
    } catch (error) {
      console.error("Network or server error:", error);
    }
  };
  

  // Delete a student
  const deleteStudent = async (id) => {
    const response = await fetch(`${host}/api/students/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    await response.json();

    const newStudents = students.filter((student) => student._id !== id);
    setStudents(newStudents);
  };

  // Edit a student
  const editStudent = async (id, name, classNum, age, phone) => {
    const response = await fetch(`${host}/api/students/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, class: classNum, age, phone }),
    });

    await response.json();

    let updatedStudents = JSON.parse(JSON.stringify(students));
    for (let index = 0; index < students.length; index++) {
      if (updatedStudents[index]._id === id) {
        updatedStudents[index].name = name;
        updatedStudents[index].class = classNum;
        updatedStudents[index].age = age;
        updatedStudents[index].phone = phone;
        break;
      }
    }
    setStudents(updatedStudents);
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        students,
        setStudents,
        getStudents,
        addStudent,
        deleteStudent,
        editStudent,
        fetchStudent
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};

export default StudentState;
