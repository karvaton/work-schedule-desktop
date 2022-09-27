import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calendarSlice } from "../../state/reducers/calendar.slice";
import { createMonthArray, createYearArray } from "../../utilities/calendar.utility";
import { ReactComponent as BackIcon } from '../../static/icons/left-arrow-svgrepo-com.svg';
import { ReactComponent as ForwardIcon } from '../../static/icons/right-arrow-svgrepo-com.svg';
import { FormattedMessage, useIntl } from "react-intl";
import useWindowSize from "../../hooks/useWindowSize";
import { useContext } from "react";
import { TouchscreenContext } from "../../App";


const monthes = createMonthArray();

export default function CalendarSwicther() {
    const isTouchScreen = useContext<boolean>(TouchscreenContext)
    const { month, year } = useAppSelector(state => state.calendar);
    const { setYear, setMonth } = calendarSlice.actions;
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [width] = useWindowSize();
    const isMobile = width < 600;

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
            <button className="get-today" onClick={setToday}>
                <FormattedMessage
                    id="Today"
                    defaultMessage="Today"
                />
            </button>
            {(isMobile && isTouchScreen) ? null : (
                <>
                    <button
                        className="back"
                        onClick={back}
                        title={intl.formatMessage({
                            id: "Previous month",
                            defaultMessage: "Previous month"
                        })}
                    >
                        <BackIcon height={'20px'} width={'30px'} />
                    </button>
                    <button
                        className="forward"
                        onClick={forward}
                        title={intl.formatMessage({
                            id: "Next month",
                            defaultMessage: "Next month"
                        })}
                    >
                        <ForwardIcon height={'20px'} width={'30px'} />
                    </button>
                </>
            )}
            <select
                value={month}
                onChange={e => 
                    dispatch(setMonth(Number(e.target.value)))
                }
                title={intl.formatMessage({
                    id: "Choose month",
                    defaultMessage: "Choose month"
                })}
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
                title={intl.formatMessage({
                    id: "Choose year",
                    defaultMessage: "Choose year"
                })}
            >
                {createYearArray(year).map(year =>
                    <option key={year} value={year}>{year}</option>
                )}
            </select>
        </div>
    )    
}