import React, { Component } from "react";
import SeriesList from "../../components/SeriesList";

class Series extends Component {
  state = {
    series: [],
    seriesName: '',
    isFatching: false
  };


  onSeriesInputChange = e => {
    this.setState({seriesName: e.target.value, isFatching: true})
    fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
    .then(response => response.json())
    .then(json => this.setState({ series: json, isFatching: false }));
  };

  render() {
    const {series, seriesName, isFatching} = this.state

    return (
      <div>
        {/* The length of series array : {this.state.series.length} */}
        <div>
          <input 
            value= {seriesName} 
            type="text" 
            onChange={this.onSeriesInputChange} 
          />
        </div>
        {
            !isFatching && series.length === 0 && seriesName.trim() === ''
            &&
            <p>Please enter series name into the input</p>
        }
        {
           !isFatching && series.length === 0 && seriesName.trim() !== ''
            &&
            <p>No TV series have been found with this name</p>
        }
        {
            isFatching && <p>Loading...</p>
        }
        {
            !isFatching && <SeriesList list={this.state.series} />
        }

      </div>
    );
  }
}

export default Series;
