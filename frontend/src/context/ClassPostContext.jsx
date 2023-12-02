import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export const ClassPostContext = createContext({});

export const useClassPostContext = () => useContext(ClassPostContext);

export const useInitClassPost = () => {
  const context = useContext(ClassPostContext);
  const [loading, setLoading] = useState(true);
  const { classRoomId } = useParams();
  const { accessToken } = useAuth();
  useEffect(() => {
    const sortComment = (feed) => {
      if (feed.comments.length < 2) return feed;
      const sorted = feed.comments.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const sortedFeed = { ...feed, comments: sorted };
      return sortedFeed;
    };
    const fetchPost = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(
          `/classroom/${classRoomId}/class-post`,
          config
        );
        setLoading(false);
        context.setClassPost(
          response?.data?.map((feed) => {
            return sortComment(feed);
          })
        );
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [classRoomId]);

  return { loading, ...context };
};

export const ClassPostProvider = ({ children }) => {
  const [classPost, setClassPost] = useState([]);
  const [mutation, setMutation] = useState(false);
  const { accessToken } = useAuth();
  const { classRoomId } = useParams();

  const createClassPost = async function (feed, handleToggleForm) {
    try {
      setMutation(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.post(
        `/classroom/${classRoomId}/class-post`,
        JSON.stringify(feed),
        config
      );

      handleToggleForm();
      classPost.unshift(response?.data);
    } catch (error) {
      console.log(error);
    }
    setMutation(false);
  };

  const updateClassPost = async function (feed, handleToggleForm) {
    try {
      setMutation(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.put(
        `/classroom/${classRoomId}/class-post`,
        JSON.stringify(feed),
        config
      );

      classPost.forEach((post) => {
        if (post.classPostId === feed.classPostId) {
          post.content = feed.content;
          return;
        }
      });
      handleToggleForm();
      setMutation(false);
    } catch (error) {
      setMutation(false);
      console.log(error);
    }
  };

  const createComment = async (comment, classPostId, reset) => {
    try {
      setMutation(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.post(
        `/classroom/${classRoomId}/class-post/${classPostId}`,
        JSON.stringify(comment),
        config
      );
      classPost.find((post) => {
        if (post.classPostId === classPostId) {
          post.comments.unshift(response?.data);
          return;
        }
      });

      reset();
    } catch (error) {
      console.log(error);
    }
    setMutation(false);
  };

  const deleteComment = async (commentId, classPostId) => {
    try {
      setMutation(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.delete(
        `/classroom/${classRoomId}/class-post/${classPostId}/${commentId}`,
        config
      );

      classPost.forEach((feed) => {
        if (feed.classPostId === classPostId) {
          feed.comments = feed.comments.filter(
            (com) => com.commentId !== commentId
          );
          return;
        }
      });
      setMutation(false);
    } catch (error) {
      setMutation(false);
      console.log(error);
    }
  };

  const deleteClassPost = async function (classPostId, handleToggle) {
    try {
      setMutation(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      const response = await axios.delete(
        `/classroom/${classRoomId}/class-post/${classPostId}`,
        config
      );
      const deletedList = classPost.filter(
        (feed) => feed.classPostId !== classPostId
      );
      setClassPost(deletedList);
      handleToggle();
      setMutation(false);
    } catch (error) {
      console.log(error);
      setMutation(false);
    }
  };

  return (
    <ClassPostContext.Provider
      value={{
        classPost,
        mutation,
        setClassPost,
        createClassPost,
        updateClassPost,
        deleteClassPost,
        setMutation,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </ClassPostContext.Provider>
  );
};
