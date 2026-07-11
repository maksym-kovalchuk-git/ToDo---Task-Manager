import logo from '../assets/icons/todo-logo.svg';
import "./BoardHeader.scss";
import LangSwitch from './LangSwitch';

function BoardHeader() {
    return (
        <div className="board-header">
            <span className="board-header__logo">
                <img src={logo} alt="ToDo" />
                <h1 className='app-title'>To
                    <span className='board-header__accent'>Do </span> 
                    - Task Manager     
                </h1>
            </span>
            <LangSwitch />
        </div>
    )
}

export default BoardHeader;