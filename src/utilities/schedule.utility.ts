import { iDate } from "../models/iDate";
import { iSchedule } from "../models/iSchedules";


export interface iScheduleDate extends iDate {
    workday: boolean | null
}

export function transformScheduleDates(dates: iDate[], inputScheduleData?: iSchedule) {
    if (inputScheduleData) {
        const { firstDate, countOfWeekends, countOfWorkdays } = inputScheduleData;
        let leftWorkdays = countOfWorkdays;
        let leftWeekends = countOfWeekends - 1;
        const startDateTimestamp = getTimestamp(firstDate);

        if (startDateTimestamp < getTimestamp(dates[0])) {
            const dayDiff = getDatesDiff(firstDate, dates[0]);
            const dayNumber = dayDiff % (countOfWorkdays + countOfWeekends);
            leftWorkdays = leftWorkdays - dayNumber;
            
            if (leftWorkdays < 1) {
                leftWeekends = leftWeekends - dayNumber + countOfWorkdays;
                leftWorkdays = 0;
            }
        }

        return dates.map((date): iScheduleDate => {
            const dateTimestamp = getTimestamp(date);

            if (dateTimestamp >= startDateTimestamp) {
                if (leftWorkdays) {
                    leftWorkdays--;
                    return { ...date, workday: true }
                } else if (leftWeekends) {
                    leftWeekends--;
                    return { ...date, workday: false }
                } else {
                    leftWeekends = countOfWeekends - 1;
                    leftWorkdays = countOfWorkdays;
                    return { ...date, workday: false }
                }
            }
            return { ...date, workday: null }
        });
    } else {
        return dates.map(date => ({ ...date, workday: null }));
    }
}


function getTimestamp({ date, month, year }: iDate) {
    return new Date(year, month, date).getTime();
}


function getDatesDiff(start: iDate, current: iDate) {
    const timeDiff = getTimestamp(current) - getTimestamp(start);
    return Math.round(timeDiff/(1000 * 3600 * 24));
}

