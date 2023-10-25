import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

export default function useSearchPublic() {
  const [listSet, setListSet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const { accessToken } = useAuth();
  const sets = [
    {
      flashcardSetId: 1,
      title: "Bài 1 minnanihongo",
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
      title: "Bài 2 quyển đỏ dekiru",
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
      title: "Bài 3 quyển xanh Dekiru",
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
    {
      flashcardSetId: 4,
      title: "Hán tự tamago quyển 1 bài 2",
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
      flashcardSetId: 5,
      title: "Dekiru quyển vàng",
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
      flashcardSetId: 6,
      title: "Từ vựng IT buổi 1",
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
      flashcardSetId: 7,
      title: "Từ vựng IT buổi 2",
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
      flashcardSetId: 8,
      title: "Kaiwa hàng ngày",
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
      flashcardSetId: 9,
      title: "Bài 3 minnanihongo",
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
      flashcardSetId: 10,
      title: "Bài 4 minnanihongo",
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
      flashcardSetId: 11,
      title: "Bài 4 nihongo dekiru",
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
      flashcardSetId: 12,
      title: "Bài 5 nihongo dekiru",
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
      flashcardSetId: 13,
      title: "Bài 6 nihongo dekiru",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 24,
      votePoint: 4.3,
      numberCard: 50,
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
      flashcardSetId: 14,
      title: "Bài 6 nihongo dekiru",
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
      flashcardSetId: 15,
      title: "Bài 7 nihongo dekiru",
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
      flashcardSetId: 16,
      title: "Bài 7 nihongo dekiru",
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
      flashcardSetId: 17,
      title: "Bài 8 nihongo dekiru",
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
      flashcardSetId: 18,
      title: "Bài 9 nihongo dekiru",
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
      flashcardSetId: 19,
      title: "Bài 10 nihongo dekiru",
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
      flashcardSetId: 20,
      title: "Bài 11 nihongo dekiru",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 26,
      votePoint: 4.7,
      numberCard: 50,
      createdAt: "2023/10/10",
      type: 1,
      private: false,
      authoDTO: {
        userId: 1,
        userName: "ducpa01",
        role: 1,
      },
    },
  ];

  const searchPublic = async (q) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      };
      // const url = "#"
      // const response = await axios.get(url, config);
      // setListSet(response.data);
      console.log(q);
      setListSet(
        sets.filter((set) => set.title.toLowerCase().includes(q.toLowerCase()))
      );
      setTimeout(() => {
        setSearching(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      // TODO: navigate to not found or accessdenied
      setLoading(false);
      const errorCode = error.response.status;
      console.log(errorCode);
      // if (errorCode === 404) navigate("/not-found"); // not found
      // if (errorCode === 401) navigate("/access-denied"); // not authorize
    }
  };

  return { listSet, loading, searching, searchPublic };
}
