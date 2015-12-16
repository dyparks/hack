var React = require('react');
var SegmentStore = require('../stores/SegmentStore');
var MainSection = require('./MainSection.react');

function getSegmentStore() {
  return {
    allSegments: SegmentStore.getAll()
  };
}

var SegmentApp = React.createClass({
  
  getInitialState: function() {
    return getSegmentStore();
  },

  componentDidMount: function() {
    SegmentStore.addChangeListener(this._onChange); 
  },
 
  componentWillReceiveProps: function() {
    // Here we can update the state based on some input prop  
  },

  componentWillUnmount: function() {
    SegmentStore.removeChangeListener(this._onChange);
  },
  
  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <MainSection
          allSegments={this.state.allSegments}
        />
      </div>
    );
  },

});

module.exports = SegmentApp;

 
