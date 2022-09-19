import { iDate } from "./iDate";

export interface iSchedule {
    id: number
    title: string
    firstDate: iDate
    countOfWorkdays: number
    countOfWeekends: number
    exeptions?: iDate[]
}

export interface iSchedules {
    schedules: iSchedule[]
    active: number
    editing: number
}