import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./Pages/Home";
import CreatePointPage from "./Pages/CreatePoint";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={HomePage} path="/" exact />
      <Route component={CreatePointPage} path="/create-point" exact />
    </BrowserRouter>
  );
};

export default Routes;
