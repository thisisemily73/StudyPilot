import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"

import type {
    Event,
    EventType,
} from "../types/Event"


type CreateEventData = {
    title: string
    type: EventType

    recurring: boolean

    date?: string
    days?: number[]

    startTime: string
    endTime: string

    location?: string
}


type EventContextType = {
    events: Event[]

    addEvent: (
        event: CreateEventData
    ) => void

    updateEvent: (
        event: Event
    ) => void

    deleteEvent: (
        id: string
    ) => void
}


const EventContext =
    createContext<EventContextType | undefined>(
        undefined
    )


export function EventProvider({
    children,
}: {
    children: ReactNode
}) {

    const [events, setEvents] =
        useState<Event[]>(() => {

            const saved =
                localStorage.getItem(
                    "studypilot-events"
                )

            if (!saved) {
                return []
            }

            try {
                return JSON.parse(saved)
            } catch {
                return []
            }
        })


    useEffect(() => {

        localStorage.setItem(
            "studypilot-events",
            JSON.stringify(events)
        )

    }, [events])


    function addEvent(
        event: CreateEventData
    ) {

        setEvents((current) => [

            ...current,

            {
                ...event,
                id: crypto.randomUUID(),
            },

        ])
    }


    function updateEvent(
        event: Event
    ) {

        setEvents((current) =>
            current.map((existing) =>
                existing.id === event.id
                    ? event
                    : existing
            )
        )
    }


    function deleteEvent(
        id: string
    ) {

        setEvents((current) =>
            current.filter(
                (event) =>
                    event.id !== id
            )
        )
    }


    return (
        <EventContext.Provider
            value={{
                events,
                addEvent,
                updateEvent,
                deleteEvent,
            }}
        >
            {children}
        </EventContext.Provider>
    )
}


export function useEvents() {

    const context =
        useContext(EventContext)

    if (!context) {
        throw new Error(
            "useEvents must be used inside EventProvider"
        )
    }

    return context
}