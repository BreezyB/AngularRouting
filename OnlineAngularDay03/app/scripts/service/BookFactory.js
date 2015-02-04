app.factory('BookFactory', function ($http, $q) {
    var firebase = 'https://ccamplessons.firebaseio.com/';
    var bookArray = []; //array of books to share with HomeController and DetailsController

    //clears out the array without calling bookArray = [];
    var clearArray = function () {
        while (bookArray.length > 0) {
            bookArray.pop();
        }
    }

    var GetBooks = function () {
        var def = $q.defer();
        $http({
            method: 'GET',
            url: firebase + '.json'
        }).success(function (data) {
            //var arr = [];
            clearArray(); //clear the array for the new information
            for (var prop in data) {
                data[prop].key = prop;
                bookArray.push(data[prop]); //pushing into bookArray instead of arr
            }
            def.resolve(bookArray); //resolving with bookArray instead of arr. Don't need to return info at the moment.
        }).error(function (data) {
            console.log("There was a problem with your GET call");
            defer.reject();
        });
        return def.promise;
    }
    var PostBook = function (book) {
        var def = $q.defer();
        $http({
            method: 'POST',
            data: book,
            url: firebase + '.json'
        }).success(function (data) {
            book.key = data.name;
            def.resolve(book);
        }).error(function (data) {
            console.log("There was a problem posting the book");
            def.reject();
        });
        return def.promise;
    }
    var DeleteBook = function (book) {
        var def = $q.defer();
        $http({
            method: 'DELETE',
            url: firebase + book.key + '/.json'
        }).success(function (data) {
            for (var i = 0; i < bookArray.length; i++) {
                if (bookArray[i].key === book.key) {
                    bookArray.splice(i, 1);
                    break;
                }
            }
            def.resolve();
        }).error(function (data) {
            console.error('There was a problem deleting your book');
            def.reject();
        });
        return def.promise;;
    }
    return {
        PostBook: PostBook,
        GetBooks: GetBooks,
        bookArray: bookArray,
        DeleteBook: DeleteBook
    }
})