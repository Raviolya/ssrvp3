import React, { useEffect, useState } from 'react';
import AdminUsersTable from './AdminPanel';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfile,
  fetchFeedback,
  blockFeedbackAsync,
  unblockFeedbackAsync,
  deleteFeedbackAsync
} from '../actions/Requests';
import AdminFeedbackTable from './AdminFeedback';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function AdminUsersPage() {
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [users, setUsers] = useState([]);

  const { feedbacks } = useSelector((state) => state.feedback);
  const { profile } = useSelector((state) => state.feedback);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchFeedback());
    fetchUsers();
  }, [dispatch]);

  const showMessage = (msg) => setSnackbar({ open: true, message: msg });

  const handleDelete = (id) => {
    return fetch(`/api/admin/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        showMessage('Пользователь удалён');
        fetchUsers();
      })
      .catch(() => {
        showMessage('Не удалось обновить статус');
        throw new Error();
      });
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Ошибка при загрузке пользователей');

      const data = await res.json();

      if (!Array.isArray(data.users)) {
        throw new Error('Ожидался массив пользователей');
      }

      setUsers(data.users);
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };

  const handleBlock = (id) => {
    return fetch(`/api/admin/users/${id}/block`, { method: 'PUT' })
      .then(() => {
        showMessage('Пользователь заблокирован');
        fetchUsers();
      })
      .catch(() => {
        showMessage('Не удалось обновить статус');
        throw new Error();
      });
  };

  const handleUnblock = (id) => {
    return fetch(`/api/admin/users/${id}/unblock`, { method: 'PUT' })
      .then(() => {
        showMessage('Пользователь разблокирован');
        fetchUsers();
      })
      .catch(() => {
        showMessage('Не удалось обновить статус');
        throw new Error();
      });
  };

  const handleFeedDelete = async (id) => {
    try {
      await dispatch(deleteFeedbackAsync(id)).unwrap();
      dispatch(fetchFeedback());
    } catch (e) {
      console.error('Ошибка при удалении:', e);
    }
  };

  const handleFeedToggleBlock = async (id) => {
    try {
      await dispatch(blockFeedbackAsync(id)).unwrap();
      dispatch(fetchFeedback());
    } catch (e) {
      console.error('Ошибка при изменении статуса:', e);
    }
  };

  const handleFeedToggleUnblock = async (id) => {
    try {
      await dispatch(unblockFeedbackAsync(id)).unwrap();
      dispatch(fetchFeedback());
    } catch (e) {
      console.error('Ошибка при изменении статуса:', e);
    }
  };

  if (!profile) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      {profile && profile.role === 'admin' && (
        
          <AdminUsersTable
            data={users}
            onDelete={handleDelete}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            currentUserId={profile.id}
          />
        
      )}
      <AdminFeedbackTable
        data={feedbacks}
        onDelete={handleFeedDelete}
        onToggleBlock={handleFeedToggleBlock}
        onToggleUnblock={handleFeedToggleUnblock}
      />
    </DndProvider>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        message={snackbar.message}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}