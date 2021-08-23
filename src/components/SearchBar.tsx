/* eslint-disable react/jsx-props-no-spreading */
import { ChangeEvent, ReactElement } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Paper, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { theme } from "@gliff-ai/style";

const useStyles = makeStyles({
  cardContent: {
    // backgroundColor: "#EEEEEE",
    borderRadius: "9px",
    marginLeft: "15px",
    marginRight: "15px",
    height: "110px",
    padding: "inherit",
  },
  input2: {
    paddingLeft: "10px",
    paddingTop: "10px",
    display: "inline-block",
  },
  inputField: {
    fontSize: "11px",
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
const CustomPaper = (props: unknown) => (
  <Paper
    elevation={8}
    {...props}
    style={{ backgroundColor: theme.palette.primary.light }}
  />
);

export function SearchBar({
  fieldOptions,
  field,
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
          renderInput={(params: unknown) => (
            <TextField
              {...params}
              label="Search Category"
              type="search"
              variant="outlined"
            />
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
          />
        </div>
      </CardContent>
    </Card>
  );
}