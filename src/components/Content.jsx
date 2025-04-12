import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Counter from './Counter';
import FeedbackPage from './feedback/FeedbackPage';
import Profile from './Profile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedback, fetchProfile } from '../actions/Requests';
function Content() {
  const { isDarkMode } = useTheme();

  const dispatch = useDispatch();
  const { feedback, profile, loading, error } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch])

  
  const labContents = {
    1: {
      title: 'Лабораторная работа №1',
      content: (
        <>
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
        </>
      )
    },
    2: {
      title: 'Лабораторная работа №2',
      content: (
        <>
          <ul>
            <li>Создать "Hello World" приложение на основе React.</li>
            <li>Для создания можно использовать create-react-app или vite</li>
            <li>Реализовать компонент кнопку, контейнер и использовать их на странице</li>
            <li>Реализовать шаблон страницы и разместить на нем компоненты навигации </li>
            <li>Разместить проект в репозиторий в github</li>
            <li>Прикрепить текстовый файл с ссылкой на проект</li>
          </ul>
        </>
      )
    },
    3: {
      title: 'Лабораторная работа №3',
      content: (
        <>
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
        </>
      )
    },
  };

  return (
    <main style={{
      padding: '2rem',
      flex: 1,
      backgroundColor: isDarkMode ? '#242424' : '#fff',
      color: isDarkMode ? '#fff' : '#213547'
    }}>
      <Routes>
        <Route path="/lab1" element={<LabContent lab={labContents[1]} />} />
        <Route path="/lab2" element={<LabContent lab={labContents[2]} />} />
        <Route path="/lab3" element={<LabContent lab={labContents[3]} />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/" element={<LabContent lab={labContents[1]} />} />
        <Route path="/profile" element={<Profile profile={profile} />} />
      </Routes>
    </main>
  );
}

function LabContent({ lab }) {
  return (
    <>
      <h2>{lab.title}</h2>
      <div>{lab.content}</div>
    </>
  );
}

export default Content; 