var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    //Looks for the route, and runs an 'if' statement
    //ex: if route === '/', then the page should look like this
    $routeProvider.when('/', {
        //if you define the controller here, you can only have one on the page
        controller: 'HomeController',
        //where the html file is
        templateUrl: '/app/views/HomeView.html',
        title: 'Home Page'
    }).when('/Details/:id', { // : means variable name
        templateUrl: '/app/views/DetailsView.html',
        title: 'Detail Page',
        caseInsensitiveMatch: true
        //putting controller on the html page itself for this view
    }).when('/404', {
        title: '404 Not Found',
        templateUrl: '/app/views/NotFound.html'
    }).otherwise({
        //if route does not exist, redirect to the 404 route
        redirectTo: '/404'
    });
})