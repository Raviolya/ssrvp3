import React, { useState } from 'react';
import AdminUsersTable from './AdminPanel';
import Snackbar from '@mui/material/Snackbar';
import AdminFeedbackTable from './AdminFeedback';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  useFetchProfileQuery,
  useFetchFeedbackQuery,
  useDeleteFeedbackMutation,
  useBlockFeedbackMutation,
  useUnblockFeedbackMutation,
  useFetchUsersQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation
} from '../actions/Requests';

export default function AdminUsersPage() {
  const { data: profile, isLoading: profileLoading } = useFetchProfileQuery();
  const { data: feedbacks = [], refetch: refetchFeedbacks } = useFetchFeedbackQuery();
  const { data: usersData = [], refetch: refetchUsers } = useFetchUsersQuery();

  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [blockFeedback] = useBlockFeedbackMutation();
  const [unblockFeedback] = useUnblockFeedbackMutation();

  const [deleteUser] = useDeleteUserMutation();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const showMessage = (msg) => setSnackbar({ open: true, message: msg });

  const handleFeedDelete = async (id) => {
    try {
      await deleteFeedback(id).unwrap();
      refetchFeedbacks();
    } catch (e) {
      console.error('Ошибка при удалении отзыва:', e);
    }
  };

  const handleFeedToggleBlock = async (id) => {
    try {
      await blockFeedback(id).unwrap();
      refetchFeedbacks();
    } catch (e) {
      console.error('Ошибка при блокировке отзыва:', e);
    }
  };

  const handleFeedToggleUnblock = async (id) => {
    try {
      await unblockFeedback(id).unwrap();
      refetchFeedbacks();
    } catch (e) {
      console.error('Ошибка при разблокировке отзыва:', e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      showMessage('Пользователь удалён');
      refetchUsers();
    } catch {
      showMessage('Не удалось удалить пользователя');
    }
  };

  const handleBlock = async (id) => {
    try {
      await blockUser(id).unwrap();
      showMessage('Пользователь заблокирован');
      refetchUsers();
    } catch {
      showMessage('Не удалось заблокировать пользователя');
    }
  };

  const handleUnblock = async (id) => {
    try {
      await unblockUser(id).unwrap();
      showMessage('Пользователь разблокирован');
      refetchUsers();
    } catch {
      showMessage('Не удалось разблокировать пользователя');
    }
  };

  if (profileLoading || !profile) return <div>Загрузка профиля...</div>;

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {profile.role === 'admin' && (
          <AdminUsersTable
            data={usersData.users || []}
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