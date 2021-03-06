/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  dueDate: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  let nextIdState = 0;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    nextIdState = nextIdState + 1;
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) =>
      prevState.map((todo: Itodo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (id: number) => {
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    const todoLength = todoState.length;
    const nextId = !!todoLength ? todoState[todoLength - 1].id + 1 : 1;

    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      })
    );
  };

  const loadData = () => {
    const data = localStorage.getItem("todos") || "[]";
    initialTodos = JSON.parse(data);
    if (initialTodos && initialTodos.length >= 1) {
      incrementNextId();
    }
    setTodoState(initialTodos);
  };

  const saveData = () => {
    localStorage.setItem("todos", JSON.stringify(todoState));
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
