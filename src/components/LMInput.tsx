import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface DynamicInputProps {
  label: string;
  type: string;
onChange: any;
}

const LMInput = (props:DynamicInputProps) => {
    const  {label, type,  onChange} = props;
    const handleChange = (e: any) => {
        const newValue = e.target.value;
    
        // Validate and format input if needed
        onChange(newValue);
      };

  return (
    <TextField
    style={{
      backgroundColor: "#eee",
      borderRadius: "5px",
      // padding: "12px 15px",
      margin: "8px 0",
      width: "100%",
    }}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
    //   value={value}
    onChange={(e) => handleChange(e)}
    />
  );
};

export default LMInput;
