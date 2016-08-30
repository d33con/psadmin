"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseApi = require('../../api/courseApi');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      course: { id: '', title: '', author: '', category: '', length: '' },
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var courseId = this.props.params.id; // from the path '/author:id'
    if (courseId) {
      this.setState({ course: CourseApi.getCoursesById(courseId) });
    }
  },

  // call this on every key press -> update the state
  setCourseState: function(event) {
    this.setState({ dirty: true });
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    return this.setState({ course: this.state.course });
  },

  courseFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; // clear any previous errors

    if (this.state.course.title.length < 3) {
      this.state.errors.title = 'Title must be 3 characters';
      formIsValid = false;
    }

    if (this.state.course.author.length < 3) {
      this.state.errors.author = 'Author must be 3 characters';
      formIsValid = false;
    }

    this.setState({ errors: this.state.errors });
    return formIsValid;

  },

  saveCourse: function(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    CourseApi.saveCourse(this.state.course);

    toastr.success('Course saved');
    this.setState({ dirty: false });
    this.transitionTo('courses');
  },

  render: function () {
    return (
      <CourseForm
        course={this.state.course}
        onChange={this.setCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageCoursePage;