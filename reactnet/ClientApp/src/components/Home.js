import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import React, { useState, useEffect } from "react";
import DeleteIcon from "../images/delete.png";
import EditIcon from "../images/edit.png";
import AddIcon from "../images/add.png";
import { getNotes, createNote, editNote, deleteNote } from "../services/notes"; // delete
import { useGetNotes } from "../hooks/notes";

export default function Home() {
  const [showNote, setShowNote] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const { notes, refetchNotes } = useGetNotes();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const toggleShowNote = () => setShowNote(!showNote);

  const toggleShowEditNote = (note) => {
    if (note && note.title !== undefined) {
      setEditTitle(note.title || "");
      setEditDescription(note.description || "");
      setEditId(note.id || 0);
    } else {
      setEditTitle("");
      setEditDescription("");
    }
    setShowEditNote(!showEditNote);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleEditTitleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const handleEditDescription = (event) => {
    setEditDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const note = { title: title, description: description };

    createNote(note)
      .then(() => {
        setTitle("");
        setDescription("");
      })
      .then(() => {
        refetchNotes();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
    toggleShowNote();
  };

  const handleEdit = (event) => {
    event.preventDefault();

    const note = { id: editId, title: editTitle, description: editDescription };

    editNote(note)
      .then(() => {
        setEditId(0);
        setEditTitle("");
        setEditDescription("");
      })
      .then(() => {
        refetchNotes();
      });
    toggleShowEditNote();
  };

  const handleDelete = (id) => {
    deleteNote(id).then(() => {
      refetchNotes();
    });
  };

  return (
    <Container>
      <h3>Notes</h3>
      <Toast
        id="create-note"
        className="position-absolute top-50 start-50 translate-middle"
        show={showNote}
        onClose={toggleShowNote}
      >
        <form onSubmit={handleSubmit}>
          <Toast.Header>
            <input
              className="form-control"
              placeholder="Title..."
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </Toast.Header>
          <Toast.Body>
            <textarea
              type="text"
              className="form-control mb-3"
              value={description}
              rows="5"
              onChange={handleDescriptionChange}
              placeholder="Type..."
            ></textarea>
            <div className="d-flex flex-row-reverse">
              <Button type="submit">Create</Button>
            </div>
          </Toast.Body>
        </form>
      </Toast>
      <Toast
        id="edit-note"
        className="position-absolute top-50 start-50 translate-middle"
        show={showEditNote}
        onClose={toggleShowEditNote}
      >
        <form onSubmit={handleEdit}>
          <Toast.Header>
            <input
              className="form-control"
              placeholder="Title..."
              type="text"
              value={editTitle}
              onChange={handleEditTitleChange}
              required
            />
          </Toast.Header>
          <Toast.Body>
            <textarea
              type="text"
              className="form-control mb-3"
              value={editDescription}
              rows="5"
              onChange={handleEditDescription}
              placeholder="Type..."
            ></textarea>
            <div className="d-flex flex-row-reverse">
              <Button type="submit">Save</Button>
            </div>
          </Toast.Body>
        </form>
      </Toast>
      <Stack gap={3}>
        {notes.map((note) => (
          <Card key={note.id}>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <Card.Text>{note.description}</Card.Text>
            </Card.Body>
            <div className="m-3 button-container">
              <Button onClick={() => toggleShowEditNote(note)}>
                <img className="custom-icon" src={EditIcon} alt="Edit Icon" />
              </Button>
              <Button onClick={() => handleDelete(note.id)}>
                <img
                  className="custom-icon"
                  src={DeleteIcon}
                  alt="Delete Icon"
                />
              </Button>
            </div>
          </Card>
        ))}
      </Stack>
      <div className="w-100 my-3 text-end position-sticky bottom-0 end-0">
        <Button onClick={toggleShowNote}>
          <img className="custom-icon" src={AddIcon} alt="Add Icon" />
        </Button>
      </div>
    </Container>
  );
}
