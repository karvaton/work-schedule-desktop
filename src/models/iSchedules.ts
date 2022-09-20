import { iDate } from "./iDate";

export interface iSchedule {
    id: number
    title: string
    firstDate: iDate
    countOfWorkdays: number
    countOfWeekends: number
    exceptions?: number[]
}

export interface iSchedules {
    schedules: iSchedule[]
    active: number
    editing: number
}