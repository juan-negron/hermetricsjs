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
var Jaro = /** @class */ (function (_super) {
    __extends(Jaro, _super);
    function Jaro(name) {
        if (name === void 0) { name = 'Jaro'; }
        return _super.call(this, name) || this;
    }
    /**
     * Jaro Similarity
     * @param source
     * @param target
     * @param cost
     */
    Jaro.prototype.similarity = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        var sourceLength = source.length;
        var targetLength = target.length;
        if (sourceLength == 0 && targetLength == 0) {
            return 1;
        }
        var matchDistance = Math.max(sourceLength, targetLength) / 2 - 1;
        var sourceMatches = new Array(sourceLength);
        var targetMatches = new Array(targetLength);
        var matches = 0;
        var transpositions = 0;
        var start = 0;
        var end = 0;
        for (var i = 0; i < sourceLength; i++) {
            start = Math.max(0, i - matchDistance);
            end = Math.min(i + matchDistance + 1, targetLength);
            for (var j = start; j < end; j++) {
                if (targetMatches[j])
                    continue;
                if (source[i] === target[j]) {
                    sourceMatches[i] = true;
                    targetMatches[j] = true;
                    matches++;
                    break;
                }
            }
        }
        if (matches == 0)
            return 0;
        var k = 0;
        for (var i = 0; i < sourceLength; i++) {
            if (!sourceMatches[i])
                continue;
            while (!targetMatches[k])
                k++;
            if (source[i] != target[k])
                transpositions++;
            k++;
        }
        return ((matches / sourceLength) + (matches / targetLength) + ((matches - transpositions / 2) / matches)) / 3;
    };
    /**
     * Jaro distance
     * @param source
     * @param target
     * @param cost
     */
    Jaro.prototype.distance = function (source, target, cost) {
        if (cost === void 0) { cost = 1; }
        return 1 - this.similarity(source, target, cost);
    };
    return Jaro;
}(metric_1["default"]));
exports["default"] = Jaro;
