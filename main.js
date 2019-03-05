document.querySelector('#bookmark').addEventListener('submit', (e) => {

    var siteName = document.querySelector("#website").value;
    var url = document.querySelector("#url").value;
    var bookmarkObj = {
        name: siteName,
        url: url,
    }

    if (!siteName || !url) {
        var error = document.querySelector(".error");
        error.innerHTML = '<div class="alert alert-danger">' +
            '<strong>Error!</strong> Please fill out the feild.' +
            '</div>'
        e.preventDefault();
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!url.match(regex)) {
        var error = document.querySelector(".error");
        error.innerHTML = '<div class="alert alert-danger">' +
            '<strong>Error!</strong> The URL format is wrong.' +
            '</div>'
        e.preventDefault();
        return false;
    }

    //store to localStorage
    if (localStorage.getItem('bookmarks') === null) {
        var bookmarks = [];
        bookmarks.push(bookmarkObj);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        var error = document.querySelector(".error");
        error.innerHTML = '<div class="alert alert-success">' +
            '<strong>Success!</strong> Bookmark Added.' +
            '</div>'
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {

        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmarkObj);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        var error = document.querySelector(".error");
        error.innerHTML = '<div class="alert alert-success">' +
            '<strong>Success!</strong> Bookmark Added.' +
            '</div>'
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    e.preventDefault();
    fetchBookmarks();
})


function fetchBookmarks() {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //console.log(bookmarks);

    var results = document.querySelector('.results');
    results.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {

        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        results.innerHTML += '<div class="card">' +
            '<div class="card-header"><h3>' + name +
            '&nbsp;&nbsp;&nbsp; <a class="btn btn-success btn-sm" target="_blank" href="' + url + '"> Visit </a>' +
            '&nbsp;&nbsp;&nbsp; <a onclick="deleteURL(\'' + url + '\')"class="btn btn-danger btn-sm" href="#"> Delete </a>' +
            '</div></div>';
    }

}

function deleteURL(url) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }
    var error = document.querySelector(".error");
    error.innerHTML = '<div class="alert alert-primary">' +
        '<strong>Success!</strong> Bookmark Deleted.' +
        '</div>'
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}