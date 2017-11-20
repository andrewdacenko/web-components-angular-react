export class Application {
    root = null;
    title = 'Web Components';
    container = null;
    errorMode = false;
    loadedApp = null;

    bootstrap(root) {
        this.root = root;

        this.root.innerHTML = `
            <div class="row">
                <h1>Hello web-components</h1>

                <div style="margin-top: 3rem">
                    <label for="title">Title:</label>
                    <input id="title" name="title" value="${this.title}">
                </div>
            </div>

            <div class="row">
                <div>
                    <h2>Separately Running Multiple Apps</h2>
                    <angular-app title="Angular Separate Running App"></angular-app>
                    <react-app title="React Separate Running App"></react-app>
                </div>
                
                <div>
                    <h2>Rendering Apps in Same Container</h2>

                    <div>
                        <p>Error Mode</p>
                        <input type="radio" name="errorMode" value="0" checked> Disabled
                        <input type="radio" name="errorMode" value="1"> Enabled
                    </div>

                    <div>
                        <button data-app="angular-app">Load Angular app</button>
                        <button data-app="react-app">Load React app</button>
                    </div>
                    <div class="container"></div>
                </div>
            </div>
            `;

        this.container = this.root.querySelector('.container');
        this.root.addEventListener('keyup', this.handleInputChange);
        this.root.addEventListener('change', this.handleInputChange);
        this.root.addEventListener('click', this.handleButtonClick);
    }

    handleInputChange = (event) => {
        if (event.target.id === 'title') {
            this.title = event.target.value;
            this.updateLoadedApp();
            return;
        }

        if (event.target.name !== 'errorMode') {
            return false;
        }

        this.errorMode = event.target.value === '1';

        this.updateLoadedApp();
    };

    handleButtonClick = (event) => {
        if (event.target.nodeName !== 'BUTTON') {
            return;
        }

        this.loadApp(event.target.dataset.app);
    };

    updateLoadedApp() {
        if (this.loadedApp) {
            this.loadedApp.setAttribute('title', this.title);

            if (this.errorMode) {
                this.loadedApp.setAttribute('error-mode', '');
            } else {
                this.loadedApp.removeAttribute('error-mode');
            }
        }
    }

    loadApp(app) {
        this.container.innerHTML = '';

        this.loadedApp = document.createElement(app);

        if (this.errorMode) {
            this.loadedApp.setAttribute('error-mode', '');
        }

        this.loadedApp.setAttribute('title', this.title);

        this.loadedApp.addEventListener('load', (load) => {
            console.log('loaded', load);
        });

        this.loadedApp.addEventListener('error', (err) => {
            console.error('error', err);

            this.loadedApp.parentNode.removeChild(this.loadedApp);
            this.loadedApp = null;
            this.container.appendChild(this.getError(err.detail));
        });

        this.container.appendChild(this.loadedApp);
    }

    getError(err) {
        const message = document.createElement('p');
        message.innerHTML = err.stack.split('\n').join('<br/>');
        return message;
    }
}

export function render(Component, element) {
    const component = new Component();
    component.bootstrap(element);
}
