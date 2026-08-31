import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type { Task } from "../types/Task"
import { useAuth } from "./AuthContext"

import {
    getTasks,
    saveTask,
    deleteTaskFromFirestore,
} from "../services/firestore"


type TaskContextType = {
    tasks: Task[]
    addTask: (task: Task) => void
    updateTask: (task: Task) => void
    toggleTask: (id: string) => void
    deleteTask: (id: string) => void
}


const TaskContext =
    createContext<TaskContextType | undefined>(
        undefined
    )


export function TaskProvider({
    children,
}: {
    children: ReactNode
}) {

    const { user } = useAuth()

    const [tasks, setTasks] =
        useState<Task[]>([])


    useEffect(() => {

        async function loadTasks() {

            if (!user) {
                setTasks([])
                return
            }

            try {

                const savedTasks =
                    await getTasks(user.uid)

                setTasks(savedTasks)

            } catch (error) {

                console.error(
                    "Failed to load tasks:",
                    error
                )

            }

        }

        loadTasks()

    }, [user])


    async function addTask(task: Task) {

        if (!user) return

        setTasks((currentTasks) => [
            ...currentTasks,
            task,
        ])

        try {

            await saveTask(
                user.uid,
                task
            )

        } catch (error) {

            console.error(
                "Failed to save task:",
                error
            )

        }

    }


    async function toggleTask(id: string) {

        if (!user) return

        const task =
            tasks.find(
                (task) =>
                    task.id === id
            )

        if (!task) return

        const updatedTask: Task = {
            ...task,
            completed: !task.completed,
        }

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? updatedTask
                    : task
            )
        )

        try {

            await saveTask(
                user.uid,
                updatedTask
            )

        } catch (error) {

            console.error(
                "Failed to update task:",
                error
            )

        }

    }


    async function updateTask(
        updatedTask: Task
    ) {

        if (!user) return

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === updatedTask.id
                    ? updatedTask
                    : task
            )
        )

        try {

            await saveTask(
                user.uid,
                updatedTask
            )

        } catch (error) {

            console.error(
                "Failed to update task:",
                error
            )

        }

    }


    async function deleteTask(
        id: string
    ) {

        if (!user) return

        setTasks((currentTasks) =>
            currentTasks.filter(
                (task) =>
                    task.id !== id
            )
        )

        try {

            await deleteTaskFromFirestore(
                user.uid,
                id
            )

        } catch (error) {

            console.error(
                "Failed to delete task:",
                error
            )

        }

    }


    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                toggleTask,
                deleteTask,
                updateTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}


export function useTasks() {

    const context =
        useContext(TaskContext)

    if (!context) {
        throw new Error(
            "useTasks must be used inside a TaskProvider"
        )
    }

    return context
}