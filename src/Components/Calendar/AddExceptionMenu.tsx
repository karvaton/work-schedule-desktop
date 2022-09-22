import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";

interface AddExceptionMenuType {
    type: number | null
    timestamp: number
    close: () => void
}

export default function AddExceptionMenu({ type, timestamp, close }: AddExceptionMenuType) {
    const { active, schedules } = useAppSelector(state => state.schedules);
    const schedule = schedules.find(({ id }) => id === active);
    const types = schedule?.types.filter(({ id }) => id !== type) || [];
    const { addException } = SchedulesSlice.actions;
    const dispatch = useAppDispatch();

    function setException() {
        console.log(type);
        if (type !== null) {
            dispatch(addException([timestamp, type]));
        }
        close();
    }

    return (
        <div className="context-menu">
            {types.map(({ id, title }) => 
                <div key={id} className="option" onClick={setException}>
                    {`Set this date a '${title}'`}
                </div>
            )}
        </div>
    )
}