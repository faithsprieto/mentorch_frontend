export default function LibraryTable({ resources }) {

  if (!resources || resources.length === 0) {
    return <p>No resources found.</p>;
  }

  return (
    <div className="library-container">

      <table className="library-table">

        <thead>
          <tr>
            <th>TITLE</th>
            <th>KEYWORD/TAGS</th>
            <th>UPLOAD DATE</th>
            <th>FILE TYPE</th>
            <th>OWNER</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {resources.map(resource => (
            <tr key={resource.id}>

              <td>{resource.title}</td>

              <td>
                {resource.keywords?.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </td>

              <td>{resource.upload_date}</td>
              <td>{resource.file_type}</td>
              <td>{resource.owner}</td>

              <td>
                <a
                  href={resource.file_path}
                  className="blue-button"
                  download
                >
                  Download
                </a>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}