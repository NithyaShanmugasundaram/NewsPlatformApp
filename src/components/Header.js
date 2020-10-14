import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import icon from './icon.png';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    },
  appbar:{
    background: "#3c3b63",
    text: "#ffffff",
    boxShadow: "rgba(0,0,0,0.2)",
   
  },
  toolbar:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  icon:{
    marginRight:theme.spacing(2),
    
    width:"75px",
    height:'75px'
   
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginLeft: 0,
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    color:'#ffffff',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  inputRoot: {
    color: 'rgba(255, 255, 255, 0.42)',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color:'#ffffff',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    
  },
}));

export default function SearchAppBar(props) {
  
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <img src = {icon} className ={classes.icon} alt ="Description"/>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
            <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.onChange}
              value={props.inputValue}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
