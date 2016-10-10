System.register(["@angular/core", '@angular/http', 'rxjs/Observable', 'rxjs/add/operator/map', 'rxjs/add/operator/catch'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var WeighService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (_2) {}],
        execute: function() {
            WeighService = (function () {
                function WeighService(http) {
                    this.http = http;
                    this.rootUrl = "api";
                }
                WeighService.prototype.getUser = function () {
                    //return { id: "ghffghfhgfh", name: "Chris"};
                    return this.http.get(this.rootUrl + "/user")
                        .map(this.extractUser)
                        .catch(this.handleError);
                };
                /*
                public getUser(userId: string): Observable<IWeigher> {
                    //return { id: "ghffghfhgfh", name: "Chris"};
                    return this.http.get(this.rootUrl + "/user/" + userId)
                        .map(this.extractUser)
                        .catch(this.handleError);
            
                }
                */
                WeighService.prototype.getWeighings = function (userId) {
                    //return [ { id: 1, weighDate: new Date("2016-03-01"), weigherId: '', weightPounds: 110 }, { id: 2, weighDate: new Date("2016-03-01"), weigherId: '', weightPounds: 110 }];
                    return this.http.get(this.rootUrl + "/weighing/" + userId)
                        .map(this.extractWeighings)
                        .catch(this.handleError);
                };
                WeighService.prototype.saveWeighing = function (weighing) {
                    var body = JSON.stringify(weighing);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this.http.post(this.rootUrl + "/weighing", body, options)
                        .map(this.extractWeighing)
                        .catch(this.handleError);
                };
                WeighService.prototype.extractData = function (res) {
                    var body = res.json();
                    return body || {};
                };
                WeighService.prototype.extractUser = function (res) {
                    var body = res.json();
                    if (body && body.weighings) {
                        body.weighings.forEach(function (weighing) {
                            weighing.weighDate = new Date(weighing.weighDate);
                        });
                    }
                    return body || {};
                };
                WeighService.prototype.extractWeighings = function (res) {
                    var body = res.json();
                    if (body) {
                        body.forEach(function (weighing) {
                            weighing.weighDate = new Date(weighing.weighDate);
                        });
                    }
                    return body || {};
                };
                WeighService.prototype.extractWeighing = function (res) {
                    var body = res.json();
                    if (body) {
                        body.weighDate = new Date(body.weighDate);
                    }
                    var ret = body;
                    if (body) {
                        ret = body;
                    }
                    return ret || {};
                };
                WeighService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                WeighService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], WeighService);
                return WeighService;
            }());
            exports_1("WeighService", WeighService);
        }
    }
});
//# sourceMappingURL=WeighService.js.map