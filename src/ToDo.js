import React, { Component } from "react";

class ToDo extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("listArray") == null) {
      this.state = {
        nameTask: "",
        list: [],
        done: false
      };
    } else {
      this.state = {
        nameTask: "",
        list: JSON.parse(localStorage.getItem("listArray")),
        done: false
      };
    }
  }
  handleSubmit(event) {
    event.preventDefault();

    let listArray = this.state.list;
    listArray.push(this.state.nameTask);

    localStorage.setItem("listArray", JSON.stringify(listArray));

    this.setState({
      nameTask: "",
      list: JSON.parse(localStorage.getItem("listArray"))
    });
  }

  handleNameChange(event) {
    this.setState({ nameTask: event.target.value });
  }

  markDone() {
    console.log(this.state.done);
    this.setState({
      done: !this.state.done
    });
  }

  deleteTask(index) {
    console.log("del", index);
    let listArray = this.state.list;
    listArray.splice(index, 1);

    localStorage.setItem("listArray", JSON.stringify(listArray));

    this.setState({
      list: listArray
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <p id="title">To Do App</p>
            <input
              type="text"
              placeholder="What to do..."
              value={this.state.nameTask}
              onChange={this.handleNameChange.bind(this)}
            />
            <button>Add</button>
          </label>
        </form>
        <div>
          <ul>
            {this.state.list.map((task, index) => (
              <li key={index}>
                <button
                  className="submit"
                  onClick={() => this.deleteTask(index)}
                >
                  Delete
                </button>
                <p className={this.state.done ? "done" : "notDone"}>{task}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ToDo;
