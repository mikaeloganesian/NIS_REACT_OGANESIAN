import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEventLog } from '../../context/EventContext';

interface EventLogProps {
  open: boolean;
  onClose: () => void;
}

export const EventLog: React.FC<EventLogProps> = ({ open, onClose }) => {
  const { events, clearEvents } = useEventLog();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          backgroundColor: '#1e1e2e',
          color: '#ffffff',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: '#ffffff' }}>
            System Event Log
          </Typography>
          <IconButton onClick={onClose} sx={{ color: '#ffffff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ bgcolor: '#444', mb: 2 }} />
        {events.length > 0 && (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={clearEvents}
            sx={{
              mb: 2,
              color: '#ffffff',
              borderColor: '#666',
              '&:hover': {
                borderColor: '#888',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
            fullWidth
          >
            Clear Events
          </Button>
        )}
        <List sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
          {events.length === 0 ? (
            <ListItem>
              <ListItemText
                primary="No events yet"
                sx={{ color: '#888', textAlign: 'center' }}
              />
            </ListItem>
          ) : (
            events.map((event, index) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    bgcolor: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                    borderRadius: 1,
                    mb: 0.5,
                  }}
                >
                  <ListItemText
                    primary={event}
                    primaryTypographyProps={{
                      sx: {
                        color: '#c0c0c0',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                      },
                    }}
                  />
                </ListItem>
              </React.Fragment>
            ))
          )}
        </List>
      </Box>
    </Drawer>
  );
};
