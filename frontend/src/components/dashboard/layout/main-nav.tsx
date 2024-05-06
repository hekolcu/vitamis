'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { Scroll as ScrollIcon } from '@phosphor-icons/react/dist/ssr/Scroll';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import TextField from '@mui/material/TextField';

import { usePopover } from '@/hooks/use-popover';

import { MobileNav } from './mobile-nav';
import { UserPopover } from './user-popover';
import { useUser } from '@/hooks/use-user';
import { Link, Typography } from '@mui/material';
import { paths } from '@/paths';
export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const { user } = useUser();

  const userPopover = usePopover<HTMLDivElement>();

  /* const [search, setSearch] = React.useState<string>('');

  const handleSearch = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter') {
      window.open(`https://api.vitamis.hekolcu.com:8443/index.php?search=${search}`, '_blank');
    }
  }; */

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-background-paper)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <ListIcon />
            </IconButton>
            <Tooltip title='' onClick={() => {
              window.open('https://api.vitamis.hekolcu.com:8443/index.php/Vitamis', '_blank');
            }}>
              <IconButton sx={{ borderRadius: '10px' }}>
                <ScrollIcon color='black' />
                <Typography color='black' variant='caption' marginLeft='5px'>Makaleler</Typography>
              </IconButton>
            </Tooltip>
            {/* <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              variant="outlined"
              size="small"
              placeholder="Makale Ara"
            /> */}
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            {["Dietitian", "AcademicianDietitian"].includes(user?.userType!) ? <Tooltip title="Danışanlar">
            <Link href={paths.dashboard.advisee_management} underline='none'>
              <IconButton>
                <UsersIcon />
              </IconButton>
              </Link>
            </Tooltip> : null}
            {/* <Tooltip title="Notifications">
              <Badge badgeContent={4} color="success" variant="dot">
                <IconButton>
                  <BellIcon />
                </IconButton>
              </Badge>
            </Tooltip> */}
            <Avatar
              onClick={userPopover.handleOpen}
              ref={userPopover.anchorRef}
              src="/assets/avatar-default.png"
              sx={{ cursor: 'pointer' }}
            />
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
