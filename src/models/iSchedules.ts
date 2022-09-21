import { iDate } from "./iDate";

export interface TypesOfSchedule {
    id: number
    title: string
    value: number
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