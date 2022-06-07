/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent, ReactElement } from "react";
import { theme } from "@gliff-ai/style";

import makeStyles from "@mui/styles/makeStyles";
import {
  Card,
  CardContent,
  Paper,
  PaperProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles({
  cardContent: {
    borderRadius: "9px",
    marginLeft: "15px",
    marginRight: "15px",
    height: "120px",
    padding: "inherit",
  },
  input2: {
    paddingLeft: "10px",
    paddingTop: "10px",
    display: "inline-block",
  },
});

interface Props {
  fieldOptions: string[];
  field: string;
  value: string;
  setField: (newValue: string) => void;
  setValue: (newValue: string) => void;
}

export type MetadataLabel = {
  key: string;
  label: string;
};

// To be able to style the dropdown list
const CustomPaper = (props: PaperProps) => (
  <Paper
    elevation={8}
    {...props}
    style={{ backgroundColor: theme.palette.primary.light }}
  />
);

export function SearchBar({
  fieldOptions,
  value,
  setField,
  setValue,
}: Props): ReactElement {
  const classes = useStyles();

  return (
    <Card
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <CardContent className={classes.cardContent}>
        <Autocomplete
          id="combobox-metadata-key"
          style={{ marginTop: "16px" }}
          onInputChange={(e: ChangeEvent, newInputKey: string) => {
            setField(newInputKey);
          }}
          options={fieldOptions}
          renderInput={(params: TextFieldProps) => (
            <TextField {...params} label="Search Category" variant="outlined" />
          )}
          PaperComponent={CustomPaper}
          placeholder="Search Category"
        />
        <div className={classes.input2} style={{ display: "flex" }}>
          <TextField
            onChange={(event) => {
              setValue(event.target.value);
            }}
            value={value}
            style={{ marginTop: "8px" }}
            placeholder="Value"
            variant="standard"
          />
        </div>
      </CardContent>
    </Card>
  );
}
