﻿(function(angular) {
    'use strict';

    /**
     * @ngdoc module
     * @name tubular
     * 
     * @description 
     * Tubular module. Entry point to get all the Tubular functionality.
     * 
     * It depends upon  {@link tubular.directives}, {@link tubular.services} and {@link tubular.models}.
     */
    angular.module('tubular', ['tubular.directives', 'tubular.services', 'tubular.models', 'LocalStorageModule'])
        .config([
            'localStorageServiceProvider', function(localStorageServiceProvider) {
                localStorageServiceProvider.setPrefix('tubular');
            }
        ])
        .run([
            'tubularHttp', 'tubularOData', 'tubularLocalData',
            function(tubularHttp, tubularOData, tubularLocalData) {
                // register data services
                tubularHttp.registerService('odata', tubularOData);
                tubularHttp.registerService('local', tubularLocalData);
            }
        ])
        /**
         * @ngdoc filter
         * @name errormessage
         * @kind function
         *
         * @description
         * Use `errormessage` to retrieve the friendly message possible in a HTTP Error object.
         * 
         * @param {object} input Input to filter.
         * @returns {string} Formatted error message.
         */
        .filter('errormessage', function() {
            return function(input) {
                if (angular.isDefined(input) && angular.isDefined(input.data) &&
                    input.data &&
                    angular.isDefined(input.data.ExceptionMessage)) {
                    return input.data.ExceptionMessage;
                }

                return input.statusText || "Connection Error";
            };
        })
        /**
         * @ngdoc filter
         * @name numberorcurrency
         * @kind function
         *
         * @description
         * `numberorcurrency` is a hack to hold `currency` and `number` in a single filter.
         */
        .filter("numberorcurrency", [
            "$filter", function($filter) {
                return function(input, format, symbol, fractionSize) {
                    symbol = symbol || "$";
                    fractionSize = fractionSize || 2;

                    if (format === "C") {
                        return $filter("currency")(input, symbol, fractionSize);
                    }

                    if (format === "I") {
                        return parseInt(input);
                    }

                    // default to decimal
                    return $filter("number")(input, fractionSize);
                };
            }
        ])
        /**
         * @ngdoc filter
         * @name moment
         * @kind function
         *
         * @description
         * `moment` is a filter to call format from moment or, if the input is a Date, call Angular's `date` filter.
         */
        .filter("moment", [
            "$filter", function($filter) {
                return function(input, format) {
                    if (angular.isDefined(input) && typeof (input) === "object") {
                        if (typeof moment == 'function' && input !== null) {
                            return input.format(format);
                        } else {
                            return $filter('date')(input);
                        }
                    }

                    return input;
                };
            }
        ]);
})(window.angular);