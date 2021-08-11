import { ReactElement } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { svgSrc } from "@/helpers";
import { theme } from "@gliff-ai/style";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: theme.palette.secondary.light,
    height: "90px",
    paddingTop: "9px",
  },
  logo: {
    marginBottom: "5px",
    marginTop: "7px",
  },
}));

interface Props {
  showAppBar?: boolean;
}

const UserInterface = (props: Props): ReactElement => {
  const { showAppBar } = props;
  const classes = useStyles();

  const appBar = !showAppBar ? null : (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Grid container direction="row">
          <Grid item className={classes.logo}>
            <img
              src={svgSrc("gliff-master-black")}
              width="79px"
              height="60px"
              alt="gliff logo"
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  return (
    <ThemeProvider theme={theme}>
      {appBar}
      <div style={{ marginTop: showAppBar ? "108px" : "20px" }}>
        <h1>Hello, World!</h1>
      </div>
    </ThemeProvider>
  );
};

export default UserInterface;
