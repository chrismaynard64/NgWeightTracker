System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Weigher, Weighing;
    return {
        setters:[],
        execute: function() {
            Weigher = (function () {
                function Weigher(id, name, units) {
                    this.id = id;
                    this.name = name;
                    this.units = units;
                }
                Weigher.prototype.unitsName = function () {
                    switch (this.units) {
                        case 0:
                            return "lbs";
                        case 0:
                            return "stlbs";
                        case 0:
                            return "kilos";
                        default:
                            return "stlbs";
                    }
                };
                Object.defineProperty(Weigher.prototype, "unitsS", {
                    get: function () {
                        return this.units.toString();
                    },
                    set: function (val) {
                        this.units = +val;
                    },
                    enumerable: true,
                    configurable: true
                });
                return Weigher;
            }());
            exports_1("Weigher", Weigher);
            Weighing = (function () {
                function Weighing() {
                    this.weighDateS = "";
                    this.weightKilos = 0;
                    this.weightPounds = 0;
                    this.comment = "";
                    this.inEdit = false;
                    this.weightSt = 0;
                    this.weightStlbs = 0;
                }
                Weighing.updateWeights = function (weigh, units) {
                    switch (units) {
                        case 0:
                            Weighing.fromlbs(weigh);
                            break;
                        case 1:
                            Weighing.fromst(weigh);
                            break;
                        case 2:
                            Weighing.fromKilos(weigh);
                            break;
                    }
                };
                Weighing.fromlbs = function (weigh) {
                    weigh.weightKilos = +(weigh.weightPounds * 0.453592).toFixed(2);
                    weigh.weightSt = Math.floor(weigh.weightPounds / 14);
                    weigh.weightStlbs = +(weigh.weightPounds % 14).toFixed(2);
                };
                Weighing.fromKilos = function (weigh) {
                    weigh.weightPounds = +(weigh.weightKilos * 2.2046226218).toFixed(2);
                    weigh.weightSt = Math.floor(weigh.weightPounds / 14);
                    weigh.weightStlbs = +(weigh.weightPounds % 14).toFixed(2);
                };
                Weighing.fromst = function (weigh) {
                    weigh.weightPounds = +(weigh.weightSt * 14 + weigh.weightStlbs).toFixed(2);
                    weigh.weightKilos = +(weigh.weightPounds * 0.453592).toFixed(2);
                };
                return Weighing;
            }());
            exports_1("Weighing", Weighing);
        }
    }
});
//# sourceMappingURL=Weigher.js.map