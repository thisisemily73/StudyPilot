import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type { Task } from "../types/Task"
//import { initialTasks } from "../data/tasks"


type TaskContextType = {
    tasks: Task[]
    addTask: (task: Task) => void
    updateTask: (task: Task) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
}


const TaskContext = createContext<TaskContextType | undefined>(undefined)


export function TaskProvider({ children }: { children: ReactNode }) {

    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem("studypilot-tasks")

        return savedTasks
            ? JSON.parse(savedTasks)
            : []
    })

    useEffect(() => {
        localStorage.setItem(
            "studypilot-tasks",
            JSON.stringify(tasks)
        )
    }, [tasks])


    function addTask(task: Task) {
        setTasks((currentTasks) => [
            ...currentTasks,
            task,
        ])
    }


    function toggleTask(id: string) {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        )
    }


    function deleteTask(id: string) {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        )
    }

    function updateTask(updatedTask: Task) {
    setTasks((currentTasks) =>
        currentTasks.map((task) =>
            task.id === updatedTask.id
                ? updatedTask
                : task
        )
    )
}


    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                toggleTask,
                deleteTask,
                updateTask
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}


export function useTasks() {

    const context = useContext(TaskContext)

    if (!context) {
        throw new Error(
            "useTasks must be used inside a TaskProvider"
        )
    }

    return context
}