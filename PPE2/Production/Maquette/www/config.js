import angular from 'angular';
import uiRouter from 'angular-ui-router';
import indexComp from './components/ui/index/index';
import bookingComp from './components/ui/booking/booking';
import ngMdIcons from 'angular-material-icons';

const app = angular.module('app', [uiRouter, ngMdIcons]);

// Routes
app.component('index', indexComp);
app.component('booking', bookingComp)

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('index', {
            url: '/',
            template: '<index></index>'
        })
        .state('booking', {
        	url: '/booking',
        	template: '<booking></booking>'
        })

    $locationProvider.html5Mode(true);
});

export default app;