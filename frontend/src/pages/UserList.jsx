import React, { useEffect } from "react";
import UsersTable from "../components/UsersTable";
import useFetchUsers from "../hooks/useFetchUsers";
import BackdropLoading from "../components/FeedBack/BackdropLoading";
import LayoutAdmin from "../components/Parts/LayoutAdmin";

const UserList = () => {
  const { data, loading, changing, lockUser, unLockUser } = useFetchUsers();
  useEffect(() => {
    document.title = "Danh sách người dùng";
  }, []);
  return (
    <LayoutAdmin>
      <>
        {loading ? (
          <BackdropLoading />
        ) : (
          <UsersTable data={data} lockUser={lockUser} unLockUser={unLockUser} />
        )}
        {changing ? <BackdropLoading /> : ""}
      </>
    </LayoutAdmin>
  );
};

export default UserList;
