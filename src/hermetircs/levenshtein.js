"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var metric_1 = require("./metric");
var Levenshtein = /** @class */ (function (_super) {
    __extends(Levenshtein, _super);
    function Levenshtein(name) {
        if (name === void 0) { name = 'Lenveshtein'; }
        return _super.call(this, name) || this;
    }
    Levenshtein.prototype.distance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        var sourceLength = source.length;
        var targetLength = target.length;
        var deleteCost = cost;
        var insertCost = cost;
        var subtractCost = cost;
        var rows = sourceLength + 1;
        var cols = targetLength + 1;
        var distanceMatrix = Array(cols).fill(0).map(function () { return Array(rows).fill(0); });
        //let distanceMatrix: number[] = new Array(cols).fill(0).map(() => new Array(rows).fill(0))
        //let distanceMatrix: number[][] = Array<number>(cols).map(() => Array<number>(rows))
        for (var i = 0; i <= sourceLength; i++) {
            distanceMatrix[0][i] = i * deleteCost;
        }
        for (var j = 0; j <= targetLength; j++) {
            distanceMatrix[j][0] = j * insertCost;
        }
        for (var j = 1; j <= targetLength; j++) {
            for (var i = 1; i <= sourceLength; i++) {
                var indicator = 0;
                if (source[i - 1] !== target[j - 1]) {
                    indicator += subtractCost;
                }
                distanceMatrix[j][i] = Math.min(distanceMatrix[j][i - 1] + deleteCost, distanceMatrix[j - 1][i] + insertCost, distanceMatrix[j - 1][i - 1] + indicator);
            }
        }
        return distanceMatrix[targetLength][sourceLength];
    };
    Levenshtein.prototype.maxDistance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        var sourceLength = source.length;
        var targetLength = target.length;
        var delCost = cost;
        var insCost = cost;
        var subCost = cost;
        var maxDel = Math.max(sourceLength - targetLength, 0);
        var maxIns = Math.max(targetLength - sourceLength, 0);
        var maxSub = Math.min(sourceLength, targetLength);
        return maxDel * delCost + maxIns * insCost + maxSub * subCost;
    };
    return Levenshtein;
}(metric_1["default"]));
//const l = new Levenshtein()
//console.log(l.distance('start', 'end'))
exports["default"] = Levenshtein;
