import {React, useState} from 'react'
import styles from '../css/Filters.module.css'

function Filters({allItems, setFilteredItems, isWithCompleted = false}) {

    const [filters, setFilters] = useState({ id: '', title: '', completed: "all" })

    function handleFiltersSubmit(e) {
        e.preventDefault();
        setFilteredItems( 
          allItems.filter(item => 
              (filters.id == "" || filters.id == item.id) && 
            (filters.title == "" || filters.title == item.title) &&
            (filters.completed == "completed" ? item.completed == true : filters.completed == "notCompleted" ? item.completed == false : true)))
      }

      function handleCompletedOfFiltersChange(e) {
        setFilters({ ...filters, completed: e.target.value })
      }
  
    return (
      <div className={styles.filtersContainer}>
          <h4>Filters:</h4>
            <form onSubmit={handleFiltersSubmit}>
              <label>Id:</label>
              <input className={styles.textInput} type='number' value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} /><br/>
              <label>Title:</label>
              <input className={styles.textInput} type='text' value={filters.title} onChange={(e) => setFilters({ ...filters, title: e.target.value })} />
              {isWithCompleted && <div>
                <input type='radio' value="completed" id="completed" name="filters" checked={filters.completed == "completed"} onChange={handleCompletedOfFiltersChange} />
                <label htmlFor="completed">Completed</label><br/>
                <input type='radio' value="notCompleted" id="notCompleted" name="filters" checked={filters.completed == "notCompleted"} onChange={handleCompletedOfFiltersChange} />
                <label htmlFor="notCompleted">Not Completed</label><br/>
                <input type='radio' value="all" id="all" name="filters" checked = {filters.completed == "all"}onChange={handleCompletedOfFiltersChange} />
                <label htmlFor="all">All</label>
              </div>}
              <button type='reset' onClick={(e) => {e.preventDefault(); setFilters({ id: '', title: '', completed: "all" })}}>Clear All</button> 
              <button type = 'submit'>🔍</button>
            </form>
      </div>
      )
}

export default Filters