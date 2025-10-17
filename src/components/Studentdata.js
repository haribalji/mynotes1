// import React, { useContext, useState } from 'react';
// import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
// import studentContext from '../context/students/studentcontext';
// import 'bootstrap/dist/css/bootstrap.min.css';
// // npm install react-bootstrap bootstrap install in cmd
// import { useNavigate } from "react-router-dom";


// const AddStudent = (props) => {
//     const navigate = useNavigate();

//     const context = useContext(studentContext);
//     const { addStudent } = context;

//     const [student, setStudent] = useState({
//         name: "",
//         class: "",
//         age: "",
//         phone: ""
//     });

//     const handleClick = async(e) => {
//         e.preventDefault();
//         try {
//         const response = await addStudent(student.name, student.class, student.age, student.phone);
//         setStudent({ name: "", class: "", age: "", phone: "" });

//         // props.showAlert("Student Added Successfully", "success");
//              console.log(response)
//             if (response && response.errors) {
//               // If validation errors exist, show the first error message
//               props.showAlert(response.errors[0].msg, "danger");
//             } else {
//               props.showAlert("Student Added Successfully", "success");
//               navigate("/dashboard", { replace: true }); // ✅ Redirects to Dashboard
//             }
//           } catch (error) {
//             console.error("Error adding student:", error);
//             props.showAlert("Failed to add student. Please try again.", "danger");
//           }
        
//     };

//     const handleChange = (e) => {
//         setStudent({
//             ...student,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <Container className="mt-5">
//             <Row className="justify-content-md-center">
//                 <Col md={6}>
//                     <h2 className="text-center mb-4">Add Student Details</h2>
//                     <Form>
//                         <Form.Group controlId="name" className="mb-3">
//                             <Form.Label>Name (min 3 characters)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter student name"
//                                 name="name"
//                                 value={student.name}
//                                 onChange={handleChange}
//                                 minLength={3}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="class" className="mb-3">
//                             <Form.Label>Class</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Enter class"
//                                 name="class"
//                                 value={student.class}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="age" className="mb-3">
//                             <Form.Label>Age</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 placeholder="Enter age"
//                                 name="age"
//                                 value={student.age}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </Form.Group>

//                         <Form.Group controlId="phone" className="mb-3">
//                             <Form.Label>Phone (10 digits)</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter phone number"
//                                 name="phone"
//                                 value={student.phone}
//                                 onChange={handleChange}
//                                 minLength={10}
//                                 maxLength={10}
//                                 required
//                             />
//                         </Form.Group>

//                         <Button
//                             variant="primary"
//                             type="submit"
//                             onClick={handleClick}
//                             disabled={student.name.length < 3 || student.phone.length !== 10}
//                             className="w-100"
//                         >
//                             Add Student
//                         </Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default AddStudent;
import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import studentContext from '../context/students/studentcontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000"; // or your API base URL

const AddStudent = (props) => {
    const navigate = useNavigate();
    const context = useContext(studentContext);
    const { addStudent } = context;

    const [student, setStudent] = useState({
        name: "",
        class: "",
        age: "",
        phone: ""
    });

    const [error, setError] = useState(null);

    const checkRegistration = async () => {
        const response = await fetch(`${host}/api/students/checkStudentRegistration`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            },
        });
    
        const result = await response.json();
        if (result.success) {
            navigate("/subjectsByClass");  // If student exists, go to Dashboard
        }
    };
    const token = localStorage.getItem("token");
    // console.log("Auth Token:", token);
  
  
  
  
  
    // const navigate = useNavigate();
    // const token = localStorage.getItem("token");
  
    useEffect(() => {
        if (!token) {
          navigate("/login"); // Redirect to login page if no token
        }
      }, [token, navigate]);
  
  
  
    // Call this function on page load
    useEffect(() => {
        checkRegistration();
    }, [navigate]);
    

    const handleClick = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await addStudent(
                student.name,
                Number(student.class),
                Number(student.age),
                Number(student.phone)
            );

            setStudent({ name: "", class: "", age: "", phone: "" });

            if (response && response.errors) {
                // ✅ Show first error message
                setError(response.errors[0].msg);
                props.showAlert(response.errors[0].msg, "danger");
            } else {
                props.showAlert("Student Added Successfully", "success");
                navigate("/subjectsByClass", { replace: true }); // ✅ Redirect to Dashboard
            }
        } catch (error) {
            console.error("Error adding student:", error);
            props.showAlert("Failed to add student. Please try again.", "danger");
        }
    };

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Add Student Details</h2>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name (min 3 characters)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student name"
                                name="name"
                                value={student.name}
                                onChange={handleChange}
                                minLength={3}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="class" className="mb-3">
    <Form.Label>Class</Form.Label>
    <Form.Select
        name="class"
        value={student.class}
        onChange={handleChange}
        required
    >
        <option value="">Select Class</option>
        {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
                {i + 1}
            </option>
        ))}
    </Form.Select>
</Form.Group>
<Form.Group controlId="age" className="mb-3">
    <Form.Label>Age</Form.Label>
    <Form.Select
        name="age"
        value={student.age}
        onChange={handleChange}
        required
    >
        <option value="">Select Age</option>
        {[...Array(14)].map((_, index) => (
            <option key={index} value={index + 5}>
                {index + 5}
            </option>
        ))}
    </Form.Select>
</Form.Group>
{/* 


                        <Form.Group controlId="age" className="mb-3">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter age"
                                name="age"
                                value={student.age}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group> */}

                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone (10 digits)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter phone number"
                                name="phone"
                                value={student.phone}
                                onChange={handleChange}
                                minLength={10}
                                maxLength={10}
                                required
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleClick}
                            disabled={student.name.length < 3 || student.phone.length !== 10}
                            className="w-100"
                        >
                            Add Student
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddStudent;
