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
  }, [houses]);

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    const uniqueProperty = ["Tipo (qualquer)", ...new Set(allProperties)];

    setProperties(uniqueProperty);
  }, [houses]);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => {
      return str.split(" ").includes("(qualquer)");
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }

      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        return housePrice >= minPrice && housePrice <= maxPrice;
      }

      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        return (
          house.country === country &&
          housePrice >= minPrice &&
          housePrice <= maxPrice
        );
      }

      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        return (
          house.type === property &&
          housePrice >= minPrice &&
          housePrice <= maxPrice
        );
      }

      if (!isDefault(country) && !isDefault(property) && !isDefault(price)) {
        return (
          house.country === country &&
          house.type === property &&
          housePrice >= minPrice &&
          housePrice <= maxPrice
        );
      }

      return house;
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

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
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
