"use strict";

var React = require('react');

var About = React.createClass({
  // For demo purposes
  // willTransitionFrom & willTransitionTo
  /*
  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      if(!confirm('Are you sure you want to go to this page?')) {
        transition.about();
      } else {
        callback();
      }
    },
    willTransitionFrom: function (transition, component) {
      if(!confirm('Are you sure you want to leave this page?')) {
        transition.about();
      }
    }
  },
  */
  render: function () {
    return (
        <div>
          <h1>About</h1>
            <p>This application is for the following:
              <ul>
                <li>React</li>
                <li>React Router</li>
                <li>Browserify</li>
                <li>Flux</li>
                <li>Node</li>
                <li>Gulp</li>
                <li>Bootstrap</li>
              </ul>
            </p>
        </div>
    );
  }

});

module.exports = About;
