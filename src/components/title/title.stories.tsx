import React from "react";
import { Meta } from "@storybook/react";

import { Title } from "./title";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Components/Title",
  component: Title,
} as Meta;

export const TitleComponent = (): JSX.Element => <Title>Test Title</Title>;
