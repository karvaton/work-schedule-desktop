import { iDate } from "./calendar.utility";

interface DateType extends iDate {
    currentMonth: boolean
}

export default function Date({date, month, year, currentMonth}: DateType) {
    return (
        <div
            className={`date${currentMonth ? ' current-month' : ''}`}
            key={`${date < 10 ? `0${date}` : date}${month < 10 ? `0${month}` : month}${year}`}
        >
            {date}
        </div>
    )
}