export type FunctionTypes = string;

interface FunctionsMap {
  [key: string]: () => void;
}

export const functions: FunctionsMap = {
  webPopup: () => {
    console.log("Toggling web popup");
  },
};
