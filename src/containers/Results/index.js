import React from "react";
import { sortBy, reverse } from "lodash";

import fetchData from "../../lib/fetch";
import "./style.css";
import Loading from "../../images/loading.gif";
import ResultsBlock from "../../components/ResultBlock/index";

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      results: []
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { lon, lat }
      }
    } = this.props;

    const results = await fetchData(lat, lon);
    const sortedResults = reverse(sortBy(results, x => x.starScore));
    this.setState({ loading: false, results: sortedResults });
  }

  render() {
    const {
      match: {
        params: { lon, lat }
      }
    } = this.props;

    console.log(this.state.results);

    return this.state.loading ? (
      <div className="results">
        <img className="results-loading" src={Loading} alt="loading" />
        <p>loading...</p>
      </div>
    ) : (
      <div className="results">
        <div className="results-header">{`Coffee near lat ${lat}, long ${lon}`}</div>
        {this.state.results.map((result, index) => {
          return <ResultsBlock result={result} key={index} />;
        })}
      </div>
    );
  }
}
