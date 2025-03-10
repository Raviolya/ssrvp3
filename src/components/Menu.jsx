import React from 'react';

function Menu({ selectedLab, onLabSelect }) {
  const labWorks = [
    { id: 1, title: 'Лабораторная работа №1' },
    { id: 2, title: 'Лабораторная работа №2' },
    { id: 3, title: 'Лабораторная работа №3' },
  ];

  return (
    <nav style={{
      width: '250px',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #e7e7e7',
      height: 'calc(100vh - 140px)'
    }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {labWorks.map(lab => (
          <li key={lab.id} style={{ marginBottom: '0.5rem' }}>
            <a 
              href={`#lab${lab.id}`}
              onClick={(e) => {
                e.preventDefault();
                onLabSelect(lab.id);
              }}
              style={{
                textDecoration: 'none',
                color: '#333',
                padding: '0.5rem',
                display: 'block',
                borderRadius: '4px',
                backgroundColor: selectedLab === lab.id ? '#e9ecef' : 'transparent'
              }}
            >
              {lab.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu; 