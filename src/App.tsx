import React, { useState } from "react";
import "./App.css";
import { Button, TextField } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import classNames from "classnames";

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
      roleTempArr[i] = newArr[i] + " is a MAFIA ☠️";
    }
    for (let j = 0; j < noOfAngel; j++) {
      roleTempArr[noOfMafia + j] = newArr[noOfMafia + j] + " is an ANGEL 😇";
    }
    for (let k = noOfAngel + noOfMafia; k < players.length; k++) {
      roleTempArr[k] = newArr[k] + " is a villager";
    }
    setRoles(roleTempArr);
  }

  return (
    <div className="App">
      <div>
        <div className="textfield">
          <TextField label="Mafias" variant="outlined" defaultValue="2" onChange={e => setNoOfMafia(+e.target.value)} />
        </div>
        <div className="textfield">
          <TextField label="Angel" variant="outlined" defaultValue="1" onChange={e => setNoOfAngel(+e.target.value)} className="textfield" />
        </div>
      </div>
      <div className="textfield" id="playerInput">
        <TextField
          label="Player Name"
          variant="outlined"
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
      <br />
      <div>
        {players.map((player, index) => (
          <div style={{}} className="playerList">
            <div>{player}</div>
            <div>
              <CloseIcon
                style={{ color: "red" }}
                onClick={() => {
                  const newList = [...players];
                  newList.splice(index, 1);
                  setPlayers(newList);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <br />
      <div>
        <Button variant="contained" color="primary" onClick={assignRole}>
          Assign
        </Button>
      </div>
      <br />
      <div>
        {roles?.map((role, index) => {
          return (
            <div className={classNames({ mafia: index < noOfMafia, angel: index < noOfAngel + noOfMafia && index >= noOfMafia }, "roleBox")}>{role}</div>
            // <div className={classNames({ color: index < noOfMafia ? "mafia" : index < noOfMafia + noOfAngel ? "angel" : "villager" }, "roleBox")}>{role}</div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
