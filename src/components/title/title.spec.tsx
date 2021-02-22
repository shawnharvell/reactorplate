import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

import { Title } from "./title";

describe("Title", () => {
  test("loads", () => {
    render(<Title>Test Title</Title>);
    expect(screen.queryByText("Test Title")).toBeTruthy();
  });
});
