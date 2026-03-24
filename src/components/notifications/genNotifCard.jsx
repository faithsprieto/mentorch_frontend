import React from "react";

const timeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000); // difference in seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 172800) return "Yesterday";

    // Otherwise, show date in readable format
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const genNotifCard = ({ user, description, rating, timestamp }) => {
  const placeholder = "https://via.placeholder.com/60";

  const styles = {
    card: {
      display: "flex",
      alignItems: "flex-start",
      gap: "0.9rem",
      background: "rgba(255,255,255,0.12)",
      backdropFilter: "blur(0.5rem)",
      borderRadius: "1.25rem",
      padding: "0.9rem",
      marginBottom: "0.75rem",
      boxShadow: "0 0.25rem 0.75rem rgba(0,0,0,0.08)",
      width: "25rem",
    },
    image: {
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      objectFit: "cover",
    },
    content: {
      flex: 1,
    },
    name: {
      fontWeight: 600,
      marginBottom: "0.25rem",
    },
    description: {
      fontSize: "0.9",
      marginBottom: "0.25rem",
    },
    stars: {
      color: "#FFD700", // gold
      fontSize: "0.9rem",
    },
    timestamp: {
      fontSize: "0.75rem",
      opacity: 0.6,
      color: "#B0B0B0",
    },
  };

  return (
    <div style={styles.card}>
        <img
            src={user.image ? user.image : placeholder}
            alt={user.name}
            style={styles.image}
        />

        <div style={styles.content}>
            <div style={styles.name}>
                {user.name} ({user.id})
            </div>
            <div style={styles.description}>{description}</div>

            {/* Only show stars if rating is provided */}
            {rating && (
                <div style={styles.stars}>
                    {"★".repeat(rating) + "☆".repeat(5 - rating)}
                </div>
            )}

            {/* Timestamp at the bottom */}
            {timestamp && <div style={styles.timestamp}>{timeAgo(timestamp)}</div>}
        </div>
    </div>
  );
};

export default genNotifCard;