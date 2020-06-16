import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class FriendList extends React.Component {
  state = {
    friendList: [],
    formValues: {
      name: "",
      age: "",
      email: "",
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // get request
    // add token to authorization header
    // const token = window.localStorage.getItem('token');

    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        console.log(res);
        this.setState({
          friendList: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      ...this.state.friendList,
      formValues: {
        ...this.state.formValues,
        [e.target.name]: e.target.value,
      },
    });
  };

  addFriend = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", this.state.formValues)
      .then((res) => {
          console.log(res);
          this.setState({
            friendList: res.data,
            formValues: {
              name: '',
              age: '',
              email: '',
            },
          })
        })
      .catch((err) => console.log(err))
      .finally()
  };

  render() {
    return (
      <div>
        <h1> These are my friends!</h1>
        {this.state.friendList.map((friend) => {
          return <h3 key={friend.id}>{friend.name}</h3>;
        })}

        <form>
          {" "}
          Name
          <input
            type="text"
            name="name"
            value={this.state.formValues.name}
            onChange={this.handleChange}
          ></input>
          Age
          <input
            type="text"
            name="age"
            value={this.state.formValues.age}
            onChange={this.handleChange}
          ></input>
          Email
          <input
            type="text"
            name="email"
            value={this.state.formValues.email}
            onChange={this.handleChange}
          ></input>
          <button onClick={this.addFriend}> Add Friend</button>
        </form>
      </div>
    );
  }
}

export default FriendList;
