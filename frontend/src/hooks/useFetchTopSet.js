import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export default function useFetchTopSet() {
  const [topSet, setTopSet] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        // const url = "#"
        const response = await axios.get(`/search/top3`, config);

        setTopSet(response.data);

        // setTopSet([
        //   {
        //     flashcardSetId: 1,
        //     title: "Từ vựng thông dụng",
        //     description:
        //       "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        //     numberVote: 27,
        //     votePoint: 4.5,
        //     numberCard: 60,
        //     createdAt: "2023/10/10",
        //     type: 1,
        //     private: false,
        //     authDTO: {
        //       userId: 1,
        //       userName: "ducpa01",
        //       role: 1,
        //     },
        //   },
        //   {
        //     flashcardSetId: 2,
        //     title: "Từ vựng thông dụng",
        //     description:
        //       "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        //     numberVote: 27,
        //     votePoint: 4.5,
        //     numberCard: 60,
        //     createdAt: "2023/10/10",
        //     type: 1,
        //     private: false,
        //     authDTO: {
        //       userId: 1,
        //       userName: "ducpa01",
        //       role: 1,
        //     },
        //   },
        //   {
        //     flashcardSetId: 3,
        //     title: "Từ vựng thông dụng",
        //     description:
        //       "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        //     numberVote: 27,
        //     votePoint: 4.5,
        //     numberCard: 60,
        //     createdAt: "2023/10/10",
        //     type: 3,
        //     private: false,
        //     authDTO: {
        //       userId: 1,
        //       userName: "ducpa01",
        //       role: 1,
        //     },
        //   },
        // ]);

        setLoading(false);
      } catch (error) {
        // TODO: navigate to not found or accessdenied
        setLoading(false);
        const errorCode = error?.response?.status;
        console.log(errorCode);
        // if (errorCode === 404) navigate("/not-found"); // not found
        // if (errorCode === 401) navigate("/access-denied"); // not authorize
      }
    };

    fetch();
  }, []);

  return { topSet, loading };
}
