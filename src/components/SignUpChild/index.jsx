import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stack,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { addChild } from '../../services';
import Context from '../../context';

export default function SignUpChild() {
  const [firstName, changeFirstname] = useState();
  const [surName, changeSurname] = useState();
  const [age, changeAge] = useState();
  const [gender, changeGender] = useState('female');
  const navigate = useNavigate();
  const [context = {}, setContext] = useContext(Context);

  const onSave = useCallback(async () => {
    const signUpResult = await addChild({
      firstName,
      surName,
      age,
      gender,
      signUpId: +localStorage.getItem('signUpId'),
    });
    localStorage.setItem('signUpResult', signUpResult);
    setContext({ ...context, signUpResult });
    navigate('/child-added');
  }, [firstName, surName, age, gender, context]);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100%',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
      }}
    >
      <Typography variant="h5">Данные о ребёнке</Typography>
      <TextField
        required
        id="firstName"
        label="Имя"
        variant="outlined"
        value={firstName}
        // eslint-disable-next-line react/jsx-no-bind
        onInput={(val) => changeFirstname(val.target.value)}
      />
      <TextField
        required
        id="surName"
        label="Фамилия"
        variant="outlined"
        value={surName}
        onInput={(val) => changeSurname(val.target.value)}
      />
      <TextField
        required
        id="age"
        label="Возраст"
        variant="outlined"
        value={age}
        onInput={(val) => changeAge(+val.target.value)}
      />
      <FormControl>
        <FormLabel id="gender-controlled-radio-buttons-group">Пол</FormLabel>
        <RadioGroup
          aria-labelledby="gender-controlled-radio-buttons-group"
          defaultValue="female"
          name="gender-radio-buttons-group"
          value={gender}
          onChange={(val) => changeGender(val.target.value)}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Женский"
          />
          <FormControlLabel value="male" control={<Radio />} label="Мужской" />
        </RadioGroup>
      </FormControl>
      <Button
        variant="contained"
        size="large"
        sx={{ width: '100%' }}
        onClick={onSave}
      >
        Сохранить
      </Button>
      <Button
        variant="contained"
        size="large"
        sx={{ width: '100%' }}
        onClick={() => navigate('/teams')}
      >
        Назад
      </Button>
    </Stack>
  );
}
