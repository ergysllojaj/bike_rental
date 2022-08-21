import { createContext, useReducer } from "react";

export const BikeContext = createContext();

export const bikesReducer = (state, action) => {
  switch (action.type) {
    case "SET_BIKES":
      return {
        bikes: action.payload,
        model: "",
        color: "",
        location: "",
        rating: "",
        isAvailable: false,
        isNew: true,
        _id: "",
      };

    case "UPDATE_BIKE":
      return {
        bikes: state.bikes.map((bike) => {
          if (bike._id === action.payload._id) {
            return action.payload;
          } else {
            return bike;
          }
        }),
        model: "",
        color: "",
        location: "",
        rating: "",
        isAvailable: false,
        isNew: true,
        _id: "",
      };

    case "SET_EDIT_FORM":
      return {
        bikes: state.bikes,
        model: action.payload.model,
        color: action.payload.color,
        location: action.payload.location,
        rating: action.payload.rating,
        isAvailable: action.payload.isAvailable,
        isNew: false,
        _id: action.payload._id,
      };

    case "SET_MODEL":
      return {
        bikes: state.bikes,
        model: action.payload.model,
        color: state.color,
        location: state.location,
        rating: state.rating,
        isAvailable: state.isAvailable,
        _id: state._id,
        isNew: state.isNew,
      };

    case "SET_COLOR":
      return {
        bikes: state.bikes,
        model: state.model,
        color: action.payload.color,
        location: state.location,
        rating: state.rating,
        isAvailable: state.isAvailable,
        _id: state._id,
        isNew: state.isNew,
      };

    case "SET_LOCATION":
      return {
        bikes: state.bikes,
        model: state.model,
        color: state.color,
        location: action.payload.location,
        rating: state.rating,
        isAvailable: state.isAvailable,
        _id: state._id,
        isNew: state.isNew,
      };
    case "SET_RATING":
      return {
        bikes: state.bikes,
        model: state.model,
        color: state.color,
        location: state.location,
        rating: action.payload.rating,
        isAvailable: state.isAvailable,
        _id: state._id,
        isNew: state.isNew,
      };
    case "SET_IS_AVAILABLE":
      return {
        bikes: state.bikes,
        model: state.model,
        color: state.color,
        location: state.location,
        rating: state.rating,
        _id: state._id,
        isNew: state.isNew,
        isAvailable: action.payload.isAvailable,
      };

    case "CREATE_BIKE":
      return {
        bikes: [action.payload, ...state.bikes],
        model: "",
        color: "",
        location: "",
        rating: "",
        isAvailable: false,
        isNew: true,
        _id: "",
      };

    case "DELETE_BIKE":
      return {
        bikes: state.bikes.filter((bike) => bike._id !== action.payload._id),
        model: "",
        color: "",
        location: "",
        rating: "",
        isAvailable: false,
        isNew: true,
        _id: "",
      };

    default:
      return state;
  }
};

export const BikeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bikesReducer, {
    bikes: null,
    model: "",
    color: "",
    location: "",
    rating: "",
    isAvailable: true,
    isNew: true,
    _id: "",
  });

  return (
    <BikeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BikeContext.Provider>
  );
};
