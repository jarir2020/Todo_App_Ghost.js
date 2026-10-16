import { mount, initDevTools } from '@ghost-js/core';
import { signal } from '@ghost-js/core';

initDevTools();

// State management with signals
const todos = signal([]);
const inputValue = signal('');
const filter = signal('all'); // 'all', 'active', 'completed'

// Helper functions
const addTodo = () => {
    const text = inputValue.get().trim();
    if (text) {
        todos.set([
            ...todos.get(),
            {
                id: Date.now(),
                text,
                completed: false,
                createdAt: new Date().toISOString()
            }
        ]);
        inputValue.set('');
        renderApp();
    }
};

const toggleTodo = (id) => {
    todos.set(
        todos.get().map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
    );
    renderApp();
};

const deleteTodo = (id) => {
    todos.set(todos.get().filter(todo => todo.id !== id));
    renderApp();
};

const clearCompleted = () => {
    todos.set(todos.get().filter(todo => !todo.completed));
    renderApp();
};

const setFilter = (newFilter) => {
    filter.set(newFilter);
    renderApp();
};

const getFilteredTodos = () => {
    const currentFilter = filter.get();
    const allTodos = todos.get();

    if (currentFilter === 'active') {
        return allTodos.filter(todo => !todo.completed);
    }
    if (currentFilter === 'completed') {
        return allTodos.filter(todo => todo.completed);
    }
    return allTodos;
};

// Components
const Header = () => ({
    tag: 'header',
    props: { class: 'todo-header' },
    children: [
        { tag: 'h1', props: {}, children: ['Todo List'] },
        { tag: 'p', props: { class: 'subtitle' }, children: ['Built with Ghost.js'] }
    ]
});

const TodoInput = () => ({
    tag: 'div',
    props: { class: 'todo-input-container' },
    children: [
        {
            tag: 'input',
            props: {
                type: 'text',
                class: 'todo-input',
                placeholder: 'What needs to be done?',
                value: inputValue.get(),
                oninput: (e) => inputValue.set(e.target.value),
                onkeypress: (e) => {
                    if (e.key === 'Enter') {
                        addTodo();
                    }
                }
            }
        },
        {
            tag: 'button',
            props: {
                class: 'add-button',
                onclick: addTodo
            },
            children: ['Add']
        }
    ]
});

const TodoItem = (todo) => ({
    tag: 'li',
    props: {
        class: `todo-item ${todo.completed ? 'completed' : ''}`
    },
    children: [
        {
            tag: 'input',
            props: {
                type: 'checkbox',
                class: 'todo-checkbox',
                checked: todo.completed,
                onchange: () => toggleTodo(todo.id)
            }
        },
        {
            tag: 'span',
            props: { class: 'todo-text' },
            children: [todo.text]
        },
        {
            tag: 'button',
            props: {
                class: 'delete-button',
                onclick: () => deleteTodo(todo.id)
            },
            children: ['×']
        }
    ]
});

const TodoList = () => {
    const filteredTodos = getFilteredTodos();
    return {
        tag: 'ul',
        props: { class: 'todo-list' },
        children: filteredTodos.length > 0
            ? filteredTodos.map(todo => TodoItem(todo))
            : [{
                tag: 'li',
                props: { class: 'empty-state' },
                children: ['No todos yet. Add one above!']
            }]
    };
};

const FilterButton = (filterType, label) => ({
    tag: 'button',
    props: {
        class: `filter-button ${filter.get() === filterType ? 'active' : ''}`,
        onclick: () => setFilter(filterType)
    },
    children: [label]
});

const TodoFooter = () => {
    const allTodos = todos.get();
    const activeCount = allTodos.filter(t => !t.completed).length;
    const completedCount = allTodos.filter(t => t.completed).length;

    return {
        tag: 'footer',
        props: { class: 'todo-footer' },
        children: [
            {
                tag: 'span',
                props: { class: 'todo-count' },
                children: [`${activeCount} ${activeCount === 1 ? 'item' : 'items'} left`]
            },
            {
                tag: 'div',
                props: { class: 'filters' },
                children: [
                    FilterButton('all', 'All'),
                    FilterButton('active', 'Active'),
                    FilterButton('completed', 'Completed')
                ]
            },
            completedCount > 0 ? {
                tag: 'button',
                props: {
                    class: 'clear-completed',
                    onclick: clearCompleted
                },
                children: ['Clear completed']
            } : null
        ].filter(Boolean)
    };
};

const App = () => {
    const todoList = todos.get();
    return {
        tag: 'div',
        props: { class: 'app-container' },
        children: [
            Header(),
            {
                tag: 'main',
                props: { class: 'todo-app' },
                children: [
                    TodoInput(),
                    TodoList(),
                    todoList.length > 0 ? TodoFooter() : null
                ].filter(Boolean)
            }
        ]
    };
};

function renderApp() {
    document.body.innerHTML = '';
    mount(App(), document.body);
}

// Initial render
renderApp();
