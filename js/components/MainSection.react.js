var React = require('react');
var ReactPropTypes = React.PropTypes;

var MainSection = React.createClass({

  propTypes: {
    allSegments: ReactPropTypes.object.isRequired,
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allSegments).length < 1) {
      return null;
    }

    var allSegments = this.props.allSegments;
    
    return (
      <section id="main">
        <Segments
          segments = {allSegments}
          onChange = {this._onToggleCompleteAll}
        />
      </section>
    );
  },

  /**
   * Event handler that you can write on change
   */
  _onToggleCompleteAll: function() {
    TodoActions.toggleCompleteAll();
  }

});

module.exports = MainSection;
