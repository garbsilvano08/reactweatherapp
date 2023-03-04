import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../Api";

const Search = ({ onSearchChange, setIsSearching }) => {
  const [search, setSearch] = useState("");

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    setIsSearching(false);
    onSearchChange(searchData);
  };

  const handleOnFocus = () => {
    setIsSearching(true);
  };

  const handleOnblur = () => {
    setIsSearching(false);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onBlur={handleOnblur}
      onFocus={handleOnFocus}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
