import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './SelectCategory.module.scss';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectOption {
  value:string;
  label:string;
}

interface SelectSmallProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  onBlur: () => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  options: SelectOption[];
  register:UseFormRegister<T>;
}

export default function SelectSmall<T extends FieldValues>({ id, label, setCategory, options, register }: SelectSmallProps<T>) {
  const [category, setLocalCategory] = React.useState('');

  // register로 받은 onChange를 사용하고, 그 안에서 handleChange를 호출
  const {onChange, ...rest} = register(id, { required: true });

  const handleChange = (e: SelectChangeEvent) => {
    const selectedCategory = e.target.value;
    setLocalCategory(selectedCategory);
    setCategory(selectedCategory);

    // 추가적으로 register에서 받은 onChange도 호출
    onChange(e);
  };

  return (
    <div className={styles.selectCategory}>
      <label htmlFor={id} className={styles.label}>
        {label}<span style={{color:'red'}}>*</span>
      </label>
      <FormControl sx={{ flex: 1, height: '43px' }} size="small">
        <InputLabel id="demo-select-small-label" sx={{fontSize:'14px', top:'4px'}}>카테고리</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id={id}
          value={category}
          label="category"
          onChange={handleChange}  // 여기서는 handleChange만 사용
          {...rest}  // 나머지 register 관련 속성을 적용
          sx={{
            width: '100%',
            height: '43px',
            lineHeight: '43px', 
            fontSize:'14px',
            '& .MuiOutlinedInput-input': {
              height: '43px',
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
              border: '1px solid #007bff',
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
