import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {fetchProfile, updateProfileAsync} from '../actions/Requests';
import Loader from '../assets/svg/loadingCircle.svg';
import { useForm } from 'react-hook-form';

const Profile = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const {profile, loading} = useSelector((state) => state.feedback);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
        setUsername(profile.username || '');
        setEmail(profile.email || '');
        }
    }, [profile]);

    const onSubmit = (e) => {
        if (profile) { 
        dispatch(updateProfileAsync({ id: profile.id, profileData: { username, email } }));
        } else {
        console.warn("Профиль ещё не загружен, невозможно обновить данные");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            {...register('name', { 
                minLength: {
                  value: 5,
                  message: 'Логин должен содержать минимум 5 символов'
                }
              })}
            style={{width: '100%',
                padding: '8px',
                marginBottom: '5px',
                backgroundColor: 'rgb(255, 255, 255)',
                color: 'rgb(0, 0, 0)',
                border: '1px solid rgb(221, 221, 221)'
            }}
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {errors.name && <span style={{ display: 'block', color: 'red' }}>{errors.name.message}</span>}
            <input
                {...register('email', { 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Неверный формат email'
                    }
                })}
                style={{width: '100%',
                    padding: '8px',
                    marginBottom: '5px',
                    backgroundColor: 'rgb(255, 255, 255)',
                    color: 'rgb(0, 0, 0)',
                    border: '1px solid rgb(221, 221, 221)'
                }}
                type="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span style={{ display: 'block', color: 'red' }}>{errors.email.message}</span>}
            <button type="submit">{loading ? <img className='spinner' src={Loader} alt="" /> : "Обновить профиль"}</button>
        </form>
    );
};

export default Profile;