import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calendarSlice } from "../../state/reducers/calendar.slice";
import { createMonthArray, createYearArray } from "../../utilities/calendar.utility";
import { ReactComponent as BackIcon } from '../../static/icons/left-arrow-svgrepo-com.svg';
import { ReactComponent as ForwardIcon } from '../../static/icons/right-arrow-svgrepo-com.svg';


const monthes = createMonthArray();

export default function CalendarSwicther() {
    const { month, year } = useAppSelector(state => state.calendar);
    const { setYear, setMonth } = calendarSlice.actions;
    const dispatch = useAppDispatch();

    function back() {
        const prevMonth = month - 1 < 0 ?
            month + 11 :
            month - 1;
            
        dispatch(setMonth(prevMonth));
        if (prevMonth === 11) {
            dispatch(setYear(year - 1));
        }
    }

    function forward() {
        const nextMonth = month + 1 > 11 ?
            month - 11 :
            month + 1;

        dispatch(setMonth(nextMonth));
        if (nextMonth === 0) {
            dispatch(setYear(year + 1));
        }
    }

    function setToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        dispatch(setMonth(month));
        dispatch(setYear(year));
    }

    return (
        <div className="calendar-switcher">
            <button className="get-today" onClick={setToday}>Today</button>
            <button className="back" onClick={back} title="Previous month">
                <BackIcon height={'20px'} width={'30px'} />
            </button>
            <button className="forward" onClick={forward} title="Next month">
                <ForwardIcon height={'20px'} width={'30px'} />
            </button>
            <select
                value={month}
                onChange={e => 
                    dispatch(setMonth(Number(e.target.value)))
                }
            >
                {monthes.map((month, index) =>
                    <option key={index} value={index}>{month}</option>
                )}
            </select>
            <select
                value={year}
                onChange={e => 
                    dispatch(setYear(Number(e.target.value)))
                }
                title="Choose month"
            >
                {createYearArray(year).map(year =>
                    <option key={year} value={year}>{year}</option>
                )}
            </select>
        </div>
    )    
}