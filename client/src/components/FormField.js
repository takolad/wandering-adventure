import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function FormField(props) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="filled">
        <FilledInput id="component-filled" value={props.value} onChange={props.onChange} name={props.name} />
      </FormControl>
    </form>
  );
}
