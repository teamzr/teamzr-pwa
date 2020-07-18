import * as React from "react";
import { Grid, Container } from "@material-ui/core";

import { LogoIcon } from "../constants/Icons";
import LoginFormComponent from "../components/LoginForm/LoginFormComponent";
import { useLoginPageStyle } from "./LoginPage.Style";

function HomePage() {
  const classes = useLoginPageStyle;
  return (
    <Container>
      <Grid container direction={"column"} alignItems={"center"}>
        <Grid item xs={12}>
          <LogoIcon classes={{ root: classes.logo }} />
        </Grid>
        <Grid item>
          <LoginFormComponent />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
