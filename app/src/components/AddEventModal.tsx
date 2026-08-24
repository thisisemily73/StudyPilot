import { useState } from "react"

import { useEvents } from "../context/EventContext"

import type {
    Event,
    EventType,
} from "../types/Event"


type AddEventModalProps = {
    onClose: () => void
    event?: Event
}


const eventTypes: {
    value: EventType
    label: string
}[] = [

    {
        value: "class",
        label: "Class",
    },

    {
        value: "sport",
        label: "Sport",
    },

    {
        value: "club",
        label: "Club",
    },

    {
        value: "activity",
        label: "Activity",
    },

    {
        value: "personal",
        label: "Personal",
    },

    {
        value: "other",
        label: "Other",
    },

]


const weekdays = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
]


function AddEventModal({
    onClose,
    event,
}: AddEventModalProps) {

    const {
        addEvent,
        updateEvent,
        deleteEvent,
    } = useEvents()


    const isEditing =
        Boolean(event)


    const [title, setTitle] =
        useState(
            event?.title ?? ""
        )


    const [type, setType] =
        useState<EventType>(
            event?.type ?? "class"
        )


    const [recurring, setRecurring] =
        useState(
            event?.recurring ?? false
        )


    const [date, setDate] =
        useState(
            event?.date ?? ""
        )


    const [selectedDays, setSelectedDays] =
        useState<number[]>(
            event?.days ?? []
        )


    const [startTime, setStartTime] =
        useState(
            event?.startTime ?? "08:00"
        )


    const [endTime, setEndTime] =
        useState(
            event?.endTime ?? "09:00"
        )


    const [location, setLocation] =
        useState(
            event?.location ?? ""
        )


    function toggleDay(
        dayIndex: number
    ) {

        setSelectedDays((current) => {

            if (current.includes(dayIndex)) {

                return current.filter(
                    (day) =>
                        day !== dayIndex
                )
            }

            return [
                ...current,
                dayIndex,
            ].sort(
                (a, b) => a - b
            )
        })
    }


    function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault()


        if (
            !title.trim() ||
            !startTime ||
            !endTime
        ) {
            return
        }


        if (
            endTime <= startTime
        ) {

            window.alert(
                "End time must be after start time."
            )

            return
        }


        if (
            !recurring &&
            !date
        ) {

            window.alert(
                "Please choose a date."
            )

            return
        }


        if (
            recurring &&
            selectedDays.length === 0
        ) {

            window.alert(
                "Please choose at least one weekday."
            )

            return
        }


        const data = {

            title:
                title.trim(),

            type,

            recurring,

            date:
                recurring
                    ? undefined
                    : date,

            days:
                recurring
                    ? selectedDays
                    : undefined,

            startTime,

            endTime,

            location:
                location.trim() ||
                undefined,

        }


        if (event) {

            updateEvent({
                ...event,
                ...data,
            })

        } else {

            addEvent(data)

        }


        onClose()
    }


    function handleDelete() {

        if (!event) {
            return
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this event?"
            )


        if (!confirmed) {
            return
        }


        deleteEvent(event.id)

        onClose()
    }


    return (

        <div
            className="modal-overlay"
            onMouseDown={(e) => {

                if (
                    e.target ===
                    e.currentTarget
                ) {
                    onClose()
                }

            }}
        >

            <div className="task-modal">

                {/* HEADER */}

                <div className="task-modal-header">

                    <div className="task-modal-title">

                        <span className="task-modal-eyebrow">

                            {isEditing
                                ? "EDIT EVENT"
                                : "NEW EVENT"}

                        </span>

                        <h2>

                            {isEditing
                                ? "Update your event"
                                : "Add an event"}

                        </h2>

                    </div>


                    <button
                        type="button"
                        className="modal-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    {/* TITLE */}

                    <div className="form-field">

                        <label>
                            Event
                        </label>

                        <input
                            type="text"
                            placeholder="What do you have going on?"
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            autoFocus
                        />

                    </div>


                    {/* TYPE */}

                    <div className="form-field">

                        <label>
                            Type
                        </label>

                        <div className="task-type-options">

                            {eventTypes.map(
                                (eventType) => (

                                    <button
                                        key={
                                            eventType.value
                                        }
                                        type="button"
                                        className={
                                            type ===
                                            eventType.value
                                                ? "task-type-option selected"
                                                : "task-type-option"
                                        }
                                        onClick={() =>
                                            setType(
                                                eventType.value
                                            )
                                        }
                                    >

                                        {
                                            eventType.label
                                        }

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* RECURRING */}

                    <div className="form-field">

                        <label>
                            Recurring?
                        </label>

                        <div className="task-type-options">

                            <button
                                type="button"
                                className={
                                    !recurring
                                        ? "task-type-option selected"
                                        : "task-type-option"
                                }
                                onClick={() =>
                                    setRecurring(false)
                                }
                            >
                                No
                            </button>

                            <button
                                type="button"
                                className={
                                    recurring
                                        ? "task-type-option selected"
                                        : "task-type-option"
                                }
                                onClick={() =>
                                    setRecurring(true)
                                }
                            >
                                Yes
                            </button>

                        </div>

                    </div>


                    {/* DATE */}

                    {!recurring && (

                        <div className="form-field">

                            <label>
                                Date
                            </label>

                            <input
                                type="date"
                                value={date}
                                onChange={(e) =>
                                    setDate(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    )}


                    {/* WEEKDAYS */}

                    {recurring && (

                        <div className="form-field">

                            <label>
                                Days
                            </label>

                            <div className="event-weekday-options">

                                {weekdays.map(
                                    (day, index) => {

                                        const selected =
                                            selectedDays.includes(
                                                index
                                            )

                                        return (

                                            <button
                                                key={day}
                                                type="button"
                                                className={
                                                    selected
                                                        ? "event-weekday selected"
                                                        : "event-weekday"
                                                }
                                                onClick={() =>
                                                    toggleDay(
                                                        index
                                                    )
                                                }
                                            >
                                                {day}
                                            </button>

                                        )
                                    }
                                )}

                            </div>

                        </div>

                    )}


                    {/* TIME */}

                    <div className="form-row">

                        <div className="form-field">

                            <label>
                                Starts
                            </label>

                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) =>
                                    setStartTime(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        <div className="form-field">

                            <label>
                                Ends
                            </label>

                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) =>
                                    setEndTime(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>

                    </div>


                    {/* LOCATION */}

                    <div className="form-field">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="Optional"
                            value={location}
                            onChange={(e) =>
                                setLocation(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* ACTIONS */}

                    <div className="task-modal-footer">

                        {isEditing ? (

                            <button
                                type="button"
                                className="delete-task-button"
                                onClick={
                                    handleDelete
                                }
                            >
                                Delete event
                            </button>

                        ) : (
                            <div />
                        )}


                        <div className="task-modal-actions">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="add-task-button"
                            >
                                {isEditing
                                    ? "Save changes"
                                    : "Add event"}
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    )
}


export default AddEventModal