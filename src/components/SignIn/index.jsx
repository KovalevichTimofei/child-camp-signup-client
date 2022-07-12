import React, { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@mui/material';

export default function SignIn() {
  const [nickname, changeNickname] = useState();
  const [password, changePassword] = useState();

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100%' }}
    >
      <Typography variant="h5">Войти</Typography>
      <TextField
        required
        id="nickname"
        label="Имя"
        variant="outlined"
        value={nickname}
        onInput={changeNickname}
      />
      <TextField
        required
        id="password"
        label="Пароль"
        variant="outlined"
        type="password"
        value={password}
        onInput={changePassword}
      />
      <Button variant="contained" size="large" sx={{ width: '100%' }}>
        Подтвердить
      </Button>
    </Stack>
  );
}
