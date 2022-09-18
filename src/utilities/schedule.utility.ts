import { iDate } from "../models/iDate";


export interface iScheduleDate extends iDate {
    workday: boolean | null
}

type InputScheduleDate = {
    firstDate: iDate,
    countOfWorkdays: number,
    countOfWeekends: number
}

export function transformScheduleDates(dates: iDate[], inputScheduleData: InputScheduleDate) {
    const { firstDate, countOfWeekends, countOfWorkdays } = inputScheduleData;
    let leftWorkdays = countOfWorkdays;
    let leftWeekends = countOfWeekends - 1;
    const firstDateTimestamp = getTimestamp(firstDate);
    
    return dates.map((date): iScheduleDate => {
        const dateTimestamp = getTimestamp(date);
        
        if (dateTimestamp >= firstDateTimestamp) {            
            if (leftWorkdays) {
                leftWorkdays -= 1;
                return { ...date, workday: true }
            } else if (leftWeekends) {
                leftWeekends -= 1;
                return { ...date, workday: false }
            } else {
                leftWeekends = countOfWeekends - 1;
                leftWorkdays = countOfWorkdays;
                return { ...date, workday: false }
            }
        }
        return { ...date, workday: null }
    });
}


function getTimestamp({ date, month, year }: iDate) {
    return new Date(year, month, date).getTime();
}