import { useAppSelector } from '../../hooks/redux';
import '../../style/calendar.css';
import CalendarSettings from './CalendarSettings';
import CalendarSwicther from './CalendarSwitch';
import Dates from './Dates';
import WeekDays from './WeekDays';


export default function Calendar() {
    const { month, year, settings: {firstWeekday} } = useAppSelector(state => state.calendar)

    return (
        <div className="calendar-area">
            <div className="calendar-management">
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
