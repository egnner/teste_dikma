import axios, { AxiosError } from 'axios';
import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from '@/types/Task';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
});

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

export const TasksApi = {
  getAllTasks: async (status?: TaskStatus): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tarefas', {
      params: status ? { status } : undefined,
    });
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get<Task>(`/tarefas/${id}`);
    return response.data;
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    try {
      const response = await api.post<Task>('/tarefas', task);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 409) {
          throw new Error(axiosError.response.data.message);
        }
      }
      throw error;
    }
  },

  updateTask: async (id: string, task: UpdateTaskDto): Promise<Task> => {
    try {
      const response = await api.put<Task>(`/tarefas/${id}`, task);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response?.status === 409) {
          throw new Error(axiosError.response.data.message);
        }
      }
      throw error;
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tarefas/${id}`);
  },
}; 