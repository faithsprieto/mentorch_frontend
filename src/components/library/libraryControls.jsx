export default function LibraryControls({ search, setSearch, sort, setSort }) {

  return (
    <div className="library-controls">

      
        <input
          type="text"
          placeholder="Search by title, owner, tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="date">Date Uploaded</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="type">File Type</option>
        </select>
      

    </div>
  );
}