import ReactDOM from 'react-dom';
import React from 'react';
import Overview from './components/Overview/Overview';
import Questions from './components/Questions';
import Ratings from './components/Ratings/Ratings';
import RelatedItems from './components/RelatedItems/RelatedItems';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product: '',
    };
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <section className="overview module"><Overview product={product} /></section>
        <section className="questions module"><Questions product={product} /></section>
        <section className="ratings module"><Ratings product={product} /></section>
        <section className="related-items module"><RelatedItems product={product} /></section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
