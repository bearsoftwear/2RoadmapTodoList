import type React from 'react';
import { useState } from 'react';

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  InputAdornment,
  Stack,
  Divider,
  Avatar,
} from '@mui/material';
import {
  Search,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  ArrowForward,
  FilterList,
  ViewAgenda, AddCircleSharp,
} from '@mui/icons-material';

// Task type definition
interface Task {
  id: string;
  type: 'Documentation' | 'Bug' | 'Feature';
  title: string;
  description?: string;
  dueDate?: string;
  status: 'In Progress' | 'Backlog' | 'Todo' | 'Canceled' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
}

// Sample task data
const tasks: Task[] = [
  {
    id: 'TASK-8782',
    type: 'Documentation',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        "You can't compress the program without quantifying the open-source SSD...",
    dueDate: '2023-10-15',
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 'TASK-7678',
    type: 'Documentation',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    status: 'Backlog',
    priority: 'Medium',
  },
  {
    id: 'TASK-7839',
    type: 'Bug',
    title: 'We need to bypass the neural TCP card!',
    status: 'Todo',
    dueDate: '2023-10-15',
    priority: 'High',
  },
  {
    id: 'TASK-5562',
    type: 'Feature',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        'The SAS interface is down, bypass the open-source pixel so we can back...',
    status: 'Backlog',
    priority: 'Medium',
  },
  {
    id: 'TASK-8686',
    type: 'Feature',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: 'Canceled',
    dueDate: '2023-10-15',
    priority: 'Medium',
  },
  {
    id: 'TASK-1280',
    type: 'Bug',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        'Use the digital TLS panel, then you can transmit the haptic system!',
    status: 'Done',
    priority: 'High',
  },
  {
    id: 'TASK-7262',
    type: 'Feature',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        'The UTF8 application is down, parse the neural bandwidth so we can back...',
    status: 'Done',
    dueDate: '2023-10-15',
    priority: 'High',
  },
  {
    id: 'TASK-1138',
    type: 'Feature',
    title: 'Lorem ipsum dolor sit amet.',
    description:
        "Generating the driver won't do anything, we need to quantify the 1080p S...",
    status: 'In Progress',
    priority: 'Medium',
  },
  {
    id: 'TASK-7184',
    type: 'Feature',
    title: 'We need to program the back-end THX pixel!',
    status: 'Todo',
    priority: 'Low',
  },
];

function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<null | HTMLElement>(null)
  const [viewAnchorEl, setViewAnchorEl] = useState<null | HTMLElement>(null)


  // Handle checkbox selection
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = tasks.map((task) => task.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const handleSelect = (id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, id];
    } else {
      newSelected = selected.filter((item) => item !== id);
    }

    setSelected(newSelected);
  };

  // Render status chip with appropriate color
  const renderStatusChip = (status: Task['status']) => {
    let color:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning' = 'default';

    switch (status) {
      case 'In Progress':
        color = 'primary';
        break;
      case 'Backlog':
        color = 'secondary';
        break;
      case 'Todo':
        color = 'info';
        break;
      case 'Canceled':
        color = 'error';
        break;
      case 'Done':
        color = 'success';
        break;
    }

    return (
        <Chip
            size="small"
            color={color}
            label={status}
            sx={{
              borderRadius: '4px',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
        />
    );
  };

  // Render priority indicator
  const renderPriority = (priority: Task['priority']) => {
    let icon = <ArrowForward sx={{ fontSize: 16 }} />;
    let color = 'text.secondary';

    switch (priority) {
      case 'High':
        icon = <ArrowUpward sx={{ fontSize: 16 }} />;
        color = 'error.main';
        break;
      case 'Low':
        icon = <ArrowDownward sx={{ fontSize: 16 }} />;
        color = 'info.main';
        break;
    }

    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Box sx={{ color }}>{icon}</Box>
          <Typography variant="body2" color="text.secondary">
            {priority}
          </Typography>
        </Stack>
    );
  };

  // Render type badge
  const renderType = (type: Task['type']) => {
    let color = 'text.secondary';

    switch (type) {
      case 'Bug':
        color = 'error.main';
        break;
      case 'Feature':
        color = 'primary.main';
        break;
      case 'Documentation':
        color = 'info.main';
        break;
    }

    return (
        <Typography variant="body2" sx={{ color, fontWeight: 500 }}>
          {type}
        </Typography>
    );
  };

  // Menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handlePriorityOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPriorityAnchorEl(event.currentTarget)
  }

  const handlePriorityClose = () => {
    setPriorityAnchorEl(null)
  }

  const handleViewOpen = (event: React.MouseEvent<HTMLElement>) => {
    setViewAnchorEl(event.currentTarget)
  }

  const handleViewClose = () => {
    setViewAnchorEl(null)
  }

  return (
      <>
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Welcome back!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Here's a list of your tasks for this month!
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: "success.main" }}>
                <AddCircleSharp />
              </Avatar>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <TextField
                  placeholder="Filter tasks..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                    ),
                  }}
                  sx={{ maxWidth: 300 }}
              />

              <Button variant="outlined" startIcon={<FilterList />} onClick={handleFilterOpen} size="small">
                Status
              </Button>
              <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose}>
                <MenuItem onClick={handleFilterClose}>All</MenuItem>
                <MenuItem onClick={handleFilterClose}>In Progress</MenuItem>
                <MenuItem onClick={handleFilterClose}>Backlog</MenuItem>
                <MenuItem onClick={handleFilterClose}>Todo</MenuItem>
                <MenuItem onClick={handleFilterClose}>Canceled</MenuItem>
                <MenuItem onClick={handleFilterClose}>Done</MenuItem>
              </Menu>

              <Button variant="outlined" startIcon={<FilterList />} onClick={handlePriorityOpen} size="small">
                Priority
              </Button>
              <Menu anchorEl={priorityAnchorEl} open={Boolean(priorityAnchorEl)} onClose={handlePriorityClose}>
                <MenuItem onClick={handlePriorityClose}>All</MenuItem>
                <MenuItem onClick={handlePriorityClose}>High</MenuItem>
                <MenuItem onClick={handlePriorityClose}>Medium</MenuItem>
                <MenuItem onClick={handlePriorityClose}>Low</MenuItem>
              </Menu>

              <Box sx={{ flexGrow: 1 }} />

              <Button variant="outlined" startIcon={<ViewAgenda />} onClick={handleViewOpen} size="small">
                View
              </Button>
              <Menu anchorEl={viewAnchorEl} open={Boolean(viewAnchorEl)} onClose={handleViewClose}>
                <MenuItem onClick={handleViewClose}>Table</MenuItem>
                <MenuItem onClick={handleViewClose}>Board</MenuItem>
                <MenuItem onClick={handleViewClose}>Calendar</MenuItem>
              </Menu>


            </Box>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'divider' }}
            >
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                          indeterminate={
                              selected.length > 0 && selected.length < tasks.length
                          }
                          checked={
                              tasks.length > 0 && selected.length === tasks.length
                          }
                          onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">Title</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">Due Date</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">Status</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2">Priority</Typography>
                    </TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tasks.map((task) => {
                    const isItemSelected = isSelected(task.id);

                    return (
                        <TableRow
                            key={task.id}
                            hover
                            selected={isItemSelected}
                            sx={{
                              '&.Mui-selected': {
                                backgroundColor: 'action.selected',
                              },
                            }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                                checked={isItemSelected}
                                onClick={() => handleSelect(task.id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: 0.5,
                                }}
                            >
                              <Box
                                  sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                  }}
                              >
                                <Box sx={{ minWidth: 100 }}>
                                  <Typography
                                      variant="caption"
                                      color="text.secondary"
                                  >
                                    {task.id}
                                  </Typography>
                                  {renderType(task.type)}
                                </Box>
                                <Divider orientation="vertical" flexItem />
                                <Box>
                                  <Typography variant="body2">
                                    {task.title}
                                  </Typography>
                                  <Typography
                                      variant="caption"
                                      color="text.secondary"
                                  >
                                    {task.description}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {task.dueDate || 'No due date'}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {renderStatusChip(task.status)}
                          </TableCell>
                          <TableCell align="right">
                            {renderPriority(task.priority)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small" onClick={handleMenuOpen}>
                              <MoreVert fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
              <MenuItem onClick={handleMenuClose}>Duplicate</MenuItem>
              <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose}>Archive</MenuItem>
            </Menu>
          </Paper>
        </Box>
      </>
  );
}

export default App;
