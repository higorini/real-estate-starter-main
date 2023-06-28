import React, { useState, useEffect, createContext } from "react";

import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Estado (qualquer)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Tipo (qualquer)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Preço (qualquer)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    const uniqueCountries = ["Estado (qualquer)", ...new Set(allCountries)];

    setCountries(uniqueCountries);
  });

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
