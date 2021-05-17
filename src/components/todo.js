import React, { Component } from 'react';

class todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoList: [
                "Learn Java",
                "Learn Javascript",
                "Build a React App"
            ],
            newTodo: "",
            searchTodoValue: "",
            input: true,
            isAll: false,
            isCompleted: false,
            checked: false,
            isActive: true,
            searchData: [],
            count: 0
        }

    }
    handleChange = (event) => {
        this.setState({ newTodo: event.target.value });
    }
    addTodo = () => {
        this.setState({
            searchData: [...this.state.todoList, this.state.newTodo],
            todoList: [...this.state.todoList, this.state.newTodo],
            newTodo: "",
            count: this.state.count + 1
        });
    }
    searchTodo = () => {
        this.setState({ input: false, count: this.state.todoList.length })
    }
    handleSearch = (event) => {
        if (event.target.value !== "") {
            let newArray = this.state.todoList.filter(list => list.toLowerCase().includes(event.target.value))
            this.setState({ searchData: newArray, searchTodoValue: event.target.value });
        } else {
            this.setState({ searchData: this.state.todoList, searchTodoValue: "" })
        }
    }

    checkValue = (e, index) => {
        if (e.currentTarget.checked === true) {
            this.setState({ isActive: false, isCompleted: true, count: this.state.count - 1 })

        } else {
            this.setState({ isActive: true, isCompleted: false, count: this.state.count + 1 })

        }
    }
    componentDidMount() {
        this.setState({ searchData: this.state.todoList, count: this.state.todoList.length })
    }
    render() {
        const { isAll, isActive, isCompleted } = this.state;

        return (
            <div className="wrapper">
                <div className="header"><h2>Todo Application</h2></div>
                <div className="content">
                    <div className="content-blk card">
                        {this.state.input ? <input type="text" placeholder="Add New" value={this.state.newTodo} onChange={this.handleChange} /> :
                            <input type="text" placeholder="Search" value={this.state.searchTodoValue} onChange={this.handleSearch} />
                        }

                        <div className="ht560 srl_auto" >
                            {this.state.searchData.length > 0 ? this.state.searchData.map((option, index) => {
                                return <div className="list_stl" key={option}><input type="checkbox" onChange={(e) => this.checkValue(e, index)} id={index} /> {option}</div>
                            }) : ""}
                        </div>
                        <div className="foot_container">
                            <div className="div_padding">
                                <span className="span_padding cursor" onClick={this.addTodo}>
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span className="span_padding cursor" onClick={this.searchTodo} >
                                    <i className="fas fa-search"></i>
                                </span>
                                <span>|</span>
                                <span className="span_padding">{this.state.count} items left</span>
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
}

export default todo;