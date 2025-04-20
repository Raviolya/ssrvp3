import React from 'react';
import { Button as MuiButton } from '@mui/material';

function Button({ text, onClick, ...props }) {
  return (
    <MuiButton variant="contained" onClick={onClick} {...props}>
      {text}
    </MuiButton>
  );
}

export default Button;