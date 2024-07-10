/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

export const useIterator = (url) => {
  const [users, updateUsers] = useState([]);
  const [index, updateIndex] = useState(0);
  const [isLoading, updateIsLoading] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    updateIsLoading(true);
    axios.get(url).then((response) => {
      const { data } = response;
      const { results } = data;
      const {
        name: { first, last },
        picture: { thumbnail },
        login: { uuid },
      } = results[0];
      updateUsers((prevUsers) => [
        ...prevUsers,
        { id: uuid, name: `${first} ${last}`, picture: thumbnail },
      ]);
      updateIsLoading(false);
    });
  };

  useEffect(() => {
    updateIndex(users.length - 1);
  }, [users]);

  const next = () => {
    if (index + 1 < users.length) {
      updateIndex(index + 1);
    } else {
      fetchUser();
    }
  };

  const previous = () => {
    let currentIndex = index - 1;
    if (currentIndex < 0) {
      currentIndex = users.length - 1;
    }
    updateIndex(currentIndex);
  };

  return [users, users[index], isLoading, next, previous];
};
