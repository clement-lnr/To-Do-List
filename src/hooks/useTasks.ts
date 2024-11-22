// useTasks.ts
import { useEffect, useState } from "react";

interface TaskItem {
    id: number;
    text: string;
    checked: boolean;
}

export default function useTasks() {
    const [ toDoList, setToDoList ] = useState<TaskItem[]>([]);

    useEffect (() => {
        const data = localStorage.getItem('toDoList');
        if (data) {
            setToDoList(JSON.parse(data));
        }
    }, []);

    useEffect (() => {
        toDoList.length > 0 &&
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
    }, [toDoList])
  
    const addTask = (taskName: string) => {
        const newTask = {
            id: toDoList.length + 1,
            text: taskName,
            checked: false
        };
        setToDoList([...toDoList, newTask]);
    }

    const removeTask = (id: number) => {
        const updatedList = toDoList.filter(task => task.id !== id);
        setToDoList(updatedList);
        toDoList.length === 1 && localStorage.removeItem('toDoList');
    }
  
    const handleCheck = (id: number) => {
      const updatedList = toDoList.map(task =>
        task.id === id ? { ...task, checked: !task.checked } : task
      );
      setToDoList(updatedList);
    };

    return { toDoList, addTask, removeTask, handleCheck };
}