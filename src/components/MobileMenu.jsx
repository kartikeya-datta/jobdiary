import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Brightness4, Brightness7 } from "@mui/icons-material";
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function MobileMenu({ 
  mobileMoreAnchorEl, 
  isMobileMenuOpen, 
  handleMobileMenuClose, 
  handleProfileMenuOpen, 
  handleJobApplicationOpen,
  handleFrequentUrlsDialogOpen,
  handleQuestionDialogOpen,
  handleInterviewListDialogOpen, 
  handleOfferListDialogOpen, 
  interviewCount,
  offerCount,
  colorMode,
  toggleColorMode }) {
  const mobileMenuId = 'primary-search-account-menu-mobile';
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleJobApplicationOpen}>
        <IconButton size="large" aria-label="New" color="inherit">
          <AddCircleIcon />
        </IconButton>
        <p>New</p>
      </MenuItem>
      <MenuItem onClick={handleFrequentUrlsDialogOpen}>
        <IconButton size="large" aria-label="New" color="inherit">
          <BookmarksIcon />
        </IconButton>
        <p>Bookmarks</p>
      </MenuItem>
      <MenuItem onClick={handleQuestionDialogOpen}>
        <IconButton size="large" aria-label="New" color="inherit">
          <QuestionAnswerIcon />
        </IconButton>
        <p>Q&A</p>
      </MenuItem>
      <MenuItem onClick={handleInterviewListDialogOpen}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={interviewCount} color="error">
            <EventAvailableIcon />
          </Badge>
        </IconButton>
        <p>Interviews</p>
      </MenuItem>
      <MenuItem onClick={handleOfferListDialogOpen}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={offerCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Offers</p>
      </MenuItem>
      <MenuItem onClick={toggleColorMode}>
        <IconButton size="large" color="inherit">
          {colorMode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <p>{ (colorMode === "dark" ? 'Light' : 'Dark') + ' Mode' }</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
}
