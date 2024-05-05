import React, { useEffect, useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Filters from "../../../components/Filters";
import TodosTable from "./TodosTable";
import AddWindow from "../../../components/AddWindow";
import styles from "../../../css/Todos.module.css"
function Todos() {

  const [filteredTodos, setFilteredTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([])
  const [isGotTodos, setIsGotTodos] = useState(false);
  const [isShowAddTodoWindow, setIsShowAddTodoWindow] = useState(false);
  const currentSortType = useRef();
  const generalDataAndTools = useOutletContext();
  const currentUser = generalDataAndTools.currentUser;

  useEffect(() => {
    getTodos(`users/${currentUser.id}/todos`);
  }, []);


  async function getTodos(url) {
    generalDataAndTools.getItemsFunc(url, setFilteredTodos, setIsGotTodos, setAllTodos)
  }

  function sortCurrentTodos() {
    let compareFunc = null;
    switch (currentSortType.current.value) {
      case "serial":
        compareFunc = (a, b) => a.id - b.id;
        break;
      case "completed":
        compareFunc = (a, b) => Number(b.completed) - Number(a.completed);
        break;
      case "alphabetical":
        compareFunc = (a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0);
        break;
      case "random":
        compareFunc = (a, b) => 0.5 - Math.random();
        break;
      default:
        break;
    }
    setFilteredTodos([...filteredTodos.sort(compareFunc)]);
  }
  return (
    <div className={styles.todosContainer}>
      <Filters allItems={allTodos} setFilteredItems={setFilteredTodos} isWithCompleted={true} />
      <div className={styles.todosMain}>
        <label>Order by: </label>
        <select className={styles.orderByTodos} ref={currentSortType} onChange={sortCurrentTodos}>
          <option value="serial">Serial</option>
          <option value="completed">Completed First</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <button onClick={() => setIsShowAddTodoWindow(true)}>Add Todo ➕</button>
        {!isGotTodos && <h3>Loading...</h3>}
        {isGotTodos && <TodosTable currentSortType={currentSortType} generalDataAndTools={generalDataAndTools} filteredTodos={filteredTodos} setFilteredTodos={setFilteredTodos} allTodos={allTodos} setAllTodos={setAllTodos} sortCurrentTodos={sortCurrentTodos} />}
        {isShowAddTodoWindow &&
          <AddWindow setIsAddWindowShow={setIsShowAddTodoWindow} baseItem={{
            user_id: currentUser.id,
            title: '',
            completed: false
          }} propertiesArr={["title"]} url={`todos`} setFilteredItems={setFilteredTodos} setAllItems={setAllTodos} />
        }
      </div>
    </div>
  );
}
export default Todos;
