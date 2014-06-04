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

  formattedCreatedAt: function() {
    moment.lang('de');
    return moment(this.get('created_at')).format("LLL");
  }.property('created_at'),

  formattedUpdatedAt: function() {
    moment.lang('de');
    return moment(this.get('updated_at')).format("LLL");
  }.property('updated_at'),

  formattedStartdate: function() {
    moment.lang('de');
    return moment(this.get('startdate')).format("LL");
  }.property('startdate')
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