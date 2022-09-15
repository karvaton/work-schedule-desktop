import { getDatesArray } from "./calendar.utility"

type DatesType = {
    month: number,
    year: number,
    firstWeekDay: number
}

export default function Dates({month, year, firstWeekDay}: DatesType) {
    const datesArray = getDatesArray(month, year, firstWeekDay);

    return (
        <div className="dates week">
            {datesArray.map((date, index) => 
                <div className="date" key={index}>
                    {date}
                </div>
            )}
        </div>
    )
}