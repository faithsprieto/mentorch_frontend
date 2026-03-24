const userBasicInfo = ({ title, description, image }) => {
const placeholder = "https://via.placeholder.com/150x200?text=No+Image";




  return (
    <div className={styles.userInfo}>
        <img
            src={image ? image : placeholder} 
            alt={userPhoto}
            style={styles.image}
        />

        <div className={styles.mainInfo}>
            <h5 className={styles.title}>{title}</h5> 
            <p className={styles.description}>{description}</p>
        </div>
    </div>
  );
};

export default userBasicInfo;