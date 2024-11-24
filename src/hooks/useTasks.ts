// useTasks.ts
import { useCallback, useEffect, useState } from "react";

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
  
    const addTask = useCallback((taskName: string) => {
        setToDoList(prevToDoList => [...prevToDoList, { id: prevToDoList.length + 1, text: taskName, checked: false}]);
    }, [])

    const removeTask = useCallback((id: number) => {
        setToDoList(prevToDoList => prevToDoList.filter(task => task.id !== id));
        localStorage.removeItem('toDoList');
    }, []);
  
    const handleCheck = useCallback((id: number) => {
        setToDoList(prevToDoList => prevToDoList.map(task => task.id === id ? { ...task, checked: !task.checked } : task));
    }, []);

    return { toDoList, addTask, removeTask, handleCheck };
}