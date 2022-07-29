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
import { AuditAction } from "@gliff-ai/annotate";

import { ProjectAuditAction, ImageData } from "@/index";

const useStyles = makeStyles(() => ({
  tableText: {
    fontSize: "16px",
    paddingLeft: "20px",
  },
}));

interface Props {
  actions: ProjectAuditAction[];
  searchField: string;
  searchValue: string;
  setAudit: (audit: AuditAction[]) => void;
  setProductsNavbarImageData: (imageData: ImageData) => void;
}

function camelNameToLabel (name: string) {
  // https://www.codeproject.com/Tips/5320583/Converting-Camel-Case-Names-to-Human-Case-Labels
  let reFindHumps = /([A-Z]){1}([a-z0-9]){1}/g
  let re1stLower = /^[a-z]{1}/
  let label = name.replace(reFindHumps, ' $1$2')

  if (re1stLower.test(label)) {
    label =  label.slice(0,1).toUpperCase() + label.substring(1)
  }
  return label
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
            <TableCell className={classes.tableText}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.actions
            .filter(
              (action: ProjectAuditAction) =>
                !["User", "Image"].includes(props.searchField) ||
                (props.searchField === "User" &&
                  action.username.includes(props.searchValue)) ||
                (props.searchField.toLowerCase() === "Image" &&
                  action.action.imagename.toLowerCase().includes(props.searchValue))
            )
            .map((action: ProjectAuditAction) => (
              <TableRow
                key={`${action.timestamp}`}
                onClick={action.action.type === "annotate" ? () => {
                  props.setAudit(action.action.audit);
                  props.setProductsNavbarImageData({
                    imageName: action?.action.imagename,
                    imageUid: action?.action.imageUid,
                  });
                } : null}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  {new Date(action.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{action.username}</TableCell>
                <TableCell>{camelNameToLabel(action.action.type)}</TableCell>
                <TableCell>{action.action.imagename}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
