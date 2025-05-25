import { useState } from 'react';
import { Button } from '@mui/material'; // Reuse your Button component

function TodoForm({ addTodo }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTodo(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full p-2 mb-2 border rounded"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description (optional)"
                className="w-full p-2 mb-2 border rounded"
            />
            <Button type="submit">Add Task</Button>
        </form>
    );
}

export default TodoForm;