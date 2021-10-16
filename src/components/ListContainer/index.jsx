import React, { useEffect, useState } from "react";
import ListComponent from "../ListComponent";

const ListContainer = () => {
  const [toDo, setToDo] = useState({
    checked: false,
    toDo: "",
    id: null,
  });

  const [toDoes, setToDoes] = useState([]);

  const onHandleChange = (e) => {
    setToDo({
      toDo: e.target.value,
    });
  };

  const onHandleChecked = (e, id) => {
    const checks = toDoes.map((e) => {
      if (e.id === id) e.checked = !e.checked;
      return e;
    });
    setToDoes(checks);
    setLocal();
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (!toDo.toDo) return;
    toDo.id = toDoes.length + 1;
    setToDoes([...toDoes, toDo]);
    setToDo({ toDo: "", id: null });
  };

  const deleteTodo = (e, id, all) => {
    e.preventDefault();
    if (all) {
      setToDoes([]);
      localStorage.removeItem('toDo');
    } else {
      const deleted = toDoes.filter((e) => e.id !== id);
      if (deleted.length <= 1) localStorage.removeItem("toDo");
      localStorage.setItem("toDo", JSON.stringify(deleted));
      setToDoes(deleted);
    }
  };
  const editTodo = (id) => {
    // e.preventDefault();
    // const edited = toDoes.map((e) => {
    //   if (e.id === id) {
    //     e.toDo = newmessage;
    //   }
    //   return e;
    // });
   
    // setToDoes(edited);
    // return (
    //   <form>
    //     <input>
    //     nuevo texto
    //     </input>
    //     <button type='submit'>
    //     </button>
    //   </form>
    // )
    let newmessage = window.prompt('Type a new description');
    const edited = toDoes.map((t) => {
      if (t.id === id) {
        t.toDo = newmessage;
      }
      return t;
    });
   
    setToDoes(edited);
    console.log(newmessage)
  };

  const setLocal = () => {
    const data = JSON.parse(localStorage.getItem("toDo"));
    if (data && toDoes.length) {
      localStorage.setItem("toDo", JSON.stringify(toDoes));
    } else if (data) {
      setToDoes(data);
    } else {
      localStorage.setItem("toDo", JSON.stringify([]));
    }
  };

  useEffect(() => {
    setLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toDo.id]);

  return (
    <ListComponent
      toDo={toDo}
      toDoes={toDoes}
      onHandleChange={onHandleChange}
      onHandleSubmit={onHandleSubmit}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      onHandleChecked={onHandleChecked}
    />
  );
};

export default ListContainer;