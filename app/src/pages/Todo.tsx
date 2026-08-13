import { useTasks } from "../context/TaskContext"

function Todo() {

    const { tasks, toggleTask } = useTasks()

    const incompleteTasks = tasks.filter(
        (task) => !task.completed
    )

    const completedTasks = tasks.filter(
        (task) => task.completed
    )

    return (
        <section className="todo">

            <div className="todo-header">

                <div>
                    <span className="planner-label">
                        FLIGHT DECK
                    </span>

                    <h1>
                        Stay on course.
                    </h1>

                    <p>
                        Stay organized for a smooth flight.
                    </p>
                </div>

            </div>


            <section className="todo-section">

                <div className="todo-section-header">

                    <h2>
                        Tasks
                    </h2>

                    <span>
                        {incompleteTasks.length}
                    </span>

                </div>


                <div className="todo-list">

                    {incompleteTasks.map((task) => (

                        <div
                            className="todo-task"
                            key={task.id}
                        >

                            <button
                                type="button"
                                className="todo-checkbox"
                                onClick={() => toggleTask(task.id)}
                                aria-label={`Complete ${task.title}`}
                            />

                            <div className="todo-task-info">

                                <strong>
                                    {task.title}
                                </strong>

                                <span>
                                    {task.subject}
                                </span>

                            </div>

                            <div className="todo-task-meta">

                                <span>
                                    {task.estimatedMinutes} min
                                </span>

                                <span>
                                    {task.dueDate}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {completedTasks.length > 0 && (

                <section className="todo-section completed-section">

                    <div className="todo-section-header">

                        <h2>
                            Completed
                        </h2>

                        <span>
                            {completedTasks.length}
                        </span>

                    </div>


                    <div className="todo-list">

                        {completedTasks.map((task) => (

                            <div
                                className="todo-task completed"
                                key={task.id}
                            >

                                <button
                                    type="button"
                                    className="todo-checkbox checked"
                                    onClick={() => toggleTask(task.id)}
                                    aria-label={`Mark ${task.title} incomplete`}
                                >
                                    ✓
                                </button>

                                <div className="todo-task-info">

                                    <strong>
                                        {task.title}
                                    </strong>

                                    <span>
                                        {task.subject}
                                    </span>

                                </div>

                                <div className="todo-task-meta">

                                    <span>
                                        {task.estimatedMinutes} min
                                    </span>

                                    <span>
                                        {task.dueDate}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            )}

        </section>
    )
}

export default Todo