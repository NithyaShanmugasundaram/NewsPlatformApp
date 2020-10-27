import React from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import Header from "../components/Header";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchArticles, clearArticles } from "../actions/articleAction";
import "./App.css";

/*--------Global variables declaration ---------*/
const apiKey = "Please Enter your APIKEY";
const totalArticle =30;
const pageSize = 5;
let currPage = 1;


class App extends React.Component {
  state = {
    isLoading: false,
    hasMore: true,
    waitTime: 200,
    inputValue: "",
  };

  handleChange = (e) => {
    const { waitTime } = this.state;
    this.setState({ inputValue: e.target.value, hasMore: true });
    let currPage =1 ;
  /*------- Clear the articles from the window------*/
    this.props.clearArticles();
    setTimeout(() => {
      const data = {
        apiKey: apiKey,
        pageSize: pageSize,
        page: currPage,
        inputValue: this.state.inputValue,
      };
      this.props.fetchArticles(data)
      .then(details=>this.setState({isLoading:false}))
      .catch(e=> this.setState({isLoading:false}))
    }, waitTime);
  };
  
  /*-------- Fetch the next set of articles when scroll---*/
  getMoreArticles = async () => {
    this.setState({isLoading:true})
    const {articles} = this.props;
    currPage++;
  /*-------- stop the fetching when prefixed total article limit has reached---*/
    if (articles.length === totalArticle) {
      this.setState({ hasMore: false, isLoading: false });
      return;
    }
    const data = {
      apiKey: apiKey,
      pageSize: pageSize,
      page: currPage,
      inputValue: this.state.inputValue,
    };
    await this.props.fetchArticles(data)
    .then(details=>this.setState({isLoading:false}))
    .catch(e=> this.setState({isLoading:false}))
  };

  componentDidMount = () => {
    this.setState({ isLoading: true });
    
    const data = {
      apiKey: apiKey,
      pageSize: pageSize,
      page: currPage,
      inputValue: this.state.inputValue,
    };

    this.props
      .fetchArticles(data)
      .then(details=>this.setState({isLoading:false}))
      .catch(e=> this.setState({isLoading:false}))
  };

  render() {
    const { isLoading, inputValue,hasMore } = this.state;
    const { articles } = this.props;
    
    return (
      <div>
        {/*----------- Appbar--------- */}
        <Header value={inputValue} onChange={this.handleChange} />
        {/*----------- Infinite scroll------ */}
        {articles ? (
         <InfiniteScroll
            dataLength={articles.length}
            next={this.getMoreArticles}
            hasMore={hasMore}
            loader={
              <div>
                <Loader isLoading={isLoading} />
              </div>
            }
          >
            {<CardList articles={articles} />}
          </InfiniteScroll>
        
        ) : null}
      </div>
      );
    }
  }
  /*-------passing the articles props from redux state-----*/
  const mapStateToProps = (state) => ({
      articles: state.articles.articles,
      error:state.articles.error,
  });

export default connect(mapStateToProps, {
  fetchArticles,
  clearArticles,
})(App);
