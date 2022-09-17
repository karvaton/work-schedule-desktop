import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calendarSlice } from "../../state/reducers/calendar.slice";
import { createMonthArray, createYearArray } from "../../utilities/calendar.utility";


const monthes = createMonthArray();
const years = createYearArray();

export default function CalendarSwicther() {
    const { month, year } = useAppSelector(state => state.calendar);
    const { setYear, setMonth } = calendarSlice.actions;
    const dispatch = useAppDispatch();

    return (
        <div className="calendar-switcher">
            <select value={month} onChange={(e) => dispatch(setMonth(Number(e.target.value)))}>
                {monthes.map((month, index) =>
                    <option key={index} value={index}>{month}</option>
                )}
            </select>
            <select value={year} onChange={(e) => dispatch(setYear(Number(e.target.value)))}>
                {years.map(year =>
                    <option key={year} value={year}>{year}</option>
                )}
            </select>
        </div>
    )    
}