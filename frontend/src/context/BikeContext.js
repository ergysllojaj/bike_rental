import { createContext, useReducer } from "react";

export const BikeContext = createContext();

export const bikesReducer = (state, action) => {
  switch (action.type) {
    case "SET_BIKES":
      return { bikes: action.payload };

    case "CREATE_BIKE":
      return { bikes: [action.payload, ...state.bikes] };

    case "DELETE_BIKE":
      return {
        bikes: state.bikes.filter((bike) => bike._id !== action.payload._id),
      };

    default:
      return state;
  }
};

export const BikeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bikesReducer, {
    bikes: null,
  });

  return (
    <BikeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BikeContext.Provider>
  );
};
