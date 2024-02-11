import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SchedulesSlice } from '../../state/reducers/schedules.slice';
import { iSchedule } from '../../models/iSchedules';
import Schedule from './Schedule-new';
import AddSchudleDialog from './AddSchudleDialog-new';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import AddIcon from '@mui/icons-material/Add';


export const drawerWidth = 240;

interface Props {
    window?: () => Window;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function MenuDrawer({ window, setOpen, open }: Props) {
    const [openedConfirmDialog, toggleConfirmDialog] = useState<Pick<iSchedule, "id" | "title"> | false>(false);
    const [openedAddScheduleDialog, toggleAddScheduleDialog] = useState<boolean>(false);
    const scheduleActions = SchedulesSlice.actions;
    const { schedules } = useAppSelector(state => state.schedules);
    const dispatch = useAppDispatch();

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {schedules.map(({ id, title }) =>
                    <Schedule
                        key={id}
                        id={id}
                        title={title}
                        openEdit={() => toggleAddScheduleDialog(true)}
                        openRemove={toggleConfirmDialog}
                    />
                )}
                <ListItem>
                    <ListItemButton onClick={() => toggleAddScheduleDialog(true)}>
                        <ListItemText primary={
                            <FormattedMessage
                                id='Add schedule'
                                defaultMessage='Add schedule'
                            />
                        } />
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="schedule list"
            >
                <SwipeableDrawer
                    container={container}
                    variant="temporary"
                    open={open}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </SwipeableDrawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer >
            </Box>
            <AddSchudleDialog
                open={openedAddScheduleDialog}
                closeFn={() => toggleAddScheduleDialog(false)} 
            />
        </>
    );
}