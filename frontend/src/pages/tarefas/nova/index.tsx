import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import { TaskForm } from '@/components/TaskForm';
import { TasksApi } from '@/services/api';
import { CreateTaskDto } from '@/types/Task';

export default function NewTask() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateTaskDto) => {
    try {
      setLoading(true);
      await TasksApi.createTask(data);
      toast.success('Tarefa criada com sucesso');
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Erro ao criar a tarefa');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" className="py-8">
      <Box className="flex items-center gap-4 mb-8">
        <IconButton onClick={() => router.back()} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Nova Tarefa
        </Typography>
      </Box>

      <TaskForm<CreateTaskDto> onSubmit={handleSubmit} isLoading={loading} />
    </Container>
  );
} 