import { getDatesArray } from "./calendar.utility"
import Date from "./Date";

type DatesType = {
    month: number,
    year: number,
    firstWeekDay: number
}

export default function Dates({month, year, firstWeekDay}: DatesType) {
    const datesArray = getDatesArray(month, year, firstWeekDay);

    return (
        <div className="dates week">
            {datesArray.map(({date, year, ...item}) => 
                <Date
                    date={date}
                    month={month}
                    year={year}
                    currentMonth={item.month === month} 
                />
            )}
        </div>
    )
}