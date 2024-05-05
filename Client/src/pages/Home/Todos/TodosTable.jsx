import { React, useEffect, useState } from "react";
import UpdateWindow from "../../../components/UpdateWindow";
import styles from "../../../css/Todos.module.css";
function TodosTable({ currentSortType, sortCurrentTodos, generalDataAndTools, filteredTodos, setFilteredTodos, allTodos, setAllTodos }) {

  const [currentUpdated, setCurrentUpdated] = useState(null);
  const [isCompletedChange, setIsCompletedChange] = useState(false);

  useEffect(() => {
    if (currentSortType.current.value == "alphabetical") sortCurrentTodos();
  }, [currentUpdated]);

  useEffect(() => {
    if (currentSortType.current.value == "completed") sortCurrentTodos();
  }, [isCompletedChange]);

  function updateTodo(todo, updatedTodo) {
    debugger;
    (async () => {
      const response = await fetch(`http://localhost:1234/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      debugger;
      if (!response.ok) {
        throw response.statusText;
      }
      const data = await response.json();

      console.log(data);
      let currentTodoIndex = filteredTodos.findIndex((t) => t == todo);
      let tempTodos = [...filteredTodos];
      tempTodos[currentTodoIndex] = data[0];
      setFilteredTodos(tempTodos);

      currentTodoIndex = allTodos.findIndex((t) => t == todo);
      tempTodos = [...allTodos];
      tempTodos[currentTodoIndex] = data[0];
      setAllTodos(tempTodos);

      setIsCompletedChange((prev) => !prev);
    })();
  }

  return (
    <table className={styles.todosTable}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>completed?</th>
          <th>Uptade</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map((todo) => {
          return (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateTodo(todo, { ...todo, completed: !todo.completed })}
                />
              </td>
              <td className={styles.actionButtons} onClick={() => setCurrentUpdated(todo)}>
                ✏️
              </td>
              <td
                className={styles.actionButtons}
                onClick={() =>
                  generalDataAndTools.deleteItemFunc(`todos/${todo.id}`, todo, filteredTodos, setFilteredTodos, allTodos, setAllTodos)
                }
              >
                🗑️
              </td>
            </tr>
          );
        })}
        {currentUpdated && (
          <UpdateWindow
            url={`todos/${currentUpdated.id}`}
            oldItem={currentUpdated}
            setOldItem={setCurrentUpdated}
            filteredItems={filteredTodos}
            setFilteredItems={setFilteredTodos}
            allItems={allTodos}
            setAllItems={setAllTodos}
            propertiesArr={["title"]}
          />
        )}
      </tbody>
    </table>
  );
}

export default TodosTable;
