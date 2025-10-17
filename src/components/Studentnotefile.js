// import { useState, useEffect } from "react";
// import Studentnotefile from "./components/Studentnotefile";

// const StudentFileComponent = ({ token }) => {
//   const [files, setFiles] = useState([]);
//   const [newFile, setNewFile] = useState({ title: "", description: "" });
//   const [selectedFile, setSelectedFile] = useState(null);
//   const token = localStorage.getItem("token");
//   console.log("Auth Token:", token);
//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const fetchFiles = async () => {
//     try {
//       console.log("hi from nanguneri")
//       const response = await fetch("http://localhost:5000/api/studentfiles", {
//         method: "GET",
//         headers: { "auth-token": token, "Content-Type": "application/json" },
//       });

//       if (!response.ok) throw new Error("Failed to fetch files");
//       const data = await response.json();
//       setFiles(data);
//     } catch (error) {
//       console.error("Error fetching files:", error);
//       setFiles([]);
//     }
//   };

//   const handleAddFile = async () => {
//     console.log("hi from nanguneri")

//     const formData = new FormData();
//     formData.append("title", newFile.title);
//     formData.append("description", newFile.description);
//     if (selectedFile) formData.append("file", selectedFile);

//     try {
//       const response = await fetch("http://localhost:5000/api/studentfiles/add", {
//         method: "POST",
//         headers: { "auth-token": token }, // No 'Content-Type', FormData sets it automatically
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to add file");
//       fetchFiles(); // Refresh list
//     } catch (error) {
//       console.error("Error adding file:", error);
//     }
//   };

//   const handleDeleteFile = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/studentfiles/delete/${id}`, {
//         method: "DELETE",
//         headers: { "auth-token": token },
//       });

//       if (!response.ok) throw new Error("Failed to delete file");
//       fetchFiles();
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Student Files</h2>
//       <input type="text" placeholder="Title" value={newFile.title} onChange={(e) => setNewFile({ ...newFile, title: e.target.value })} />
//       <input type="text" placeholder="Description" value={newFile.description} onChange={(e) => setNewFile({ ...newFile, description: e.target.value })} />
//       <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={(e) => setSelectedFile(e.target.files[0])} />
//       <button onClick={handleAddFile}>Add File</button>

//       <ul>
//         {files.map((file) => (
//           <li key={file._id}>
//             <h3>{file.title}</h3>
//             <p>{file.description}</p>
//             {file.file && (
//               <a href={`http://localhost:5000/uploads/${file.file}`} target="_blank" rel="noopener noreferrer">
//                 View File
//               </a>
//             )}
//             <button onClick={() => handleDeleteFile(file._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentFileComponent;
