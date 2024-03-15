import React, { FC } from 'react';

interface DeletePopupProps {
  cancelDel: () => void;
  handleConfirmDelete: () => void;
}

const DeletePopup: FC<DeletePopupProps> = ({ cancelDel, handleConfirmDelete }) => {
  return (
    <>
      <div className='deletePopup'>
        <h2>Do you want to delete?</h2>
        <button className='cancelBtn' onClick={cancelDel}>
          Cancel
        </button>
        <button className='confirmBtn' onClick={handleConfirmDelete}>
          Confirm
        </button>
      </div>
      <div className='overlay'></div>
    </>
  );
};

export default DeletePopup;
