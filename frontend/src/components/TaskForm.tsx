import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent } from '@mui/material';
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from '@/types/Task';

interface TaskFormProps<T extends CreateTaskDto | UpdateTaskDto> {
  task?: Task;
  onSubmit: (data: T) => void;
  isLoading?: boolean;
}

export function TaskForm<T extends CreateTaskDto | UpdateTaskDto>({ 
  task, 
  onSubmit, 
  isLoading = false 
}: TaskFormProps<T>) {
  const [formData, setFormData] = useState<T>({
    title: task?.title || '',
    description: task?.description || '',
    ...(task && { status: task.status }),
  } as T);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || '',
        status: task.status,
      } as T);
    }
  }, [task]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextField
        fullWidth
        required
        label="Título"
        name="title"
        value={formData.title}
        onChange={handleTextChange}
        disabled={isLoading}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleTextChange}
        disabled={isLoading}
      />

      {task && (
        <FormControl fullWidth>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            name="status"
            value={(formData as UpdateTaskDto).status || ''}
            label="Status"
            onChange={handleSelectChange}
            disabled={isLoading}
          >
            {Object.values(TaskStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Box className="flex justify-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !formData.title}
        >
          {isLoading ? 'Salvando...' : task ? 'Atualizar' : 'Criar'}
        </Button>
      </Box>
    </form>
  );
} 