import '../../style/calendar.css';
import { useContext } from 'react';

import { LangContext } from '../../App';
import { useAppSelector } from '../../hooks/redux';
import CalendarSettings from './CalendarSettings';
import CalendarSwicther from './CalendarSwitch';
import Dates from './Dates';
import WeekDays from './WeekDays';
import CalendarInfo from './CalendarInfo';


export default function Calendar() {
    const lang = useContext<string>(LangContext);
    const { active } = useAppSelector(state => state.schedules);
    const { month, year, settings: {firstWeekday} } = useAppSelector(state => state.calendar);    
    const monthFullName = new Intl.DateTimeFormat(lang, { month: 'long' }).format(new Date(year, month));

    return (
        <div className="calendar-area">
            <div className="calendar-management">
                <h2>{`${monthFullName}, ${year}`}</h2>
                <CalendarSwicther />
                <CalendarSettings />
            </div>
            <div></div>
            <div className="calendar">
                <WeekDays firstDay={firstWeekday} />
                <Dates year={year} month={month} firstWeekDay={firstWeekday} />
            </div>
            {active ? (
                <CalendarInfo />
            ) : null}
        </div>
    )
}
