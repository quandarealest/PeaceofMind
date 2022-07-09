import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { alpha, styled } from '@mui/material/styles';
import { ThemeProvider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { generateFilterOption } from './TableEnum'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mui.fontColor,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.8, 0, 0.8, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: `1px solid ${theme.palette.mui.main}`,
    '&:hover': {
      border: `1px solid ${theme.palette.mui.borderColor}`,
    },
    '&:focus': {
      border: `2px solid ${theme.palette.mui.onFocus}`,
    },
    color: theme.palette.mui.fontColor,
    borderRadius: '4px',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TableToolbar = (props) => {
  const { numSelected, tableName, isLoading, headCells, tableType } = props;
  const filterOptionHeadCells = generateFilterOption(headCells)
  const [option, setSelectedOption] = useState(filterOptionHeadCells[0])
  const navigate = useNavigate()

  const handleChangeFilterOption = (e) => {
    setSelectedOption(filterOptionHeadCells.find(opt => opt.value === e.target.value))
  }

  const handleNavigateToAddUser = () => {
    navigate('/user', {
      state: {
        newType: tableType
      }
    })
  }

  return (
    <ThemeProvider>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
            <Typography
              sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center' }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              {tableName}
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <FormControl size="small">
                <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={option.value}
                  label={option.title}
                  onChange={handleChangeFilterOption}
                >
                  {filterOptionHeadCells.map(opt => {
                    return <MenuItem value={opt.value}>{opt.title}</MenuItem>
                  })}
                </Select>
              </FormControl>
              <Tooltip title="Add New Row">
                <IconButton>
                  <PersonAddIcon onClick={handleNavigateToAddUser} />
                </IconButton>
              </Tooltip>
              {isLoading ? (
                <>
                  <CircularProgress sx={{ color: "#32c2b4", marginLeft: "5px" }} size={24} thickness={6} />
                </>
              ) : (null)}
            </Typography>
          )}

        {numSelected > 0 ? (
          numSelected > 1 ? (
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : (
              <>
                <Tooltip title="View">
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )
        ) : (
            // <Tooltip title="Filter list">
            //   <IconButton>
            //     <FilterListIcon />
            //   </IconButton>
            // </Tooltip>
            null
          )}
      </Toolbar>
    </ThemeProvider>
  );
};

export default TableToolbar;