import { useState, useEffect, useCallback } from 'react';
import { TextField, Button, FormControl, Select, MenuItem, Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { TaskCard } from '@/components/TaskCard';
import { Header } from '@/components/Header';
import { TasksApi } from '@/services/api';
import { Task, TaskStatus } from '@/types/Task';

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | ''>('');

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TasksApi.getAllTasks(statusFilter || undefined);
      setTasks(data);
    } catch (error) {
      toast.error('Erro ao carregar as tarefas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleDelete = async (id: string) => {
    try {
      await TasksApi.deleteTask(id);
      toast.success('Tarefa excluída com sucesso');
      loadTasks();
    } catch (error) {
      toast.error('Erro ao excluir a tarefa');
      console.error(error);
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      await TasksApi.updateTask(id, { status });
      toast.success('Status atualizado com sucesso');
      loadTasks();
    } catch (error) {
      toast.error('Erro ao atualizar o status');
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Header />
      
      <Box className="container mx-auto px-4">
        <Box className="flex gap-4 mb-6">
          <TextField
            fullWidth
            placeholder="Buscar por ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            size={isMobile ? "small" : "medium"}
          />
          <FormControl className="min-w-[200px]">
            <Select
              value={statusFilter}
              displayEmpty
              onChange={(e) => setStatusFilter(e.target.value as TaskStatus | '')}
              size={isMobile ? "small" : "medium"}
            >
              <MenuItem value="">Filtrar por status</MenuItem>
              {Object.values(TaskStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Typography>Carregando...</Typography>
        ) : filteredTasks.length === 0 ? (
          <Typography>Nenhuma tarefa encontrada</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <TaskCard
                  task={task}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => router.push('/tarefas/nova')}
          sx={{
            position: 'fixed',
            right: isMobile ? 16 : 32,
            bottom: 72,
            borderRadius: isMobile ? '50%' : '24px',
            minWidth: isMobile ? '56px' : 'auto',
            width: isMobile ? '56px' : 'auto',
            height: isMobile ? '56px' : 'auto',
            padding: isMobile ? '16px' : '8px 24px',
            boxShadow: 3,
            '& .MuiButton-startIcon': {
              margin: isMobile ? 0 : undefined,
            }
          }}
        >
          {!isMobile && 'Nova tarefa'}
        </Button>
      </Box>
    </main>
  );
} 