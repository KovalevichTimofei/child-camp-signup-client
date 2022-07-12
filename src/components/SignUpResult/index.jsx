import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Typography } from '@mui/material';

export default function SignUpResult() {
  const navigate = useNavigate();
  const signUpResult = localStorage.getItem('signUpResult');

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Typography>{`Ваш отряд: "${signUpResult}"`}</Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ width: '100%' }}
        onClick={() => navigate('/add-child')}
      >
        Продолжить
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ width: '100%' }}
        onClick={() => navigate('/teams')}
      >
        Отменить
      </Button>
    </Stack>
  );
}
