export default function NoteList({ notes, onDelete, onEdit }) {
    if (!notes.length) return <p className="text-gray-500">No notes yet.</p>;

    return (
        <ul className="space-y-4">
            {notes.map(note => (
                <li key={note._id} className="border p-4 rounded-lg shadow-sm bg-gray-50">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
                        <div className="flex gap-3">
                            <button
                                onClick={() => onEdit(note)}
                                className="text-blue-500 hover:text-blue-700 font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(note._id)}
                                className="text-red-500 hover:text-red-700 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-2">{note.content}</p>
                    <small className="text-gray-400">{new Date(note.createdAt).toLocaleString()}</small>
                </li>
            ))}
        </ul>
    );
}
