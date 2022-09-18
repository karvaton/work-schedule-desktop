export interface iCalendarSettings {
    firstWeekday: number
}

export interface iCalendar {
    settings: iCalendarSettings
    month: number
    year: number
}
