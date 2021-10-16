import React from "react";
import style from "./component.module.css";

const ListComponent = ({ toDo, toDoes, onHandleChange, onHandleSubmit, deleteTodo, editTodo ,onHandleChecked }) => {
  const TodoList = () => {
    return (
      <div className={style.list}>
        {toDoes.map((e) => (
          <div key={e.id}>
            <form onSubmit={(ev) => deleteTodo(ev, e.id)}>
              <input
                id={e.id}
                type="checkbox"
                className={style.check}
                onChange={(ev) => onHandleChecked(ev, e.id)}
                checked={e.checked}
              />
              <label htmlFor={e.id}></label>
              <p className={e.checked ? style.complete : null}>{e.toDo}</p>
              <button type="submit" className={style.delete}>
                DEL
              </button>
              <button type='button' onClick={() => editTodo(e.id)}className={style.edit}>EDIT</button>
            </form>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={style.mainBox}>
        <form onSubmit={onHandleSubmit}>
          <input
            className={style.inputBox}
            type="text"
            value={toDo.toDo}
            placeholder="Agrega una tarea"
            onChange={onHandleChange}
          />
          <button className={style.add} type="submit">
            +
          </button>
        </form>
        <div>
          {toDoes.length ? (
            <TodoList />
          ) : (
            <div className={style.todoContainer}>
              <p>☕</p>
              <p>Tiempo de descancar, no hay tareas</p>
            </div>
          )}
        </div>
        <div className={style.clear}>
          <button onClick={(e) => deleteTodo(e, null, true)}>Clear All</button>
        </div>
      </div>
    </>
  );
};

export default ListComponent;