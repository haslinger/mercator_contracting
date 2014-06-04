App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter;
// App.ApplicationAdapter = DS.ActiveModelAdapter;

App.Router.map(function() {
  this.resource('contracts');
});

App.ContractsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contract');
  }
});


App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('contracts');
  }
});

App.Contract = DS.Model.extend({
  runtime: DS.attr('number'),
  startdate: DS.attr('date'),
  created_at: DS.attr('string'),
  updated_at: DS.attr('string'),
});

Ember.Handlebars.helper('format_date', function(value, options) {
  moment.lang('de');
  var formatted_date= moment(value).format("LL");
  return new Ember.Handlebars.SafeString(formatted_date);
});

Ember.Handlebars.helper('format_datetime', function(value, options) {
  moment.lang('de');
  var formatted_date= moment(value).format("LLL");
  return new Ember.Handlebars.SafeString(formatted_date);
});

App.Contract.FIXTURES = [{
  id: 1,
  runtime: 12,
  startdate: new Date(2014, 06, 02),
  created_at: new Date(2014, 06, 03, 12, 00, 00),
  updated_at: new Date(2014, 06, 03, 13, 12, 00)
},{
  id: 2,
  runtime: 15,
  startdate: new Date(2014, 06, 03),
  created_at: new Date(2014, 06, 02, 12, 00, 00),
  updated_at: new Date(2014, 06, 02, 13, 12, 00)
}];