import { ReactElement } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { theme } from "@gliff-ai/style";
import { AuditAction } from "@gliff-ai/annotate";

import { AnnotationSession } from "@/index";

const useStyles = makeStyles(() => ({
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

interface Props {
  sessions: AnnotationSession[];
  searchField: string;
  searchValue: string;
  setAudit: (audit: AuditAction[]) => void;
}

export const ProjectAuditTable = (props: Props): ReactElement => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableText}>Date &amp; Time</TableCell>
            <TableCell className={classes.tableText}>User</TableCell>
            <TableCell className={classes.tableText}>Action</TableCell>
            <TableCell className={classes.tableText}>Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sessions
            .filter(
              (session: AnnotationSession) =>
                !["User", "Image"].includes(props.searchField) ||
                (props.searchField === "User" &&
                  session.username.includes(props.searchValue)) ||
                (props.searchField.toLowerCase() === "Image" &&
                  session.imagename.toLowerCase().includes(props.searchValue))
            )
            .map((session: AnnotationSession) => (
              <TableRow
                key={`${session.timestamp}`}
                onClick={() => {
                  props.setAudit(session.audit);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  {new Date(session.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{session.username}</TableCell>
                <TableCell>Annotate</TableCell>
                <TableCell>{session.imagename}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
