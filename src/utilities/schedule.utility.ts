import { iDate } from "../models/iDate";
import { iSchedule, TypesOfSchedule } from "../models/iSchedules";


export interface iScheduleDate extends iDate {
    type: number | null
}

export function transformScheduleDates(dates: iDate[], inputScheduleData?: iSchedule) {
    if (inputScheduleData) {
        const { firstDate, exceptions, types } = inputScheduleData;
        let countOfScheduleDays = types.reduce((prevValue, { value }) => prevValue + value, 0);
        let daysLeft = countOfScheduleDays;
        const startDateTimestamp = getTimestamp(firstDate);

        if (startDateTimestamp < getTimestamp(dates[0])) {
            const dayDiff = getDatesDiff(firstDate, dates[0]);
            daysLeft = dayDiff % countOfScheduleDays;
        }

        return dates.map((date): iScheduleDate => {
            const dateTimestamp = getTimestamp(date);

            if (dateTimestamp >= startDateTimestamp) {
                let type = getType(types, daysLeft);
                if (Object.keys(exceptions).indexOf(`${dateTimestamp}`) > -1) {
                    type = exceptions[dateTimestamp];
                }
                return { ...date, type }
            }
            return { ...date, type: null }
        });
    } else {
        return dates.map(date => ({ ...date, type: null }));
    }
}


function getTimestamp({ date, month, year }: iDate) {
    return new Date(year, month, date).getTime();
}


function getDatesDiff(start: iDate, current: iDate) {
    const timeDiff = getTimestamp(current) - getTimestamp(start);
    return Math.round(timeDiff/(1000 * 3600 * 24));
}


function getType(types: TypesOfSchedule[], initValue: number): number | null {
    let type: number | null = null;
    let prevVal = 0;
    for (let i = types.length - 1; i >= 0; i--) {
        const { id, value } = types[i];
        if (value >= initValue - prevVal) {
            type = id;
            break;
        };
        prevVal += value;
    }
    return type;
}