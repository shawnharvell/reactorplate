import React from "react";

export interface HelloWorldProps {
  userName: string;
  lang: string;
}
export const App: React.FC<HelloWorldProps> = ({ userName, lang }) => (
  <>
    <h1>
      Hi {userName} from React! Welcome to {lang}!
    </h1>
  </>
);
