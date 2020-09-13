import React, { useState } from "react";
import immer from "immer";

import BoardContext from "./context";

import { loadLists } from "../../service/api";

import List from "../List";
import { Container } from "./styles";

const data = loadLists();

const Board = () => {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    setLists(
      immer(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      })
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} data={list} index={index} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
