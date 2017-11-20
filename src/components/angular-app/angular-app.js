import * as angular from 'angular';
import { AppModule } from './app.module';

export class AngularApp extends HTMLElement {
    static name = 'angular-app';

    static get observedAttributes() {
        return ['failed'];
    }

    constructor(...args) {
        super(...args);

        console.log('AngularApp constructor', ...args);
    }


    attachedCallback(...args) {
        console.log('AngularApp attached', ...args);
        var el = this;

        try {
            if (Math.random() > 0.5) {
                throw new Error('something went wrong');
            }

            el.innerHTML = '<div ng-controller="AppComponent as vm">{{vm.hello}}</div>';

            angular.module(AppModule, [])
                .run(function () {
                    console.log(`Angular module ${AppModule} is running`);
                    el.dispatchEvent(new Event('load'));
                });

            angular.bootstrap(el, [AppModule], {
                strictDi: true
            });
        } catch (e) {
            el.dispatchEvent(new CustomEvent('error', {detail: e}));
        }
    }

    createdCallback(...args) {
        console.log('AngularApp created', ...args);
    }

    connectedCallback(...args) {
        console.log('AngularApp connected', ...args);
    }

    disconnectedCallback(...args) {
        console.log('AngularApp disconnected', ...args);
    }

    attributeChangedCallback(...args) {
        console.log('AngularApp attributeChanged', ...args)
    }

    detachedCallback(...args) {
        console.log('AngularApp detached', ...args);
    }
}
