import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import NotFound from "./pages/NotFound";
import Forgotten from "./pages/Forgotten";
import AccessDenied from "./pages/AccessDenied";
import CreateSet from "./pages/CreateSet";
import UserAdd from "./pages/UserAdd";
import LogoutRoute from "./routes/LogoutRoute";
import AuthenRoute from "./routes/AuthenRoute";
import AdminRoute from "./routes/AdminRoute";
import Profile from "./pages/Profile";
import LearnHistory from "./pages/LearnHistory";
import SearchPage from "./pages/SearchPage";
import ChangePass from "./pages/ChangePass";
import SetEdit from "./pages/SetEdit";
import { UserView } from "./pages/UserView";
import LibRoot from "./routes/LibRoot";
import LibSets from "./pages/LibSets";
import LibBookMarked from "./pages/LibBookMarked";
import LibClasses from "./pages/LibClasses";
import LibFolders from "./pages/LibFolders";
import CreateFolder from "./pages/CreateFolder";
import JoinClass from "./pages/JoinClass";
import CreateClass from "./pages/CreateClass";
import AuthoRoute from "./routes/AuthoRoute";
import Recents from "./pages/Recents";
import LayoutNormal from "./components/Parts/LayoutNormal";
import UnAuthenRoute from "./routes/UnAuthenRoute";
import FolderSet from "./pages/FolderSet";
import Classroom from "./pages/Classroom";
import ClassSet from "./pages/ClassSet";
import ClassMember from "./pages/ClassMember";
import ReadSet from "./pages/ReadSet";
import LearnSet from "./pages/LearnSet";
import ClassProgress from "./pages/ClassProgress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UnAuthenRoute>
              <Home />
            </UnAuthenRoute>
          }
        />
        <Route
          path="/home"
          element={
            <LayoutNormal>
              <Recents />
            </LayoutNormal>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotten" element={<Forgotten />} />
        <Route
          path="/profile"
          element={<AuthenRoute element={<Profile />} />}
        />
        <Route
          path="/changepass"
          element={<AuthenRoute element={<ChangePass />} />}
        />
        <Route
          path="/dashboard"
          element={<AdminRoute element={<Dashboard />} />}
        />
        <Route path="/users">
          <Route
            index
            path="/users/list"
            element={<AdminRoute element={<UserList />} />}
          />
          <Route
            path="/users/add"
            element={<AdminRoute element={<UserAdd />} />}
          />
          <Route
            path="/users/:id"
            element={<AdminRoute element={<UserView />} />}
          />
        </Route>
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/my-lib/recent"
          element={<AuthenRoute element={<LearnHistory />} />}
        />
        <Route
          path="/latest"
          element={<AuthenRoute element={<NotFound />} />}
        />
        <Route
          path="/create-set"
          element={<AuthenRoute element={<CreateSet />} />}
        />
        <Route
          path="/create-folder"
          element={<AuthenRoute element={<CreateFolder />} />}
        />
        <Route
          path="/join-class"
          element={<AuthenRoute element={<JoinClass />} />}
        />

        <Route
          path="/create-class"
          element={<AuthoRoute role={2} element={<CreateClass />} />}
        />
        <Route
          path="/:setId/edit"
          element={<AuthenRoute element={<SetEdit />} />}
        />

        <Route
          path="/:setId/flashcard"
          element={<AuthenRoute element={<LearnSet />} />}
        />
        <Route path="/:setId/read" element={<ReadSet />} />
        <Route path="/my-lib" element={<AuthenRoute element={<LibRoot />} />}>
          <Route
            path="/my-lib/recent"
            index
            element={<AuthenRoute element={<LearnHistory />} />}
          />
          <Route
            path="/my-lib/sets"
            element={<AuthenRoute element={<LibSets />} />}
          />
          <Route
            path="/my-lib/folders"
            element={<AuthenRoute element={<LibFolders />} />}
          />
          <Route
            path="/my-lib/classes"
            element={<AuthenRoute element={<LibClasses />} />}
          />
          <Route
            path="/my-lib/marked"
            element={<AuthenRoute element={<LibBookMarked />} />}
          />
        </Route>
        <Route
          exact
          path="/class/:classRoomId"
          element={<AuthenRoute element={<Classroom />} />}
        />
        <Route
          exact
          path="/class/:classRoomId/class-sets"
          element={<AuthenRoute element={<ClassSet />} />}
        />
        <Route
          exact
          path="/class/:classRoomId/progress/:setId"
          element={<AuthenRoute element={<ClassProgress />} />}
        />
        <Route
          exact
          path="/class/:classRoomId/class-members"
          element={<AuthenRoute element={<ClassMember />} />}
        />
        <Route
          path="/folders/:folderId"
          element={<AuthenRoute element={<FolderSet />} />}
        />
        <Route path="/signout" element={<LogoutRoute />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
