import React, { useState } from "react";
import { iDate } from "../../models/iDate";
import ContextMenu, { Offset } from "../ContextMenu";
import AddExceptionMenu from "./AddExceptionMenu";
import { getTimestamp } from "../../utilities/schedule.utility";
import palette, { Palette } from "../../utilities/palette.utility";
import { useAppSelector } from "../../hooks/redux";


export interface DateType extends iDate {
    isCurrentMonth: boolean,
    isActive: boolean,
    setActive: (value: iDate) => void
    type: number | null
    title?: string
}

function DateComponent({ date, month, year, isCurrentMonth, isActive, setActive, type, title }: DateType) {
    const currentDate = new Date();
    const isCurrentDate = currentDate.getFullYear() === year &&
        currentDate.getMonth() === month &&
        currentDate.getDate() === date;
    const [showContext, toggleContext] = useState<Offset | false>(false);
    const { active } = useAppSelector(state => state.schedules);

    function toggleContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        setActive({ date, month, year });
        const top = event.clientY;
        const left = event.clientX;
        toggleContext({ top, left });
    }

    let dateClass = 'date';
    if (isCurrentMonth) dateClass += ' current-month';
    if (isCurrentDate) dateClass += ' current-date';
    if (isActive) dateClass += ' active-date';
    
    let backgroundColor = '';
    if (type !== null) {
        backgroundColor = palette.getColor(type)
        if (!isCurrentMonth) {
            backgroundColor = Palette.highlight(backgroundColor);
        };
    } else {
        backgroundColor = '';
    };

    return (
        <div
            className={dateClass}
            onClick={() => setActive({ date, month, year })}
            onContextMenu={e => toggleContextMenu(e)}
            style={{ backgroundColor }}
            title={title}
        >
            {date < 10 ? `0${date}` : date}
            {(active && showContext) ? (
                <ContextMenu offset={showContext} close={() => toggleContext(false)} >
                    <AddExceptionMenu
                        type={type}
                        timestamp={getTimestamp({ date, month, year })}
                        close={() => toggleContext(false)}
                    />
                </ContextMenu>
            ) : null}
        </div>
    )
};

export default DateComponent;