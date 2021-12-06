import { ReactElement, useState } from "react";
import type { AuditAction } from "@gliff-ai/annotate";
import { theme } from "@gliff-ai/style";
import {
  AppBar,
  Toolbar,
  Grid,
  makeStyles,
  ThemeProvider,
  Card,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";

import { imgSrc } from "@/components/helpers";
import { SearchBar } from "@/components/SearchBar";
import { AnnotationAuditTable } from "@/components/AnnotationAuditTable";
import { ProjectAuditTable } from "@/components/ProjectAuditTable";

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
    <ThemeProvider theme={theme}>
      {appBar}
      <div style={{ marginTop: showAppBar ? "108px" : "20px" }}>
        <Card
          style={{
            width: "18.5%",
            marginLeft: "8px",
            marginRight: "16px",
            position: "fixed",
          }}
        >
          <SearchBar
            fieldOptions={["Action", "Details"]}
            field={searchField}
            value={searchValue}
            setField={setSearchField}
            setValue={setSearchValue}
          />
        </Card>
        <Card style={{ width: "80%", float: "right" }}>
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
      </div>
    </ThemeProvider>
  );
};

export default UserInterface;
