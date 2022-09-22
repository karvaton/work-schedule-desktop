import { useState } from "react";
import { TypesOfSchedule } from "../../models/iSchedules";


interface iTypesOfSchedule extends TypesOfSchedule {
    removeField: () => void
    updateFields: (value: TypesOfSchedule) => void
    enableRemoving?: boolean
} 
export default function ScheduleFiedlds({ removeField, updateFields, enableRemoving, id, ...types }: iTypesOfSchedule) {
    const [title, setTitle] = useState<string>(types.title || '');
    const [value, setValue] = useState<number>(types.value || 0);

    function update(newTitle: string, newValue: number) {
        title !== newTitle && setTitle(newTitle);
        value !== newValue && setValue(newValue);
        updateFields({ id, title, value });
    }

    return (
        <>
            <input
                type="text"
                className="schedule-field-title"
                value={title}
                onChange={e => update(e.target.value || '', value)}
            />
            <input
                type="text"
                className="schedule-field-value"
                value={types.value ? `${types.value}` : ''}
                onChange={e => update(title, Number(e.target.value.match(/\d/g)?.join('')) || 0)}
            />
            <button onClick={removeField} disabled={enableRemoving}>
                <span className="remove-field"></span>
            </button>
        </>
    )
}