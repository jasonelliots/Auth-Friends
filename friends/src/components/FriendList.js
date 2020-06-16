import React, {useState, useEffect} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendList = () => {

    const [friendList, setFriendList] = useState([]);
    const [formValues, setFormValues] = useState({name: '', age: '', email: ''})

    useEffect(() => {
        axiosWithAuth()
        .get("/api/friends")
        .then((res) => {
          console.log(res);
          setFriendList(res.data);
        })
        .catch((err) => console.log(err));
    }, [])


    const handleChange = (e) => {
        setFormValues({
            ...formValues, 
            [e.target.name]: e.target.value,
         })
    }

  const addFriend = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", formValues)
      .then((res) => {
          console.log(res);
          setFriendList(res.data);
          setFormValues({name: '', age: '', email: ''});
        })
      .catch((err) => console.log(err))
  };

    return (
      <div>
        <h1> These are my friends!</h1>
        {friendList.map((friend) => {
          return <h3 key={friend.id}>{friend.name}</h3>;
        })}

        <form>
          {" "}
          Name
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          ></input>
          Age
          <input
            type="text"
            name="age"
            value={formValues.age}
            onChange={handleChange}
          ></input>
          Email
          <input
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          ></input>
          <button onClick={addFriend}> Add Friend</button>
        </form>
      </div>
    );

}

export default FriendList;
