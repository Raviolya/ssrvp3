import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './TestButton';
import { vi } from 'vitest';

describe('Button component', () => {
  test('Тест проходит если найден текст', () => {
    render(<Button>Кликни</Button>);
    expect(screen.getByText('Кликни меня')).toBeInTheDocument();
  });

  test('Вызывается при клике', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});