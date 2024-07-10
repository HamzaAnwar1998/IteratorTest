/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

export const useIterator = (url) => {
  // states
  const [users, updateUsers] = useState([]);
  const [index, updateIndex] = useState(0);
  const [isLoading, updateIsLoading] = useState(true);

  // fetch one user initially on app start
  useEffect(() => {
    fetchUser();
  }, []);

  // fetch user function
  const fetchUser = () => {
    updateIsLoading(true);
    axios.get(url).then((response) => {
      const { data } = response;
      const { results } = data;
      const { name, login, picture } = results[0];
      const { first, last } = name;
      const { uuid } = login;
      const { thumbnail } = picture;
      updateUsers((prevUsers) => [
        ...prevUsers,
        { id: uuid, name: `${first} ${last}`, picture: thumbnail },
      ]);
      updateIsLoading(false);
    });
  };

  // update index on users array change
  useEffect(() => {
    updateIndex(users.length - 1); // 4-1=3
  }, [users]);

  // next
  const next = () => {
    if (index + 1 < users.length) {
      updateIndex(index + 1);
    } else {
      fetchUser();
    }
  };

  // previous
  const previous = () => {
    let currentIndex = index - 1;
    if (currentIndex < 0) {
      currentIndex = users.length - 1;
    }
    updateIndex(currentIndex);
  };

  // return statement
  return [users, users[index], isLoading, next, previous];
};
