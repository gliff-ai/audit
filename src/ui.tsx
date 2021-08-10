import React, { ReactElement } from "react";

interface Props {
  showAppBar?: boolean;
}

const UserInterface = (props: Props): ReactElement => {
  return <h1>Hello, World!</h1>;
};

export default UserInterface;
