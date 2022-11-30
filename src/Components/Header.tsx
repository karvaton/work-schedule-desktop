import React, { useContext, useState } from 'react';
import { LocaleContext } from '../App';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAppSelector } from '../hooks/redux';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsMenu from './SettingsMenu';


interface Props {
    openMenu: () => void
}

export default function Header({ openMenu }: Props) {
    const { month, year } = useAppSelector(state => state.calendar);
    const lang = useContext(LocaleContext).locale;
    const monthFullName = new Intl.DateTimeFormat(lang, { month: /* isMobile ? 'short' : */ 'long' }).format(new Date(year, month));

    const [anchorEl, setAnchorEl] =useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={openMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {monthFullName}, {year}
                </Typography>
                <IconButton
                    size="large"
                    aria-label="settings"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <SettingsIcon />
                </IconButton>
                <SettingsMenu anchor={anchorEl} handleClose={handleClose} />
            </Toolbar>
        </AppBar>
    );
}