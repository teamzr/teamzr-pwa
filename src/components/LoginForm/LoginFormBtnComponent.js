import * as React from "react";
import { Input, Button } from "@material-ui/core";

import { useLoginFormBtnComponentStyle } from "./LoginFormBtnComponent.Style";

function LoginFormBtnComponent(props) {
  const classes = useLoginFormBtnComponentStyle();
  return (
    <Button classes={{ root: classes.root }} variant={"contained"} {...props}>
      Log In
    </Button>
  );
}

export default LoginFormBtnComponent;
