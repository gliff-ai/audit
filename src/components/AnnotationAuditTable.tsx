import { ReactElement } from "react";
import { theme } from "@gliff-ai/style";
import { AuditAction } from "@gliff-ai/annotate";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


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
  audit: AuditAction[];
  searchField: string;
  searchValue: string;
}
export const AnnotationAuditTable = (props: Props): ReactElement => {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableText}>Date &amp; Time</TableCell>
            <TableCell className={classes.tableText}>Action</TableCell>
            <TableCell className={classes.tableText}>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.audit
            .filter(
              (action: AuditAction) =>
                !["Action", "Details"].includes(props.searchField) ||
                (props.searchField === "Action" &&
                  action.method
                    .toLowerCase()
                    .includes(props.searchValue.toLowerCase())) ||
                (props.searchField === "Details" &&
                  action.args.toLowerCase().includes(props.searchValue))
            )
            .map((action: AuditAction) => (
              <TableRow key={`${action.timestamp} + ${action.method}`}>
                <TableCell>
                  {new Date(action.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{action.method}</TableCell>
                <TableCell
                  style={{
                    width: "30%",
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>
                        {action.args.length > 32
                          ? action.args.substr(0, 32).concat("...")
                          : action.args}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography style={{ whiteSpace: "pre-wrap" }}>
                        {JSON.stringify(JSON.parse(action.args), null, 2)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
