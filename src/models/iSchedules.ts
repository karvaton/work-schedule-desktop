import { iDate } from "./iDate";

export interface iSchedule {
    id: number,
    title: string,
    firstDate: iDate
    countOfWorkdays: number
    countOfWeekends: number
}

export interface iSchedules {
    schedules: iSchedule[],
    active: number
}