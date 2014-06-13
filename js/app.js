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
  marge:           DS.attr('number'),
  vat:             DS.attr('number'),
  discountAbs:     DS.attr('number'),
  monitoringRate:  DS.attr('number'),
  createdAt:       DS.attr('date'),
  updatedAt:       DS.attr('date'),

  price: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('value');
    });
  }.property('consumableItems.@each.value'),

  enddate: function() {
    return moment(this.get('startdate')).add('months', this.get('term')).subtract('days', 1);
  }.property('startdate', 'term'),

  monthlyRate: function() {
    return this.get('price') / this.get('term');
  }.property('price', 'term'),

  value: function() {
    return this.get('monthlyRate') + parseFloat(this.get('monitoringRate')) - this.get('discountAbs');
  }.property('monthlyRate', 'monitoringRate', 'discountAbs'),

  valueInclVat: function() {
    return this.get('value') * ( 100 + parseFloat(this.get('vat'))) / 100;
  }.property('value', 'vat'),

  newRate2: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('newRate2');
    });
  }.property('consumableItems.@each.newRate2'),

  newRateWithMonitoring2: function() {
    return this.get('newRate2') + parseFloat(this.get('monitoringRate'));
  }.property('newRate2', 'monitoringRate'),

  newRate3: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('newRate3');
    });
  }.property('consumableItems.@each.newRate3'),

  newRateWithMonitoring3: function() {
    return this.get('newRate3') + parseFloat(this.get('monitoringRate'));
  }.property('newRate3', 'monitoringRate'),

  newRate4: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('newRate4');
    });
  }.property('consumableItems.@each.newRate4'),

  newRateWithMonitoring4: function() {
    return this.get('newRate4') + parseFloat(this.get('monitoringRate'));
  }.property('newRate4', 'monitoringRate'),

  newRate5: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('newRate5');
    });
  }.property('consumableItems.@each.newRate5'),

  newRateWithMonitoring5: function() {
    return this.get('newRate5') + parseFloat(this.get('monitoringRate'));
  }.property('newRate5', 'monitoringRate'),

  newRate6: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('newRate6');
    });
  }.property('consumableItems.@each.newRate6'),

  newRateWithMonitoring6: function() {
    return this.get('newRate6') + parseFloat(this.get('monitoringRate'));
  }.property('newRate6', 'monitoringRate'),

  balance1: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('balance1');
    });
  }.property('consumableItems.@each.balance1', 'monitoringRate'),

  balance2: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('balance2');
    });
  }.property('consumableItems.@each.balance2', 'monitoringRate'),

  balance3: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('balance3');
    });
  }.property('consumableItems.@each.balance3', 'monitoringRate'),

  balance4: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('balance4');
    });
  }.property('consumableItems.@each.balance4', 'monitoringRate'),

  balance5: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('balance5');
    });
  }.property('consumableItems.@each.balance5', 'monitoringRate'),

  balance6: function() {
    var consumableItems = this.get('consumableItems');
    return consumableItems.reduce(function(prevVal, item) {
      return (prevVal || 0) + item.get('balance6');
    });
  }.property('consumableItems.@each.balance6', 'monitoringRate'),

  monthsWithoutRates1: function() {
    if(this.get('balance1') < 0) {
      return Math.floor(this.get('balance1') / this.get('newRate1')) * (-1)
    } else {
      return 0
    }
  }.property('newRate1', 'balance1'),

  monthsWithoutRates2: function() {
    if(this.get('balance2') < 0) {
      return Math.floor(this.get('balance2') / this.get('newRate2')) * (-1)
    } else {
      return 0
    }
  }.property('newRate2', 'balance2'),

  monthsWithoutRates3: function() {
    if(this.get('balance3') < 0) {
      return Math.floor(this.get('balance3') / this.get('newRate3')) * (-1)
    } else {
      return 0
    }
  }.property('newRate3', 'balance3'),

  monthsWithoutRates4: function() {
    if(this.get('balance4') < 0) {
      return Math.floor(this.get('balance4') / this.get('newRate4')) * (-1)
    } else {
      return 0
    }
  }.property('newRate4', 'balance4'),

  monthsWithoutRates5: function() {
    if(this.get('balance5') < 0) {
      return Math.floor(this.get('balance5') / this.get('newRate5')) * (-1)
    } else {
      return 0
    }
  }.property('newRate5', 'balance5'),

  nextMonth1: function() {
    return ((this.get('monthsWithoutRates1') * this.get('newRate2')) + parseFloat(this.get('balance1'))) * (-1)
  }.property('monthsWithoutRates1', 'newRate2', 'balance1'),

  nextMonth2: function() {
    return ((this.get('monthsWithoutRates2') * this.get('newRate3')) + parseFloat(this.get('balance2'))) * (-1)
  }.property('monthsWithoutRates2', 'newRate3', 'balance2'),

  nextMonth3: function() {
    debugger;
    return ((this.get('monthsWithoutRates3') * this.get('newRate4')) + parseFloat(this.get('balance3'))) * (-1)
  }.property('monthsWithoutRates3', 'newRate4', 'balance3'),

  nextMonth4: function() {
    return ((this.get('monthsWithoutRates4') * this.get('newRate5')) + parseFloat(this.get('balance4'))) * (-1)
  }.property('monthsWithoutRates4', 'newRate5', 'balance4'),

  nextMonth5: function() {
    return ((this.get('monthsWithoutRates5') * this.get('newRate6')) + parseFloat(this.get('balance5'))) * (-1)
  }.property('monthsWithoutRates5', 'newRate6', 'balance5')
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

Ember.Handlebars.helper('plus_years_minus_days', function(value, options) {
  moment.lang('de');
  var formatted_date = moment(value).add('years', options.hash['years'])
                                    .subtract('days', options.hash['days'])
                                    .format('DD.MM.YY');
  return new Ember.Handlebars.SafeString(formatted_date);
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
  marge:            15,
  vat:              20,
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
  marge:            15,
  vat:              20,
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

App.ContractTheadComponent = Ember.Component.extend({
  tagName: 'thead'
});

App.ContractTablelineComponent = Ember.Component.extend({
  tagName: 'tr'
});



App.ContractitemTheadComponent = Ember.Component.extend({
  tagName: 'thead'
});

App.ContractitemTablelineComponent = Ember.Component.extend({
  tagName: 'tr'
});


App.ContractitemCalendarlineComponent = Ember.Component.extend({
  tagName: 'thead'
});

App.ConsumableitemTheadComponent = Ember.Component.extend({
  tagName: 'thead'
});

App.ConsumableitemTablelineComponent = Ember.Component.extend({
  tagName: 'tr'
});


// VIEWS //

App.DatePickerField = Em.View.extend({
  templateName: 'datepicker',

  value_as_date: function() {
    return moment(this.get('value')).format('DD.MM.YYYY');;
  }.property('view.value'),

  didInsertElement: function() {
    var onChangeDate, self;
    self = this;
    onChangeDate = function(ev) {
      return self.set("value", moment(ev.date).format("MM-DD-YYYY"));
    };
    return this.$('.datepicker').datepicker({
      separator: "."
    }).on("changeDate", onChangeDate);
  },
});

// Input Views //

Ember.TextField.reopen({
    attributeBindings: ['data-provide', 'data-date-format'],
});