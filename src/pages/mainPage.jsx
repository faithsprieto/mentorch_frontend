import { useEffect, useState } from "react";
import { getRequest } from "../utils/api"; // ✅ use API helper

import AnnouncementCard from "../components/main/announcementCard";
import FeatureCard from "../components/main/featureCard";
import OrgCard from "../components/main/orgCard";

import creatorsImg from "../assets/images/mentorch_creators.png";
import "../styles/pagestyles/mainPage.css";
import "../styles/CommonButtonStyles.css";
import "../styles/CommonStyles.css";

export default function MainPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const data = await getRequest("/admin/getAnnouncements");
      setAnnouncements(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load announcements");
    }
  };

  // ✅ fetch organisations
  const fetchOrganisations = async () => {
    try {
      const data = await getRequest("/admin/getOrganisations");
      setOrganisations(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load organisations");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAnnouncements(), fetchOrganisations()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">MENTORCH</h1>
          <p className="hero-subtitle">
            student collaboration, peer mentorship, and resource-sharing platform
          </p>

          <div className="glass-buttons">
            <button><a href="#announcements">Announcements</a></button>
            <button><a href="#orgs">Organisations</a></button>
            <button><a href="#about">About</a></button>
          </div>
        </div>
      </section>

      {/* ERROR / LOADING */}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* ANNOUNCEMENTS */}
      <section id="announcements" className="announcements">
        <h5>Announcements</h5>

        <div className="announcement-list">
          {announcements.map((item) => (
            <AnnouncementCard
              key={item.announcement_id}
              title={item.title}
              description={item.description}
              image={item.image}
              created_at={item.created_at}
            />
          ))}
        </div>
      </section>

      {/* ORGANISATIONS */}
      <section id="orgs" className="orgs-section">
        <h5>Organisations</h5>

        <div className="orgs-showcase">
          {organisations.map((org) => (
            <OrgCard
              key={org.org_id}
              title={org.org_title}
              description={org.description}
              image={org.file_path}
              created_at={org.created_at}
            />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-left">
            <img src={creatorsImg} alt="Mentorch creators" />
          </div>

          <div className="about-right">
            <h5 className="about-title">About Mentorch</h5>
            <p className="about-text">
              Mentorch was created with the idea of promoting lifelong learning
              and academic collaboration through all levels within different
              academic communities.
              The creators namely, Faith Prieto, Marjorie Igot, and Ysabel Catong,
              are in their graduating year of taking up Bachelors of Science in
              Information Technology.
              Their hope is that this platform creates a pathway for schools in
              Cebu City to achieve lifelong learning and stronger academic bonds
              within student bodies in their respective institutions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}