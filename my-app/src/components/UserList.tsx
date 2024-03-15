import React, { FC, useEffect, useState, ChangeEvent } from 'react';
import Form from './Form';
import UserData from './UserData'
import DeletePopup from './DeletePopup';
import { getLocalStorage, setLocalStorage } from './Service';


const UserList: FC = () => {
  
  const [user, setUser] = useState<{name:string, contact:string, email:string}>({ name: '', contact: '', email: '' });
  const [userlist, setUserlist] = useState<any[]>([]);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [popup, setPopup] = useState<number|boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortState, setSortState] = useState('none');

  useEffect(() => {
    getLocalStorage()
      .then((storedUserlist) => {
        setUserlist(storedUserlist);
      })
      .catch((error) => {
        console.error('Error retrieving data from local storage:', error);
      });
  }, []);

  const userId = Date.now();

  const sortMethod = {
    none: { method: (a: any, b: any) => null },
    ascending: { method: (a: any, b: any) => a.name.localeCompare(b.name) },
    descending: { method: (a: any, b: any) => b.name.localeCompare(a.name) },
  };

  const handleSearch = () => {
    getLocalStorage().then((storedUserlist) => {
      if (searchTerm.trim() === '') {
        setUserlist([...storedUserlist]);
      } else {
        const filteredList = storedUserlist.filter((item:any) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setUserlist([...filteredList]);
      }
    });
    setSearchTerm('');
  };

  const uniqueEmail = (user: any, isNewEntry: boolean) => {
    const ifEmailMatched = userlist.findIndex((el) => el.email === user.email);

    if (ifEmailMatched >= 0 && isNewEntry) {
      setErrors({ ...errors, email: 'This email is already exist' });
      return true;
    }

    if (ifEmailMatched >= 0 && editUserId !== null && userlist[ifEmailMatched].userId !== editUserId) {
      setErrors({ ...errors, email: 'This email is already exist' });
      return true;
    }

    return false;
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmitBtn = () => {
    const { name, contact, email } = user;

    const newErrors: { [key: string]: string } = {};

    if (name === '') {
      newErrors.name = 'Enter user name';
    }

    if (contact === '') {
      newErrors.contact = 'Enter contact number';
    }

    if (contact.length !== 10) {
      newErrors.contact = 'Enter 10 digits valid number';
    }

    if (email === '' ) {
      newErrors.email = 'Enter email address';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newItem = { userId, ...user };

    if (editUserId) {
      const updatedUserlist = userlist.map((item) => (item.userId === editUserId ? { userId: editUserId, ...user } : item));

      if (uniqueEmail(user, false)) {
        return;
      }

      setUserlist(updatedUserlist);
      setLocalStorage(updatedUserlist);
      setEditUserId(null);
    } else {
      if (uniqueEmail(user, true)) {
        return;
      }

      setUserlist([newItem, ...userlist]);
      setLocalStorage([newItem, ...userlist]);
    }

    setUser({ name: '', contact: '', email: '' });
  };

  const handleEdit = (userId: number) => {
    const userToEdit = userlist.find((item) => item.userId === userId);
    setUser({ ...userToEdit });
    setEditUserId(userId);
  };

  const handleDelete = (userId: number) => {
    const updatedUserlist = userlist.filter((item) => item.userId !== userId);
    setLocalStorage(updatedUserlist);
    setUserlist(updatedUserlist);
    setPopup(false);
  };

  const ShowDltPopup = (userId: number) => {
    setPopup(userId);
  };

  const cancelDel = () => {
    setPopup(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(popup as number);
    setPopup(false);
  };

  return (
    <div>
      <Form
        handleInput={handleInput}
        handleSubmit={handleSubmitBtn}
        user={user}
        errors={errors}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <UserData 
        userlist={userlist}
        ShowDltPopup={ShowDltPopup}
        handleEdit={handleEdit}
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        setCurrentPage={setCurrentPage}
        sortMethod={sortMethod}
        sortState={sortState}
        setSortState={setSortState}
      />
      {popup && <DeletePopup cancelDel={cancelDel} handleConfirmDelete={handleConfirmDelete} />}
    </div>
  );
};

export default UserList;

