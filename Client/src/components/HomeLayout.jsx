import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import styles from '../css/HomeLayout.module.css'
function HomeLayout() {

  async function getItemsFunc(url, setListOfItems, setStatusForScreen, setListOfAllItems = null) {
    try {
      const response = await fetch(`http://localhost:1234/${url}`);
      deleteItemFunc;
      if (!response.ok) {
        throw response.statusText;
      }
      const data = await response.json();
      console.log(data);
      setListOfItems(data);
      if (setListOfAllItems) {
        setListOfAllItems(data);
      }
      setStatusForScreen(true);
    } catch {
      alert("An error occurred. Please try again ");
    }
  }

  async function deleteItemFunc(url, item, filteredItems, setFilteredItems, allItems = null, setAllItems = null) {
    if (confirm("Are You Sure that You Want to Delete this item?")) {
      try {
        debugger;
        //delete item form server
        const response = await fetch(`http://localhost:1234/${url}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },

        });
        if (!response.ok) {
          throw response.statusText;
        }

        //delete item from screen
        let currentItemIndex = filteredItems.findIndex((e) => e == item);
        let tempItemsArr = [...filteredItems];
        tempItemsArr.splice(currentItemIndex, 1);
        setFilteredItems(tempItemsArr);
        if (allItems && setAllItems) {
          currentItemIndex = allItems.findIndex((e) => e == item);
          tempItemsArr = [...allItems];
          tempItemsArr.splice(currentItemIndex, 1);
          setAllItems(tempItemsArr);
        }
      } catch {
        alert(`An error occurred. Please try again `);
      }

    }
  }
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <Header currentUser={currentUser} />
      <main>
        <Outlet context={{ currentUser: currentUser, deleteItemFunc, getItemsFunc }} />
      </main>
      <Footer />
    </>
  )
}

export default HomeLayout