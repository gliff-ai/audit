import { ReactElement, useState } from "react";
import type { AuditAction } from "@gliff-ai/annotate";
import { theme, generateClassName } from "@gliff-ai/style";
import {
  AppBar,
  Toolbar,
  Grid,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  Card,
  Paper,
  Typography,
  IconButton,
  CssBaseline,
  Container,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { StylesProvider } from "@mui/styles";
import { ArrowBack } from "@mui/icons-material";
import { imgSrc } from "@/components/helpers";
import { SearchBar } from "@/components/SearchBar";
import { AnnotationAuditTable } from "@/components/AnnotationAuditTable";
import { ProjectAuditTable } from "@/components/ProjectAuditTable";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const useStyles = makeStyles(() => ({
  input1: {
    paddingLeft: "10px",
    width: "90%",
  },
  appBar: {
    backgroundColor: theme.palette.secondary.light,
    height: "90px",
    paddingTop: "9px",
  },
  logo: {
    marginBottom: "5px",
    marginTop: "7px",
  },
  sideBar: {
    width: "290px",
  },
  auditContainer: {
    display: "flex",
    width: "calc(100% - 310px)",
    justifyContent: "flex-start",
    marginBottom: "auto",
    marginLeft: "20px",
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
  tableText: {
    fontSize: "16px",
    paddingLeft: "20px",
  },
}));

export interface AnnotationSession {
  timestamp: number;
  username: string;
  imagename: string;
  audit: AuditAction[];
}

interface Props {
  showAppBar: boolean;
  sessions: AnnotationSession[];
}

const UserInterface = (props: Props): ReactElement => {
  const { showAppBar } = props;
  const classes = useStyles();

  const [searchField, setSearchField] = useState<string>(""); // search field
  const [searchValue, setSearchValue] = useState<string>(""); // search value
  const [audit, setAudit] = useState<AuditAction[]>(null); // currently selected ANNOTATE-level audit

  const appBar = !showAppBar ? null : (
    <AppBar position="fixed" className={classes.appBar} elevation={0}>
      <Toolbar>
        <Grid container direction="row">
          <Grid item className={classes.logo}>
            <img
              src={imgSrc("gliff-master-black")}
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
    <StylesProvider generateClassName={generateClassName("audit")}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth={false}>
            {appBar}
            <Grid
              container
              spacing={2}
              style={{ marginTop: showAppBar ? "108px" : "20px" }}
            >
              <Grid item className={classes.sideBar}>
                <Card>
                  <SearchBar
                    fieldOptions={["Action", "Details"]}
                    field={searchField}
                    value={searchValue}
                    setField={setSearchField}
                    setValue={setSearchValue}
                  />
                </Card>
              </Grid>

              <Grid item className={classes.auditContainer}>
                <Card style={{ width: "100%" }}>
                  <Paper
                    elevation={0}
                    variant="outlined"
                    square
                    className={classes.paperHeader}
                  >
                    {audit && (
                      <IconButton
                        onClick={() => {
                          setAudit(null);
                        }}
                        style={{
                          padding: "0px",
                          marginLeft: "8px",
                          marginBottom: "4px",
                        }}
                        size="large"
                      >
                        <ArrowBack />
                      </IconButton>
                    )}
                    <Typography
                      className={classes.headingTypography}
                      style={{ marginLeft: "14px" }}
                    >
                      Audit Trail
                    </Typography>
                  </Paper>
                  {audit ? (
                    <AnnotationAuditTable
                      audit={audit}
                      searchField={searchField}
                      searchValue={searchValue}
                    />
                  ) : (
                    <ProjectAuditTable
                      sessions={props.sessions}
                      searchField={searchField}
                      searchValue={searchValue}
                      setAudit={setAudit}
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </StylesProvider>
  );
};

export default UserInterface;
