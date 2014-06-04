App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter;
// App.ApplicationAdapter = DS.ActiveModelAdapter;


// ROUTES //
App.Router.map(function() {
  this.resource('contracts');
  this.resource('contract', { path: '/contract/:contract_id' }, function() {
    this.route('contractitems');
  });
});

App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('contracts');
  }
});

App.ContractsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contract');
  }
});


// MODELS //

App.Contract = DS.Model.extend({
  contractitems: DS.hasMany('contractitem', {async: true}),
  runtime:       DS.attr('number'),
  startdate:     DS.attr('date'),
  createdAt:     DS.attr('date'),
  updatedAt:     DS.attr('date')
});

App.Contractitem = DS.Model.extend({
  contract:       DS.belongsTo('contract'),
  position:       DS.attr('number'),
  productNumber:  DS.attr('string'),
  descriptionDe:  DS.attr('string'),
  descriptionEn:  DS.attr('string'),
  amount:         DS.attr('number'),
  unit:           DS.attr('string'),
  volume:         DS.attr('number'),
  productPrice:   DS.attr('number'),
  vat:            DS.attr('number'),
  value:          DS.attr('number'),
  discountAbs:    DS.attr('number'),
  createdAt:      DS.attr('date'),
  updatedAt:      DS.attr('date')
});

// HELPER //

Ember.Handlebars.helper('format_date', function(value, options) {
  moment.lang('de');
  var formatted_date= moment(value).format('LL');
  return new Ember.Handlebars.SafeString(formatted_date);
});

Ember.Handlebars.helper('format_datetime', function(value, options) {
  moment.lang('de');
  var formatted_date= moment(value).format('LLL');
  return new Ember.Handlebars.SafeString(formatted_date);
});

// FIXTURES //

App.Contractitem.FIXTURES = [{
  id:             1,
  position:       1,
  productNumber:  'AB1',
  descriptionDe:  'Produkt AB1',
  descriptionEn:  'Product AB1',
  amount:         2,
  unit:           'Stk',
  volume:         2000,
  productPrice:   1250,
  vat:            20,
  value:          4000,
  discountAbs:    27,
  createdAt:      new Date(2014, 06, 07, 12, 00, 00),
  updatedAt:      new Date(2014, 06, 08, 13, 00, 00),
  contract:       1
  },{
  id:             2,
  position:       2,
  productNumber:  'CD1',
  descriptionDe:  'Produkt CD1',
  descriptionEn:  'Product CD1',
  amount:         3,
  unit:           'Stk',
  volume:         3500,
  productPrice:   3250,
  vat:            20,
  value:          12323,
  discountAbs:    23,
  createdAt:      new Date(2014, 06, 09, 12, 00, 00),
  updatedAt:      new Date(2014, 06, 10, 13, 00, 00),
  contract:       1
  }];

App.Contract.FIXTURES = [{
  id:             1,
  runtime:        12,
  startdate:      new Date(2011, 06, 01),
  createdAt:      new Date(2012, 06, 02, 12, 01, 00),
  updatedAt:      new Date(2013, 06, 03, 13, 02, 00),
  contractitems:  ['1','2']
},{
  id:        2,
  runtime:   15,
  startdate: new Date(2011, 06, 04),
  createdAt: new Date(2012, 06, 05, 12, 01, 00),
  updatedAt: new Date(2013, 06, 06, 13, 02, 00)
}];

  App.ContractitemTablelineComponent = Ember.Component.extend({
    tagName: 'tr'
  });

  App.ContractTablelineComponent = Ember.Component.extend({
    tagName: 'tr'
  });
