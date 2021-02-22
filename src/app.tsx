import React from "react";

import { Title } from "./components/title/title";

export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App: React.FC<HelloWorldProps> = ({ userName, lang }) => (
  <>
    <Title>Reactorplate</Title>
    <h1>
      Hi {userName} from React! Welcome to {lang}!
    </h1>
  </>
);
