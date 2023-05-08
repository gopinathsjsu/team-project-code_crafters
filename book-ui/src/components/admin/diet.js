import React, { useState, useEffect } from 'react';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('/todos')
            .then(response => response.json())
            .then(data => setTodos(data));
    }, []);

    const handleAddTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="App">
            <Header />
            <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
            <AddTodo onAddTodo={handleAddTodo} />
        </div>
    );
}

function Header() {
    return (
        <header className="Header">
            <h1>Todo List</h1>
        </header>
    );
}

function TodoList({ todos, onDeleteTodo }) {
    return (
        <ul className="TodoList">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
            ))}
        </ul>
    );
}

function TodoItem({ todo, onDeleteTodo }) {
    const handleDeleteClick = () => {
        onDeleteTodo(todo.id);
    };

    return (
        <li className="TodoItem">
            <span>{todo.text}</span>
            <button onClick={handleDeleteClick}>Delete</button>
        </li>
    );
}

function AddTodo({ onAddTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTodo = {
            id: Math.random(),
            text: text,
        };
        onAddTodo(newTodo);
        setText('');
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    return (
        <form className="AddTodo" onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={handleTextChange} />
            <button type="submit">Add Todo</button>
        </form>
    );
}

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
//
// function App() {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('/api/users');
//             setUsers(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const handleUserSelect = (user) => {
//         setSelectedUser(user);
//     };
//
//     const handleUserDeselect = () => {
//         setSelectedUser(null);
//     };
//
//     return (
//         <Router>
//             <div className="App">
//                 <Header />
//                 <Switch>
//                     <Route exact path="/">
//                         <UserList users={users} onUserSelect={handleUserSelect} />
//                     </Route>
//                     <Route path="/add-user">
//                         <AddUserForm onUserAdded={fetchUsers} />
//                     </Route>
//                     <Route path="/edit-user/:id">
//                         <EditUserForm user={selectedUser} onUserUpdated={fetchUsers} onUserDeselect={handleUserDeselect} />
//                     </Route>
//                     <Route path="/user/:id">
//                         <UserDetail user={selectedUser} onUserDeselect={handleUserDeselect} />
//                     </Route>
//                 </Switch>
//             </div>
//         </Router>
//     );
// }
//
// function Header() {
//     return (
//         <header className="Header">
//             <h1>User Management System</h1>
//             <nav>
//                 <ul>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/add-user">Add User</Link></li>
//                 </ul>
//             </nav>
//         </header>
//     );
// }
//
// function UserList({ users, onUserSelect }) {
//     return (
//         <div className="UserList">
//             <h2>Users</h2>
//             <ul>
//                 {users.map(user => (
//                     <li key={user.id}>
//                         <Link to={`/user/${user.id}`} onClick={() => onUserSelect(user)}>{user.name}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
// function UserDetail({ user, onUserDeselect }) {
//     const history = useHistory();
//
//     const handleDeleteClick = async () => {
//         try {
//             await axios.delete(`/api/users/${user.id}`);
//             onUserDeselect();
//             history.push('/');
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     if (!user) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className="UserDetail">
//             <h2>{user.name}</h2>
//             <div>
//                 <span>Email:</span> {user.email}
//             </div>
//             <div>
//                 <span>Phone:</span> {user.phone}
//             </div>
//             <button onClick={handleDeleteClick}>Delete User</button>
//             <Link to={`/edit-user/${user.id}`}>Edit User</Link>
//         </div>
//     );
// }
//
// function AddUserForm({ onUserAdded }) {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [phone, setPhone] = useState('');
//
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const newUser = { name, email
//
//
// export default App;