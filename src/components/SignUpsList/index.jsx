import React, { Fragment, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Stack,
} from '@mui/material';
import Context from '../../context';

function SignUpsList({ signUps }) {
  const lastElementIndex = signUps.length - 1;
  const navigate = useNavigate();
  const [context = {}, setContext] = useContext(Context);

  function checkSignUp(id) {
    setContext({ ...context, signUpId: id });
    localStorage.setItem('signUpId', id);
    navigate('/teams');
  }

  return (
    <Stack>
      <List
        component="nav"
        aria-label="signups"
        sx={{ backgroundColor: 'white' }}
      >
        {signUps.map((el, i) => (
          <Fragment key={el.id}>
            <ListItemButton onClick={() => checkSignUp(el.id)}>
              <ListItemText
                primary={`${el.title} (${el.info})`}
                secondary={el.dates}
              />
            </ListItemButton>
            {i < lastElementIndex ? <Divider /> : null}
          </Fragment>
        ))}
      </List>
    </Stack>
  );
}

SignUpsList.defaultProps = {
  signUps: [
    {
      id: 1,
      title: 'Первый заезд',
      dates: '12-16 июля 2022',
      info: '10-12 лет',
    },
    {
      id: 2,
      title: 'Второй заезд',
      dates: '19-23 июля 2022',
      info: '7-9 лет',
    },
  ],
};

SignUpsList.propTypes = {
  signUps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      dates: PropTypes.string,
      info: PropTypes.string,
    })
  ),
};

export default SignUpsList;
