// UserData.tsx
import React, { FC } from 'react';
import { Button, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserDataProps {
  userlist: any[];
  handleEdit: (userId: number) => void;
  ShowDltPopup: (userId: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemPerPage: number;
  sortState: string;
  setSortState: (state: string) => void;
  sortMethod: { [key: string]: { method: (a: any, b: any) => any } };
}

const UserData: FC<UserDataProps> = ({
  userlist,
  handleEdit,
  ShowDltPopup,
  currentPage,
  setCurrentPage,
  itemPerPage,
  sortState,
  setSortState,
  sortMethod,
}) => {
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = userlist.slice(indexOfFirstItem, indexOfLastItem);
  const sortedNames = [...currentItems].sort(sortMethod[sortState].method);

  return (
    <div className='table'>
      <TableContainer component={Paper}>
        <h2 style={{margin:'20px 0 5px 25%'}}>Userlist:</h2>
        <Table sx={{ width: '60%', marginLeft: '25%' }}>
          <TableHead>
            <TableRow style={{ backgroundColor: 'green', color: 'white', margin: '10%' }}>
              <TableCell style={{ padding: '10px' }}>UID</TableCell>
              <TableCell style={{ padding: '10px' }}>
                Name {''}{' '}
                <select value={sortState} onChange={(e) => setSortState(e.target.value)}>
                  <option value='none'>None</option>
                  <option value='ascending'>Asc</option>
                  <option value='descending'>Dsc</option>
                </select>
              </TableCell>
              <TableCell style={{ padding: '10px' }}>Contact</TableCell>
              <TableCell style={{ padding: '10px' }}>Email</TableCell>
              <TableCell style={{ padding: '10px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {sortedNames.map((item) => (
              <TableRow key={item.userId}>
                <TableCell>{item.userId}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell >
                  <Button sx={{color:'green'}} 
                    onClick={() => handleEdit(item.userId)}
                  >
                    <EditIcon/>
                  </Button>
                  <Button sx={{color:'red'}}
                    onClick={() => ShowDltPopup(item.userId)}
                  >
                    <DeleteIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      <div className='pagination'>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastItem >= userlist.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserData;
