import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  { name: 'Oliver Hansen', email: 'oliver@example.com', splashKey: 'oliver' },
  { name: 'Van Henry', email: 'van@example.com', splashKey: 'van' },
  { name: 'April Tucker', email: 'april@example.com', splashKey: 'april' },
  { name: 'Ralph Hubbard', email: 'ralph@example.com', splashKey: 'ralph' },
  { name: 'Omar Alexander', email: 'omar@example.com', splashKey: 'omar' },
  { name: 'Carlos Abbott', email: 'carlos@example.com', splashKey: 'carlos' },
  { name: 'Miriam Wagner', email: 'miriam@example.com', splashKey: 'miriam' },
  { name: 'Bradley Wilkerson', email: 'bradley@example.com', splashKey: 'bradley' },
  { name: 'Virginia Andrews', email: 'virginia@example.com', splashKey: 'virginia' },
  { name: 'Kelly Snyder', email: 'kelly@example.com', splashKey: 'kelly' },
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function App() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setPersonName(newValue);
  };

  const filterOptions = (options, { inputValue }) => {
    const filteredOptions = options.filter(
      (option) =>
        personName.indexOf(option) === -1 && option.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    return filteredOptions;
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Pick Users</h1>
      <Autocomplete
        multiple
        style={{margin:"100px",marginTop:"10px"}}
        id="demo-multiple-chip"
        value={personName}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
        options={names}
        getOptionLabel={(option) => option.name}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} label="Users" variant="outlined" />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props}>
<Avatar style={{marginRight:"12px"}}src={`https://source.unsplash.com/random/300×300`} alt={option.name[0]}></Avatar>            <div className='row'>
              <>{option.name}</>
              <span style={{ fontSize: 'small', color: 'gray', marginLeft: '25px' }}>{option.email}</span>
            </div>
          </MenuItem>
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              label={option.name}
              {...getTagProps({ index })}
              avatar={<Avatar src={`https://source.unsplash.com/random/300×300`} alt={option.name[0]}></Avatar>}
            />
          ))
        }
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />
    </div>
  );
}
