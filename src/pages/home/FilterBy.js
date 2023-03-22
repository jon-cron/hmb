const filterListBy = ["all", "my posts"];

export default function FilterBy({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {filterListBy.map((f) => (
          <button
            className={currentFilter === f ? "active" : ""}
            key={f}
            onClick={() => handleClick(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
