import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import palette from "../../utilities/palette.utility";

export default function CalendarInfo() {
    const { active, schedules } = useAppSelector(state => state.schedules);
    const [opened/* , toggle */] = useState<boolean>(true);
    const types = schedules.find(({ id }) => id === active)?.types || [];
    
    return (
        <section className="calendar-info-container">
            {opened ? (
                <div className="calendar-info">
                    {/* <h3 className="calendar-info-header">
                        Info
                    </h3> */}
                    {types.map(({ id, title, color }) => (
                        <div key={id} className="calendar-info-item">
                            <div
                                className="color-item-example"
                                style={{ backgroundColor: color || palette.getColor(id) }}
                            ></div>
                            <span>{title}</span>
                        </div>
                    ))}
                </div>
            ) : null}
            {/* <button
                onClick={() => toggle(!opened)}
                title={opened ?
                    'Hide info' :
                    'Show info'
                }
            >
                {opened ? '<' : '>'}
            </button> */}
        </section>
    )
}