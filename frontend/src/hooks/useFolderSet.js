import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";

const useFolderSet = ({ adding }) => {
  const [folderSet, setFolderSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const { folderId } = useParams();
  const { accessToken } = useAuth();
  const {navigate} = useNavigate();

  useEffect(() => {
    const getSet = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        };
        const response = await axios.get(`/createfolder/${folderId}/view-set-folder`, config);
        setFolderSet(response.data);
        // setFolderSet([{
        //   flashcardSetId: 1,
        //   title: "Từ vựng thông dụng",
        //   description:
        //     "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        //   numberVote: 27,
        //   votePoint: 4.5,
        //   numberCard: 60,
        //   createdAt: "2023/10/10",
        //   type: 1,
        //   private: false,
        //   authoDTO: {
        //     userId: 1,
        //     userName: "ducpa01",
        //     role: 1,
        //   },
        // },
        // {
        //   flashcardSetId: 2,
        //   title: "Từ vựng thông dụng",
        //   description:
        //     "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        //   numberVote: 27,
        //   votePoint: 4.5,
        //   numberCard: 60,
        //   createdAt: "2023/10/10",
        //   type: 1,
        //   private: false,
        //   authoDTO: {
        //     userId: 1,
        //     userName: "ducpa01",
        //     role: 1,
        //   },
        // },
        // {
        //   flashcardSetId: 3,
        //   title: "Từ vựng thông dụng",
        //   description:
        //     "Danh sách từ vựng thông dụng học bài 1 giáo trình minanonihongo",
        //   numberVote: 27,
        //   votePoint: 4.5,
        //   numberCard: 60,
        //   createdAt: "2023/10/10",
        //   type: 3,
        //   private: false,
        //   authoDTO: {
        //     userId: 1,
        //     userName: "ducpa01",
        //     role: 1,
        //   },
        // }])
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
      console.log("sao khong vao day nhe",adding)
    };
    getSet();
    console.log("use folder set",adding)
  }, [folderId,adding]);

  const deleteFolderSet = async (setId) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      const response = await axios.delete(`/createfolder/${folderId}/get-all-set/${setId}`, config);
      const deletedList = folderSet.filter(set=>set.flashcardSetId!==setId)
      setFolderSet(deletedList);
      console.log(setId)
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };
  return {
    folderSet,
    loading,
    mutationing,
    deleteFolderSet,
  };
};

export default useFolderSet;
