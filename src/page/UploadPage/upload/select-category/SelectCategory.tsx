import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './SelectCategory.module.scss';

interface SelectOption {
  value:string;
  label:string;
}

interface SelectSmallProps {
  id: string;
  label: string;
  onBlur: () => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  options: SelectOption[];
}

export default function SelectSmall({ id, label, onBlur, setCategory, options }: SelectSmallProps) {
  const [category, setLocalCategory] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const selectedCategory = event.target.value;
    setLocalCategory(selectedCategory);
    setCategory(selectedCategory);
  };

  return (
    <div className={styles.selectCategory}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <FormControl sx={{ flex: 1, height: '46px' }} size="small">
        <InputLabel 
        id="demo-select-small-label">카테고리</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id={id}
          value={category}
          label="category"
          onChange={handleChange}
          onBlur={onBlur}
          sx={{
            width: '100%',
            height: '46px',
            lineHeight: '46px', 
            '& .MuiOutlinedInput-input': {
              height: '46px',
              padding: '0 14px',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: '1px solid #e5e7eb',
              borderRadius:'7px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgb(75, 75, 75)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid rgb(255, 130, 85)',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
