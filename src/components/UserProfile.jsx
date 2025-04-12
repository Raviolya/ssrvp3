import React, {useEffect} from 'react';
import { useTheme } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../actions/Requests';
import Loader from '../assets/svg/loadingCircle.svg';
import { Logout } from '../actions/Requests';

function UserProfile() {
  const { isDarkMode } = useTheme();

  const dispatch = useDispatch(); 

  const onLogout = async () => { 
      try {
        await dispatch(Logout()).unwrap();
      } catch (error) {
        console.error("Ошибка при выходе:", error);
      }
  };

  const { profile} = useSelector((state) => state.feedback);

  return (
    <div style={{
      position: 'absolute',
      right: '60px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginRight: '20px',
    }}>
      <NavLink to="/profile" style={{
        color: isDarkMode ? '#fff' : '#213547'
      }}>
        {profile ? profile.username : <img className='spinner' src={Loader} alt="" />}
      </NavLink>
      <button
        onClick={onLogout}
        style={{
          padding: '5px 10px',
          backgroundColor: isDarkMode ? '#444' : '#e9ecef',
          color: isDarkMode ? '#fff' : '#213547',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Выйти
      </button>
    </div>
  );
}

export default UserProfile; 