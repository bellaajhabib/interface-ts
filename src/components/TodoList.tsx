import React from 'react';

interface TodoListProps {
    items: { id: string, text: string }[];
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {

    return (
        <div className="App">
            {/*A component that adds todos*/}
            <ul>
                {props.items.map((todos, index) => (
                    <li key={todos.id}><span>{todos.id + " " + todos.text + " " + index}</span>
                        <button onClick={props.onDeleteTodo.bind(null, todos.id)}>Delete</button>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default TodoList;