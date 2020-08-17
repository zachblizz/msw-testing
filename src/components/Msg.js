import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  padding: 3rem;
  color: #fff;
  background: ${(props) => props.color};
`;

function Msg({testId, color, onClear, msg}) {
    return (
      <div data-testid={testId}>
        <Banner color={color}>{msg}</Banner>
        <button onClick={onClear}>clear</button>
      </div>
    );
}

export default Msg;
