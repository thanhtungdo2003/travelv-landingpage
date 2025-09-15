import React, { createContext, useState, useContext } from "react";

export const TourContext = createContext(undefined);

export const TourProvider = ({ children }) => {
  const [tours, setTours] = useState([]);
  const [tour, setTour] = useState({
    id: "",
    title: "",
    thumbnailURL: "",
    description: "",
    estimated_time: "",
    destination_id: "",
    first_location: "",
    imageURLs: "",
    price: 0,
    slots: 0,
    start_location: "",
    tag: "SAVEMONEY",
    vehicle: "Car",
    views: 0,
    created_at: new Date(),
  });
  const [getSchem, setGetSchem] = useState({
    id: "",
    searchKeyword: "",
    page: 1,
    row: 10,
  });


  return (
    <TourContext.Provider
      value={{
        tours,
        setTours,
        getSchem,
        setGetSchem,
        tour,
        setTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};


const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProdiver");
  }
  return context;
};

export default useTour;