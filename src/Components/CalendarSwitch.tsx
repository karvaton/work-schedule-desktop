import { useState } from "react";
import { createMonthArray, createYearArray } from "./calendar.utility";


const monthes = createMonthArray();
const years = createYearArray();

type CalendarSwictherType = {
    changeYearHandler: React.Dispatch<React.SetStateAction<number>>,
    changeMonthHandler: React.Dispatch<React.SetStateAction<number>>
}
export default function CalendarSwicther({ changeYearHandler, changeMonthHandler }: CalendarSwictherType) {
    const date = new Date();
    const [activeMonth, setMonth] = useState(date.getMonth());
    const [activeYear, setYear] = useState(date.getFullYear());
    
    function changeMonth(month: number) {
        setMonth(month);
        changeMonthHandler(month);
    }
    function changeYear(month: number) {
        setYear(month);
        changeYearHandler(month);
    }

    return (
        <div>
            <select value={activeMonth} onChange={(e) => changeMonth(Number(e.target.value))}>
                {monthes.map((month, index) =>
                    <option key={index} value={index}>{month}</option>
                )}
            </select>
            <select value={activeYear} onChange={(e) => changeYear(Number(e.target.value))}>
                {years.map(year =>
                    <option key={year} value={year}>{year}</option>
                )}
            </select>
        </div>
    )    
}