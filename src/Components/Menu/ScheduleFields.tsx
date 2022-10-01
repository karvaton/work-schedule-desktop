import { useState } from "react";
import { useIntl } from "react-intl";
import { TypesOfSchedule } from "../../models/iSchedules";


interface iTypesOfSchedule extends TypesOfSchedule {
    removeField: () => void
    updateFields: (value: TypesOfSchedule) => void
    enableRemoving?: boolean
} 
export default function ScheduleFiedlds({ removeField, updateFields, enableRemoving, id, ...types }: iTypesOfSchedule) {
    const [title, setTitle] = useState<string>(types.title || '');
    const [value, setValue] = useState<number>(types.value || 0);
    const intl = useIntl();

    function update(newTitle: string, newValue: number) {
        if (title !== newTitle) {
            setTitle(newTitle);
            updateFields({ id, title: newTitle, value });
        }
        if (value !== newValue) {
            setValue(newValue);
            updateFields({ id, title, value: newValue });
        }
    }

    return (
        <>
            <input
                type="text"
                inputMode="text"
                className="schedule-field-title"
                value={title}
                onChange={e => update(e.target.value || '', value)}
                placeholder={intl.formatMessage({
                    id: "Work shift title",
                    defaultMessage: "Work shift title"
                })}
            />
            <input
                type="text"
                inputMode="decimal"
                className="schedule-field-value"
                value={value ? `${value}` : ''}
                onChange={e => update(title, Number(e.target.value.match(/\d/g)?.join('')) || 0)}
            />
            <button
                onClick={removeField}
                disabled={enableRemoving}
                title={intl.formatMessage({
                    id: "Delete this field",
                    defaultMessage: "Delete this field"
                })}
            >
                <span className="remove-field"></span>
            </button>
        </>
    )
}