import { render, screen, fireEvent } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@/types/Task';

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
}); 