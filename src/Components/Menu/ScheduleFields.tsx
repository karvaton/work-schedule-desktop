import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import palette from "../../utilities/palette.utility";
import { TypesOfSchedule } from "../../models/iSchedules";


interface iTypesOfSchedule extends TypesOfSchedule {
    removeField: () => void
    updateFields: (value: TypesOfSchedule) => void
    enableRemoving?: boolean
} 
export default function ScheduleFiedlds({ removeField, updateFields, enableRemoving, id, ...types }: iTypesOfSchedule) {
    const intl = useIntl();
    const [title, setTitle] = useState<string>(types.title || '');
    const [value, setValue] = useState<number>(types.value || 0);
    const defaultColor = palette.getColor(id);
    const [color, setColor] = useState<string>(types.color || defaultColor || '#ffffff');

    useEffect(() => {        
        if (color !== defaultColor) {
            palette.removeColor(id);
        }
    }, [id, color, defaultColor]);
    
    return (
        <>
            <input
                type="text"
                inputMode="text"
                className="schedule-field-title"
                value={title}
                onChange={e => {
                    const title = e.target.value || '';
                    setTitle(title);
                    updateFields({ id, title, value, color });
                }}
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
                onChange={e => {
                    const value = Number(e.target.value.match(/\d/g)?.join('')) || 0;
                    setValue(value);
                    updateFields({ id, title, value, color });
                }}
            />
            <input
                type="color" 
                value={color}
                onChange={e => {
                    const color = e.target.value;
                    setColor(color);
                    updateFields({ id, title, value, color });
                }}
            />
            <button
                onClick={() => {
                    removeField();
                    palette.removeColor(id);
                }}
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