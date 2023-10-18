import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import { utils, read } from "xlsx";
import {parseVocaExcel,parseGrammaExcel,parseKanjiExcel} from '../utils/parseData'

const useSetEdit = ({ handleToggleUpdateSet, setAlert }) => {
  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mutationing, setMutationing] = useState(false);
  const [importing, setImporting] = useState(false);
  const { setId } = useParams();
  const { accessToken } = useAuth();
  const navigate = useNavigate();

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
        const response = await axios.get(`/createfls/${setId}`, config);
        setDataSet(response.data);
        setLoading(false);
      } catch (error) {
        // log ra status
        // TODO: navigate to not found or accessdenied
        const errorCode = error.response.status;
        if (errorCode === 404) navigate("/not-found"); // not found
        if (errorCode === 401) navigate("/access-denied"); // not authorize
        setLoading(false);
      }
    };
    getSet();
  }, [setId]);

  const updateSet = async (newSet) => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu post để thêm mới dữ liệu
      const response = await axios.put(
        `/createfls/${setId}`,
        JSON.stringify(newSet),
        config
      );
      const newFlashSet = { ...dataSet, ...newSet };
      setDataSet(newFlashSet);
      handleToggleUpdateSet();
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const deleteSet = async () => {
    try {
      setMutationing(true);
      const config = {
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      // Gửi yêu cầu delete để xoá dữ liệu
      const response = await axios.delete(`/createfls/${setId}`, config);
      navigate("/");
      setMutationing(false);
    } catch (error) {
      setMutationing(false);
      console.log("Error:", error.response?.data?.errors?.body[0]);
    }
  };

  const importFile = async (e) => {
    e.preventDefault();
    if (!e.target.files) {
      setAlert({
        open: true,
        severity: "error",
        message: "File không tồn tại",
      });
      return console.log("file khong ton tai");
    }

    const file = e.target.files[0];
    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setAlert({
        open: true,
        severity: "error",
        message: "Chỉ nhận định dạng file excel",
      });
      return console.log("Chỉ nhận định dạng file excel");
    }
    if (file.size >= 1 * 1024 * 1024) {
      setAlert({
        open: true,
        severity: "error",
        message:
          "Bạn không nên nhập quá nhiều thẻ trong một bộ! Tối đa 1000 thẻ. File size max 1MB",
      });
      return console.log(
        "Bạn không nên nhập quá nhiều thẻ trong một bộ! Tối đa 1000 thẻ. File size max 1MB"
      );
    }
    const reader = new FileReader();
    setImporting(true);
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = utils.sheet_to_json(worksheet);
  
      // Modify the JSON keys as needed
      const jsonParsed = dataSet.type === 1
      ? parseKanjiExcel(json)
      : dataSet.type === 2
      ? parseVocaExcel(json)
      : parseGrammaExcel(json)
      
      
      // gui ve backend
      try {
        const config = {
          headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const url =
          dataSet.type === 1
            ? `/createfls/${setId}/import/kanji-card`
            : dataSet.type === 2
            ? `/createfls/${setId}/import/vocab-card`
            : `/createfls/${setId}/import/grammar-card`;
        // Gửi yêu cầu post để thêm mới dữ liệu
        const response = await axios.post(
          url,
          JSON.stringify(jsonParsed),
          config
        );
        
        setImporting(false);
      } catch (error) {
        setImporting(false);
    
        setAlert({
          open: true,
          severity: "error",
          message:
            "Nhập không thành công vui lòng đổi tên cột giống trong phần hướng dẫn",
        });
      }
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  };
  return {
    dataSet,
    loading,
    mutationing,
    importing,
    deleteSet,
    updateSet,
    importFile,
  };
};

export default useSetEdit;
