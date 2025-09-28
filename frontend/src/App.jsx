import { useEffect, useState } from 'react';
import api from './services/api';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import EditNoteModal from './components/EditNoteModal';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);

  // Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  // Create note
  const createNote = async (note) => {
    try {
      const res = await api.post('/notes', note);
      setNotes(prev => [res.data, ...prev]);
    } catch (err) {
      console.error(err);
      alert('Failed to create note');
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(prev => prev.filter(n => n._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete note');
    }
  };

  // Update note
  const updateNote = async (id, updatedNote) => {
    try {
      const res = await api.put(`/notes/${id}`, updatedNote);
      setNotes(prev => prev.map(n => (n._id === id ? res.data : n)));
      setEditingNote(null); // close modal
    } catch (err) {
      console.error(err);
      alert('Failed to update note');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-fuchsia-100 shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Notes App</h1>
        <NoteForm onCreate={createNote} />
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : (
          <NoteList notes={notes} onDelete={deleteNote} onEdit={setEditingNote} />
        )}
      </div>

      {editingNote && (
        <EditNoteModal
          note={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={updateNote}
        />
      )}
    </div>
  );
}
