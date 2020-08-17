import React from "react";
import axios from "axios";

import "./App.css";

import Login from "./components/Login";

function App() {
  const [state, setState] = React.useState();
  const makeCall = React.useCallback(() => {
    (async function () {
      const res = await axios.get("/test");

      setState(res.data);
    })();
  }, []);

  const makeCall2 = React.useCallback(() => {
    (async function () {
      try {
        const res = await axios.post("/test", { username: "foo", password: "bar" });

        console.log(res.data);
      } catch (err) {
        console.error(err.toString());
      }
    })();
  }, []);

  return (
    <div className="App">
      <button onClick={makeCall}>click</button>
      <button onClick={makeCall2}>click</button>
      <pre>{JSON.stringify(state, null, 3)}</pre>

      <Login />
    </div>
  );
}

export default App;
