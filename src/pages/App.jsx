import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

import LoginPage from "./loginPage.jsx";
import SignUpForm from "../components/loginsignup/signupForm.jsx";
import Login from "../components/loginsignup/loginForm.jsx";

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

import UserDashboardPage from "./userDashboardPage.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/signupPage" element={<SignUpForm />} />
        <Route path="/mainPage" element={<MainPage />} />
        <Route path="/messagesPage" element={<MessagesPage />} />
        <Route path="/calendarPage" element={<CalendarPage />} />
        

        {/*forum page has its main, bookmarks, threads, notifs, viewpost subpages*/}
        <Route path="/forumHomePage" element={<ForumHomePage />} />
        <Route path="bookmarks" element={<ForumBookmarksPage />} />
        <Route path="threads" element={<ForumThreadsPage />} />
        <Route path="post/:id" element={<ForumViewPostPage />} />
        

        {/*library page has archival subpage*/}
        <Route path="/libraryPage" element={<LibraryPage />} />
        <Route path="/libraryArchivesPage" element={<LibraryArchivesPage />} />
    

        {/* mentorch has the requests, evaluation form subpages & navigation to messages */}
        <Route path="/mentorchipPage" element={<MentorchipPage />} />
        <Route path="/mentorchipRequestsPage" element={<RequestPage />} />
        <Route path="/mentorchipEvaluPage" element={<EvaluationPage />} />

        {/*USERdashboard*/}
        <Route path="/userDashboardPage" element={<UserDashboardPage />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;