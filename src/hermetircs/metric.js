"use strict";
exports.__esModule = true;
var Metric = /** @class */ (function () {
    function Metric(name) {
        if (name === void 0) { name = 'Generic'; }
        this._name = name;
    }
    /**
    * distance
    */
    Metric.prototype.distance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        return source === target ? 0 : 1;
    };
    Metric.prototype.maxDistance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        return (source.length === 0 && target.length === 0) ? 0 : 1;
    };
    Metric.prototype.minDistance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        return 0;
    };
    Metric.prototype.normalized = function (x, low, high) {
        if (low === void 0) { low = 0; }
        if (high === void 0) { high = 1; }
        //const norm : number = 0
        if (high <= low) {
            return 0;
        }
        if (x >= high) {
            return 1;
        }
        if (x <= low) {
            return 0;
        }
        return (x - low) / (high - low);
    };
    Metric.prototype.normalizedDistance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        var x = this.distance(source, target, cost);
        var min = this.minDistance(source, target, cost);
        var max = this.maxDistance(source, target, cost);
        return this.normalized(x, min, max);
    };
    Metric.prototype.similarity = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        return 1 - this.normalizedDistance(source, target, cost);
    };
    return Metric;
}());
exports["default"] = Metric;
