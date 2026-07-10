import logo from '../assets/icons/todo-logo.svg';
import "./BoardHeader.scss";

function BoardHeader() {
    return (
        <div className="board-header">
            <span className="board-header__logo">
                <img src={logo} alt="ToDo" />
                <h1 className='app-title'>ToDo - Task Manager</h1>
            </span>
        </div>
    )
}

export default BoardHeader;