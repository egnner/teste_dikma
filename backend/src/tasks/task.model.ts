export enum TaskStatus {
  PENDING = 'pendente',
  IN_PROGRESS = 'em andamento',
  COMPLETED = 'concluída',
}

export class Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateTaskDto {
  title: string;
  description?: string;
}

export class UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
} 