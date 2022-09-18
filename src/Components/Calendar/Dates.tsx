import { useState } from "react";
import { iDate } from "../../models/iDate";
import { getDatesArray } from "../../utilities/calendar.utility"
import { iScheduleDate, transformScheduleDates } from "../../utilities/schedule.utility";
import DateComponent from "./Date";

type DatesType = {
    month: number,
    year: number,
    firstWeekDay: number
}

export default function Dates({month, year, firstWeekDay}: DatesType) {
    const currentDate = new Date();
    const datesArray = getDatesArray(month, year, firstWeekDay);
    const schedulesArr = transformScheduleDates(datesArray, {
        firstDate: {
            date: 16,
            month: 8,
            year: 2022
        },
        countOfWorkdays: 4,
        countOfWeekends: 2
    });
    
    const [activeDate, setActiveDate] = useState<iDate>({
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear()
    }); 

    return (
        <div className="dates week">
            {schedulesArr.map((item: iScheduleDate) => 
                <DateComponent
                    key={`${new Date(item.year, item.month, item.date).getTime()}`}
                    date={item.date}
                    month={item.month}
                    year={item.year}
                    isCurrentMonth={item.month === month && item.year === year}
                    isActive={
                        item.date === activeDate.date &&
                        item.month === activeDate.month &&
                        item.year === activeDate.year
                    }
                    setActive={setActiveDate}
                    workday={item.workday}
                />
            )}
        </div>
    )
}