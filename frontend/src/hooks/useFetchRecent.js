import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export default function useFetchRecent() {
  const [recent, setRecent] = useState({ classes: [], sets: [] });
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetch = async (url1, url2) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        // const classes = axios.get(url1, config);
        // const sets = axios.get(url2, config);

        // const resultClass = (await classes).data;
        // const resultSets = (await sets).data;

        // setRecent({resultClass, resultSets});

        setRecent({
          classes: [
            {
              classRoomId: 1,
              classRoomName: "Lớp học kaiwa cô Kai",
              classRoomCode: "avxC2sss",
              description: "Lớp học kaiwa khoá 7 kỳ 3",
              numberStudent: 27,
              numberSet: 10,
              createdAt: "2023/10/10",
              teacher: {
                userId: 11,
                userName: "BanKai01",
                role: 2,
              },
            },
            {
              classRoomId: 2,
              classRoomName: "Lớp học kaiwa cô Kai",
              classRoomCode: "avxC2sss",
              description: "Lớp học kaiwa khoá 7 kỳ 3",
              numberStudent: 27,
              numberSet: 10,
              createdAt: "2023/10/8",
              teacher: {
                userId: 21,
                userName: "BanKai02",
                role: 2,
              },
            },
            {
              classRoomId: 3,
              classRoomName: "Lớp học kaiwa cô Kai",
              classRoomCode: "avxC2sss",
              description: "Lớp học kaiwa khoá 7 kỳ 3",
              numberStudent: 27,
              numberSet: 10,
              createdAt: "2023/10/7",
              teacher: {
                userId: 11,
                userName: "BanKai01",
                role: 2,
              },
            },
            {
              classRoomId: 4,
              classRoomName: "Lớp học kaiwa cô Kai",
              classRoomCode: "avxC2sss",
              description: "Lớp học kaiwa khoá 7 kỳ 3",
              numberStudent: 27,
              numberSet: 10,
              createdAt: "2023/10/10",
              teacher: {
                userId: 11,
                userName: "BanKai03",
                role: 2,
              },
            },
          ],
          sets: [
            {
              flashcardSetId: 1,
              title: "Từ vựng thông dụng",
              description:
                "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
              numberVote: 27,
              votePoint: 4.5,
              numberCard: 60,
              createdAt: "2023/10/10",
              type: 1,
              private: false,
              authoDTO: {
                userId: 1,
                userName: "ducpa01",
                role: 1,
              },
            },
            {
              flashcardSetId: 2,
              title: "Từ vựng thông dụng",
              description:
                "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
              numberVote: 27,
              votePoint: 4.5,
              numberCard: 60,
              createdAt: "2023/10/10",
              type: 1,
              private: false,
              authoDTO: {
                userId: 1,
                userName: "ducpa01",
                role: 1,
              },
            },
            {
              flashcardSetId: 3,
              title: "Từ vựng thông dụng",
              description:
                "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
              numberVote: 27,
              votePoint: 4.5,
              numberCard: 60,
              createdAt: "2023/10/10",
              type: 3,
              private: false,
              authoDTO: {
                userId: 1,
                userName: "ducpa01",
                role: 1,
              },
            },
          ],
        });

        // setLoading(false);
      } catch (error) {
        // TODO: navigate to not found or accessdenied
        // setLoading(false);
        const errorCode = error.response.status;
        console.log(errorCode);
        // if (errorCode === 404) navigate("/not-found"); // not found
        // if (errorCode === 401) navigate("/access-denied"); // not authorize
      }
    };

    fetch("link1", "link2");
  }, []);

  return { recent, loading };
}
