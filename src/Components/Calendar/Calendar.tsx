import { useAppSelector } from '../../hooks/redux';
import '../../style/calendar.css';
import CalendarSettings from './CalendarSettings';
import CalendarSwicther from './CalendarSwitch';
import Dates from './Dates';
import WeekDays from './WeekDays';


export default function Calendar() {
    const { month, year, settings: {firstWeekday} } = useAppSelector(state => state.calendar);    
    const monthFullName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month));

    return (
        <div className="calendar-area">
            <div className="calendar-management">
                <h2>{`${monthFullName}, ${year}`}</h2>
                <CalendarSwicther />
                <CalendarSettings />
            </div>
            <div className="calendar">
                <WeekDays firstDay={firstWeekday} />
                <Dates year={year} month={month} firstWeekDay={firstWeekday} />
            </div>
        </div>
    )
}
