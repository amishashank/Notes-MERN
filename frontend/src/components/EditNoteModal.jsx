import { useState } from 'react';

export default function EditNoteModal({ note, onClose, onSave }) {
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    const submit = (e) => {
        e.preventDefault();
        if (!title || !content) return alert('Title and content required');
        onSave(note._id, { title, content });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-indigo-600">Edit Note</h2>
                <form onSubmit={submit} className="space-y-3">
                    <input
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Content"
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
