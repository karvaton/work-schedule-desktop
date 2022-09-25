import { iDate } from "./iDate";

export interface TypesOfSchedule {
    id: number
    title: string
    value: number
    color?: `#${string}`
}

export interface iSchedule {
    id: number
    title: string
    firstDate: iDate
    types: TypesOfSchedule[]
    exceptions: Record<number, number>
}

export interface iSchedules {
    schedules: iSchedule[]
    active: number
    editing: number
}