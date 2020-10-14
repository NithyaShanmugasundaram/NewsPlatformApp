import React from "react";
import axios from "axios";
import CardList from "./components/CardList";
import Header from "./components/Header";
import Loader from "./components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import Snackbar from "./components/Snackbar";

const apiKey ="Your Api Key";
let pageSize = 10;
let page = 1;
  class App extends React.Component {
    state = {
      articles: [],
      isLoading: false,
      errors: "",
      hasMore: true,
      inputValue: "",
      open: false,
      error: "",
  };
  handleClick = () => {
    this.setState({ open: true });
  };
  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  getArticles = async () => {
    try {
          const response = await axios.get(
              `https://newsapi.org/v2/everything?domains=bbc.com,washingtonpost.com&pageSize=${pageSize}&page=${page}&language=en&q=${this.state.inputValue}&apiKey=${apiKey}`
              );

          if (response.data.articles.length > 0) {
           
            const articles = response.data.articles.map((article) => ({
            date: `${article.publishedAt}`,
            title: `${article.title}`,
            imageUrl: `${article.urlToImage}`,
            name: `${article.source.name}`,
            description: `${article.description}`,
            url: `${article.url}`,
            }));
            this.setState({ articles,isLoading:false});
          } 
          else if((response.data.articles.length === 0)){
            this.setState({open: true,
              error: "info",
              errors: "Search criteria does not match."})
          }
          
          else if(response.status === 500){
              this.setState({open: true,
                error: "error",
                errors: "Server Error.",
                isLoading:false
              })
          } 
        } 
    catch (error) {   
          this.setState({open: true,
              error: "error",
              errors: "Server Error.",
              isLoading:false
          })
        }
  };
  getMoreArticles = async () => {
    if (this.state.articles.length > 100) {
        this.setState({ hasMore: false });
        return;
        }
    try {
          page++;
          
          const response = await axios.get(
              `https://newsapi.org/v2/everything?domains=bbc.com,washingtonpost.com&pageSize=${pageSize}&page=${page}&language=en&q=${this.state.inputValue}&apiKey=${apiKey}`
                );

          if (response.data.articles.length > 0) {
          
          const articles = response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          imageUrl: `${article.urlToImage}`,
          name: `${article.source.name}`,
          description: `${article.description}`,
          url: `${article.url}`,
          }));
          this.setState({ articles: [...this.state.articles, ...articles],isLoading:false});
          } 
          
        } catch (error) {
         
          this.setState({
          isLoading:false,
          open: true,
          error: "success",
          errors: "Yay! You have seen it all.",
          inputValue:"",
          });
        }
  };
 
  handleChange = (e) => {
    this.setState({ inputValue: e.target.value ,articles:[]});
    this.getArticles();
  };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    this.getArticles();
  };

  render() {
    const { isLoading, articles, inputValue, open, errors, error } = this.state;
    
    return (
    <div>
          <Header value={inputValue} onChange={this.handleChange} />
        { articles ? (
          <InfiniteScroll
            style={{ marginTop: "100px" }}
            dataLength={articles.length}
            next={this.getMoreArticles}
            hasMore={this.state.hasMore}
            >
            {<CardList articles={articles} />}
          </InfiniteScroll>
          ) : null
        }
          <Loader isLoading={isLoading} />
          <Snackbar
            onClick={this.handleClick}
            onClose={this.handleClose}
            open={open}
            errors={errors}
            error={error}
          />
    </div>
    );
  }
}

export default App;
