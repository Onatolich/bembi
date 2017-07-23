(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD
  } else if (typeof exports === 'object') {
    module.exports = factory(); // CommonJS
  } else {
    global.bembi = factory(); // Globals
  }
}(this, function() {
  'use strict';

  function forEach(arr, callback) {
    var i;
    for (i = arr.length - 1; i >= 0; i--) {
      callback(arr[i]);
    }
  }

  function map(arr, callback) {
    var result = [];
    var wrap = function(entry) {
      var stepResult = callback(entry);
      if (stepResult) {
        result.push(stepResult);
      }
    };

    forEach(arr, wrap);
    return result;
  }

  function createClassModifier(cls, modifier) {
    return [cls, modifier].join('--');
  }

  function arrayToModifiers(cls, modifiers) {
    return map(modifiers, function(modifier) {
      return createClassModifier(cls, modifier);
    });
  }

  function objectToModifiers(cls, modifiers) {
    return map(Object.keys(modifiers), function(key) {
      var value = modifiers[key];
      var modifier = key;
      if (typeof value !== 'boolean') {
        modifier = [key, value].join('-');
      }
      return createClassModifier(cls, modifier);
    });
  }

  function bembi() {
    var args = Array.prototype.slice.call(arguments, 0);
    var cls = args.splice(0, 1)[0];
    var modifiers = [];
    var additional = [];

    forEach(args, function(entry) {
      switch (typeof entry) {
        case 'object':
          var entryModifiers = [];
          if (entry instanceof Array) {
            entryModifiers = arrayToModifiers(cls, entry);
          } else {
            entryModifiers = objectToModifiers(cls, entry);
          }

          modifiers = modifiers.concat(entryModifiers);
          break;

        case 'string':
          additional.push(entry);
          break;

        default:
      }
    });

    return [cls].concat(modifiers, additional).join(' ');
  }

  return bembi;
}));
