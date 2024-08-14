import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const SearchWeather = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search-engine">
      <input
        type="text"
        placeholder="Enter City Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => handleSearch(search)}>Search</button>
    </div>
  );
};

export default SearchWeather;
