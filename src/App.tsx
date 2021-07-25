import React, { useState } from "react";
import "./App.css";
import { Button, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

function App() {
  const defaultNoOfMafia = 2;
  const defaultNoOfAngel = 1;
  const [noOfMafia, setNoOfMafia] = useState(defaultNoOfMafia);
  const [noOfAngel, setNoOfAngel] = useState(defaultNoOfAngel);
  const [players, setPlayers] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [roles, setRoles] = useState<string[]>();

  function assignRole(e: any) {
    const newArr = [...players];
    newArr.sort(function () {
      return 0.5 - Math.random();
    });
    const roleTempArr: string[] = [];

    for (let i = 0; i < noOfMafia; i++) {
      roleTempArr[i] = newArr[i] + " mafia";
    }
    for (let j = 0; j < noOfAngel; j++) {
      roleTempArr[noOfMafia + j] = newArr[noOfMafia + j] + " angel";
    }
    for (let k = noOfAngel + noOfMafia; k < players.length; k++) {
      roleTempArr[k] = newArr[k] + " villager";
    }
    setRoles(roleTempArr);
  }

  return (
    <div className="App">
      <div>
        <TextField label="Mafias" variant="outlined" defaultValue="2" onChange={e => setNoOfMafia(+e.target.value)} />
        <TextField label="Angel" variant="outlined" defaultValue="1" onChange={e => setNoOfAngel(+e.target.value)} />
      </div>
      <div>
        <TextField
          label="Players"
          variant="standard"
          value={currentPlayer}
          onChange={e => setCurrentPlayer(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              const playerList = [...players, currentPlayer];
              setPlayers(playerList);
              setCurrentPlayer("");
            }
          }}
        />
        <IconButton>
          <AddCircleIcon
            color="primary"
            onClick={() => {
              const playerList = [...players, currentPlayer];
              setPlayers(playerList);
              setCurrentPlayer("");
            }}
          />
        </IconButton>
      </div>
      <div>
        {players.map((player, index) => (
          <div
            style={{
              cursor: "pointer"
            }}
            onClick={() => {
              const newList = [...players];
              newList.splice(index, 1);
              setPlayers(newList);
            }}>
            {player}
          </div>
        ))}
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={assignRole}>
          Submit
        </Button>
      </div>
      <div>
        {roles?.map((role, index) => {
          return <div style={{ padding: "1rem", color: index < noOfMafia ? "red" : index < noOfMafia + noOfAngel ? "green" : "black" }}>{role}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
