import '../../style/menu.css';
import { useContext, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import AddSchudleDialog from './AddSchudleDialog';
import Modal from '../Modal';
import { SchedulesSlice } from '../../state/reducers/schedules.slice';
import ConfirmDialog from './Confirm';
import { iSchedule } from '../../models/iSchedules';
import { ScheduleLI } from './ScheduleListItem';
import { FormattedMessage, useIntl } from 'react-intl';
import useWindowSize from '../../hooks/useWindowSize';
import { ReactComponent as MenuIcon } from "../../static/icons/menu-svgrepo-com.svg";
import { TouchscreenContext } from '../../App';


type MenuType = {
    opened?: number
    closeMenuFn: () => void
    openMenuFn: () => void
    setDrag: (value: boolean) => void
    setMoveStartX: (value: number) => void 
    isDrag: boolean
    moveStart: number
    changeOpen: (value: number) => void
    setTransparent: (value: number) => void
}
export default function Menu({ opened, closeMenuFn, openMenuFn, setDrag, setMoveStartX, isDrag, moveStart, changeOpen, setTransparent }: MenuType) {
    const isTouchScreen = useContext(TouchscreenContext);
    const [openedConfirmDialog, toggleConfirmDialog] = useState<Pick<iSchedule, "id" | "title"> | false>(false);
    const [openedAddScheduleDialog, toggleAddScheduleDialog] = useState<boolean>(false);
    const scheduleActions = SchedulesSlice.actions;
    const { schedules } = useAppSelector(state => state.schedules);
    const dispatch = useAppDispatch();
    const intl = useIntl();
    const [width] = useWindowSize();
    const isMobile = width < 700;

    function pointerMove(start: number, end: number) {
        const d = (end - start) / width;
        changeOpen(d * 100 + 100 < 100 ? d * 100 + 100 : 100);
        setTransparent(1 + d > .4 ? .4 : 1 + d > 0 ? 1 + d : 0);
    }

    return (
        <>
            <ul
                className="menu"
                style={{
                    transform: `translateX(${(opened ? opened : -10) - 100}%)`
                }} 
                onPointerDown={e => {
                    if (isTouchScreen) {
                        setDrag(true);
                        setMoveStartX(e.clientX);
                    }
                }}
                onPointerMove={e => {
                    isTouchScreen && isDrag && pointerMove(moveStart, e.clientX)
                }}
                onPointerUp={e => {
                    const d = (moveStart - e.clientX) / width;
                    
                    if (d > .35) {
                        closeMenuFn();
                    } else {
                        openMenuFn();
                    }
                    
                    setDrag(false);
                    setMoveStartX(0);
                }}

            >
                {isMobile ? (
                    <li>
                        <button className="open-menu-btn" onClick={closeMenuFn}>
                            <MenuIcon height='28px' />
                        </button>
                    </li>
                ) : null}
                {schedules.map(({ id, title }) => 
                    <ScheduleLI
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