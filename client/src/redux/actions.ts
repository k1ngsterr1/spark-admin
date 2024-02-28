import { toggleOnPopup, anotherActionCreator } from "@redux/slices";

const actionMap = {
  togglePopup: toggleOnPopup, // "togglePopup" is the identifier for the toggleOnPopup action creator.
  anotherAction: anotherActionCreator, // Similarly, "anotherAction" is an identifier for another action creator.
};

export default actionMap;
