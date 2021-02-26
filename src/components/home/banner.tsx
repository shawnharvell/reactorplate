import React from "react";

export interface BannerProps {
  appName: string;
  token?: string;
}

const Banner: React.FC<BannerProps> = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">{appName.toLowerCase()}</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
};

export default Banner;
