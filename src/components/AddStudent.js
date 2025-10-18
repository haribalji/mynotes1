import React, { useContext, useState } from 'react';
import StudentContext from '../context/students/studentcontext';

const AddStudent = (props) => {
    const studentContext = useContext(StudentContext);
    const { addStudent } = studentContext;

    const [student, setStudent] = useState({
        name: "",
        className: "",
        age: "",
        phone: ""
    });

    const handleClick = (e) => {
        e.preventDefault();
        addStudent(student.name, student.className, student.age, student.phone);
        setStudent({ name: "", className: "", age: "", phone: "" });
        props.showAlert("Student Added Successfully", "success");
    };

    const onChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    return (
        <div className="container my-4">
            <h1>Add Student</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name (Min 3 characters)</label>
                    <input type="text" className="form-control" id="name" name="name"
                        value={student.name} onChange={onChange} minLength={3} required />
                </div>

                <div class="form-group my-3">
                    <label htmlFor="className">Class (Numeric)</label>
                    <input type="number" class="form-control" id="className" name="className"
                        value={student.className} onChange={onChange} required />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="age">Age (Numeric)</label>
                    <input type="number" className="form-control" id="age" name="age"
                        value={student.age} onChange={onChange} required />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="phone">Phone (10 digits)</label>
                    <input type="text" className="form-control" id="phone" name="phone"
                        value={student.phone} onChange={onChange} minLength={10} maxLength={10} required />
                </div>

                <button disabled={student.name.length < 3 || student.phone.length !== 10}
                    type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add Student
                </button>
            </form>
        </div>
    );
}

export default AddStudent;
