System.register(['@angular/core', 'ng2-toastr', 'moment', './entities/Weigher', './services/WeighService'], function(exports_1, context_1) {
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
    var core_1, ng2_toastr_1, moment, Weigher_1, WeighService_1;
    var UserWeight;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_toastr_1_1) {
                ng2_toastr_1 = ng2_toastr_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            },
            function (Weigher_1_1) {
                Weigher_1 = Weigher_1_1;
            },
            function (WeighService_1_1) {
                WeighService_1 = WeighService_1_1;
            }],
        execute: function() {
            UserWeight = (function () {
                function UserWeight(weighService, toastsManager, zone) {
                    this.zone = zone;
                    this.user = new Weigher_1.Weigher("1", "Bill", 1);
                    this.newWeighing = null;
                    this.userId = "0ecd5483-cdbd-4612-8d60-49727e8fa64a";
                    this.thing = "Test";
                    this.editIndex = null;
                    this.submitted = false;
                    this.showDateControl = false;
                    this.showTimeControl = false;
                    this.units = 'stlbs';
                    this.weighService = weighService;
                    //this.toasterService = toasterService;
                    this.toastsManager = toastsManager;
                }
                UserWeight.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('ngOnInit');
                    // this.weighService.getUser(this.userId).subscribe(
                    this.weighService.getUser().subscribe(function (user) {
                        _this.user = new Weigher_1.Weigher(user.id, user.name, user.units);
                        _this.userId = user.id;
                        _this.units = _this.user.unitsName();
                    }, function (error) {
                        _this.errorMessage = error;
                        //     this.toastsManager.error(<any>error, "Title?");
                    });
                    //this.user = { id: "ghffghfhgfh", name: "Mack" };
                    this.getWeighings();
                };
                UserWeight.prototype.ngAfterViewInit = function () {
                };
                UserWeight.prototype.getWeighings = function () {
                    var _this = this;
                    this.weighService.getWeighings(this.userId).subscribe(function (weighings) {
                        _this.weighings = weighings;
                        _this.weighings.forEach(function (w) {
                            switch (_this.user.units) {
                                case 0:
                                case 1:
                                    Weigher_1.Weighing.fromlbs(w);
                                    break;
                                case 2:
                                    Weigher_1.Weighing.fromKilos(w);
                                    break;
                                default:
                                    Weigher_1.Weighing.fromst(w);
                            }
                        });
                    }, function (error) {
                        _this.errorMessage = error;
                        // this.toasterService.pop('error', 'Error', 'Msg');
                        // this.toastsManager.error(<any>error, "Title?");
                    });
                };
                UserWeight.prototype.addNew = function () {
                    this.newWeighing = new Weigher_1.Weighing();
                    this.newWeighing.weigherId = this.user.id;
                    this.newWeighing.comment = "";
                    this.newWeighing.weighDate = new Date();
                    this.clearEdit();
                    this.showTimeControl = false;
                    this.showDateControl = false;
                    /*   setTimeout(function () {
                           $('#txtNewWeight').datepicker({ format: 'dd/mm/yyyy' });
                       }, 1000);  */
                };
                UserWeight.prototype.editWeighing = function (weighing, event) {
                    this.clearEdit();
                    weighing.inEdit = true;
                    this.showTimeControl = false;
                    this.showDateControl = false;
                    this.editIndex = this.weighings.indexOf(weighing);
                    weighing.weighDateS = moment.default(weighing.weighDate).format("MM/DD/YYYY");
                    // weighing.weighDateS = moment(weighing.weighDate).format("MM/DD/YYYY");
                    event.srcElement.parentElement.nextSibling;
                    console.log(event);
                };
                UserWeight.prototype.addWeighing = function () {
                    //this.newWeighing.weighDate = new Date(this.newWeighing.weighDateS);
                    var _this = this;
                    Weigher_1.Weighing.updateWeights(this.newWeighing, this.user.units);
                    this.weighService.saveWeighing(this.newWeighing).subscribe(function (weighing) {
                        _this.weighings.push(weighing);
                        switch (_this.user.units) {
                            case 0:
                            case 1:
                                Weigher_1.Weighing.fromlbs(weighing);
                                break;
                            case 2:
                                Weigher_1.Weighing.fromKilos(weighing);
                                break;
                            default:
                                Weigher_1.Weighing.fromst(weighing);
                        }
                        _this.sort();
                    }, function (error) {
                        _this.errorMessage = error;
                        _this.toastsManager.error(error, "Title?");
                    });
                    this.newWeighing = null;
                };
                UserWeight.prototype.saveWeighing = function (weighing) {
                    //weighing.weighDate = new Date(weighing.weighDateS);
                    var _this = this;
                    Weigher_1.Weighing.updateWeights(weighing, this.user.units);
                    this.weighService.saveWeighing(weighing).subscribe(function (weighing) {
                        weighing.inEdit = false;
                        if (_this.editIndex != null) {
                            _this.weighings[_this.editIndex] = weighing;
                            switch (_this.user.units) {
                                case 0:
                                case 1:
                                    Weigher_1.Weighing.fromlbs(weighing);
                                    break;
                                case 2:
                                    Weigher_1.Weighing.fromKilos(weighing);
                                    break;
                                default:
                                    Weigher_1.Weighing.fromst(weighing);
                            }
                        }
                        _this.editIndex = null;
                        _this.sort();
                    }, function (error) {
                        _this.errorMessage = error;
                        _this.toastsManager.error(error, "Title?");
                    });
                };
                UserWeight.prototype.toggleDateControl = function () {
                    this.showDateControl = !this.showDateControl;
                    this.showTimeControl = false;
                };
                UserWeight.prototype.toggleTimeControl = function () {
                    if (this.showTimeControl) {
                        this.showTimeControl = false;
                        this.showDateControl = true;
                    }
                    else {
                        this.showTimeControl = true;
                        this.showDateControl = false;
                    }
                };
                UserWeight.prototype.saveWeighingMock = function () {
                    this.newWeighing.weighDate = new Date(this.newWeighing.weighDateS);
                    this.weighings.push(this.newWeighing);
                    this.newWeighing = null;
                };
                UserWeight.prototype.clearEdit = function () {
                    this.weighings.forEach(function (weighing) {
                        weighing.inEdit = false;
                    });
                };
                UserWeight.prototype.sort = function () {
                    this.weighings.sort(function (a, b) {
                        return a.weighDate > b.weighDate ? -1 : (a.weighDate < b.weighDate ? 1 : 0);
                    });
                };
                UserWeight.prototype.cancel = function () {
                    this.newWeighing = null;
                };
                UserWeight.prototype.cancelEdit = function (weighing) {
                    weighing.inEdit = false;
                };
                /*
                public toasterconfig: ToasterConfig =
                new ToasterConfig({
                    showCloseButton: true,
                    tapToDismiss: false,
                    timeout: 0
                });
                */
                UserWeight.prototype.popToast = function () {
                    // this.toasterService.pop('success', 'Args Title', 'Args Body');
                };
                UserWeight.prototype.test = function () {
                    //this.toastsManager.error(this.user.units.toString(), "Title?");
                    console.log(this.user.units);
                };
                UserWeight.prototype.toastrError = function (msg) {
                    this.toastsManager.error(msg, "Title?");
                };
                UserWeight.prototype.onSubmit = function (e) {
                    this.submitted = true;
                    this.addWeighing();
                    e.preventDefault();
                    //return false;
                };
                UserWeight.prototype.onKeyuplbs = function (evt, weigh) {
                    Weigher_1.Weighing.fromlbs(weigh);
                    this.zone.run(function () { });
                };
                UserWeight.prototype.onKeyupst = function (evt, weigh) {
                    Weigher_1.Weighing.fromst(weigh);
                    this.zone.run(function () { });
                };
                UserWeight.prototype.onKeyupKilos = function (evt, weigh) {
                    Weigher_1.Weighing.fromKilos(weigh);
                    this.zone.run(function () { });
                };
                UserWeight = __decorate([
                    core_1.Component({
                        selector: 'user-weighing',
                        templateUrl: 'app/userweight.component.html',
                        /* directives: [DATEPICKER_DIRECTIVES, TimepickerComponent], */
                        providers: [WeighService_1.WeighService, ng2_toastr_1.ToastsManager]
                    }), 
                    __metadata('design:paramtypes', [WeighService_1.WeighService, ng2_toastr_1.ToastsManager, core_1.NgZone])
                ], UserWeight);
                return UserWeight;
            }());
            exports_1("UserWeight", UserWeight);
        }
    }
});
//# sourceMappingURL=userWeight.component.js.map