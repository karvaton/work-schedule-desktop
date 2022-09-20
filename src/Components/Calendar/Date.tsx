import { useState } from "react";
import { iDate } from "../../models/iDate";
import ContextMenu, { Offset } from "../ContextMenu";
import AddExceptionMenu from "./AddExceptionMenu";

export interface DateType extends iDate {
    isCurrentMonth: boolean,
    isActive: boolean,
    setActive: (value: iDate) => void
    workday: boolean | null
}

export default function DateComponent({date, month, year, isCurrentMonth, isActive, setActive, workday}: DateType) {
    const currentDate = new Date();
    const isCurrentDate = currentDate.getFullYear() === year &&
        currentDate.getMonth() === month &&
        currentDate.getDate() === date;
    const [showContext, toggleContext] = useState<Offset | false>(false);

    function toggleContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        const top = event.clientY;
        const left = event.clientX;
        toggleContext({ top, left });
    }
    
    let dateClass = 'date';
    if (isCurrentMonth) dateClass += ' current-month';
    if (isCurrentDate) dateClass += ' current-date';
    if (isActive) dateClass += ' active-date';
    if (workday) dateClass += ' workday';
    else if (workday === false) dateClass += ' weekend';

    return (
        <div
            className={dateClass}
            onClick={() => setActive({ date, month, year })}
            onContextMenu={e => toggleContextMenu(e)}
        >
            {date}
            {showContext ? (
                <ContextMenu offset={showContext} >
                    <AddExceptionMenu
                        workday={workday}
                        close={() => toggleContext(false)} 
                    />
                </ContextMenu>
            ) : null}
        </div>
    )
}