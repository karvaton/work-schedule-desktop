import { useState } from 'react';
import '../style/calendar.css';
import CalendarSettings from './CalendarSettings';
import CalendarSwicther from './CalendarSwitch';
import Dates from './Dates';
import WeekDays from './WeekDays';


export default function Calendar() {
    const date = new Date();
    const [firstWeekDay, setFirstWeekDay] = useState<number>(1);
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth());

    return (
        <div className="calndar-area">
            <div className="calendar-settings">
                <CalendarSwicther changeYearHandler={setYear} changeMonthHandler={setMonth} />
                <CalendarSettings changeFirstDayHandler={setFirstWeekDay} />
            </div>
            <div className="calendar">
                <WeekDays firstDay={firstWeekDay} />
                <Dates year={year} month={month} firstWeekDay={firstWeekDay} />
            </div>
        </div>
    )
}
