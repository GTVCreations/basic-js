/*! basic.js v0.4.1 | MIT License | Copyright (c) 2019 Thiruvikraman Govindarajan | github.com/gtvcreations/basic.js */

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
    Basic.version = "0.4.1";

    // Where Am I
    Basic.isBrowser = (typeof window === "object") ? true : false;
    Basic.isEmbed = (typeof window === "object" && (window.self !== window.top)) ? true : false;
    Basic.isNode = (typeof process === "object") ? true : false;

    // Check the Input is Array
    Basic.isArray = function(aInputArr) {
        var inputArr = aInputArr;
        return (inputArr instanceof Array) ? true : false;
    };

    // Sort Array of Numbers in Ascending Order
    Basic.sortNum = function(aArrOfNum) {
        var numArr = aArrOfNum;
        // concat() return new array. It doesn't affect existing array
		return numArr.concat().sort(function(a, b) {return a-b});
    };

    // Sort Array of Numbers in Descending Order
    Basic.rsortNum = function(aArrOfNum) {
        var numArr = aArrOfNum;
        // concat() return new array. It doesn't affect existing array
        return numArr.concat().sort(function(a, b) {return b-a});
    };

    // Remove Duplicate Entries in Array
    Basic.uniqueArr = function(aArrOfAny) {
        var anyArr = aArrOfAny;
        return anyArr.filter(function(item, pos) {
            return anyArr.indexOf(item) == pos;
        });
    };

    // Remove Particular Values in Array
    Basic.delArrVal = function(aArrOfAny, aRmValArrOfAny) {
        var anyArr = aArrOfAny;
        var remArr = aRmValArrOfAny;

        anyArr = anyArr.concat();

        for(var i = 0; i < remArr.length; i++) {
            for(var j = 0; j < anyArr.length; j++) {
                if(anyArr[j] === remArr[i]) {
                    anyArr.splice(j, 1);
                    j = j-1;
                }
            }
        }

        return anyArr;
    };

    // Add / Sum of `n` Numbers from Array
    Basic.sum = function(aArrOfNum) {
        var sum = 0;
        for(var i = 0; i < aArrOfNum.length; i++) {
            sum += aArrOfNum[i];
        }
        return sum;
    };

    // Mean / Average / Calculate Central Value of `n` Numbers from Array
    Basic.mean = function(aArrOfNum) {
        var numArr = aArrOfNum;
        return (aArrOfNum != 0) ? (Basic.sum(numArr) / numArr.length) : numArr.length;
    };

    // Median
    Basic.median = function(aArrOfNum) {
        var numArr = aArrOfNum;
        numArr = Basic.sortNum(numArr);
		return (numArr.length % 2 == 0) ? (numArr[(numArr.length/2)-1] + numArr[(numArr.length/2)]) / 2 : numArr[Math.floor(numArr.length/2)];
    };

    // Quartile
    Basic.quartile = function(aArrOfNum) {
        var numArr = aArrOfNum;
        numArr = Basic.sortNum(numArr);
		
		var q1 = Basic.median((numArr.length % 2 == 0) ? numArr.slice(0, (numArr.length / 2)) : numArr.slice(0, Math.floor(numArr.length / 2))),
		q2 = Basic.median(numArr),
		q3 = Basic.median((numArr.length % 2 == 0) ? numArr.slice((numArr.length / 2), numArr.length) : numArr.slice(Math.ceil(numArr.length / 2), numArr.length));
		
		return {
			lowVal : numArr[0], // Lowest Value
			q1: q1, // Q1 - lower quartile
			q2: q2, // Q2 - middle quartile (median)
			q3: q3, // Q3 - upper quartile
			highval: numArr[numArr.length-1], // highest value
			qi: q3 - q1 // interquartile (Q3 - Q1)
		};
    };

    // Generate Random Numbers from Min to Max Values
    Basic.genRandom = function(aMinNum, aMaxNum) {
        var min = Math.ceil(aMinNum),
            max = Math.floor(aMaxNum);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Get Time
    Basic.getTime = function(aBoolean) {
        var periods = aBoolean,
        date = new Date(),
		hh = date.getHours(),
		mm = date.getMinutes(),
        ss = date.getSeconds(),
		pp = (hh < 12) ? "AM" : "PM";
        
        if (periods === true) hh = (hh > 12) ? hh - 12 : ((hh == 0) ? 12 : hh);
		
		if (ss < 10) ss = "0" + ss;
		if (mm < 10) mm = "0" + mm;
		if (hh < 10) hh = "0" + hh;
		
		ss = ss.toString();
		mm = mm.toString();
		hh = hh.toString();
		
		return (periods == true) ? {hh: hh, mm: mm, ss: ss, pp: pp} : {hh: hh, mm: mm, ss: ss};
    };

    // Convert String to URL Friendly
    Basic.urlFriendly = function(aString) {
        var str = aString; // Input
        str = str.replace(/[^a-zA-Z -]/g, "");  // Special Characters Removed
        str = str.replace(/\s+/g, " ");         // Consequtive Spaces Removed
        str = str.replace(/^\s+|\s+$/g, "");    // Space in Begining and End was Removed
        str = str.replace(/\s/g, "-");          // Replace Spaces with Hypens
        str = str.replace(/-+/g, "-");          // Consequtive Spaces Hypens
        return str.toLowerCase();
    };
    
    return Basic;

});