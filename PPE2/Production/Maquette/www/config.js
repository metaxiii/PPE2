import angular from 'angular';
import uiRouter from 'angular-ui-router';
import indexComp from './components/ui/index/index';
import infoComp from './components/ui/info/info';
import bookingComp from './components/ui/booking/booking';
import ngMdIcons from 'angular-material-icons';
import ngMaterial from 'angular-material';

const app = angular.module('app', [uiRouter, ngMdIcons, ngMaterial]);

// Routes
app.component('index', indexComp);
app.component('info', infoComp);
app.component('booking', bookingComp)

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
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

    $urlRouterProvider.otherwise('/info');

    $locationProvider.html5Mode(true);
});

export default app;