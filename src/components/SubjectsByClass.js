

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import studentContext from "../context/students/studentcontext";
// import { Container, Card, Row, Col, Alert } from "react-bootstrap";

// const SubjectsByClass = () => {
//   const navigate = useNavigate();
//   const { student, fetchStudent } = useContext(studentContext);
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch subjects from backend
//   const fetchSubjects = async (classNumber) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/subjects/${classNumber}`);
//       if (!response.ok) {
//         throw new Error("Subjects not found");
//       }
//       const data = await response.json();
//       setSubjects(data);
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//       setSubjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch student details when the component loads
//   useEffect(() => {
//     if (fetchStudent) {
//       fetchStudent();
//     }
//   }, []);

//   // Fetch subjects once student data is available
//   useEffect(() => {
//     if (!student) {
//       navigate("/student"); // Redirect if no student is found
//     } else if (student.class) {
//       fetchSubjects(student.class);
//     }
//   }, [student, navigate]);

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Subjects for Class {student?.class}</h2>
//       {student ? (
//         <>
//           <Alert variant="success">Welcome, {student.name} (Class {student.class})</Alert>
//           <Row>
//             {loading ? (
//               <p>Loading subjects...</p>
//             ) : subjects.length > 0 ? (
//               subjects.map((subject, index) => (
//                 <Col md={4} key={index}>
//                   <Card className="mb-3 shadow-sm">
//                     <Card.Body>
//                       <Card.Title className="text-center">{subject}</Card.Title>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))
//             ) : (
//               <p>No subjects found for this class.</p>
//             )}
//           </Row>
//         </>
//       ) : (
//         <Alert variant="danger">No student found! Redirecting...</Alert>
//       )}
//     </Container>
//   );
// };

// export default SubjectsByClass;



import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import studentContext from "../context/students/studentcontext";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";

const SubjectsByClass = () => {
  const navigate = useNavigate();
  const { student, fetchStudent } = useContext(studentContext);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subjects from backend
  const fetchSubjects = async (classNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/subjects/${classNumber}`);
      if (!response.ok) {
        throw new Error("Subjects not found");
      }
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch student details
  useEffect(() => {
    if (fetchStudent) {
      fetchStudent();
    }
  }, []);

  // Fetch subjects after student data is available
  useEffect(() => {
    if (!student) {
      navigate("/student");
    } else if (student.class)
       {
        console.log("hiii")
        console.log(student.age);
      fetchSubjects(student.class);
    }
  }, [student, navigate]);

  // Handle subject click
  const handleSubjectClick = (subject) => {
    navigate(`/chapters/${student.class}/${subject}`);
  };

  return (
    <Container className="mt-4">

      <h2 className="text-center mb-4">Subjects for Class {student?.class}</h2>
      {student ? (
        <>
          <Alert variant="success">Welcome, {student.name} (Class {student.class})</Alert>
          <Row>
            {loading ? (
              <p>Loading subjects...</p>
            ) : subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <Col md={4} key={index}>
                  <Card className="mb-3 shadow-sm" onClick={() => handleSubjectClick(subject)}>
                    <Card.Body>
                      <Card.Title className="text-center">{subject}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No subjects found for this class.</p>
            )}
          </Row>
        </>
      ) : (
        <Alert variant="danger">No student found! Redirecting...</Alert>
      )}
    </Container>
  );
};

export default SubjectsByClass;
