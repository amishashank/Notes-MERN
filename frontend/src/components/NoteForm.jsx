import { useState } from 'react';

export default function NoteForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (!title || !content) return alert('Title and content required');
        onCreate({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={submit} className="space-y-3 mb-6">
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
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
            >
                Add Note
            </button>
        </form>
    );
}
