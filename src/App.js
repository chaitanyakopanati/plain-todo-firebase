import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebase';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


function App() {

  const [status, setStatus] = useState(false);

  const [addText, setAddText] = useState("");
  // const [editText, setEditText] = useState("");
  const [values, setValues] = useState([]);
  const [id, setId] = useState("");
  console.log(values, "Subjecttttttttttttttt")
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addText !== "") {
      await addDoc(collection(db, "todos"), {
        text: addText,
        completed: false,
      });
      setAddText("");
    }
  }

  useEffect(() => {
    const q = query(collection(db, "todos"));
    console.log("qqqqqqqqqq")

    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      console.log("todosArray::::::::::::", todosArray);
      setValues(todosArray);
    });
    return () => unsub();

  }, []);

  const handleEditText1 = async (value, index, id) => {
    console.log("valueeee", value, index, id)
    setValues(values.map((item, i) => {
      // console.log(item,i);
      if (i === index) {
        return { ...item, text: value }
      } else {
        return item
      }
    }))
  };
  // const userDoc=(doc(db, "todos",id ),{ addText: addText,completed: true });
  //  await updateDoc(userDoc);

  //   const handleEvent= async (value,el)=>{
  // if(value==completed){
  //   el.completed=!el.completed
  // }else{
  //   console.log("valueiddddddd",el.id,value)
  //   await updateDoc(doc(db, "todos", el.id), {text:value,completed: true });
  // }
  //   }
  // const handleEvent5= async (value,el)=>{
  //   if(value==el.completed){
  //     el.completed=!el.completed
  //   }else{
  //     console.log("valueiddddddd",el.id,value)
  //     await updateDoc(doc(db, "todos", el.id), {text:value,completed: true });
  //   }
  //     }

  const handleEditText2 = async (el) => {
    console.log("&&&&&", el);
    // await updateDoc(doc(db, "todos", el.id), {text:value,completed: true });
  };

  const handleEditText4 = (value, index) => {
    setValues(values.map((item, i) => {
      console.log(item);
      if (i === index) {
        return { ...item, text: value }
      } else {
        return item
      }
    }))
  }
  // const handleEdit4 = async () => {
  //   console.log(id, "elllllllllllllindexxxxxxxxxx")
  //   await updateDoc(doc(db, "todos", id), { text: text, num: num, completed: true });
  //   setName("");
  //   setNum("");
  // };
  // const handleEditText5 = (value, index) => {
  // const collRef=collection(db,"todos")
  //  updateDoc(collRef,{ text: value,completed:true})
  //  .then((resp)=>{
  //   console.log(resp.id)
  //  }).catch((err)=>{
  //   console.log(err.message)
  //  })
  // }
  // const handleEditText5 = (value, el) => {
  //   setValues(values.map((item, i) => {
  //     console.log(item,i);
  //     if (i === el.id) {
  //       return { ...item, text: value }
  //     } else {
  //       return item
  //     }
  //   }))
  // }
  const handleEditText = async (value, el) => {
    if (value == el.completed) {
      el.completed = !el.completed
    } else {
      const userDoc = (doc(db, "todos", el.id));
      console.log("userDocccccccccccc", el, value, el.id, el.text)
      await updateDoc(userDoc, { text: value, completed: true });
      // await updateDoc(doc(db, "todos", id), { addText: addText, completed: true });
      // setId(el.id)
    }
  }

  const changeEditHandler = (el) => {
    console.log("Selected valueeeeeee", el.text, el.id);
    setAddText(el.text)
    setId(el.id)
    setStatus(true);
  }

  const handleEdit = async (el) => {
    console.log(addText, "elllllllllllllindexxxxxxxxxx")
    //  await updateDoc(doc(db, "todos", id), { text:addText,completed: true });
    await updateDoc(doc(db, "todos", id), { text: addText, completed: false });
    // setAddText(addText)
    setAddText("");
    setStatus(false);
  };

  // const saveHandler=(e,el)=>{
  //   setAddText(e.target.value,el)
  // }
  const handleDelete = async (id) => {
    const userDoc = doc(db, "todos", id);
    await deleteDoc(userDoc)
  }

  return (<>
    <div className="App">
      <div className="container">
        {
          values.map((el, index) => {
            return (
              <div className="lisiting" key={index}>
                <input value={el.text} disabled={!el.completed} onChange={(e) => setAddText(e.target.value)} />&nbsp;
                <button onClick={() => { changeEditHandler(el, index) }}>Edit</button>
                {/* <button onClick={handleEdit}>Save</button> */}


                {/* <button
          className="button-edit"
          onClick={() => handleEditText(el,el?{completed:false}:{completed:true})}
        >
        Edit
        </button> */}
                {/* <button onClick={() => {
                  !el.completed ?changeEditHandler((el, index),setValues(values.map((el, i) => i === index ? { ...el, completed: true } : { ...el, completed: false }))) :
                  handleEdit((setValues(values.map((item, i) => i === index ? { ...item, completed: false } : item))))
                }}>
                  {!el.completed ? "Edit" : 'Save'}
                </button> */}
                {/* {!el.completed ?
                  <button onClick={() => setValues(values.map((el, i) => i === index ? { ...el, completed: true } : { ...el, completed: false }))}>Edit</button>
                  :
                  <button onClick={() => setValues(values.map((item, i) => i === index ? { ...item, completed: false } : item))}>Save</button>
                } */}
                &nbsp;<button onClick={() => handleDelete(el.id)}>Delete</button>&nbsp;
              </div>
            )
          })
        }
        <div className="add-item">
          <input
            placeholder="Add Text"
            value={addText}
            onChange={(e) => setAddText(e.target.value.trim())}
          />
          &nbsp;
          {status ? (<button onClick={handleEdit}>Save</button>) : (<button className="btn btn-success" type="submit" onClick={handleSubmit}>
            Add
          </button>)}
          &nbsp;&nbsp;
        </div>
      </div>
    </div>
  </>);
}

export default App;
