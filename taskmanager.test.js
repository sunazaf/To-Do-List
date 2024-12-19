import { tasks, addTask, editTask, deleteTask, toggleComplete, saveTasks, loadTasks } from './taskManager';

describe('Task Manager', () => {
    let mockStorage;

    beforeEach(() => {
        mockStorage = {
            getItem: jest.fn(() => JSON.stringify([])),
            setItem: jest.fn(),
        };
        tasks.length = 0; // Clear tasks before each test
    });

    test('adds a task successfully', () => {
        addTask('Learn JavaScript');
        expect(tasks.length).toBe(1);
        expect(tasks[0].text).toBe('Learn JavaScript');
        expect(tasks[0].completed).toBe(false);
    });

    test('throws an error when adding an empty task', () => {
        expect(() => addTask('')).toThrow('Task cannot be empty!');
    });

    test('edits a task successfully', () => {
        addTask('Learn JavaScript');
        editTask(0, 'Learn Jest');
        expect(tasks[0].text).toBe('Learn Jest');
    });

    test('throws an error when editing a task with empty text', () => {
        addTask('Learn JavaScript');
        expect(() => editTask(0, '')).toThrow('Edited task cannot be empty!');
    });

    test('deletes a task successfully', () => {
        addTask('Learn JavaScript');
        deleteTask(0);
        expect(tasks.length).toBe(0);
    });

    test('toggles task completion', () => {
        addTask('Learn JavaScript');
        toggleComplete(0);
        expect(tasks[0].completed).toBe(true);
        toggleComplete(0);
        expect(tasks[0].completed).toBe(false);
    });

    test('saves tasks to localStorage', () => {
        addTask('Learn JavaScript');
        saveTasks(mockStorage);
        expect(mockStorage.setItem).toHaveBeenCalledWith('tasks', JSON.stringify(tasks));
    });

    test('loads tasks from localStorage', () => {
        mockStorage.getItem = jest.fn(() => JSON.stringify([{ text: 'Learn Jest', completed: false }]));
        loadTasks(mockStorage);
        expect(tasks.length).toBe(1);
        expect(tasks[0].text).toBe('Learn Jest');
        expect(tasks[0].completed).toBe(false);
    });
});
