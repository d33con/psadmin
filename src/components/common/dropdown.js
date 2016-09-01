"use strict";

var React = require('react');

var Dropdown = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    options: React.PropTypes.array,
    error: React.PropTypes.string
  },

  render: function() {
    var wrapperClass = 'form-group';
    if (this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + 'has-error';
    }

    var createNameRow = function(name) {
      return (
        <option key={name.id} value={name.id}>{name.firstName} {name.lastName}</option>
      );
    };

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">
          <select
            name={this.props.name}
            onChange={this.props.onChange}
            id="authorSelect"
            className="form-control">
              {this.props.options.map(createNameRow, this)}
          </select>
        <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }

});

module.exports = Dropdown;
