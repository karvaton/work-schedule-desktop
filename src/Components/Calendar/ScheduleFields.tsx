import { useState } from "react";
import { TypesOfSchedule } from "../../models/iSchedules";


interface iTypesOfSchedule extends TypesOfSchedule {
    removeField: () => void
    enableRemoving?: boolean
} 
export default function ScheduleFiedlds({ removeField, enableRemoving, ...types }: iTypesOfSchedule) {
    const [title, setTitle] = useState<string>(types.title || '');
    const [value, setValue] = useState<string>(types.value ? `${types.value}` : '');

    return (
        <>
        {/* <div key={types.id} className="schedule-type"> */}
            <input
                type="text"
                className="schedule-field-title"
                value={title}
                onChange={e => setTitle(e.target.value || '')}
            />
            <input
                type="text"
                className="schedule-field-value"
                value={value}
                onChange={e => setValue(e.target.value.match(/\d/g)?.join('') || '')}
            />
            <button onClick={removeField} disabled={enableRemoving}>
                <span></span>
            </button>
        {/* </div> */}
        </>
    )
}