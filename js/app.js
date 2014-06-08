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
  balance6:             DS.attr('number'),

  price: function() {
    return this.get('wholesalePrice') * (100 + parseFloat(this.get('contractItem').get('marge')) ) / 100
  }.property('wholesalePrice', 'contractItem.marge'),

  value: function() {
    return this.get('price') * this.get('amount')
  }.property('price', 'amount'),

  monthlyRate: function() {
    return this.get('value') / this.get('term')
  }.property('value', 'term'),

  newRate2: function() {
    if (this.get('term') == 'contractItem.term') {
      if (this.get('amount') * 12 / this.get('term') >= 1) {
        return this.get('consumption1') * this.get('price') / 12
      } else {
        return this.get('monthlyRate');
      }
    } else {
      return this.get('monthlyRate');
    }
  }.property('term', 'contractItem.term', 'monthlyRate', 'consumption1', 'price', 'amount'),

  newRate3: function() {
    if (this.get('consumption2') > 0 ) {
      return this.get('consumption2') * this.get('price');
    } else {
      return '-';
    }
  }.property('consumption2', 'price'),

  newRate4: function() {
    if (this.get('consumption3') > 0 ) {
      return this.get('consumption3') * this.get('price');
    } else {
      return '-';
    }
  }.property('consumption3', 'price'),

  newRate5: function() {
    if (this.get('consumption4') > 0 ) {
      return this.get('consumption4') * this.get('price');
    } else {
      return '-';
    }
  }.property('consumption4', 'price'),

  newRate6: function() {
    if (this.get('consumption5') > 0 ) {
      return this.get('consumption5') * this.get('price');
    } else {
      return '-';
    }
  }.property('consumption5', 'price'),

  balance1: function() {
    return (this.get('newRate2') - this.get('monthlyRate')) * 12;
  }.property('newRate2', 'monthlyRate'),

  balance2: function() {
    return (this.get('newRate3') - this.get('newRate2')) * 12;
  }.property('newRate3', 'newRate2'),

  balance3: function() {
    return (this.get('newRate4') - this.get('newRate3')) * 12;
  }.property('newRate4', 'newRate3'),

  balance4: function() {
    return (this.get('newRate5') - this.get('newRate4')) * 12;
  }.property('newRate5', 'newRate4'),

  balance5: function() {
    return (this.get('newRate6') - this.get('newRate5')) * 12;
  }.property('newRate6', 'newRate5')
});


// HELPER //

Ember.Handlebars.helper('format_date', function(value, options) {
  moment.lang('de');
  var formatted_date = moment(value).format('DD.MM.YYYY');
  return new Ember.Handlebars.SafeString(formatted_date);
});

Ember.Handlebars.helper('format_datetime', function(value, options) {
  moment.lang('de');
  var formatted_date = moment(value).format('DD.MM.YYYY, HH:mm');
  return new Ember.Handlebars.SafeString(formatted_date);
});

Ember.Handlebars.helper('format_currency', function(value, options) {
  moment.lang('de');
  var formatted_currency = parseFloat(value, 10).toFixed(2) + ' EUR';
  return new Ember.Handlebars.SafeString(formatted_currency);
});

Ember.Handlebars.helper('two_digits', function(value, options) {
  moment.lang('de');
  var formatted_currency = parseFloat(value, 10).toFixed(2);
  return new Ember.Handlebars.SafeString(formatted_currency);
});


// FIXTURES //

App.Contract.FIXTURES = [{
  id:             1,
  term:           12,
  createdAt:      new Date(2012, 06, 02, 12, 01, 00),
  updatedAt:      new Date(2013, 06, 03, 13, 02, 00),
  contractItems:  [1, 2]
},{
  id:        2,
  term:      15,
  createdAt: new Date(2012, 06, 05, 12, 01, 00),
  updatedAt: new Date(2013, 06, 06, 13, 02, 00)
}];

App.ContractItem.FIXTURES = [{
  id:               1,
  position:         1,
  term:             12,
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
  consumableItems: [1, 2]
  },{
  id:               2,
  position:         2,
  term:             11,
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
  yield:                13500,
  wholesalePrice:       32.07,
  term:                 60,
  consumption1:         0,
  consumption2:         0,
  consumption3:         0,
  consumption4:         0,
  consumption5:         0,
  consumption6:         0
},{
  id:                   2,
  position:             2,
  contractItem:         1,
  contractType:         'Haupt',
  productNumber:        'CE340B',
  productLine:          'M775z',
  descriptionDe:        'Toner Cyan',
  descriptionEn:        '',
  yield:                16.000,
  wholesalePrice:       201.71,
  term:                 60,
  consumption1:         0,
  consumption2:         0,
  consumption3:         0,
  consumption4:         0,
  consumption5:         0,
  consumption6:         0
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


// VIEWS //

App.DatePickerField = Em.View.extend({
  templateName: 'datepicker',
  didInsertElement: function() {
    var onChangeDate, self;
    self = this;
    onChangeDate = function(ev) {
      return self.set("value", moment(ev.date).format("MM-DD-YYYY"));
    };
    return this.$('.datepicker').datepicker({
      separator: "."
    }).on("changeDate", onChangeDate);
  }
});