import { useTasks } from "../context/TaskContext"
import { getTodaysReview } from "../utils/todaysReview"
import StudyPlan from "../components/StudyPlan"

function Home() {

    const { tasks } = useTasks()

    const today = new Date()
        .toISOString()
        .split("T")[0]

    const todaysTasks = tasks.filter(
        (task) =>
            task.dueDate === today &&
            !task.completed
    )

    const upcomingTasks = tasks
        .filter(
            (task) =>
                task.dueDate > today &&
                !task.completed
        )
        .sort(
            (a, b) =>
                a.dueDate.localeCompare(b.dueDate)
        )
        .slice(0, 2)

    const todaysReview =
        getTodaysReview(tasks)


    return (
        <section className="home">

            {/* GREETING */}

            <div className="home-header">

                <span className="home-label">
                    TODAY'S FLIGHT PLAN
                </span>

                <h1>
                    Good morning.
                </h1>

                <p>
                    Here's what you have lined up for today.
                </p>

            </div>

            {/* GENERATED STUDY PLAN */}
            <div className="home-section study-plan-section">
                <div className="home-section-header">
                    <div>
                        <button className="manage-study-time-button">
                            Manage study time
                        </button>
                        <span className="home-label">
                            ✦ GENERATED FOR YOU
                        </span>

                        <h2>
                            Your study plan
                        </h2>

                        <p>
                            Here's where I'd focus your time today.
                        </p>

                    </div>
                </div>

                <StudyPlan tasks={tasks} />
            </div>


            {/* TODAY */}

            <div className="home-section">

                <div className="home-section-header">

                    <h2>
                        Today
                    </h2>

                    <span>
                        {todaysTasks.length}{" "}
                        {todaysTasks.length === 1
                            ? "task"
                            : "tasks"}
                    </span>

                </div>


                <div className="task-list">

                    {todaysTasks.map((task) => (

                        <div
                            className="task"
                            key={task.id}
                        >

                            <div className="task-info">

                                <span className="task-subject">
                                    {task.subject}
                                </span>

                                <h3>
                                    {task.title}
                                </h3>

                            </div>

                            <span className="task-duration">
                                {task.estimatedMinutes} min
                            </span>

                        </div>

                    ))}


                    {todaysTasks.length === 0 && (

                        <div className="home-empty">

                            <strong>
                                Nothing scheduled today.
                            </strong>

                            <span>
                                Your runway is clear.
                            </span>

                        </div>

                    )}

                </div>

            </div>


            {/* TODAY'S REVIEW */}

            {todaysReview.length > 0 && (

                <div className="home-section review-section">

                    <div className="home-section-header">

                        <div>

                            <span className="home-label">
                                CHECKPOINT
                            </span>

                            <h2>
                                Today's review
                            </h2>

                        </div>

                    </div>


                    <div className="task-list">

                        {todaysReview.map((item) => (

                            <div
                                className="task"
                                key={item.task.id}
                            >

                                <div className="task-info">

                                    <span className="task-subject">
                                        {item.task.subject}
                                    </span>

                                    <h3>
                                        {item.task.title}
                                    </h3>

                                </div>

                                <span className="task-duration">
                                    {item.daysAgo}{" "}
                                    {item.daysAgo === 1
                                        ? "day"
                                        : "days"}{" "}
                                    ago
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            )}


            {/* UPCOMING */}

            <div className="home-section upcoming">

                <div className="home-section-header">

                    <h2>
                        Up next
                    </h2>

                </div>


                <div className="upcoming-list">

                    {upcomingTasks.map((task) => (

                        <div
                            className="upcoming-item"
                            key={task.id}
                        >

                            <span>
                                {task.title}
                            </span>

                            <small>
                                {new Date(
                                    task.dueDate +
                                    "T00:00:00"
                                ).toLocaleDateString(
                                    "en-US",
                                    {
                                        weekday: "long",
                                    }
                                )}
                            </small>

                        </div>

                    ))}


                    {upcomingTasks.length === 0 && (

                        <div className="home-empty">

                            <span>
                                Nothing coming up.
                            </span>

                        </div>

                    )}

                </div>

            </div>

        </section>
    )
}

export default Home