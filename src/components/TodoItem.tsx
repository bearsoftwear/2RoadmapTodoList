import { Button } from '@mui/material';

function TodoItem({ todo, toggleTodo, deleteTodo }) {
    return (
        <li className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="mr-2"
                />
                <div>
          <span
              className={todo.completed ? 'line-through text-gray-500' : ''}
          >
            {todo.title}
          </span>
                    {todo.description && (
                        <p className="text-sm text-gray-600">{todo.description}</p>
                    )}
                </div>
            </div>
            <Button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-600 text-white"
            >
                Delete
            </Button>
        </li>
    );
}

export default TodoItem;