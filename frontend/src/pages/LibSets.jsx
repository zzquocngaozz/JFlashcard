import { Stack } from "@mui/material";
import React from "react";
import SetSingle from "../components/Cards/SetSingle";

// TODO: lam hook get list class by userid
const LibSets = () => {
  const flashcardSetList = [
    {
      flashcardSetId: 1,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
      numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      createdAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 2,
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
      type: 2,
      private: false,
      authoDTO: {
        userId: 2,
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
      type: 2,
      private: false,
      authoDTO: {
        userId: 2,
        userName: "ducpa01",
        role: 1,
      },
    },
    {
      flashcardSetId: 4,
      title: "Từ vựng thông dụng",
      description:
        "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        numberVote: 27,
      votePoint: 4.5,
      numberCard: 60,
      createdAt: "2023/10/10",
      type: 2,
      private: false,
      authoDTO: {
        userId: 1,
        userName: "BanKai01",
        role: 2,
      },
    },
  ];

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        paddingTop: "20px",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: "30px",
      }}
    >
      {flashcardSetList.map((flashcardSet) => (
        <SetSingle
          key={flashcardSet.flashcardSetId}
          flashcardSet={flashcardSet}
        />
      ))}
    </Stack>
  );
};

export default LibSets;
