import '../../style/calendar.css';
import { useAppSelector } from '../../hooks/redux';
import useWindowSize from '../../hooks/useWindowSize';
import CalendarSettings from './CalendarSettings';
import CalendarSwicther from './CalendarSwitch';
import Dates from './Dates';
import WeekDays from './WeekDays';
import CalendarInfo from './CalendarInfo';
import { ReactComponent as MenuIcon } from "../../static/icons/menu-svgrepo-com.svg";


type CalendarType = {
    openMenu?: () => void
}
export default function Calendar({ openMenu }: CalendarType) {
    const lang = localStorage.getItem('lang') || navigator.language || 'en-US';
    const { active } = useAppSelector(state => state.schedules);
    const { month, year, settings: {firstWeekday} } = useAppSelector(state => state.calendar);
    const [width] = useWindowSize();
    const isMobile = width < 700;
    const monthFullName = new Intl.DateTimeFormat(lang, { month: isMobile ? 'short' : 'long' }).format(new Date(year, month));

    return (
        <div className="calendar-area">
            <div className="calendar-management">
                {isMobile ? (
                    <button className="open-menu-btn" onClick={openMenu}>
                        <MenuIcon height='28px' />
                    </button>
                ) : null}
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
