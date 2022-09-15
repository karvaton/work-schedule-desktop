import { useState } from "react";
import { createWeekDaysArray } from "./calendar.utility"

const weekdays = createWeekDaysArray();

type CalendarSettingsType = {
    changeFirstDayHandler: React.Dispatch<React.SetStateAction<number>>
}
export default function CalendarSettings({ changeFirstDayHandler }: CalendarSettingsType) {
    const [windowActive, setWindowActive] = useState<boolean>(false);
    const [activeDay, setActiveDay] = useState<number>(0);

    function changeFirstDay(value: number) {
        setActiveDay(value);
        changeFirstDayHandler(value);
    }

    return (
        <div className="calendar-settings">
            <button
                className="calendat-settings-btn"
                onClick={() => setWindowActive(!windowActive)}
            >
                Settings
            </button>
            {windowActive ? (
                <div className="settings-container">
                    <label htmlFor="choose-first-day">First day of week</label>
                    <select value={activeDay} onChange={e => changeFirstDay(Number(e.target.value))}>
                        {weekdays.map((weekday, index) =>
                            <option key={index} value={index}>{weekday}</option>
                        )}
                    </select>
                </div>
            ) : null}
        </div>
    )
}