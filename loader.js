var container = document.getElementById("container");

function loadApp(app) {
    container.innerHTML = '';

    var element = document.createElement(app);

    container.appendChild(element);
}