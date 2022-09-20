import { DateType } from "./Date";

interface AddExceptionMenuType extends Pick<DateType, 'workday'> {
    close: () => void
}
export default function AddExceptionMenu({ workday, close }: AddExceptionMenuType) {
    return (
        <div className="context-menu">
            <div onClick={close}>
                {workday ? (
                    'Set this date a weekend'
                ) : null}
                {workday === false ? (
                    'Set this date a workday'
                ) : null}
            </div>
        </div>
    )
}