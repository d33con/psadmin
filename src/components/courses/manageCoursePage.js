"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
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
      course: { id: '', title: '', watchHref: '', author: { id: '', name: '' }, category: '', length: '' },
      authors: AuthorStore.getAllAuthors(),
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function() {
    var courseId = this.props.params.id; // from the path '/course:id'
    if (courseId) { this.setState({ course: CourseStore.getCoursesById(courseId) }); }
  },

  // call this on every key press -> update the state
  setCourseState: function(event) {
    this.setState({ dirty: true });
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    var e = document.getElementById('authorSelect');
    this.state.course.author = {
      id: e.options[e.selectedIndex].value,
      name: e.options[e.selectedIndex].text
    };
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

    var re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (!re.test(this.state.course.watchHref)) {
      this.state.errors.watchHref = 'Please enter a valid URL';
      formIsValid = false;
    }

    if (this.state.course.category.length < 3) {
      this.state.errors.category = 'Category must be 3 characters';
      formIsValid = false;
    }

    var timeRegExp = /(\d+\:)+\d{2}/ig;
    if (!timeRegExp.test(this.state.course.length)) {
      this.state.errors.length = 'Please enter length in the form hrs:mins';
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

    if (this.state.course.id) {
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }

    toastr.success('Course saved');
    this.setState({ dirty: false });
    this.transitionTo('courses');
  },

  render: function () {
    return (
      <CourseForm
        course={this.state.course}
        authors={this.state.authors}
        onChange={this.setCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageCoursePage;
