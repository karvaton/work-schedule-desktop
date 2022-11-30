import '../../style/menu.css';
import React, { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AddSchudleDialog from './AddSchudleDialog';
import Modal from '../Modal';
import { SchedulesSlice } from '../../state/reducers/schedules.slice';
import ConfirmDialog from './Confirm';
import { iSchedule } from '../../models/iSchedules';
import Schedule from './Schedule';
import { FormattedMessage, useIntl } from 'react-intl';
import useWindowSize from '../../hooks/useWindowSize';
import { ReactComponent as MenuIcon } from "../../static/icons/menu-svgrepo-com.svg";
import { TouchscreenContext } from '../../App';


type MenuType = {
    openedValue: number
    closeMenu: () => void
    isDrag: boolean
    transparent: number
    startDrag: (event: React.PointerEvent<HTMLElement>) => void
    dragging: (event: React.PointerEvent<HTMLElement>) => void
    finishDrag: (event: React.PointerEvent<HTMLElement>, d: number) => void
}
export default function Menu({ openedValue, closeMenu, isDrag, transparent, startDrag, dragging, finishDrag }: MenuType) {
    const isTouchScreen = useContext(TouchscreenContext);
    const [openedConfirmDialog, toggleConfirmDialog] = useState<Pick<iSchedule, "id" | "title"> | false>(false);
    const [openedAddScheduleDialog, toggleAddScheduleDialog] = useState<boolean>(false);
    const scheduleActions = SchedulesSlice.actions;
    const { schedules } = useAppSelector(state => state.schedules);
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [width] = useWindowSize();
    const isMobile = width < 700;

    return (
        <>
            {(isTouchScreen) ? (
                (transparent) ? (
                    <div
                        className="menu-wrapper"
                        onClick={closeMenu}
                        style={{
                            backgroundColor: `rgba(0, 0, 0, ${transparent})`,
                        }}
                        // onPointerDown={e => startDrag(e)}
                        // onPointerUp={e => finishDrag(e)}
                    ></div>
                ) : null
            ) : null}
            <ul
                className="menu"
                style={{
                    transform: `translateX(${(openedValue ? openedValue : -10) - 100}%)`
                }} 
                onPointerDown={e => isTouchScreen && startDrag(e)}
                onPointerMove={e => isTouchScreen && isDrag && dragging(e)}
                onPointerUp={e => finishDrag(e, .65)}
            >
                {isMobile ? (
                    <li>
                        <button className="open-menu-btn" onClick={closeMenu}>
                            <MenuIcon height='28px' />
                        </button>
                    </li>
                ) : null}
                {schedules.map(({ id, title }) => 
                    <Schedule
                        key={id}
                        id={id}
                        title={title}
                        openEdit={() => toggleAddScheduleDialog(true)}
                        openRemove={toggleConfirmDialog} 
                    />
                )}
                <li
                    className="add-schedule schedules"
                    onClick={() => toggleAddScheduleDialog(true)}
                >
                    <FormattedMessage
                        id='Add schedule'
                        defaultMessage='Add schedule'
                    /> +
                </li>
                {openedConfirmDialog ? 
                    <Modal darkBackground opened={!!openedConfirmDialog.id}>
                        <ConfirmDialog
                            question={intl.formatMessage({
                                id: "Delete schedule",
                                defaultMessage: `Delete schedule "{title}"?`
                            }, {
                                title: openedConfirmDialog.title 
                            })}
                            onAccept={() => {
                                dispatch(scheduleActions.remove({ id: openedConfirmDialog.id }));
                                toggleConfirmDialog(false);
                            }}
                            onDecline={() => toggleConfirmDialog(false)}
                        />
                    </Modal> 
                : null}
            </ul>
            <Modal darkBackground opened={openedAddScheduleDialog}>
                <AddSchudleDialog closeFn={() => toggleAddScheduleDialog(false)} />
            </Modal>
        </>
    )
}