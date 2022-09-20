import { iDate } from "./iDate";

export interface TypesOfSchedule {
    title: string
    value: number
}

export interface iSchedule {
    id: number
    title: string
    firstDate: iDate
    countOfWorkdays: number
    countOfWeekends: number
    types: TypesOfSchedule[]
    exceptions: Record<number, number>
}

export interface iSchedules {
    schedules: iSchedule[]
    active: number
    editing: number
}