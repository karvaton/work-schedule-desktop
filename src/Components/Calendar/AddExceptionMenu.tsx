import { useAppSelector } from "../../hooks/redux";

interface AddExceptionMenuType {
    close: () => void
}

export default function AddExceptionMenu({ close }: AddExceptionMenuType) {
    const { active, schedules } = useAppSelector(state => state.schedules);
    const schedule = schedules.find(({ id }) => id === active);
    const types = schedule?.types || [];

    return (
        <div className="context-menu">
            {types.map(({ title, value }) => 
                <div key={value} className="option" onClick={close}>
                    {`Set this date a weekend ${title}`}
                </div>
            )}
        </div>
    )
}