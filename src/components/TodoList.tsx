import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="space-y-2">
            {todos.length === 0 && <p className="text-center">No tasks yet!</p>}
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;