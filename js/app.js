App = Ember.Application.create();
App.ApplicationAdapter = DS.FixtureAdapter;
// App.ApplicationAdapter = DS.ActiveModelAdapter;


// ROUTES //
App.Router.map(function() {
  this.resource('contracts');
  this.resource('contract', { path: '/contract/:contract_id' })
  this.resource('contractItem', { path: '/contractitem/:contractItem_id' })
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
  contractItems: DS.hasMany('contractItem', {async: true}),
  term:          DS.attr('number'),
  startdate:     DS.attr('date'),
  createdAt:     DS.attr('date'),
  updatedAt:     DS.attr('date'),

  enddate: function() {
    return moment(this.get('startdate')).add('months', this.get('term')).subtract('days', 1);
  }.property('startdate', 'term')
});

App.ContractItem = DS.Model.extend({
  contract:        DS.belongsTo('contract', {async: true}),
  consumableItems: DS.hasMany('consumableItem', {async: true}),
  position:        DS.attr('number'),
  term:            DS.attr('number'),
  startdate:       DS.attr('date'),
  productNumber:   DS.attr('string'),
  descriptionDe:   DS.attr('string'),
  descriptionEn:   DS.attr('string'),
  amount:          DS.attr('number'),
  unit:            DS.attr('string'),
  volumeBW:        DS.attr('number'),
  volumeColor:     DS.attr('number'),
  productPrice:    DS.attr('number'),
  marge:           DS.attr('number'),
  vat:             DS.attr('number'),
  value:           DS.attr('number'),
  discountAbs:     DS.attr('number'),
  monitoringRate:  DS.attr('number'),
  createdAt:       DS.attr('date'),
  updatedAt:       DS.attr('date'),

  enddate: function() {
    return moment(this.get('startdate')).add('months', this.get('term')).subtract('days', 1);
  }.property('startdate', 'term')
});

App.ConsumableItem = DS.Model.extend({
  contractItem:         DS.belongsTo('contractItem', {async: true}),
  contractType:         DS.attr('string'),
  position:             DS.attr('number'),
  productNumber:        DS.attr('string'),
  productLine:          DS.attr('string'),
  descriptionDe:        DS.attr('string'),
  descriptionEn:        DS.attr('string'),
  amount:               DS.attr('number'),
  yield:                DS.attr('number'),
  wholesalePrice:       DS.attr('number'),
  term:                 DS.attr('number'),
  consumption1:         DS.attr('number'),
  consumption2:         DS.attr('number'),
  consumption3:         DS.attr('number'),
  consumption4:         DS.attr('number'),
  consumption5:         DS.attr('number'),
  consumption6:         DS.attr('number'),
  consumptionEstimate1: DS.attr('number'),
  consumptionEstimate2: DS.attr('number'),
  consumptionEstimate3: DS.attr('number'),
  consumptionEstimate4: DS.attr('number'),
  consumptionEstimate5: DS.attr('number'),
  consumptionEstimate6: DS.attr('number'),
  balance1:             DS.attr('number'),
  balance2:             DS.attr('number'),
  balance3:             DS.attr('number'),
  balance4:             DS.attr('number'),
  balance5:             DS.attr('number'),
  balance6:             DS.attr('number'),


  price: function() {
    return this.get('wholesalePrice') * (100 + parseFloat(this.get('contractItem').get('marge')) ) / 100
  }.property('wholesalePrice', 'contractItem.marge'),

  value: function() {
    return this.get('price') * this.get('amount')
  }.property('price', "amount"),

  monthlyRate: function() {
    return this.get('value') / this.get('term')
  }.property('value', "term")

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

Ember.Handlebars.helper('format_currency', function(value, options) {
  moment.lang('de');
  var formatted_currency= parseFloat(value, 10).toFixed(2) + ' EUR';
  return new Ember.Handlebars.SafeString(formatted_currency);
});


// FIXTURES //

App.Contract.FIXTURES = [{
  id:             1,
  term:           12,
  startdate:      new Date(2011, 06, 01),
  createdAt:      new Date(2012, 06, 02, 12, 01, 00),
  updatedAt:      new Date(2013, 06, 03, 13, 02, 00),
  contractItems:  [1, 2]
},{
  id:        2,
  term:      15,
  startdate: new Date(2011, 06, 04),
  createdAt: new Date(2012, 06, 05, 12, 01, 00),
  updatedAt: new Date(2013, 06, 06, 13, 02, 00)
}];

App.ContractItem.FIXTURES = [{
  id:               1,
  position:         1,
  term:             12,
  startdate:        new Date(2011, 06, 01),
  productNumber:    'AB1',
  descriptionDe:    'Produkt AB1',
  descriptionEn:    'Product AB1',
  amount:           2,
  unit:             'Stk',
  volumeBW:         2000,
  volumeColor:      2000,
  productPrice:     1250,
  marge:            15,
  vat:              20,
  value:            4000,
  discountAbs:      27,
  monitoringRate:   5,
  createdAt:        new Date(2014, 06, 07, 12, 00, 00),
  updatedAt:        new Date(2014, 06, 08, 13, 00, 00),
  contract:         1,
  consumableItems: [1]
  },{
  id:               2,
  position:         2,
  term:             11,
  startdate:        new Date(2011, 05, 11),
  productNumber:    'CD1',
  descriptionDe:    'Produkt CD1',
  descriptionEn:    'Product CD1',
  amount:           3,
  unit:             'Stk',
  volumeBW:         3500,
  volumeColor:      2000,
  productPrice:     3250,
  marge:            15,
  vat:              20,
  value:            12323,
  discountAbs:      23,
  monitoringRate:   5,
  createdAt:        new Date(2014, 06, 09, 12, 00, 00),
  updatedAt:        new Date(2014, 06, 10, 13, 00, 00),
  contract:         1
}];

App.ConsumableItem.FIXTURES = [{
  id:                   1,
  position:             1,
  contractItem:         1,
  contractType:         'Haupt',
  productNumber:        'CE340A',
  productLine:          'M775z',
  descriptionDe:        'Toner Schwarz',
  descriptionEn:        '',
  amount:               31,
  yield:                13500,
  wholesalePrice:       32.07,
  price:                37,
  value:                0,
  monthlyRate:          0,
  term:                 60,
  consumption1:         0,
  consumption2:         0,
  consumption3:         0,
  consumption4:         0,
  consumption5:         0,
  consumption6:         0,
  consumptionEstimate1: 0,
  consumptionEstimate2: 0,
  consumptionEstimate3: 0,
  consumptionEstimate4: 0,
  consumptionEstimate5: 0,
  consumptionEstimate6: 0,
  balance1:             0,
  balance2:             0,
  balance3:             0,
  balance4:             0,
  balance5:             0,
  balance6:             0
}];

// COMPONENTS //

  App.ContractTablelineComponent = Ember.Component.extend({
    tagName: 'tr'
  });

  App.ContractitemTablelineComponent = Ember.Component.extend({
    tagName: 'tr'
  });

  App.ConsumableitemTablelineComponent = Ember.Component.extend({
    tagName: 'tr'
  });
