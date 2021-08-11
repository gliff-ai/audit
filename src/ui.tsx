import { ReactElement } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  ThemeProvider,
  Card,
  Paper,
  Typography,
} from "@material-ui/core";
import { svgSrc } from "@/helpers";
import { theme } from "@gliff-ai/style";
import { AuditAction } from "@gliff-ai/annotate";

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
  paperHeader: {
    padding: "10px",
    backgroundColor: theme.palette.primary.main,
  },
  headingTypography: {
    color: "#000000",
    display: "inline",
    fontSize: "21px",
    marginRight: "125px",
  },
}));

interface Props {
  showAppBar: boolean;
  audit?: AuditAction[];
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
        <div style={{ display: "flex" }}>
          <Card style={{ width: "20%" }}>Hello</Card>
          <Card style={{ width: "100%" }}>
            <Paper
              elevation={0}
              variant="outlined"
              square
              className={classes.paperHeader}
            >
              <Typography
                className={classes.headingTypography}
                style={{ marginLeft: "14px" }}
              >
                Audit Trail
              </Typography>
            </Paper>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UserInterface;
