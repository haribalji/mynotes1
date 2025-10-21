import React, { useState, useEffect } from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import "../styles/Checkmodel.css";
// const axios=require('axios');

const ChecklistModal = ({
  show,
  handleClose,
  userId,
  classNumber,
  subject,
  chapter,
}) => {
  const [checklist, setChecklist] = useState([]);
  const [newItem, setNewItem] = useState("");

  // ✅ Fetch Checklist
  useEffect(() => {
    if (show) {
      axios
        .get(
          `http://localhost:5000/api/checklists/${userId}/${classNumber}/${subject}/${chapter}`
        )
        .then((res) => setChecklist(res.data?.items || []))
        .catch((err) => console.error("Error fetching checklist:", err));
    }
  }, [show, userId, classNumber, subject, chapter]);

  // 📌 Add Item
  const addItem = () => {
    if (newItem.trim() === "") return;
    const updatedItems = [...checklist, { text: newItem, completed: false }];
    updateChecklist(updatedItems);
    setNewItem("");
  };

  // ✏️ Toggle Complete Status
  const toggleComplete = (index) => {
    const updatedItems = [...checklist];
    updatedItems[index].completed = !updatedItems[index].completed;
    updateChecklist(updatedItems);
  };

  // ❌ Remove Item
  const removeItem = (index) => {
    const updatedItems = checklist.filter((_, i) => i !== index);
    updateChecklist(updatedItems);
  };

  // 🚀 Update Checklist in Database
  const updateChecklist = (items) => {
    axios
      .put(
        `http://localhost:5000/api/checklists/${userId}/${classNumber}/${subject}/${chapter}`,
        { items }
      )
      .then(() => setChecklist(items))
      .catch((err) => console.error("Error updating checklist:", err));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="checklist-modal-dialog"
      contentClassName="checklist-modal-content"
      backdropClassName="checklist-backdrop"
    >
      <Modal.Header closeButton className="checklist-modal-header">
        <Modal.Title className="fw-bold">
          📋 Checklist - {chapter} ({subject})
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="checklist-modal-body">
        <ListGroup className="checklist-list">
          {checklist.length > 0 ? (
            checklist.map((item, index) => (
              <ListGroup.Item
                key={index}
                className={`checklist-item d-flex justify-content-between align-items-center ${
                  item.completed ? "completed" : ""
                }`}
              >
                <Form.Check
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  label={item.text}
                  className="checklist-label"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="checklist-remove-btn"
                >
                  ✕
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-muted text-center">No checklist items yet.</p>
          )}
        </ListGroup>

        <Form.Control
          as="textarea"
          rows={3}
          placeholder="✍️ Add new item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="checklist-input mt-3"
        />
      </Modal.Body>

      <Modal.Footer className="checklist-modal-footer">
        <div className="checklist-footer-row">
          <Button
            className="checklist-add-btn fw-bold"
            variant="primary"
            onClick={addItem}
          >
            ➕ Add Item
          </Button>

          <Button
            variant="secondary"
            className="checklist-close-btn fw-bold"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChecklistModal;
