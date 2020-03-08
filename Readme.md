# utils-and-helpers - ![alt text](https://dev.azure.com/davidjohnbell/utils-and-helpers/_apis/build/status/Test%20and%20Deploy%20Package "pipeline badge")

A simple zero-dependency package full of utilities and helpers you're using across all of your projects. This package is *not* meant to replace more specialized implementations - you'll find `Observable` inside but not the mighty `rxjs`. Rather, this package is alternative to copying and pasting the same code snippets across several projects.

## Getting Started

There are four top level namespaces `Enums`, `Helpers`, `Structures`, and `Utils`. See below for details

### Enums

* currency
    * Currency
* http
    * HttpStatus
    * HttpMethod

### Helpers

In the `Helpers` namespace you'll find common one-liners and validations. All helpers are exported from the index file. See below for an orginized view of available helpers.

* array
    * isIn
    * isNotIn
    * arrayNotEmpty
    * arrayMinSize
    * arrayMaxSize
    * zip
    * binaryInsert
    * binarySearch
* boolean
    * isBoolean
* common
    * isDefined
    * equals
    * notEquals
    * isEmpty
    * isNotEmpty
    * length
    * minLength
    * maxLength
* date
    * future
    * isDate
    * before
    * after
* function
    * isFunction
    * compose
    * pipe
    * curry
* number
    * isNumber
    * isDivisibleBy
    * isPositive
    * isNegative
    * gte
    * gt
    * lte
    * lt
* object
    * isObject
    * isNotEmptyObject
    * prop
* string
    * snakeToCamel
    * camelToSnake
    * generateId
    * isString
    * isDateString
    * isAlpha
    * isAlphanumeric
    * isEmail
    * isLowerCase
    * isUpperCase
    * levenshteinDistance
* math
    * normalize
    * rouletteWheel
    * randomBetween

### Structures

In the `Structures` namespace you'll find common data structures that aren't available in the standard library. The data structures here are classes whereas `Utils` exports interfaces. All data structures are exported from the index file. See below for an orginized view.

* Queue
* LinkedList

### Utils

The `Utils` namespace constains simple interfaces such as `Box` and functions that act on those interfaces. These functions are *not* instance methods.

* box
    * Box (interface)
    * adjacent
    * union
    * intersects
    * contains
    * canFit
    * copy
* color
    * RGB (interface)
    * CYMK (interface)
    * COLOR_DASE (equals 16)
    * COLOR_DEPTH (equals 255)
    * mix
    * rgbToHex
    * channelToHex
    * rgbToCmyk
    * cmykToRgb
    * hexToRgb
    * randomHexColor
    * replaceShorthandHex
* cookies
    * Cookie (interface)
    * parseCookies
    * serializeCookie
* lens
    * Lens (interface)
    * composeLens
* middleware
    * NextFunction (type)
    * Stack (type)
    * Middleware (type)
    * Use (type)
    * middleware
* observable
    * Observer (interface)
    * TearDown (type)
    * Observervable (type)
    * interval
    * stream
    * map
    * merge
    * switchMap
    * zip
    * multicast
* throttle
    * throttle
    * debounce
* validate
    * ValidationSchema (type)
    * validate

## Installing

```
npm install utils-and-helpers
```

## Cloning

```
git clone https://github.com/davidjohnbell/utils-and-helpers.git
cd utils-and-helpers
npm install
```

## Running the tests

```
npm run test
```

## Contributing

Contributions are desired and welcome. Please visit [issues](https://github.com/davidjohnbell/utils-and-helpers/issues) for details.

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **David Bell** - *Initial work* - [davidjohnbell](https://github.com/davidjohnbell)

See also the list of [contributors](https://github.com/davidjohnbell/utils-and-helpers/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License