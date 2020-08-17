import React from "react";

import "./App.css";

import Login from "./components/Login";

function App() {
  const [state, setState] = React.useState();
  const makeCall = React.useCallback(() => {
    (async function () {
      const res = await fetch("/test");
      const json = await res.json();

      setState(json);
    })();
  }, []);

  const makeCall2 = React.useCallback(() => {
    (async function () {
      const res = await fetch("/test", {
        method: "POST",
        body: JSON.stringify({ username: "foo", password: "bar" }),
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();

      console.log(json);
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
