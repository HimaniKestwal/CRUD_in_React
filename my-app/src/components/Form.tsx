import React, { FC, ChangeEvent } from 'react';

interface FormProps {
  user: { name: string; contact: string; email: string };
  searchTerm:string;
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  errors: { name?: string; contact?: string; email?: string };
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
}

const Form: FC<FormProps> = ({ user, searchTerm, handleInput, handleSubmit, errors, setSearchTerm, handleSearch }) => {
  console.log(searchTerm);

  return (
    <div className='formInput'>
      <h1>Input Userlist</h1>
      <div className='form'>
        <div>
          <label> Name:* </label>
          <input type='text' id='name' placeholder='xyz' name='name' value={user.name} onChange={handleInput} required />
          {errors.name && <p className='error'>{errors.name}</p>}
        </div>
        <div>
          <label> Contact No:* </label>
          <input type='tel' id='contactNo' placeholder='+91' name='contact' value={user.contact} onChange={handleInput} required maxLength={10} />
          {errors.contact && <p className='error'>{errors.contact}</p>}
        </div>
        <div>
          <label>Email:* </label>
          <input type='email' id='email' placeholder='xyz@gmail.com' name='email' value={user.email} onChange={handleInput} required />
          {errors.email && <p className='error'>{errors.email}</p>}
        </div>

        <div className='submit'>
          <button className='submitBtn' onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <div className='searchBar'>
          <input type='text' id='search' value={searchTerm} placeholder='Search...' name='search' onChange={(e) => setSearchTerm(e.target.value)}></input>
          <button className='searchBtn' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
