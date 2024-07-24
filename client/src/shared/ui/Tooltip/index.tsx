import React from "react";
import { useTheme } from "next-themes";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface IReactTooltip {
  id: string;
}

export const ReactTooltip: React.FC<IReactTooltip> = ({ id }) => {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip
      id={id}
      style={{
        boxShadow: "0 0 15px rgba(0, 0, 0, 0.35)",
        backgroundColor: theme === "light" ? "white" : "#2B2934",
        color: "#FF5722",
      }}
    />
  );
};
