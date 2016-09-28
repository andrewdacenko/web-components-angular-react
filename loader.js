var container = document.getElementById("container");

function loadApp(app) {
    container.innerHTML = '';

    var element = document.createElement(app);

    element.onload = function (load) {
        console.log('loaded', load);
    };

    element.onerror = function (err) {
        console.error('error', err);

        element.parentNode.removeChild(element);
    };

    container.appendChild(element);
}