import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toDoAddAction } from '../store/actions/toDoAddAction';
import "./todo.scss"
const Todo = (props) => {
    const [todoList, setTodoList] = useState([]);
    const [allTodoList, setAllTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [searchTodoValue, setSearchTodoValue] = useState("");
    const [input, setInput] = useState(true);
    const [isAll, setIsAll] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [count, setCount] = useState(0);
    const [lineThrough, setLineThrough] = useState(false)

    useEffect(() => {
        if (props.toDoAddReducer.isSuccess) {
            console.log(props, 'propsprops');
            setTodoList(props.toDoAddReducer.data);
            setAllTodoList(props.toDoAddReducer.data);
            setCount(props.toDoAddReducer.data.length);

        }
    }, [props.toDoAddReducer]);

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }
    const addTodo = () => {
        setInput(true);
    }
    const searchTodo = () => {
        setInput(false);
    }
    const handleSearch = (event) => {
        let newArray = allTodoList.filter(list => {
            let getText = list.inputValues ? list.inputValues.toLowerCase() : "";
            let searchtext = event.target.value;
            return getText.indexOf(searchtext) !== -1;

        });
        setTodoList(newArray);
        setSearchTodoValue(event.target.value);

    }

    const checkValue = (e, index) => {
        if (e.currentTarget.checked) {
            let data = todoList;
            data[index].isChecked = true;
            setTodoList(data);
            setAllTodoList(data);
            setLineThrough(true);

        } else {
            let data = todoList;
            data[index].isChecked = false;
            setTodoList(data);
            setAllTodoList(data);
            setLineThrough(false);
        }

        let totalCompleted = todoList.filter((data) => !data.isChecked);
        setCount(totalCompleted.length);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (newTodo != "") {
                let newTodos = {
                    inputValues: newTodo,
                    isChecked: false
                }
                props.toDoAddAction(newTodos);
                setNewTodo("");
            } else {
                alert('Please Enter Values');
            }
        }
    }

    const filterAll = () => {
        setTodoList(allTodoList);
        setIsAll(true)
        setIsActive(false)
        setIsCompleted(false)
    }
    const filterActive = () => {
        let active = allTodoList.filter((data) => data.isChecked === false);
        setTodoList(active);
        setIsAll(false)
        setIsActive(true)
        setIsCompleted(false);
    }
    const filterCompleated = () => {
        let active = allTodoList.filter((data) => data.isChecked);
        setTodoList(active);
        setIsAll(false)
        setIsActive(false)
        setIsCompleted(true)
    }
    return (
        <div className="wrapper">

            <div className="header"><h2>Todo Application</h2></div>
            <div className="content">
                <div className="content-blk card">
                    {input ? <input type="text" placeholder="Add New" value={newTodo} onKeyDown={handleKeyDown} onChange={handleChange} /> :
                        <input type="text" placeholder="Search" value={searchTodoValue} onChange={handleSearch} />
                    }
                    <div className="ht560 srl_auto" >
                        {todoList.length > 0 ? todoList.map((option, index) =>
                            <div className={`list_stl checkbox_stl`} key={index} >
                                <span>
                                    <input type="checkbox" onChange={(e) => checkValue(e, index)} value={option.isChecked} checked={option.isChecked} />
                                </span>

                                <div className={`ml-1  ${option.isChecked == true ? 'is_checked' : null}`}>
                                    {option.inputValues}
                                </div>

                            </div>
                        ) : ""}
                    </div>
                    <div className="foot_container">
                        <div className="div_padding">
                            <span className="span_padding cursor" style={{ color: input ? "" : "gray" }} onClick={addTodo}>
                                <i className="fas fa-plus"></i>
                            </span>
                            <span className="span_padding cursor" style={{ color: input ? "gray" : "" }} onClick={searchTodo} >
                                <i className="fas fa-search"></i>
                            </span>
                            <span>|</span>
                            <span className="span_padding">{count} items left</span>
                        </div>
                        <div className="foot_container">
                            <div className="div_mrging padding cursor" style={{ backgroundColor: isAll ? 'grey' : 'white', border: isAll ? "1px double" : "", borderRadius: isAll ? "2px" : "" }} onClick={filterAll}>All</div>
                            <div className="div_mrging padding cursor" style={{ backgroundColor: isActive ? 'grey' : 'white', border: isActive ? "1px double" : "", borderRadius: isActive ? "2px" : "" }} onClick={filterActive}>Active</div>
                            <div className="div_mrging padding cursor" style={{ backgroundColor: isCompleted ? 'grey' : 'white', border: isCompleted ? "1px double" : "", borderRadius: isCompleted ? "2px" : "" }} onClick={filterCompleated}>Completed</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer"></div>
        </div>
    );
}


const mapStatetoProps = state => {
    const { toDoAddReducer } = state
    return {
        toDoAddReducer
    }
}
const mapDispatchtoProps = (dispatch) => {
    return bindActionCreators({
        toDoAddAction
    }, dispatch);
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Todo);
