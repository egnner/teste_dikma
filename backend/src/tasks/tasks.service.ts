import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from './task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(status?: TaskStatus): Task[] {
    if (status) {
      return this.tasks.filter(task => task.status === status);
    }
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Tarefa com ID "${id}" não encontrada`);
    }
    return task;
  }

  private checkTitleExists(title: string, excludeId?: string): boolean {
    return this.tasks.some(task => task.title === title && task.id !== excludeId);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    if (this.checkTitleExists(title)) {
      throw new ConflictException(`Já existe uma tarefa com o título "${title}"`);
    }

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);

    if (updateTaskDto.title && this.checkTitleExists(updateTaskDto.title, id)) {
      throw new ConflictException(`Já existe uma tarefa com o título "${updateTaskDto.title}"`);
    }

    const updatedTask = { ...task, ...updateTaskDto, updatedAt: new Date() };
    this.tasks = this.tasks.map(t => (t.id === id ? updatedTask : t));
    return updatedTask;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
} 