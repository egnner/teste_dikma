import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const task = service.createTask(createTaskDto);

      expect(task.title).toBe(createTaskDto.title);
      expect(task.description).toBe(createTaskDto.description);
      expect(task.status).toBe(TaskStatus.PENDING);
      expect(task.id).toBeDefined();
    });
  });

  describe('getAllTasks', () => {
    it('should return all tasks', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      service.createTask(createTaskDto);
      const tasks = service.getAllTasks();

      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe(createTaskDto.title);
    });

    it('should return filtered tasks by status', () => {
      const task1 = service.createTask({ title: 'Task 1' });
      const task2 = service.createTask({ title: 'Task 2' });
      service.updateTask(task2.id, { status: TaskStatus.COMPLETED });

      const pendingTasks = service.getAllTasks(TaskStatus.PENDING);
      const completedTasks = service.getAllTasks(TaskStatus.COMPLETED);

      expect(pendingTasks.length).toBe(1);
      expect(completedTasks.length).toBe(1);
      expect(pendingTasks[0].id).toBe(task1.id);
      expect(completedTasks[0].id).toBe(task2.id);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const createdTask = service.createTask(createTaskDto);
      const task = service.getTaskById(createdTask.id);

      expect(task).toBeDefined();
      expect(task.id).toBe(createdTask.id);
    });

    it('should throw NotFoundException when task not found', () => {
      expect(() => service.getTaskById('non-existent-id')).toThrow(NotFoundException);
    });
  });

  describe('updateTask', () => {
    it('should update a task', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const createdTask = service.createTask(createTaskDto);
      const updateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.COMPLETED,
      };

      const updatedTask = service.updateTask(createdTask.id, updateTaskDto);

      expect(updatedTask.title).toBe(updateTaskDto.title);
      expect(updatedTask.status).toBe(updateTaskDto.status);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', () => {
      const createTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const createdTask = service.createTask(createTaskDto);
      service.deleteTask(createdTask.id);

      expect(() => service.getTaskById(createdTask.id)).toThrow(NotFoundException);
    });
  });
}); 