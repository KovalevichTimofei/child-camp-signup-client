import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Man, Woman } from '@mui/icons-material';

function ChildrenList({ members }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Номер</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell align="right">Фамилия</TableCell>
            <TableCell align="right">Пол</TableCell>
            <TableCell align="right">Возраст</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((child, i) => (
            <TableRow
              key={child.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{i}</TableCell>
              <TableCell component="th" scope="row">
                {child.firstName}
              </TableCell>
              <TableCell align="right">{child.surName}</TableCell>
              <TableCell align="right">
                {child.gender === 'male' ? <Man /> : <Woman />}
              </TableCell>
              <TableCell align="right">{child.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ChildrenList.defaultProps = {
  members: [],
};

ChildrenList.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      surName: PropTypes.string,
      age: PropTypes.number,
      gender: PropTypes.string,
    })
  ),
};

export default ChildrenList;
