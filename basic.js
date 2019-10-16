/*! basic.js v0.1.0 | MIT License | Copyright (c) 2019 Thiruvikraman Govindarajan | github.com/gtvcreations/basic.js */

// Strict Mode
"use strict";

// Universal JS Module Loader
;(function(root, factory) {

    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.Basic = factory();
    }

})(this, function() {
    
    // Object
    var Basic = {};

    // Version
    Basic.version = "0.1.0";

    // Where Am I
    Basic.isBrowser = (typeof window === "object") ? true : false;
    Basic.isEmbed = (typeof window === "object" && (window.self !== window.top)) ? true : false;
    Basic.isNode = (typeof process === "object") ? true : false;
    
    return Basic;

});