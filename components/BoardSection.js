import React from "react";

const styles = {
  boardSection: {
    boxSizing: "border-box",
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px #fff solid",
    background: 'transparent',
    outline: "none",
    cursor: "pointer"
  }
};

const BoardSection = ({ id, winner, content, clickHandler }) => {
  return (
    <button
      type="button"
      disabled={content || winner}
      style={styles.boardSection}
      onClick={() => clickHandler(id)}
    >
      <div
        style={{
          fontSize: 50,
          width: 80,
          height: 80,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          color: '#fff',
          fontWeight: 700,
        }}
      >
        {content}
      </div>
    </button>
  );
};

export default BoardSection;
