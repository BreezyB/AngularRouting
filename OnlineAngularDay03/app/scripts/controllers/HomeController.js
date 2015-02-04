app.controller('HomeController', function ($scope, BookFactory) {
    //our array of books
    $scope.books = BookFactory.bookArray;

    //book object constructor
    $scope.Book = function (name, author, genre) {
        this.name = name;
        this.author = author;
        this.genre = genre;
    }

    //Function to show that both arrays are the same (HomeController and BookFactory)
    $scope.logArrays = function () {
        console.log('Controller Array');
        console.log($scope.books);
        console.log('Factory Array');
        console.log(BookFactory.bookArray);
    }
    $scope.addBook = function () {
        //creates a new book object from our three inputs on the HomeView.html
        $scope.book = new $scope.Book($scope.InputName, $scope.InputAuthor, $scope.InputGenre);
        BookFactory.PostBook($scope.book).then(function (data) {
            $scope.books.push(data);
        })
        //Clear out our inputs
        $scope.InputAuthor = $scope.InputName = $scope.InputGenre = '';
    }
    if ($scope.books.length === 0) {
        BookFactory.GetBooks().then(function (data) {
            //$scope.books = data; //Removed, added the push in the factory
        })
    }
});