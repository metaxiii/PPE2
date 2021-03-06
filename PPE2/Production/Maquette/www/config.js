import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngMdIcons from 'angular-material-icons';
import ngMaterial from 'angular-material';
import ngMessage from 'angular-messages';

import roomFilter from './components/filters/roomFilter';

import AuthService from './components/services/AuthService';
import BookingService from './components/services/BookingService';
import ConnectivityService from './components/services/ConnectivityService';

import indexComp from './components/ui/index/index';
import infoComp from './components/ui/info/info';
import bookingComp from './components/ui/booking/booking';
import registerComp from './components/ui/register/register';


const app = angular.module('app', [uiRouter, ngMdIcons, ngMaterial, ngMessage]);

// Routes
app.component('index', indexComp);
app.component('info', infoComp);
app.component('booking', bookingComp);
app.component('register', registerComp);

// Filters
app.filter('roomFilter', roomFilter);

// Services
app.service('AuthService', AuthService);
app.service('BookingService', BookingService);
app.service('ConnectivityService', ConnectivityService);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
    $stateProvider
        .state('index', {
            url: '/',
            template: '<index></index>', 
            abstract: true
        })
        .state('index.info', {
            url: '^/info',
            template: '<info></info>'
        })
        .state('index.booking', {
        	url: '^/booking',
        	template: '<booking></booking>'
        })
        .state('index.register', {
            url: '^/register',
            template: '<register></register>'
        })

    $urlRouterProvider.otherwise('/info');

    $locationProvider.html5Mode(true);
}]);

export default app;