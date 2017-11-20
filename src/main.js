class Application {
    static bootstrap (element) {
        const app = new Application(element);

        app.render();
    }

    root = null;
    container = null;

    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = `
            <h1>Hello web-components</h1>
            <div>
                <button data-app="angular-app">Load Angular app</button>
                <button data-app="react-app">Load React app</button>
            </div>

            <div class="container"></div>`;

        this.container = this.root.getElementsByClassName('container');
        this.root.addEventListener('click', this.handleButtonClick);
    }

    handleButtonClick = (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            return;
        }

        this.loadApp(event.target.dataset.app);
    };

    loadApp(app) {
        this.container.innerHTML = '';

        const element = document.createElement(app);

        element.addEventListener('load', (load) => {
            console.log('loaded', load);
        });

        element.addEventListener('error', (err) => {
            console.error('error', err);

            element.parentNode.removeChild(element);
        });

        this.container.appendChild(element);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Application.bootstrap(document.getElementById('app'))
});
