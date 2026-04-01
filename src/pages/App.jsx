import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

import LoginPage from "./loginPage.jsx";
import SignUpForm from "../components/loginsignup/signupForm.jsx";

import MainPage from "./mainPage.jsx";

import MentorchipPage from "./mentorchipPage.jsx";
import RequestPage from "./mentorchipRequestsPage.jsx";
import EvaluationPage from "./mentorchipEvaluPage.jsx";

import MessagesPage from "./messagesPage.jsx";

import LibraryPage from "./libraryPage.jsx";
import LibraryArchivesPage from "./libraryArchivesPage.jsx";

import CalendarPage from "./calendarPage.jsx";

import ForumHomePage from "./forumHomePage.jsx";
import ForumThreadsPage from "./forumThreadsPage.jsx";
import ForumViewPostPage from "./forumViewPostPage.jsx";
import ForumBookmarksPage from "./forumBookmarksPage.jsx";

import CreateKeywordPage from "./adminCreateKeywordPage.jsx";
import CreateDeptPage from "./adminCreateDeptPage.jsx";

import UserDashboardPage from "./userDashboardPage.jsx";

/* ✅ Layout WITH Navbar */
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        {/* ❌ NO NAVBAR */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signupPage" element={<SignUpForm />} />

        {/* ✅ WITH NAVBAR */}
        <Route element={<MainLayout />}>

          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/messagesPage" element={<MessagesPage />} />
          <Route path="/calendarPage" element={<CalendarPage />} />

          {/* forum */}
          <Route path="/forumHomePage" element={<ForumHomePage />} />
          <Route path="/bookmarks" element={<ForumBookmarksPage />} />
          <Route path="/threads" element={<ForumThreadsPage />} />
          <Route path="/post/:id" element={<ForumViewPostPage />} />

          {/* library */}
          <Route path="/libraryPage" element={<LibraryPage />} />
          <Route path="/libraryArchivesPage" element={<LibraryArchivesPage />} />

          {/* mentorchip */}
          <Route path="/mentorchipPage" element={<MentorchipPage />} />
          <Route path="/mentorchipRequestsPage" element={<RequestPage />} />
          <Route path="/mentorchipEvaluPage" element={<EvaluationPage />} />

          {/* ADMIN dashboard */}
          <Route path="/adminCreateKeywordPage" element={<CreateKeywordPage />} />
          <Route path="/adminCreateDeptPage" element={<CreateDeptPage />} />

          {/* USER dashboard */}
          <Route path="/userDashboardPage" element={<UserDashboardPage />} />


        </Route>

      </Routes>
    </Router>
  );
}

export default App;