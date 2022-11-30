import { FormattedMessage, useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { iSchedule } from "../../models/iSchedules";
import { SchedulesSlice } from "../../state/reducers/schedules.slice";
import { ReactComponent as EditIcon } from '../../static/icons/edit-svgrepo-com.svg';
import { ReactComponent as DeleteIcon } from '../../static/icons/delete-svgrepo-com.svg';
import { useContext, useState } from "react";
import { TouchscreenContext } from "../../App";
import { ReactComponent as MoreIcon } from "../../static/icons/dot-menu-more-svgrepo-com.svg";
import useWindowSize from "../../hooks/useWindowSize";


type iSchedulePreview = Pick<iSchedule, 'id' | 'title'>

interface iSchedileListItem extends iSchedulePreview {
    openEdit: () => void
    openRemove: (value: Pick<iSchedule, 'id' | 'title'>) => void
}
export default function Schedule({ id, title, openRemove, openEdit }: iSchedileListItem) {
    const isTouchScreen = useContext<boolean>(TouchscreenContext);
    const [width] = useWindowSize();
    const isMobile = width < 600;
    const dispatch = useAppDispatch();
    const { active } = useAppSelector(state => state.schedules);
    const scheduleActions = SchedulesSlice.actions;
    const intl = useIntl();
    const [showMenu, setShowMenu] = useState(false);

    return (
        <li
            key={id}
            className={"schedules" + (id === active ? ' schedule-active' : "")}
            onClick={() => 
                dispatch(scheduleActions.activate({ id }))
            }
        >
            <span>{title}</span>
            {(isTouchScreen && isMobile) ? (
                <div className="schedule-manage-btns-wrapper">
                    <button
                        className="schedule-manage-btns-more"
                        onClick={e => {
                            e.stopPropagation();
                            setShowMenu(!showMenu);
                        }}
                    >
                        <MoreIcon height='25px'/>
                    </button>
                    {showMenu ? (
                        <>
                            <div className="schedule-manage-btns-collapse">
                                <button
                                    className="schedule-btn-edit"
                                    onClick={() => {
                                        setShowMenu(false);
                                        dispatch(scheduleActions.startEditing({ id }));
                                        openEdit();
                                    }}
                                    title={intl.formatMessage({
                                        id: "Edit this schedule",
                                        defaultMessage: "Edit this schedule"
                                    })}
                                >
                                    <FormattedMessage
                                        id="Edit"
                                        defaultMessage="Edit"
                                    />
                                </button>
                                <button
                                    className="schedule-btn-remove"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setShowMenu(false);
                                        openRemove({ id, title });
                                    }}
                                    title={intl.formatMessage({
                                        id: "Delete this schedule",
                                        defaultMessage: "Delete this schedule"
                                    })}
                                >
                                    <FormattedMessage
                                        id="Remove"
                                        defaultMessage="Remove"
                                    />
                                </button>
                            </div>
                            <div
                                className="schedule-manage-btns-collapse-wrapper"
                                onClick={e => {
                                    // e.preventDefault();
                                    e.stopPropagation();
                                    setShowMenu(false);
                                }}
                                onContextMenu={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowMenu(false);
                                }}
                            ></div>
                        </>
                    ) : null}
                </div>
            ) : (
                <div className="schedule-manage-btns">
                    <button
                        className="schedule-btn-edit"
                        onClick={() => {
                            dispatch(scheduleActions.startEditing({ id }));
                            openEdit();
                        }}
                        title={intl.formatMessage({
                            id: "Edit this schedule",
                            defaultMessage: "Edit this schedule"
                        })}
                    >
                        <EditIcon height={'15px'} width={'20px'} title='' />
                    </button>
                    <button
                        className="schedule-btn-remove"
                        onClick={e => {
                            e.stopPropagation();
                            openRemove({ id, title });
                        }}
                        title={intl.formatMessage({
                            id: "Delete this schedule",
                            defaultMessage: "Delete this schedule"
                        })}
                    >
                        <DeleteIcon height={'25px'} width={'20px'} title='' />
                    </button>
                </div>
            )}
        </li>
    );
}