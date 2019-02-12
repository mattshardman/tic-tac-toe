import React, { useState, useEffect } from "react";
import BoardSection from "./BoardSection";

const styles = {
  wrapper: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    background: "deepskyblue"
  },
  heading: {
    fontFamily: "Lobster",
    fontSize: 80,
    color: "#fff",
    textShadow: "0 3px 35px rgba(0,0,0,0.2)",
    margin: 0,
    marginBottom: 20
  },
  board: {
    height: 300,
    width: 300,
    display: "flex",
    flexWrap: "wrap",
    border: "1px #fff solid"
  }
};

const makeRows = newComBoard => {
  const rows = [
    [...newComBoard.slice(0, 3)],
    [...newComBoard.slice(3, 6)],
    [...newComBoard.slice(6, 9)]
  ];
  return rows;
};

const makeColumns = newComBoard => {
  const columns = [
    [newComBoard[0], newComBoard[3], newComBoard[6]],
    [newComBoard[1], newComBoard[4], newComBoard[7]],
    [newComBoard[2], newComBoard[5], newComBoard[8]]
  ];
  return columns;
};

const makeDiagonals = newComBoard => {
  const diagonals = [
    [newComBoard[0], newComBoard[4], newComBoard[8]],
    [newComBoard[2], newComBoard[4], newComBoard[6]]
  ];
  return diagonals;
};

const TickyToe = () => {
  const initialState = [...Array(9)].map((each, index) => ({
    id: index,
    content: ""
  }));
  const [user, com] = ["O", "X"];
  const [board, setBoard] = useState(initialState);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkAll = board.filter(each => each.content === "");
    if (!checkAll.length) {
      setWinner("No one");
    }
    const splitBoard = [
      makeColumns(board),
      makeRows(board),
      makeDiagonals(board)
    ];

    splitBoard.forEach(split => {
      split.forEach(column => {
        const Xs = column.filter(item => item.content === com);
        const Os = column.filter(item => item.content === user);
        if (Xs.length === 3) {
          setWinner(com);
        }

        if (Os.length === 3) {
          setWinner(user);
        }
      });
    });
  });

  const clickHandler = id => {
    const newPersonBoard = [...board];
    newPersonBoard[id].content = user;
    setBoard(newPersonBoard);
    setTimeout(() => setCom(newPersonBoard), 600);
  };

  const setCom = newBoard => {
    const newComBoard = [...newBoard];
    const [rows, columns, diagonals] = [
      makeRows(newComBoard),
      makeColumns(newComBoard),
      makeDiagonals(newComBoard)
    ];

    const centerSquare = newComBoard[4];

    if (!centerSquare.content) {
      centerSquare.content = com;
      return setBoard(newComBoard);
    }

    const [searchRows, searchColumns, searchDiagonals] = [
      ifIt(rows, newComBoard),
      ifIt(columns, newComBoard),
      ifIt(diagonals, newComBoard)
    ];

    if (searchDiagonals) {
      newComBoard[searchDiagonals].content = com;
      return setBoard(newComBoard);
    }

    if (searchRows) {
      newComBoard[searchRows].content = com;
      return setBoard(newComBoard);
    }

    if (searchColumns) {
      newComBoard[searchColumns].content = com;
      return setBoard(newComBoard);
    }

    const emptySquares = newComBoard.filter(each => each.content === "");
    if (emptySquares.length === 0) {
      return null;
    }

    newComBoard[emptySquares[0].id].content = com;
    return setBoard(newComBoard);
  };

  const ifIt = (arr, newComBoard) => {
    const lineWith2 = arr.reduce((acc, row) => {
      const numO = row.filter(section => section.content === user);
      const numX = row.filter(section => section.content === com);
      const numEmpty = row.filter(section => section.content === "");

      if (numX.length === 2) {
        if (numEmpty.length) {
          acc = numEmpty[0].id;
          return acc;
        }
        return acc;
      }

      if (numO.length === 2) {
        if (numEmpty.length) {
          acc = numEmpty[0].id;
          return acc;
        }
        return acc;
      }
      return acc;
    }, 0);

    return lineWith2;
  };

  return (
    <section style={styles.wrapper}>
      <div>
        <h1 style={styles.heading}>Tic Tack Yo</h1>
      </div>
      <div style={styles.board}>
        {board.map(symbol => (
          <BoardSection
            key={symbol.id}
            id={symbol.id}
            winner={winner}
            content={symbol.content}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <div style={{ height: 100, color: "#fff" }}>
        {winner && <h1>{winner} won!</h1>}
      </div>
    </section>
  );
};

export default TickyToe;
