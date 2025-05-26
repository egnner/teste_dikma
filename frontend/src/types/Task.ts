export enum TaskStatus {
  PENDING = 'pendente',
  IN_PROGRESS = 'em andamento',
  COMPLETED = 'concluída',
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
} 