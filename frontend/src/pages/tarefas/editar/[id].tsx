import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { TaskForm } from '@/components/TaskForm';
import { TasksApi } from '@/services/api';
import { Task, UpdateTaskDto } from '@/types/Task';

export default function EditTask() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  const loadTask = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      const data = await TasksApi.getTaskById(taskId);
      setTask(data);
    } catch (error) {
      toast.error('Erro ao carregar a tarefa');
      console.error(error);
      router.push('/');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (id && typeof id === 'string') {
      loadTask(id);
    }
  }, [id, loadTask]);

  const handleSubmit = async (data: UpdateTaskDto) => {
    if (!id || typeof id !== 'string') return;

    try {
      setLoading(true);
      await TasksApi.updateTask(id, data);
      toast.success('Tarefa atualizada com sucesso');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao atualizar a tarefa');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!task && !loading) {
    return null;
  }

  return (
    <Container maxWidth="md" className="py-8">
      <Box className="flex items-center gap-4 mb-8">
        <IconButton onClick={() => router.back()} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Editar Tarefa
        </Typography>
      </Box>

      {task && (
        <TaskForm<UpdateTaskDto>
          task={task}
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      )}
    </Container>
  );
} 