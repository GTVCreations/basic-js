/*! basic.js v2020-09-14-01 | MIT License | Copyright (c) 2014-2020 Thiruvikraman Govindarajan | github.com/gtvcreations/basic.js */

// Strict Mode
"use strict";

// Universal JS Module Loader
; (function (root, factory) {

    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.Basic = factory();
    }

})(this, function () {

    // Object `Basic`
    var Basic = {};

    // Check `Version`
    Basic.version = "2020-09-14-01";

    // Check `Where Am I`
    Basic.isBrowser = (typeof window === "object");
    Basic.isEmbed = (typeof window === "object" && (window.self !== window.top));
    Basic.isNode = (typeof process === "object");

    // Check the Input is `Boolean`
    Basic.isBoolean = function (aInput) {
        var input = aInput;
        return (typeof input === "boolean");
    };

    // Check the Input is `Number`
    Basic.isNumber = function (aInput) {
        var input = aInput;
        return (typeof input === "number" && !isNaN(input));
    };

    // Check the Input is `String`
    Basic.isString = function (aInput) {
        var input = aInput;
        return (typeof input === "string");
    };

    // Check the Input is `Array`
    Basic.isArray = function (aInput) {
        var input = aInput;
        return (input instanceof Array);
    };

    // Check the Input is `Object`
    Basic.isObject = function (aInput) {
        var input = aInput;
        return (input && typeof input === "object" && !(input instanceof Array)) ? true : false;
    };

    // Check the Input is `Array of String`
    Basic.isArrOfStr = function (aArrOfAny) {
        var anyArr = aArrOfAny;
        return (Basic.isArray(anyArr) && anyArr.length) ? anyArr.every(i => (typeof i === "string")) : false;
    };

    // Check the value exist in `Array`
    Basic.isFoundInArr = function (aArrOfAny, aInput) {
        var input = aInput;
        var anyArr = aArrOfAny;
        return (anyArr.indexOf(input) > -1) ? true : false;
    };
    
    // Format Bytes
    Basic.formatBytes = function (aBytes, aDecimals = 2) {
        var b = aBytes;

        if (aBytes === 0) {
            return "0 Byte";
        }

        var k = 1024;
        var d = (aDecimals < 0) ? 0 : aDecimals;
        var sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        var i = Math.floor(Math.log(b) / Math.log(k));

        return parseFloat((b / Math.pow(k, i)).toFixed(d)) + " " + sizes[i];
    };

    // Get Query String from Object
    Basic.getQueryStr = function (aObj) {
        var obj = aObj;

        if (!Basic.isObject(obj)) {
            return "";
        }

        var queryStr = Object.keys(obj).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
        }).join("&");

        return queryStr;
    };

    // Sort Array of Numbers in Ascending Order
    Basic.sortNum = function (aArrOfNum) {
        var numArr = aArrOfNum;
        // concat() return new array. It doesn't affect existing array
        return numArr.concat().sort(function (a, b) { return a - b });
    };

    // Sort Array of Numbers in Descending Order
    Basic.rsortNum = function (aArrOfNum) {
        var numArr = aArrOfNum;
        // concat() return new array. It doesn't affect existing array
        return numArr.concat().sort(function (a, b) { return b - a });
    };

    // Remove Duplicate Entries in Array
    Basic.uniqueArr = function (aArrOfAny) {
        var anyArr = aArrOfAny;
        return anyArr.filter(function (item, pos) {
            return anyArr.indexOf(item) == pos;
        });
    };

    // Remove Particular Values in Array
    Basic.delArrVal = function (aArrOfAny, aRmValArrOfAny) {
        var anyArr = aArrOfAny;
        var remArr = aRmValArrOfAny;

        anyArr = anyArr.concat();

        for (var i = 0; i < remArr.length; i++) {
            for (var j = 0; j < anyArr.length; j++) {
                if (anyArr[j] === remArr[i]) {
                    anyArr.splice(j, 1);
                    j = j - 1;
                }
            }
        }

        return anyArr;
    };

    // Add / Sum of `n` Numbers from Array
    Basic.sum = function (aArrOfNum) {
        var sum = 0;
        for (var i = 0; i < aArrOfNum.length; i++) {
            sum += aArrOfNum[i];
        }
        return sum;
    };

    // Mean / Average / Calculate Central Value of `n` Numbers from Array
    Basic.mean = function (aArrOfNum) {
        var numArr = aArrOfNum;
        return (aArrOfNum != 0) ? (Basic.sum(numArr) / numArr.length) : numArr.length;
    };

    // Calculate `Median`
    Basic.median = function (aArrOfNum) {
        var numArr = aArrOfNum;
        numArr = Basic.sortNum(numArr);
        return (numArr.length % 2 == 0) ? (numArr[(numArr.length / 2) - 1] + numArr[(numArr.length / 2)]) / 2 : numArr[Math.floor(numArr.length / 2)];
    };

    // Calculate `Quartile`
    Basic.quartile = function (aArrOfNum) {
        var numArr = aArrOfNum;
        numArr = Basic.sortNum(numArr);

        var q1 = Basic.median((numArr.length % 2 == 0) ? numArr.slice(0, (numArr.length / 2)) : numArr.slice(0, Math.floor(numArr.length / 2))),
            q2 = Basic.median(numArr),
            q3 = Basic.median((numArr.length % 2 == 0) ? numArr.slice((numArr.length / 2), numArr.length) : numArr.slice(Math.ceil(numArr.length / 2), numArr.length));

        return {
            "lowVal": numArr[0],                    // Lowest Value
            "q1": q1,                               // Q1 - lower quartile
            "q2": q2,                               // Q2 - middle quartile (median)
            "q3": q3,                               // Q3 - upper quartile
            "highval": numArr[numArr.length - 1],   // highest value
            "qi": q3 - q1                           // interquartile (Q3 - Q1)
        };
    };

    // Generate Random Numbers from `Min` to `Max` Values
    Basic.genRandom = function (aMinNum, aMaxNum) {
        var min = Math.ceil(aMinNum),
            max = Math.floor(aMaxNum);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Get `Time`
    Basic.getTime = function (aBoolean) {
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

        return (periods == true) ? { "hh": hh, "mm": mm, "ss": ss, "pp": pp } : { "hh": hh, "mm": mm, "ss": ss };
    };

    // Convert String to URL Friendly
    Basic.urlFriendly = function (aString, aOptions) {
        var str = Basic.isString(aString) ? aString : "";           // String
        var options = Basic.isObject(aOptions) ? aOptions : {};     // Object

        // String Length
        var defaultMaxLength = 45;
        var maxStrLength = (!isNaN(options.maxStrLength) && options.maxStrLength > 0) ? options.maxStrLength : defaultMaxLength;

        var reduceString = function (aInputStr) {
            var inputStr = aInputStr;

            inputStr = inputStr.replace(/\b[a-zA-Z]\b/g, "");           // Remove Single Letter Word
            inputStr = inputStr.replace(/[^a-zA-Z0-9 -]/g, "");         // Special Characters Removed Except Hypens
            inputStr = inputStr.replace(/\s/g, "-");                    // Replace Spaces with Hypens
            inputStr = inputStr.replace(/-+/g, "-");                    // Consequtive Hypens Removed
            inputStr = inputStr.replace(/^-+|-+$/g, "");                // Hypens in Begining and End was Removed

            return inputStr;
        };

        str = reduceString(reduceString(str).slice(0, maxStrLength));   // Slice String to Allowed Max Character

        return (options.charCase === true) ? str : str.toLowerCase();
    };

    // Check the Number is `Prime`
    Basic.isPrime = function (aNumber) {
        var n,
            i,
            flag = true;

        n = parseInt(aNumber);

        if (n == 0 || n == 1) {
            return false;       // Prime Number
        } else {
            for (i = 2; i <= n - 1; i++) {
                if (n % i == 0) {
                    flag = false;
                    break;
                }
            }

            // Check flag and return
            if (flag == true) {
                return true;    // Prime Number
            }
            else {
                return false;   // Not Prime Number
            }
        }
    };

    // `Linear Search` for Array
    Basic.linearSearch = function (aArrOfAny, aElemToFind) {
        var arr = aArrOfAny,
            len = aArrOfAny.length,
            elem = aElemToFind,
            i;

        for (i = 0; i < len; i++) {
            if (arr[i] == elem) {
                return i;
            }
        }

        return -1;
    };

    // `Binary Search` for Array of Numbers - Input should be Sorted Array
    Basic.binarySearch = function (aSortedArrOfNum, aElemToFind) {
        var arr = aSortedArrOfNum,
            lowIndex = 0,
            highIndex = arr.length - 1,
            elem = aElemToFind;

        while (lowIndex <= highIndex) {
            var midIndex = Math.floor((lowIndex + highIndex) / 2);

            if (arr[midIndex] == elem) {
                return midIndex;
            } else if (arr[midIndex] < elem) {
                lowIndex = midIndex + 1;
            } else {
                highIndex = midIndex - 1;
            }
        }

        return -1;
    };

    // `Bubble Sort` for Array of Numbers
    Basic.bubbleSort = function (aArrOfNum) {
        var arr = aArrOfNum.slice(),
            len = arr.length - 1;

        do {
            var swapped = false;

            for (var i = 0; i < len; i++) {
                if (arr[i] > arr[i + 1]) {

                    var temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;

                    swapped = true;
                }
            }
        }

        while (swapped === true);

        return arr;
    };

    // `Quick Sort` for Array of Numbers
    Basic.quickSort = function (aArrOfNum) {
        var arr = aArrOfNum,
            smaller = [],
            larger = [];

        if (arr.length <= 1) {
            return arr;
        }

        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < arr[0]) {
                smaller.push(arr[i]);
            }

            if (arr[i] >= arr[0]) {
                larger.push(arr[i]);
            }
        }

        return Basic.quickSort(smaller).concat(arr[0], Basic.quickSort(larger));
    }

    // Return `Object`
    return Basic;

});