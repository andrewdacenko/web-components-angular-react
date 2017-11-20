export class AppComponent {
    static component = {
        template: '<div>{{$ctrl.hello}}</div>',
        controller: AppComponent,
    };

    static $inject = ['$http'];

    hello = 'Angular Web Component';

    constructor($http) {
        this.$http = $http;
    }
}
