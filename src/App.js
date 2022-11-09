import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, removeTodo } from "./features/todos/todosSlice";

function App() {
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(removeTodo(id));
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) {
    return "Загрузка...";
  }

  return (
    <ul className="list">
      <div className="main-text">ТУДУШКА</div>
      {todos.map((todo) => {
        return (
          <li>
            <div className="text">{todo.title}</div>
            <div>
              <button
                className="removeBtn"
                onClick={() => handleRemove(todo.id)}
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
