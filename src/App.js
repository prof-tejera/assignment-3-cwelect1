import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import {ErrorBoundary} from 'react-error-boundary';

import DocumentationView from "./views/DocumentationView";
import WorkoutView from "./views/WorkoutView";
import AddTimerView from "./views/AddTimerView";
import HistoryView from "./views/HistoryView";
import AppProvider from './Context';
import Menu from "./components/generic/Menu";

const ErrorHandler = ({error}) => {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

// Move to Menu.js - Not tracking active page for now. No need to hve this here
const menu_items = [
  { displayText: "Add Timer", href: "/add", isActive: false },
  { displayText: "Workout", href: "/", isActive: false },
  { displayText: "History", href: "/history", isActive: false  },
  { displayText: "Docs", href: "/docs", isActive: false  },
];

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <AppProvider>
        <Container>
          <Router basename="/assignment-3-cwelect1" >
            <Menu menu_items={menu_items}/>
            <Routes>
              <Route path="/" element={<WorkoutView />} />
              <Route path="/add" element={<AddTimerView />} />
              <Route path="/docs" element={<DocumentationView />} />
              <Route path="/history" element={<HistoryView />} />
            </Routes>
          </Router>
        </Container>
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
