import * as React from "react";
import { Grid } from "@material-ui/core";
import LoginFormBtnComponent from "./LoginFormBtnComponent";
import LoginFormInput from "./LoginFormInput";

function LoginFormComponent(props) {
  return (
    <Grid container direction={"column"} alignItems={"center"} spacing={2}>
      <Grid item xs={12}>
        <LoginFormInput />
      </Grid>
      <Grid item xs={12}>
        <LoginFormInput />
      </Grid>
      <Grid item xs={12}>
        <LoginFormBtnComponent />
      </Grid>
    </Grid>
  );
}

export default LoginFormComponent;
