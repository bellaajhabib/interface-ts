import React from 'react';

interface TodoListProps {
    items: { id: string, text: string }[];
}

const TodoList: React.FC<TodoListProps> = props => {

    return (
        <div className="App">
            {/*A component that adds todos*/}
            <ul>
                {props.items.map(todos => (
                    <li key={todos.id}>{todos.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;