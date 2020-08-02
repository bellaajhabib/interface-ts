import React, {useState} from 'react';
import TodoList from "./components/TodoList";
import NewToDo from "./components/NewToDo";
import {TodoModle} from "./components/todo.modle";

type NewTodoProps = {
    onAddTodo: (todoText: string) => void;
}
const App: React.FC = prop => {
    const [todos, setTodos] = useState<TodoModle[]>([]);
    const todoAddHandler = (text: string) => {
        setTodos(prevTodos => [...prevTodos,
            {id: Math.round(Math.random() * 10).toString(), text: text}]);
    };
    const todoDeleteHandler = (todosId:string)=>{
        setTodos(prevTodos =>{
            return prevTodos.filter(todo => todo.id !== todosId);
        });
    }
    return (
        <div className="App">
            <NewToDo onAddTodo={todoAddHandler}/>
            {/*A component that adds todos  */}
            <TodoList items={todos} onDeleteTodo ={todoDeleteHandler}/>
        </div>
    );
}

export default App;
