import { createContext, useState } from "react";

export const ClassPostContext = createContext({});

export const ClassPostProvider = ({ children }) => {
  const [classPost, setClassPost] = useState([]);
  const [mutation, setMutation] = useState(false);

  const createClassPost = function (feed) {
    classPost.unshift(feed);
  };

  const updateClassPost = function (feed) {
    classPost.forEach((post) => {
      if (post.classPostId) {
        post.content = feed.content;
        return;
      }
    });
  };

  return (
    <ClassPostContext.Provider
      value={(classPost, mutation, setClassPost, setMutation)}
    >
      {children}
    </ClassPostContext.Provider>
  );
};
