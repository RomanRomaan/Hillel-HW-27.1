import React, { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "todos-v1";

export default function Home() {
    // Текст из инпута
    const [inputText, setInputText] = useState("");

    // Массив задач
    const [todos, setTodos] = useState([]);

    // 1) При первом рендере пытаемся загрузить список из localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setTodos(parsed);
                }
            }
        } catch (error) {
            console.error("Не удалось прочитать todos из localStorage:", error);
        }
    }, []);

    // 2) Каждый раз, когда список меняется — сохраняем его в localStorage
    useEffect(() => {
        try {
            const json = JSON.stringify(todos);
            localStorage.setItem(LOCAL_STORAGE_KEY, json);
        } catch (error) {
            console.error("Не удалось сохранить todos в localStorage:", error);
        }
    }, [todos]);

    // Подсчёт невыполненных задач (простой способ без useMemo)
    let remainingCount = 0;
    for (let i = 0; i < todos.length; i++) {
        if (!todos[i].done) {
            remainingCount++;
        }
    }

    // Генерация простого id (чтобы не заморачиваться с crypto.randomUUID)
    function generateId() {
        return String(Date.now()) + "-" + String(Math.random());
    }

    // Добавить новую задачу
    function handleAddTodo(event) {
        event.preventDefault();

        const text = inputText.trim();
        if (text === "") {
            return;
        }

        const newTodo = {
            id: generateId(),
            text: text,
            done: false,
            createdAt: Date.now(),
        };

        setTodos((prevTodos) => {
            return [...prevTodos, newTodo];
        });

        setInputText("");
    }

    // Переключить выполненность задачи
    function handleToggleTodo(id) {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done: !todo.done };
                }
                return todo;
            });
        });
    }

    // Удалить задачу
    function handleRemoveTodo(id) {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.id !== id);
        });
    }

    // Очистить все выполненные задачи
    function handleClearCompleted() {
        setTodos((prevTodos) => {
            return prevTodos.filter((todo) => todo.done === false);
        });
    }

    return (
        <section>
            <h1>Список справ (TODO)</h1>

            <form onSubmit={handleAddTodo} className="todo-form">
                <input
                    type="text"
                    placeholder="Нова задача..."
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                />
                <button type="submit">Додати</button>
            </form>

            <div className="todo-meta">
                <span>Всього: {todos.length}</span>
                <span>Невиконані: {remainingCount}</span>
                <button
                    className="link-btn"
                    onClick={handleClearCompleted}
                    disabled={todos.every((t) => t.done === false)}
                >
                    Очистити виконані
                </button>
            </div>

            <ul className="todo-list">
                {todos.map((todo) => {
                    return (
                        <li key={todo.id} className={todo.done ? "done" : ""}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={todo.done}
                                    onChange={() => handleToggleTodo(todo.id)}
                                />
                                <span>{todo.text}</span>
                            </label>

                            <button onClick={() => handleRemoveTodo(todo.id)}>✕</button>
                        </li>
                    );
                })}

                {todos.length === 0 && <li className="muted">Список порожній</li>}
            </ul>
        </section>
    );
}
