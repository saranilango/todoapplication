 import React, { useState, useEffect } from 'react'; 
 import {connect} from 'react-redux';
 import { bindActionCreators } from 'redux';
 import { toDoAddAction } from '../store/actions/toDoAddAction';

const Todo = (props)   => {
    

    const [todoList, setTodoList] = useState([ ]);
    const [newTodo, setNewTodo] = useState("");
    const [searchTodoValue, setSearchTodoValue] = useState("");
    const [input, setInput] = useState(true);
    const [isAll, setIsAll] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [checked, setChecked] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [searchData, setSearchData] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() =>{
        setSearchData(todoList);
        setCount(todoList.length);
        if(props.toDoAddReducer.isSuccess){
            console.log(props, 'propsprops');
            setSearchData([...searchData, props.toDoAddReducer.data]);
            setTodoList([...todoList, props.toDoAddReducer.data]);
        }
    },[props.toDoAddReducer]);

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    }
    const addTodo = () => {

        props.toDoAddAction(newTodo);
    }
    const searchTodo = () => {
        setInput(false);
        setCount(todoList.length);
    }
    const handleSearch = (event) => {
        if (event.target.value !== "") {
            let newArray = todoList.filter(list => list.toLowerCase().includes(event.target.value))
            setSearchData(newArray);
            setSearchTodoValue(event.target.value);
        } else {
            setSearchData(todoList);
            setSearchTodoValue(event.target.value)
        }
    }

    const checkValue = (e, index) => {
        if (e.currentTarget.checked === true) {
            setIsActive(false);
            setIsCompleted(true);
            setCount(count - 1);
        } else {
            setIsActive(true);
            setIsCompleted(false);
            setCount(count + 1);
        }
    }
    
    
    
        return (
            <div className="wrapper">
                <div className="header"><h2>Todo Application</h2></div>
                <div className="content">
                    <div className="content-blk card">
                        {input ? <input type="text" placeholder="Add New" value={newTodo} onChange={handleChange} /> :
                            <input type="text" placeholder="Search" value={searchTodoValue} onChange={handleSearch} />
                        }

                        <div className="ht560 srl_auto" >
                            {searchData.length > 0 ? searchData.map((option, index) => {
                                return <div className="list_stl" key={option}><input type="checkbox" onChange={(e) => checkValue(e, index)} id={index} /> {option}</div>
                            }) : ""}
                        </div>
                        <div className="foot_container">
                            <div className="div_padding">
                                <span className="span_padding cursor" onClick={addTodo}>
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span className="span_padding cursor" onClick={searchTodo} >
                                    <i className="fas fa-search"></i>
                                </span>
                                <span>|</span>
                                <span className="span_padding">{count} items left</span>
                            </div>
                            <div className="foot_container">
                                <div className="div_mrging padding" style={{ backgroundColor: isAll ? 'grey' : 'white', border: isAll ? "1px double" : "", borderRadius: isAll ? "2px" : "" }} >All</div>
                                <div className="div_mrging padding" style={{ backgroundColor: isActive ? 'grey' : 'white', border: isActive ? "1px double" : "", borderRadius: isActive ? "2px" : "" }} >Active</div>
                                <div className="div_mrging padding" style={{ backgroundColor: isCompleted ? 'grey' : 'white', border: isCompleted ? "1px double" : "", borderRadius: isCompleted ? "2px" : "" }}>Completed</div>
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

  export default connect(mapStatetoProps, mapDispatchtoProps) (Todo);
