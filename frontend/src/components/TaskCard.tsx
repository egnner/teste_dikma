import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Chip } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Task, TaskStatus } from '@/types/Task';
import { useRouter } from 'next/router';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusColors = {
  [TaskStatus.PENDING]: 'warning',
  [TaskStatus.IN_PROGRESS]: 'info',
  [TaskStatus.COMPLETED]: 'success',
} as const;

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusChange }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/tarefas/editar/${task.id}`);
  };

  const handleComplete = () => {
    if (task.status !== TaskStatus.COMPLETED) {
      onStatusChange(task.id, TaskStatus.COMPLETED);
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardContent>
        <Box className="flex justify-between items-start">
          <div className="flex-1">
            <Typography variant="h6" component="h2" className="mb-2">
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary" className="mb-3">
                {task.description}
              </Typography>
            )}
            <Chip
              label={task.status}
              color={statusColors[task.status]}
              size="small"
              className="mb-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <IconButton onClick={handleEdit} size="small" color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(task.id)} size="small" color="error">
              <DeleteIcon />
            </IconButton>
            {task.status !== TaskStatus.COMPLETED && (
              <IconButton onClick={handleComplete} size="small" color="success">
                <CheckCircleIcon />
              </IconButton>
            )}
          </div>
        </Box>
        <Typography variant="caption" color="text.secondary" className="mt-2 block">
          Atualizado em: {new Date(task.updatedAt).toLocaleString('pt-BR')}
        </Typography>
      </CardContent>
    </Card>
  );
}; 