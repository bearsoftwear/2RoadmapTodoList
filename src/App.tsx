import { useState, useEffect } from 'react';
// import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoTable from './components/TodoTable';

function App() {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on mount
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description = '') => {
    const newTodo = {
      id: crypto.randomUUID(), // Unique ID for each todo
      title,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
      <div className="w-full max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        <TodoTable />
      </div>
  );
}

export default App;