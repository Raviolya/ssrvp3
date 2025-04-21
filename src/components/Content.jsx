import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback, fetchProfile } from '../actions/Requests';

import AboutPage from './AboutPage';
import HomePage from './HomePage';
import Counter from './Counter';
import FeedbackPage from './feedback/FeedbackPage';
import Profile from './Profile';
import AdminUsersPage from './AdminUsersPage';

function Content() {
  
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const labContents = {
    1: {
      title: 'Лабораторная работа №1',
      content: (
        <ul>
          <li>Реализовать скрипт, который уведомит о полной загрузке страницы</li>
          <li>Реализовать кнопку счетчик, которая будет увеличивать счетчик на "1" и вывести его значение на страницу (button onclick)</li>
          <li>Реализовать кнопку счетчик, которая будет уменьшать счетчик на "1" реализовать с помощью listener Click</li>
          <li>Реализовать форму аутентификации пользователя (form)</li>
          <ul>
            <li>Реализовать скрипт очистки данных формы</li>
            <li>Реализовать скрипт отправки данных формы с помощью listener submit.</li>
            <li>Без отправки на сервер провести валидацию введенных данных, если login=="admin" & pass=="admin" вывести сообщение об успехе, иначе сообщение о неуспехе</li>
            <li>Реализовать скрипт сохранения учетных данных и автоподстановку оных с помощью localStorage</li>
          </ul>
        </ul>
      )
    },
    2: {
      title: 'Лабораторная работа №2',
      content: (
        <ul>
          <li>Создать "Hello World" приложение на основе React.</li>
          <li>Для создания можно использовать create-react-app или vite</li>
          <li>Реализовать компонент кнопку, контейнер и использовать их на странице</li>
          <li>Реализовать шаблон страницы и разместить на нем компоненты навигации </li>
          <li>Разместить проект в репозиторий в github</li>
          <li>Прикрепить текстовый файл с ссылкой на проект</li>
        </ul>
      )
    },
    3: {
      title: 'Лабораторная работа №3',
      content: (
        <ul>
          <li>Продолжаем задание "Реализовать шаблон страницы и разместить на нем компоненты навигации"</li>
          <ul>
            <li>Реализуем компоненты Header, Footer, Menu и Content</li>
            <li>В меню выводим список лабораторных работ</li>
            <li>В Content выводим содержимое лабораторной работы</li>
          </ul>
          <li>Разместить проект в репозиторий в github</li>
          <li>Прикрепить текстовый файл с ссылкой на проект</li>
        </ul>
      )
    },
  };

  return (
    <Box
      component="main"
      sx={{
        px: { xs: 2, sm: 4 },
        py: 10,
        flex: 1,
        transition: 'background-color 0.3s ease',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lab1" element={<LabContent lab={labContents[1]} />} />
        <Route path="/lab2" element={<LabContent lab={labContents[2]} />} />
        <Route path="/lab3" element={<LabContent lab={labContents[3]} />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/profile" element={<Profile profile={profile} />} />
        <Route path="/admin_panel" element={<AdminUsersPage />} />
      </Routes>
    </Box>
  );
}

function LabContent({ lab }) {
  const { isDarkMode } = useTheme();
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, maxWidth: '100%', overflowX: 'auto', backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff', color: isDarkMode ? '#ffffff' : '#00000', }}>
      <Typography variant="h5" gutterBottom>
        {lab.title}
      </Typography>
      <Box component="div">
        {lab.content}
      </Box>
    </Paper>
  );
}

export default Content;