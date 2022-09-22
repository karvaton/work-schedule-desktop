import { useMemo, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { iDate } from "../../models/iDate";
import { getDatesArray } from "../../utilities/calendar.utility"
import { iScheduleDate, transformScheduleDates } from "../../utilities/schedule.utility";
import DateComponent from "./Date";

type DatesType = {
    month: number,
    year: number,
    firstWeekDay: number
}

export default function Dates({ month, year, firstWeekDay }: DatesType) {
    const currentDate = new Date();
    const datesArray = useMemo(() => getDatesArray(month, year, firstWeekDay), [month, year, firstWeekDay]);
    const {active, schedules} = useAppSelector(state => state.schedules);
    const schedule = useMemo(() => schedules.find(({ id }) => id === active), [active, schedules]);
    const schedulesArr = useMemo(() => transformScheduleDates(datesArray, schedule), [datesArray, schedule]);
    
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
                    type={item.type}
                />
            )}
        </div>
    )
}