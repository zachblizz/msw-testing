import React from "react";
import axios from "axios";
import styled from "styled-components";

const Banner = styled.div`
  padding: 3rem;
  color: #fff;
  background: ${(props) => props.color};
`;

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
        const json = await axios.post("/test", {
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        console.log(json)

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
    return (
      <div data-testid="error">
        <Banner color="#ff5252">{state.msg}</Banner>
        <button onClick={() => setState({})}>clear</button>
      </div>
    );
  }

  if (state.loggedIn) {
    return (
      <div data-testid="succeed">
        <Banner color="#5fb49c">successful loggin!!</Banner>
        <button onClick={() => setState({})}>clear</button>
      </div>
    );
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
