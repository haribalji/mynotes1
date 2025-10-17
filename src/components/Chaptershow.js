// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Card, Row, Col, Alert } from "react-bootstrap";

// const ChapterComponent = () => {
//   const { classNumber, subject } = useParams();
//   const [chapters, setChapters] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchChapters = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/chapters/${classNumber}/${subject}`);
//       if (!response.ok) {
//         throw new Error("Chapters not found");
//       }
//       const data = await response.json();
//       setChapters(data);
//     } catch (error) {
//       console.error("Error fetching chapters:", error);
//       setChapters([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchChapters();
//   }, [classNumber, subject]);

//   return (
//     <Container className="mt-4">
//       <h2 className="text-center mb-4">Chapters for {subject} (Class {classNumber})</h2>
//       <Row>
//         {loading ? (
//           <p>Loading chapters...</p>
//         ) : chapters.length > 0 ? (
//           chapters.map((chapter, index) => (
//             <Col md={4} key={index}>
//               <Card className="mb-3 shadow-sm">
//                 <Card.Body>
//                   <Card.Title className="text-center">{chapter}</Card.Title>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         ) : (
//           <Alert variant="warning">No chapters found!</Alert>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default ChapterComponent;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Alert } from "react-bootstrap";

const ChapterComponent = () => {
  const { classNumber, subject } = useParams();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation

  const fetchChapters = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chapters/${classNumber}/${subject}`);
      if (!response.ok) {
        throw new Error("Chapters not found");
      }
      const data = await response.json();
      setChapters(data);
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setChapters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, [classNumber, subject]);

  // Handle click on a chapter
  const handleChapterClick = (chapter) => {
    navigate(`/notes/${classNumber}/${subject}/${chapter}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Chapters for {subject} (Class {classNumber})</h2>
      <Row>
        {loading ? (
          <p>Loading chapters...</p>
        ) : chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <Col md={4} key={index}>
              <Card className="mb-3 shadow-sm" onClick={() => handleChapterClick(chapter)} style={{ cursor: "pointer" }}>
                <Card.Body>
                  <Card.Title className="text-center">{chapter}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Alert variant="warning">No chapters found!</Alert>
        )}
      </Row>
    </Container>
  );
};

export default ChapterComponent;
