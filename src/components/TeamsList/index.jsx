import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography, Box, Button } from '@mui/material';
import { getTeams, dropChildren } from '../../services';
import Context from '../../context';
import ChildrenList from '../ChildrenList';

export default function TeamsList() {
  const navigate = useNavigate();
  const [context = {}, setContext] = useContext(Context);
  const [currentTeams, setCurrentTeams] = useState([]);
  const { teams = [] } = context;
  const signUpId = localStorage.getItem('signUpId');
  async function fetchData() {
    if (teams.length === 0 || teams[0].signUpId !== signUpId) {
      const result = await getTeams(signUpId);
      setCurrentTeams(result);
      const { signUpId: newId } = result[0];
      setContext({ ...context, teams: currentTeams, signUpId: newId });
    } else {
      setCurrentTeams(teams);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack sx={{ width: '100%', padding: '5%' }} spacing={3}>
      <Box
        sx={{
          display: 'flex',
          position: 'fixed',
          justifyContent: 'center',
          width: '100%',
          backgroundColor: 'white',
          top: 0,
          left: 0,
          margin: 0,
          padding: '10px',
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={dropChildren}
          sx={{ marginRight: '20px' }}
        >
          Удалить всё
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/add-child')}
        >
          Добавить ребёнка
        </Button>
      </Box>
      {currentTeams.map((team) => (
        <Fragment key={team.id}>
          <Typography
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >{`Отряд ${team.number} "${team.title}"`}</Typography>
          <ChildrenList members={team.members} />
        </Fragment>
      ))}
    </Stack>
  );
}

/* TeamsList.propTypes = {
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      title: PropTypes.string,
      members: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          firstname: PropTypes.string,
          surName: PropTypes.string,
          age: PropTypes.number,
          gender: PropTypes.string,
        })
      ),
    })
  ),
}; */
