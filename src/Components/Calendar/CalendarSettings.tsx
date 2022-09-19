import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { calendarSlice } from "../../state/reducers/calendar.slice";
import { createWeekDaysArray } from "../../utilities/calendar.utility"


const weekdays = createWeekDaysArray();

export default function CalendarSettings() {
    const [windowActive, setWindowActive] = useState<boolean>(false);
    const { firstWeekday } = useAppSelector(state => state.calendar.settings);
    const { setFirstWeekday } = calendarSlice.actions;
    const dispatch = useAppDispatch();

    let containerTimer: NodeJS.Timeout;
    function hideSettings(delay: number) {
        containerTimer = setTimeout(() => {
            setWindowActive(false);
        }, delay);
    }

    function unsetTimer() {
        clearTimeout(containerTimer);
    }

    return (
        <div className="calendar-settings">
            <button
                className="calendat-settings-btn"
                onClick={() => setWindowActive(!windowActive)}
                onMouseLeave={() => windowActive && hideSettings(500)}
            >
                Settings
            </button>
            {windowActive ? (
                <div
                    className="settings-container"
                    onMouseEnter={unsetTimer}
                    onMouseLeave={() => hideSettings(500)}
                >
                    <label htmlFor="choose-first-day">First day of week</label>
                    <select
                        value={firstWeekday}
                        onChange={e => 
                            dispatch(setFirstWeekday(Number(e.target.value)))
                        }
                    >
                        {weekdays.map((weekday, index) =>
                            <option key={index} value={index}>{weekday}</option>
                        )}
                    </select>
                </div>
            ) : null}
        </div>
    )
}