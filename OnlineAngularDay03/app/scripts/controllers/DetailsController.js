app.controller('DetailsController', function ($scope, BookFactory, $routeParams, $location) {
    $scope.index = $routeParams.id; //id is the same variable name as what is declared with :id in app.js
    $scope.book = BookFactory.bookArray[$scope.index]; //gets the individual book from the factory
    
    $scope.deleteBook = function () {
        BookFactory.DeleteBook($scope.book).then(function () {
            //Service splices the book from the array
            $location.path('/') //reroute to home
        })
    }

    //if we get undefined from the array, reroute to the Home Page
    if (!$scope.book) {
        $location.path('/');
    }
});