import { React, useState, useEffect } from 'react'
import styles from '../css/AddWindow.module.css'

function AddWindow({ setIsAddWindowShow, baseItem, propertiesArr, url, setFilteredItems, setAllItems }) {
    debugger;
    const [input, setInput] = useState({ ...baseItem });

    function handleSubmit(e) {
        e.preventDefault();
        debugger;
        (async () => {
            try {
                const response = await fetch(`http://localhost:1234/${url}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(input)
                })
                if(response.status === 200){
                    const data = await response.json();
                    
                    debugger;
                    setFilteredItems(prev => {
                        prev.push(data[0]);
                        return [...prev]
                    })
                    if (setAllItems) {
                        setAllItems(prev => {
                            prev.push(data[0]);
                            return [...prev]
                        })
                    }
                    setIsAddWindowShow(false);
                }
            }
            catch (e) {
                alert(`An error ${e} occurred. Please try again`)
            }
        })()
    }

    return (
        <div className={styles.back}>
            <div className={styles.addWindow}>
                <p onClick={() => setIsAddWindowShow(false)} className={styles.xbutton} >❌</p>
                <form onSubmit={handleSubmit}>
                    {propertiesArr.map((prop) => {
                        return (
                            <>
                                <label>{prop}</label>
                                <input
                                    value={input[prop]}
                                    onChange={(e) => setInput(prev => {
                                        let tempItem = { ...prev };
                                        tempItem[prop] = e.target.value;
                                        return tempItem;
                                    })}
                                    type="text"
                                    required
                                /><br />
                            </>
                        )
                    })}
                    <button type='submit'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddWindow