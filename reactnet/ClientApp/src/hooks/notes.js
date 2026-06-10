import * as noteService from "../services/notes";
import React, { useState, useEffect } from "react";

export const useGetNotes = () => {
  const [notes, setNotes] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    noteService.getNotes().then((data) => {
      setNotes(data);
    });
  }, [refetch]);

  const refetchNotes = () => {
    setRefetch(!refetch);
  };

  return { notes, refetchNotes };
};
