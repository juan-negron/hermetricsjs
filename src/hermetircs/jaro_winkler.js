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
var jaro_1 = require("./jaro");
var JaroWinkler = /** @class */ (function (_super) {
    __extends(JaroWinkler, _super);
    function JaroWinkler(name) {
        if (name === void 0) { name = 'Jaro_Winkler'; }
        return _super.call(this, name) || this;
    }
    /**
     * Jaro Winkler Similarity
     * @param source
     * @param target
     * @param cost
     * @param p
     */
    JaroWinkler.prototype.similarity = function (source, target, cost, p) {
        if (cost === void 0) { cost = 1; }
        if (p === void 0) { p = 0.1; }
        if (!(0 <= p && p <= 0.25)) {
            new Error("The p parameter must be between 0 and 0.25");
        }
        var maxL = 4;
        var l = 0;
        for (var i = 0; i < 4; i++) {
            if (source[i] != target[i])
                break;
            l++;
        }
        var j = _super.prototype.similarity.call(this, source, target, cost);
        return j + l * p * (1 - j);
    };
    /**
     * Jaro Winkler distance
     * @param source
     * @param target
     * @param cost
     * @param p
     */
    JaroWinkler.prototype.distance = function (source, target, cost, p) {
        if (cost === void 0) { cost = 1; }
        if (p === void 0) { p = 0.1; }
        return 1 - this.similarity(source, target, cost, p);
    };
    return JaroWinkler;
}(jaro_1["default"]));
exports["default"] = JaroWinkler;
