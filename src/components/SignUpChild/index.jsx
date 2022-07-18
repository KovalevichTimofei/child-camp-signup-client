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
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { addChild, addChildToTeam } from '../../services';
import Context from '../../context';

export default function SignUpChild() {
  const [context = {}, setContext] = useContext(Context);
  const { teams = [] } = context;
  const [firstName, changeFirstname] = useState();
  const [surName, changeSurname] = useState();
  const [age, changeAge] = useState();
  const [gender, changeGender] = useState('female');
  const [isTeamAvailable, setTeamAvailable] = useState(false);
  const [team, setTeam] = useState(teams[0].id);
  const navigate = useNavigate();

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

  const onSaveToTeam = useCallback(async () => {
    const teamTitle = teams.find((el) => el.id === team).title;
    setContext({ ...context, signUpResult: teamTitle });
    const signUpResult = await addChildToTeam({
      firstName,
      surName,
      age,
      gender,
      signUpId: +localStorage.getItem('signUpId'),
      teamId: team,
      teamTitle,
    });
    localStorage.setItem('signUpResult', signUpResult);
    navigate('/child-added');
  }, [firstName, surName, age, gender, context, team]);

  const onSubmit = useCallback(() => {
    if (isTeamAvailable) {
      onSaveToTeam();
    } else {
      onSave();
    }
  }, [isTeamAvailable, onSave, onSaveToTeam]);

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
      <FormControlLabel
        control={
          <Checkbox
            value={isTeamAvailable}
            onInput={(val) => setTeamAvailable(val.target.checked)}
          />
        }
        label="Выбрать отряд вручную"
      />
      {isTeamAvailable ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Отряд</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={team}
            label="Team"
            onChange={(el) => setTeam(el.target.value)}
          >
            {teams.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : null}
      <Button
        variant="contained"
        size="large"
        sx={{ width: '100%' }}
        onClick={onSubmit}
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
