import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Loader(props) {
   const classes = useStyles();
return (
      (props.isLoading === true) && <div className={classes.root}>
          <CircularProgress />
        </div>
      ) 
}