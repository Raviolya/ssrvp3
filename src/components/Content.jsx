import React from 'react';

function Content({ labId }) {
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

  const currentLab = labContents[labId];

  return (
    <main style={{
      padding: '2rem',
      flex: 1
    }}>
      <h2>{currentLab.title}</h2>
      <div>
        {currentLab.content}
      </div>
    </main>
  );
}

export default Content; 