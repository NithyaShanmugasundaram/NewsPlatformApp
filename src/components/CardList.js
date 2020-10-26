import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
/*------Style for the cards---------*/
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    boxShadow: "rgba(0,0,0,0.2)",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  avatar: {
    backgroundColor: "#bdbdbd",
    color: "#fafafa",
  },
  cardTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: "20px",
  },
  cardDescription: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "15px",
  },
}));
/*------Populate the cards with fetched articles---------*/
const CardList = (props) => {
const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="baseline"
      spacing={1}
    >
    
      {props.articles.map((article, i) => {
        return (
          <Grid item xs={12} md={4} sm={6} key={i}>
            <Card className={classes.root}>
          {/*-------Avatar details-------- */}
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    {article.name.charAt(0)}
                  </Avatar>
                }
                title={article.name}
                subheader={article.date}
              />
          {/*--------- Image ---------*/}
              <CardMedia className={classes.media} image={article.imageUrl} />
              <CardContent>
          {/* --------- Title --------- */}
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.cardTitle}
                >
                  {article.title.length < 20
                    ? `${article.title}`
                    : `${article.title.substring(0, 25)}...`}
                </Typography>
          {/*------- Description------- */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardDescription}
                >
                  {article.description.length < 20
                    ? `${article.description}`
                    : `${article.description.substring(0, 40)}...`}
                </Typography>
              </CardContent>
          {/*----- Hyperlink for the news article------ */}
              <CardActions disableSpacing>
                <Button size="small" color="primary">
                  <a href={article.url}>Read More</a>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default CardList;
