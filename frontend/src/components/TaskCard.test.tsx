import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@/types/Task';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  basePath: '',
  isLocaleDomain: false,
  isReady: true,
  isFallback: false,
  isPreview: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  locale: undefined,
  locales: undefined,
  defaultLocale: undefined,
};

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  status: TaskStatus.PENDING,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockOnDelete = jest.fn();
const mockOnStatusChange = jest.fn();

describe('TaskCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('renders task information correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask.description!)).toBeInTheDocument();
    expect(screen.getByText(mockTask.status)).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('calls onStatusChange when complete button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    const completeButton = screen.getByRole('button', { name: /check circle/i });
    fireEvent.click(completeButton);

    expect(mockOnStatusChange).toHaveBeenCalledWith(mockTask.id, TaskStatus.COMPLETED);
  });

  it('does not show complete button when task is already completed', () => {
    const completedTask = { ...mockTask, status: TaskStatus.COMPLETED };
    render(
      <TaskCard
        task={completedTask}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    const completeButton = screen.queryByRole('button', { name: /check circle/i });
    expect(completeButton).not.toBeInTheDocument();
  });

  it('navigates to edit page when edit button is clicked', () => {
    render(
      <TaskCard
        task={mockTask}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockRouter.push).toHaveBeenCalledWith(`/tarefas/editar/${mockTask.id}`);
  });
}); 