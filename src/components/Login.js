import React from "react";
import axios from "axios";

import Msg from "./Msg";

function Login() {
  const [state, setState] = React.useState({});

  const submit = React.useCallback((event) => {
    event.preventDefault();

    const elements = event.target.elements;
    const credentials = {
      username: elements.namedItem("username").value,
      password: elements.namedItem("password").value,
    };

    (async function () {
      try {
        const json = await axios.post("/test", credentials);

        if (json.status === 200) {
          setState({ loggedIn: true });
        } else {
          setState(json);
        }
      } catch (err) {
        setState({ error: true, msg: err.toString() });
      }
    })();
  }, []);

  if (state.error) {
    return <Msg
      {...state}
      testId="error"
      onClear={() => setState({})}
      color="#ff5252"
    />
  }

  if (state.loggedIn) {
    return <Msg
      {...state}
      testId="success"
      onClear={() => setState({})}
      color="#5fb49c"
    />
  }

  return (
    <form onSubmit={submit}>
      <div>
        <input type="text" aria-label="username" name="username" />
      </div>
      <div>
        <input type="password" aria-label="password" name="password" />
      </div>
      <button type="submit" aria-label="submit">Submit</button>
    </form>
  );
}

export default Login;
