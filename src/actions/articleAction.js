import { FETCH_ARTICLES, FETCH_ERROR, CLEAR_ARTICLES } from "./types";
import axios from "axios";

/*-----Fetch the articles from NewsAPI------*/
export const fetchArticles = (data) => async (dispatch) => {
  const onSuccess = async (success) => {
    await dispatch({ type: FETCH_ARTICLES, payload: success });
    return success;
  };
  const onError = async (err) => {
    await dispatch({ type: FETCH_ERROR, payload: err.message });
    return err.message;
  };

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?domains=bbc.com,washingtonpost.com&pageSize=${data.pageSize}&page=${data.page}&language=en&q=${data.inputValue}&apiKey=${data.apiKey}`
    );
    if (response.data.articles.length > 0) {
      const articlesList = response.data.articles.map((article) => ({
        date: `${article.publishedAt}`,
        title: `${article.title}`,
        imageUrl: `${article.urlToImage}`,
        name: `${article.source.name}`,
        description: `${article.description}`,
        url: `${article.url}`,
      }));

      return onSuccess(articlesList);
    }
  } catch (error) {
    console.log("Error Message: ", error.message);
    return onError(error);
  }
};
/*-----Clear the articles.------*/
export const clearArticles = () => {
  return {
    type: CLEAR_ARTICLES,
  };
};
