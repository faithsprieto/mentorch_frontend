import CreatePostInput from "../components/forum/createPostInput";
import PostCardList from "../components/forum/postCardList";
import PostCard from "../components/forum/postCard";
import AdminPanel from "../components/forum/adminPanel";
import ForumNav from "../components/forum/forumNav";

import homeImg from "../assets/images/icons/home.png";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HomeFilled } from "@ant-design/icons";

import "../styles/pagestyles/forumHomePage.css";
import "../styles/CommonStyles.css";


function ForumHomePage() {

  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");

  return (

    <div className="forum-container">

      <div className="left-forum-cont">
        <ForumNav tab={tab} setTab={setTab} />
      </div>

      <div className="center-forum-cont">
        <div className="top-label">
          <h3
            style={ {fontSize: "2rem"}}
          >Forum</h3>
          <img src={homeImg} 
           style={{
            width: "auto",
            height: "2rem",
            margin: "0"
          }}
          alt="home-icon" />
        </div>

        <CreatePostInput />
        <PostCardList />
      </div>

      <div className="right-forum-cont">
        <AdminPanel />
      </div>

    </div>
  );
}

export default ForumHomePage;