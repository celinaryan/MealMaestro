import * as Env from "./environments";
import Components from "./Components/Components.js";
import Parse from "parse";
import React from "react";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

export default function App() {
  return <Components />
}

