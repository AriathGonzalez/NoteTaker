import { api } from "../adapters/api";

const resource = "Notes";

export const getNotes = () => api.get(resource).then((data) => data.json());

export const createNote = (note) => api.post(resource, note);

export const editNote = (note) => api.put(`${resource}/${note.id}`, note);

export const deleteNote = (id) => api.delete(`${resource}/${id}`);
