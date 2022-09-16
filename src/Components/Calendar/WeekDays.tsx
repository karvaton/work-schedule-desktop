import { createWeekDaysArray } from "../utilities/calendar.utility";

const daysOfWeek = createWeekDaysArray('short');

type WeekDaysType = {
    firstDay: number
}
export default function WeekDays({ firstDay }: WeekDaysType) {
    const first = daysOfWeek.slice(0, firstDay);
    const last = daysOfWeek.slice(firstDay);
    const weekDays = last.concat(first);

    return (
        <div className="week-days week">
            {weekDays.map(day => 
                <div key={day} className="week-day">{day}</div>
            )}
        </div>
    )
}