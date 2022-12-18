import React from "react";
import styled from "styled-components";
import DocumentComponent from "../components/documentation/DocumentComponent";
import Loading from "../components/generic/Loading";
import DisplayTime from "../components/generic/DisplayTime";
import DisplayRounds from "../components/generic/DisplayRounds";

const Container = styled.div`
  display: grid;
  justify-content: center;
  width: 100%;
`;

const NotBlock = styled.div`
  display: inline;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <NotBlock>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
        <DocumentComponent
          title="DisplayRounds "
          component={<DisplayRounds displayType={'xy'} currentRound={1} isResting={false}/>}
          propDocs={[
            {
              prop: "currentRound",
              description: "The currently active round",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "isResting",
              description: "Related to Tabata counter. {true} = in resting period {false} = in working period",
              type: "boolean",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="DisplayTime "
          component={<DisplayTime time={62000} isStarted={false}/>}
          propDocs={[
            {
              prop: "time",
              description: "The current time in miilseconds. Outputs mm:ss:milliseconds",
              type: "integer",
              defaultValue: "none",
            },
          ]}
        />
      </NotBlock>
    </Container>
  );
};

export default Documentation;
