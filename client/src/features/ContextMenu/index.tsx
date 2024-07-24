"use client";
import React from "react";
import styles from "./styles.module.scss";

interface IContextMenu {
  position: any;
  visible: boolean;
}

export const ContextMenu: React.FC<IContextMenu> = ({ position, visible }) => {
  return (
    <div
      className={styles.context_menu}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        display: "flex",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <button>
        <b>B</b>
      </button>
      <button>
        <i>I</i>
      </button>
      <button>
        <u>U</u>
      </button>
      <button>🔗</button>
      <button>H</button>
      <button>≡</button>
    </div>
  );
};
