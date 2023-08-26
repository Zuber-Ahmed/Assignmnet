"use client";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import {
  TextField,
  Paper,
  List,
  Grid,
  FormControlLabel,
  Typography,
  Checkbox,
  Button,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import data from "../app/formdata/formValues.json";

export const SignUpForm = () => {
  interface checkTypes {
    label: string;
    value: string;
  }
  //   [
  //     {
  //       label: "Male",
  //       value: "1",
  //     },
  //     {
  //       label: "Female",
  //       value: "2",
  //     },
  //     {
  //       label: "Others",
  //       value: "3",
  //     },
  //   ]
  const [checked, setChecked] = useState<string>("");
  const [loveReact, setLoveReact] = useState<string>("");

  const [formValues, setFormValues] = useState<any>({});
  console.log(formValues);
  return (
    <Grid container component="main">
      <CssBaseline />
      <Grid item xs={false} sm={4} md={5} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div style={{ margin: "5rem 10px" }}>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <Avatar style={{background: "#f50057" }}>
              <LockIcon />
            </Avatar>
          </div>
          <Typography
            component="h1"
            variant="h5"
            style={{ display: "flex", justifyContent: "center" }}
          >
            Sign in
          </Typography>
          <form noValidate>
            {data.data.map((elm) => {
              return (
                <>
                  {elm.fieldType !== "" &&
                    elm.fieldType !== "LIST" &&
                    elm.fieldType !== "RADIO" && (
                      <TextField
                        key={elm.id}
                        variant="outlined"
                        defaultValue={elm.defaultValue}
                        margin="normal"
                        required={elm?.required}
                        fullWidth
                        id={elm.name}
                        label={elm.name}
                        name={elm.name}
                        type={elm.fieldType.toLocaleLowerCase()}
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            [elm.name]: e.target.value,
                          });
                        }}
                        autoFocus
                      />
                    )}
                  {elm.fieldType === "LIST" ? (
                    <List
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        style={{
                          fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                          fontSize: "1.2rem",
                        }}
                      >
                        {elm.name}:
                      </Typography>
                      {elm.listOfValues?.map((value: any, ind: number) => {
                        return (
                          <FormControlLabel
                            key={ind}
                            control={
                              <Checkbox
                                aria-label={value}
                                edge="start"
                                tabIndex={-1}
                                required={elm.required}
                                color="error"
                                checked={checked === value}
                                defaultValue={elm.defaultValue}
                                onChange={() => {
                                  setChecked(value);
                                  setFormValues({
                                    ...formValues,
                                    [elm.name]: value,
                                  });
                                }}
                              />
                            }
                            label={value}
                          ></FormControlLabel>
                        );
                      })}
                    </List>
                  ) : (
                    elm.fieldType === "RADIO" && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "1.5rem",
                        }}
                      >
                        <Typography
                          variant="h5"
                          style={{
                            fontFamily: `"Roboto","Helvetica","Arial",sans-serif`,
                            fontSize: "1.2rem",
                          }}
                        >
                          {elm.name}
                        </Typography>
                        <Checkbox
                          edge="start"
                          tabIndex={-1}
                          required={elm.required}
                          color="error"
                          checked={elm.listOfValues?.some(
                            (elm) => elm === loveReact
                          )}
                          defaultValue={elm.defaultValue}
                          onChange={() => {
                            if (loveReact === "") {
                              setLoveReact("Yes");
                            } else {
                              setLoveReact("");
                            }
                            setFormValues({
                              ...formValues,
                              [elm.name]: loveReact === "" ? "Yes" : "No",
                            });
                          }}
                        />
                      </div>
                    )
                  )}
                </>
              );
            })}
            <Button
              fullWidth
              style={{ margin: "2em 0", background: "#f50057", color: "white" }}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
