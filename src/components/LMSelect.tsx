import React, { ChangeEvent } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface DynamicSelectProps {
  label: string;
  options: string[];
//   value: string;
  onChange: any;
  name?:any;
}

const LMSelect = (props:DynamicSelectProps) => {
    const { label, options, onChange , name} = props;
    const handleChange = (e: any) => {
        const newValue = e.target.value;
    
        // Validate and format input if needed
        onChange(newValue);
      };
  return (
    <FormControl variant="outlined" fullWidth
    style={{
      backgroundColor: "#eee",
      borderRadius: "5px",
      // padding: "12px 15px",
      margin: "8px 0",
      width: "100%",
    }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        // name={name}
        // value={value}
        onChange={(e) => handleChange(e)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LMSelect;
