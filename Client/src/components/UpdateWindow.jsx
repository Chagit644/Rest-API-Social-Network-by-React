import React, { useState, useEffect } from 'react'
import styles from '../css/UpdateWindow.module.css'

function UpdateCommentWindow({ url, oldItem, setOldItem, filteredItems, setFilteredItems, allItems, setAllItems, propertiesArr, setItemInAdditionalWindow }) {

  const [newItem, setNewItem] = useState({ ...oldItem })

  function handleSubmit(e) {
    e.preventDefault();
    debugger;
    try {
      var data=null;
      (async () => {
        const response = await fetch(`http://localhost:1234/${url}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(newItem),
        });
        debugger;
        if (response.status === 200) {
          data = await response.json();
          let currentIndex = filteredItems.findIndex((e) => e == oldItem);
          setFilteredItems((prev) => {
            prev = [...prev];
            prev[currentIndex] = data[0];
            return prev;
          })
        };
        if (allItems && setAllItems) {
          debugger;
          const currentIndex = allItems.findIndex((e) => e == oldItem);
          setAllItems((prev) => {
            prev = [...prev];
            prev[currentIndex] = data[0];
            return prev;
          });
        }
        debugger;
        console.log(data[0]);
        setNewItem(data[0]);
        setOldItem(null);
        if (setItemInAdditionalWindow != null)
        setItemInAdditionalWindow(data[0]);
      })();
    
    }
    catch {
      alert(`An error occurred. Please try again `);
    }
  }

  return (
    <div className={styles.back}>
      <div className={styles.updateWindow}>
        <p onClick={() => setOldItem(null)} className={styles.xbutton}>❌</p>
        <form onSubmit={handleSubmit}>
          {propertiesArr.map((prop) => {
            return (
              <>
                <label>{prop}</label>
                <input onChange={(e) => setNewItem(prev => {
                  let tempItem = { ...prev };
                  tempItem[prop] = e.target.value;
                  return tempItem;
                })} value={newItem[prop]}></input><br />
              </>
            )
          })}
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  )

}

export default UpdateCommentWindow