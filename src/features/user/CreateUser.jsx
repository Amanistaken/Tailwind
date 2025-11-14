import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if(!username) return;
    dispatch(updateName(username));
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-500 md:text-base'>👋 Welcome! Please start by telling us your name:</p>

      <input
      className='input w-72 mb-3 '
        type="text"
        placeholder=" Your full name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <button className="inline-block font-semibold  bg-yellow-400 px-4 py-2 rounded-full hover:bg-yellow-300  ">Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
