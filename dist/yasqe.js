(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.YASQE = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/*
  jQuery deparam is an extraction of the deparam method from Ben Alman's jQuery BBQ
  http://benalman.com/projects/jquery-bbq-plugin/
*/
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();
$.deparam = function(params, coerce) {
  var obj = {}, coerce_types = { true: !0, false: !1, null: null };

  // Iterate over all name=value pairs.
  $.each(params.replace(/\+/g, " ").split("&"), function(j, v) {
    var param = v.split("="),
      key = decodeURIComponent(param[0]),
      val,
      cur = obj,
      i = 0,
      // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
      // into its component parts.
      keys = key.split("]["),
      keys_last = keys.length - 1;

    // If the first keys part contains [ and the last ends with ], then []
    // are correctly balanced.
    if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
      // Remove the trailing ] from the last keys part.
      keys[keys_last] = keys[keys_last].replace(/\]$/, "");

      // Split first keys part into two parts on the [ and add them back onto
      // the beginning of the keys array.
      keys = keys.shift().split("[").concat(keys);

      keys_last = keys.length - 1;
    } else {
      // Basic 'foo' style key.
      keys_last = 0;
    }

    // Are we dealing with a name=value pair, or just a name?
    if (param.length === 2) {
      val = decodeURIComponent(param[1]);

      // Coerce values.
      if (coerce) {
        val = val && !isNaN(val)
          ? +val // number
          : val === "undefined"
              ? undefined // undefined
              : coerce_types[val] !== undefined
                  ? coerce_types[val] // true, false, null
                  : val; // string
      }

      if (keys_last) {
        // Complex key, build deep object structure based on a few rules:
        // * The 'cur' pointer starts at the object top-level.
        // * [] = array push (n is set to array length), [n] = array if n is
        //   numeric, otherwise object.
        // * If at the last keys part, set the value.
        // * For each keys part, if the current level is undefined create an
        //   object or array based on the type of the next keys part.
        // * Move the 'cur' pointer to the next level.
        // * Rinse & repeat.
        for (; i <= keys_last; i++) {
          key = keys[i] === "" ? cur.length : keys[i];
          cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
        }
      } else {
        // Simple key, even simpler rules, since only scalars and shallow
        // arrays are allowed.

        if ($.isArray(obj[key])) {
          // val is already an array, so push on the next value.
          obj[key].push(val);
        } else if (obj[key] !== undefined) {
          // val isn't an array, but since a second value has been specified,
          // convert val into an array.
          obj[key] = [obj[key], val];
        } else {
          // val is a scalar.
          obj[key] = val;
        }
      }
    } else if (key) {
      // No value was defined, so set something meaningful.
      obj[key] = coerce ? undefined : "";
    }
  });

  return obj;
};

},{"jquery":undefined}],2:[function(require,module,exports){
module.exports = {table:
{
  "*[&&,valueLogical]" : {
     "&&": ["[&&,valueLogical]","*[&&,valueLogical]"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "*[,,expression]" : {
     ",": ["[,,expression]","*[,,expression]"], 
     ")": []}, 
  "*[,,objectPath]" : {
     ",": ["[,,objectPath]","*[,,objectPath]"], 
     ".": [], 
     ";": [], 
     "]": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "*[,,object]" : {
     ",": ["[,,object]","*[,,object]"], 
     ".": [], 
     ";": [], 
     "]": [], 
     "}": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "VALUES": []}, 
  "*[/,pathEltOrInverse]" : {
     "/": ["[/,pathEltOrInverse]","*[/,pathEltOrInverse]"], 
     "|": [], 
     ")": [], 
     "(": [], 
     "[": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": []}, 
  "*[;,?[or([verbPath,verbSimple]),objectList]]" : {
     ";": ["[;,?[or([verbPath,verbSimple]),objectList]]","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     ".": [], 
     "]": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "*[;,?[verb,objectList]]" : {
     ";": ["[;,?[verb,objectList]]","*[;,?[verb,objectList]]"], 
     ".": [], 
     "]": [], 
     "}": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "VALUES": []}, 
  "*[UNION,groupGraphPattern]" : {
     "UNION": ["[UNION,groupGraphPattern]","*[UNION,groupGraphPattern]"], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "(": [], 
     "[": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": [], 
     ".": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "*[graphPatternNotTriples,?.,?triplesBlock]" : {
     "{": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "OPTIONAL": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "MINUS": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "GRAPH": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "SERVICE": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "FILTER": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "BIND": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VALUES": ["[graphPatternNotTriples,?.,?triplesBlock]","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "}": []}, 
  "*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]" : {
     "GENERATE": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "CONSTRUCT": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "WHEREVER": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "WHERE": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ORDER": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "HAVING": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "GROUP": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "{": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ITERATOR": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ITERATE": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "SOURCE": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "LOOK UP": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "BIND": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "LIMIT": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "OFFSET": ["[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "}": []}, 
  "*[|,pathOneInPropertySet]" : {
     "|": ["[|,pathOneInPropertySet]","*[|,pathOneInPropertySet]"], 
     ")": []}, 
  "*[|,pathSequence]" : {
     "|": ["[|,pathSequence]","*[|,pathSequence]"], 
     ")": [], 
     "(": [], 
     "[": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": []}, 
  "*[||,conditionalAndExpression]" : {
     "||": ["[||,conditionalAndExpression]","*[||,conditionalAndExpression]"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "*dataBlockValue" : {
     "UNDEF": ["dataBlockValue","*dataBlockValue"], 
     "IRI_REF": ["dataBlockValue","*dataBlockValue"], 
     "TRUE": ["dataBlockValue","*dataBlockValue"], 
     "FALSE": ["dataBlockValue","*dataBlockValue"], 
     "PNAME_LN": ["dataBlockValue","*dataBlockValue"], 
     "PNAME_NS": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL1": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL2": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL_LONG1": ["dataBlockValue","*dataBlockValue"], 
     "STRING_LITERAL_LONG2": ["dataBlockValue","*dataBlockValue"], 
     "INTEGER": ["dataBlockValue","*dataBlockValue"], 
     "DECIMAL": ["dataBlockValue","*dataBlockValue"], 
     "DOUBLE": ["dataBlockValue","*dataBlockValue"], 
     "INTEGER_POSITIVE": ["dataBlockValue","*dataBlockValue"], 
     "DECIMAL_POSITIVE": ["dataBlockValue","*dataBlockValue"], 
     "DOUBLE_POSITIVE": ["dataBlockValue","*dataBlockValue"], 
     "INTEGER_NEGATIVE": ["dataBlockValue","*dataBlockValue"], 
     "DECIMAL_NEGATIVE": ["dataBlockValue","*dataBlockValue"], 
     "DOUBLE_NEGATIVE": ["dataBlockValue","*dataBlockValue"], 
     "}": [], 
     ")": []}, 
  "*datasetClause" : {
     "FROM": ["datasetClause","*datasetClause"], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "CONSTRUCT": [], 
     "$": []}, 
  "*graphNode" : {
     "(": ["graphNode","*graphNode"], 
     "[": ["graphNode","*graphNode"], 
     "VAR1": ["graphNode","*graphNode"], 
     "VAR2": ["graphNode","*graphNode"], 
     "NIL": ["graphNode","*graphNode"], 
     "START_XEXPR": ["graphNode","*graphNode"], 
     "IRI_REF": ["graphNode","*graphNode"], 
     "IRI_REF_START": ["graphNode","*graphNode"], 
     "TRUE": ["graphNode","*graphNode"], 
     "FALSE": ["graphNode","*graphNode"], 
     "BLANK_NODE_LABEL": ["graphNode","*graphNode"], 
     "ANON": ["graphNode","*graphNode"], 
     "PNAME_LN": ["graphNode","*graphNode"], 
     "PNAME_NS": ["graphNode","*graphNode"], 
     "INTEGER": ["graphNode","*graphNode"], 
     "DECIMAL": ["graphNode","*graphNode"], 
     "DOUBLE": ["graphNode","*graphNode"], 
     "INTEGER_POSITIVE": ["graphNode","*graphNode"], 
     "DECIMAL_POSITIVE": ["graphNode","*graphNode"], 
     "DOUBLE_POSITIVE": ["graphNode","*graphNode"], 
     "INTEGER_NEGATIVE": ["graphNode","*graphNode"], 
     "DECIMAL_NEGATIVE": ["graphNode","*graphNode"], 
     "DOUBLE_NEGATIVE": ["graphNode","*graphNode"], 
     "STRING_LITERAL1": ["graphNode","*graphNode"], 
     "STRING_LITERAL1_START": ["graphNode","*graphNode"], 
     "STRING_LITERAL2": ["graphNode","*graphNode"], 
     "STRING_LITERAL2_START": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG1": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG1_START": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG2": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG2_START": ["graphNode","*graphNode"], 
     ")": []}, 
  "*graphNodePath" : {
     "(": ["graphNodePath","*graphNodePath"], 
     "[": ["graphNodePath","*graphNodePath"], 
     "VAR1": ["graphNodePath","*graphNodePath"], 
     "VAR2": ["graphNodePath","*graphNodePath"], 
     "NIL": ["graphNodePath","*graphNodePath"], 
     "START_XEXPR": ["graphNodePath","*graphNodePath"], 
     "IRI_REF": ["graphNodePath","*graphNodePath"], 
     "IRI_REF_START": ["graphNodePath","*graphNodePath"], 
     "TRUE": ["graphNodePath","*graphNodePath"], 
     "FALSE": ["graphNodePath","*graphNodePath"], 
     "BLANK_NODE_LABEL": ["graphNodePath","*graphNodePath"], 
     "ANON": ["graphNodePath","*graphNodePath"], 
     "PNAME_LN": ["graphNodePath","*graphNodePath"], 
     "PNAME_NS": ["graphNodePath","*graphNodePath"], 
     "INTEGER": ["graphNodePath","*graphNodePath"], 
     "DECIMAL": ["graphNodePath","*graphNodePath"], 
     "DOUBLE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL1_START": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL2": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL2_START": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG1_START": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG2": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG2_START": ["graphNodePath","*graphNodePath"], 
     ")": []}, 
  "*groupCondition" : {
     "(": ["groupCondition","*groupCondition"], 
     "STR": ["groupCondition","*groupCondition"], 
     "LANG": ["groupCondition","*groupCondition"], 
     "LANGMATCHES": ["groupCondition","*groupCondition"], 
     "DATATYPE": ["groupCondition","*groupCondition"], 
     "BOUND": ["groupCondition","*groupCondition"], 
     "IRI": ["groupCondition","*groupCondition"], 
     "URI": ["groupCondition","*groupCondition"], 
     "BNODE": ["groupCondition","*groupCondition"], 
     "RAND": ["groupCondition","*groupCondition"], 
     "ABS": ["groupCondition","*groupCondition"], 
     "CEIL": ["groupCondition","*groupCondition"], 
     "FLOOR": ["groupCondition","*groupCondition"], 
     "ROUND": ["groupCondition","*groupCondition"], 
     "CONCAT": ["groupCondition","*groupCondition"], 
     "STRLEN": ["groupCondition","*groupCondition"], 
     "UCASE": ["groupCondition","*groupCondition"], 
     "LCASE": ["groupCondition","*groupCondition"], 
     "ENCODE_FOR_URI": ["groupCondition","*groupCondition"], 
     "CONTAINS": ["groupCondition","*groupCondition"], 
     "STRSTARTS": ["groupCondition","*groupCondition"], 
     "STRENDS": ["groupCondition","*groupCondition"], 
     "STRBEFORE": ["groupCondition","*groupCondition"], 
     "STRAFTER": ["groupCondition","*groupCondition"], 
     "YEAR": ["groupCondition","*groupCondition"], 
     "MONTH": ["groupCondition","*groupCondition"], 
     "DAY": ["groupCondition","*groupCondition"], 
     "HOURS": ["groupCondition","*groupCondition"], 
     "MINUTES": ["groupCondition","*groupCondition"], 
     "SECONDS": ["groupCondition","*groupCondition"], 
     "TIMEZONE": ["groupCondition","*groupCondition"], 
     "TZ": ["groupCondition","*groupCondition"], 
     "NOW": ["groupCondition","*groupCondition"], 
     "UUID": ["groupCondition","*groupCondition"], 
     "STRUUID": ["groupCondition","*groupCondition"], 
     "MD5": ["groupCondition","*groupCondition"], 
     "SHA1": ["groupCondition","*groupCondition"], 
     "SHA256": ["groupCondition","*groupCondition"], 
     "SHA384": ["groupCondition","*groupCondition"], 
     "SHA512": ["groupCondition","*groupCondition"], 
     "COALESCE": ["groupCondition","*groupCondition"], 
     "IF": ["groupCondition","*groupCondition"], 
     "STRLANG": ["groupCondition","*groupCondition"], 
     "STRDT": ["groupCondition","*groupCondition"], 
     "SAMETERM": ["groupCondition","*groupCondition"], 
     "ISIRI": ["groupCondition","*groupCondition"], 
     "ISURI": ["groupCondition","*groupCondition"], 
     "ISBLANK": ["groupCondition","*groupCondition"], 
     "ISLITERAL": ["groupCondition","*groupCondition"], 
     "ISNUMERIC": ["groupCondition","*groupCondition"], 
     "VAR1": ["groupCondition","*groupCondition"], 
     "VAR2": ["groupCondition","*groupCondition"], 
     "SUBSTR": ["groupCondition","*groupCondition"], 
     "REPLACE": ["groupCondition","*groupCondition"], 
     "REGEX": ["groupCondition","*groupCondition"], 
     "EXISTS": ["groupCondition","*groupCondition"], 
     "NOT": ["groupCondition","*groupCondition"], 
     "IRI_REF": ["groupCondition","*groupCondition"], 
     "PNAME_LN": ["groupCondition","*groupCondition"], 
     "PNAME_NS": ["groupCondition","*groupCondition"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "HAVING": [], 
     "$": [], 
     "}": []}, 
  "*havingCondition" : {
     "(": ["havingCondition","*havingCondition"], 
     "STR": ["havingCondition","*havingCondition"], 
     "LANG": ["havingCondition","*havingCondition"], 
     "LANGMATCHES": ["havingCondition","*havingCondition"], 
     "DATATYPE": ["havingCondition","*havingCondition"], 
     "BOUND": ["havingCondition","*havingCondition"], 
     "IRI": ["havingCondition","*havingCondition"], 
     "URI": ["havingCondition","*havingCondition"], 
     "BNODE": ["havingCondition","*havingCondition"], 
     "RAND": ["havingCondition","*havingCondition"], 
     "ABS": ["havingCondition","*havingCondition"], 
     "CEIL": ["havingCondition","*havingCondition"], 
     "FLOOR": ["havingCondition","*havingCondition"], 
     "ROUND": ["havingCondition","*havingCondition"], 
     "CONCAT": ["havingCondition","*havingCondition"], 
     "STRLEN": ["havingCondition","*havingCondition"], 
     "UCASE": ["havingCondition","*havingCondition"], 
     "LCASE": ["havingCondition","*havingCondition"], 
     "ENCODE_FOR_URI": ["havingCondition","*havingCondition"], 
     "CONTAINS": ["havingCondition","*havingCondition"], 
     "STRSTARTS": ["havingCondition","*havingCondition"], 
     "STRENDS": ["havingCondition","*havingCondition"], 
     "STRBEFORE": ["havingCondition","*havingCondition"], 
     "STRAFTER": ["havingCondition","*havingCondition"], 
     "YEAR": ["havingCondition","*havingCondition"], 
     "MONTH": ["havingCondition","*havingCondition"], 
     "DAY": ["havingCondition","*havingCondition"], 
     "HOURS": ["havingCondition","*havingCondition"], 
     "MINUTES": ["havingCondition","*havingCondition"], 
     "SECONDS": ["havingCondition","*havingCondition"], 
     "TIMEZONE": ["havingCondition","*havingCondition"], 
     "TZ": ["havingCondition","*havingCondition"], 
     "NOW": ["havingCondition","*havingCondition"], 
     "UUID": ["havingCondition","*havingCondition"], 
     "STRUUID": ["havingCondition","*havingCondition"], 
     "MD5": ["havingCondition","*havingCondition"], 
     "SHA1": ["havingCondition","*havingCondition"], 
     "SHA256": ["havingCondition","*havingCondition"], 
     "SHA384": ["havingCondition","*havingCondition"], 
     "SHA512": ["havingCondition","*havingCondition"], 
     "COALESCE": ["havingCondition","*havingCondition"], 
     "IF": ["havingCondition","*havingCondition"], 
     "STRLANG": ["havingCondition","*havingCondition"], 
     "STRDT": ["havingCondition","*havingCondition"], 
     "SAMETERM": ["havingCondition","*havingCondition"], 
     "ISIRI": ["havingCondition","*havingCondition"], 
     "ISURI": ["havingCondition","*havingCondition"], 
     "ISBLANK": ["havingCondition","*havingCondition"], 
     "ISLITERAL": ["havingCondition","*havingCondition"], 
     "ISNUMERIC": ["havingCondition","*havingCondition"], 
     "SUBSTR": ["havingCondition","*havingCondition"], 
     "REPLACE": ["havingCondition","*havingCondition"], 
     "REGEX": ["havingCondition","*havingCondition"], 
     "EXISTS": ["havingCondition","*havingCondition"], 
     "NOT": ["havingCondition","*havingCondition"], 
     "IRI_REF": ["havingCondition","*havingCondition"], 
     "PNAME_LN": ["havingCondition","*havingCondition"], 
     "PNAME_NS": ["havingCondition","*havingCondition"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "$": [], 
     "}": []}, 
  "*iteratorOrSourceClause" : {
     "ITERATOR": ["iteratorOrSourceClause","*iteratorOrSourceClause"], 
     "ITERATE": ["iteratorOrSourceClause","*iteratorOrSourceClause"], 
     "SOURCE": ["iteratorOrSourceClause","*iteratorOrSourceClause"], 
     "LOOK UP": ["iteratorOrSourceClause","*iteratorOrSourceClause"], 
     "BIND": ["iteratorOrSourceClause","*iteratorOrSourceClause"], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "{": [], 
     "CONSTRUCT": [], 
     ".": [], 
     "$": []}, 
  "*or([[ (,*dataBlockValue,)],NIL])" : {
     "(": ["or([[ (,*dataBlockValue,)],NIL])","*or([[ (,*dataBlockValue,)],NIL])"], 
     "NIL": ["or([[ (,*dataBlockValue,)],NIL])","*or([[ (,*dataBlockValue,)],NIL])"], 
     "}": []}, 
  "*or([[*,unaryExpression],[/,unaryExpression]])" : {
     "*": ["or([[*,unaryExpression],[/,unaryExpression]])","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "/": ["or([[*,unaryExpression],[/,unaryExpression]])","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])" : {
     "+": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "-": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_POSITIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_POSITIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_POSITIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_NEGATIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_NEGATIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_NEGATIVE": ["or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "*or([baseDecl,prefixDecl])" : {
     "BASE": ["or([baseDecl,prefixDecl])","*or([baseDecl,prefixDecl])"], 
     "PREFIX": ["or([baseDecl,prefixDecl])","*or([baseDecl,prefixDecl])"], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "FROM": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": []}, 
  "*or([var,[ (,expression,AS,var,)]])" : {
     "(": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR1": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR2": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "WHEREVER": [], 
     "WHERE": [], 
     "{": []}, 
  "*orderCondition" : {
     "ASC": ["orderCondition","*orderCondition"], 
     "DESC": ["orderCondition","*orderCondition"], 
     "VAR1": ["orderCondition","*orderCondition"], 
     "VAR2": ["orderCondition","*orderCondition"], 
     "(": ["orderCondition","*orderCondition"], 
     "STR": ["orderCondition","*orderCondition"], 
     "LANG": ["orderCondition","*orderCondition"], 
     "LANGMATCHES": ["orderCondition","*orderCondition"], 
     "DATATYPE": ["orderCondition","*orderCondition"], 
     "BOUND": ["orderCondition","*orderCondition"], 
     "IRI": ["orderCondition","*orderCondition"], 
     "URI": ["orderCondition","*orderCondition"], 
     "BNODE": ["orderCondition","*orderCondition"], 
     "RAND": ["orderCondition","*orderCondition"], 
     "ABS": ["orderCondition","*orderCondition"], 
     "CEIL": ["orderCondition","*orderCondition"], 
     "FLOOR": ["orderCondition","*orderCondition"], 
     "ROUND": ["orderCondition","*orderCondition"], 
     "CONCAT": ["orderCondition","*orderCondition"], 
     "STRLEN": ["orderCondition","*orderCondition"], 
     "UCASE": ["orderCondition","*orderCondition"], 
     "LCASE": ["orderCondition","*orderCondition"], 
     "ENCODE_FOR_URI": ["orderCondition","*orderCondition"], 
     "CONTAINS": ["orderCondition","*orderCondition"], 
     "STRSTARTS": ["orderCondition","*orderCondition"], 
     "STRENDS": ["orderCondition","*orderCondition"], 
     "STRBEFORE": ["orderCondition","*orderCondition"], 
     "STRAFTER": ["orderCondition","*orderCondition"], 
     "YEAR": ["orderCondition","*orderCondition"], 
     "MONTH": ["orderCondition","*orderCondition"], 
     "DAY": ["orderCondition","*orderCondition"], 
     "HOURS": ["orderCondition","*orderCondition"], 
     "MINUTES": ["orderCondition","*orderCondition"], 
     "SECONDS": ["orderCondition","*orderCondition"], 
     "TIMEZONE": ["orderCondition","*orderCondition"], 
     "TZ": ["orderCondition","*orderCondition"], 
     "NOW": ["orderCondition","*orderCondition"], 
     "UUID": ["orderCondition","*orderCondition"], 
     "STRUUID": ["orderCondition","*orderCondition"], 
     "MD5": ["orderCondition","*orderCondition"], 
     "SHA1": ["orderCondition","*orderCondition"], 
     "SHA256": ["orderCondition","*orderCondition"], 
     "SHA384": ["orderCondition","*orderCondition"], 
     "SHA512": ["orderCondition","*orderCondition"], 
     "COALESCE": ["orderCondition","*orderCondition"], 
     "IF": ["orderCondition","*orderCondition"], 
     "STRLANG": ["orderCondition","*orderCondition"], 
     "STRDT": ["orderCondition","*orderCondition"], 
     "SAMETERM": ["orderCondition","*orderCondition"], 
     "ISIRI": ["orderCondition","*orderCondition"], 
     "ISURI": ["orderCondition","*orderCondition"], 
     "ISBLANK": ["orderCondition","*orderCondition"], 
     "ISLITERAL": ["orderCondition","*orderCondition"], 
     "ISNUMERIC": ["orderCondition","*orderCondition"], 
     "SUBSTR": ["orderCondition","*orderCondition"], 
     "REPLACE": ["orderCondition","*orderCondition"], 
     "REGEX": ["orderCondition","*orderCondition"], 
     "EXISTS": ["orderCondition","*orderCondition"], 
     "NOT": ["orderCondition","*orderCondition"], 
     "IRI_REF": ["orderCondition","*orderCondition"], 
     "PNAME_LN": ["orderCondition","*orderCondition"], 
     "PNAME_NS": ["orderCondition","*orderCondition"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "$": [], 
     "}": []}, 
  "*var" : {
     "VAR1": ["var","*var"], 
     "VAR2": ["var","*var"], 
     ")": []}, 
  "+graphNode" : {
     "(": ["graphNode","*graphNode"], 
     "[": ["graphNode","*graphNode"], 
     "VAR1": ["graphNode","*graphNode"], 
     "VAR2": ["graphNode","*graphNode"], 
     "NIL": ["graphNode","*graphNode"], 
     "START_XEXPR": ["graphNode","*graphNode"], 
     "IRI_REF": ["graphNode","*graphNode"], 
     "IRI_REF_START": ["graphNode","*graphNode"], 
     "TRUE": ["graphNode","*graphNode"], 
     "FALSE": ["graphNode","*graphNode"], 
     "BLANK_NODE_LABEL": ["graphNode","*graphNode"], 
     "ANON": ["graphNode","*graphNode"], 
     "PNAME_LN": ["graphNode","*graphNode"], 
     "PNAME_NS": ["graphNode","*graphNode"], 
     "INTEGER": ["graphNode","*graphNode"], 
     "DECIMAL": ["graphNode","*graphNode"], 
     "DOUBLE": ["graphNode","*graphNode"], 
     "INTEGER_POSITIVE": ["graphNode","*graphNode"], 
     "DECIMAL_POSITIVE": ["graphNode","*graphNode"], 
     "DOUBLE_POSITIVE": ["graphNode","*graphNode"], 
     "INTEGER_NEGATIVE": ["graphNode","*graphNode"], 
     "DECIMAL_NEGATIVE": ["graphNode","*graphNode"], 
     "DOUBLE_NEGATIVE": ["graphNode","*graphNode"], 
     "STRING_LITERAL1": ["graphNode","*graphNode"], 
     "STRING_LITERAL1_START": ["graphNode","*graphNode"], 
     "STRING_LITERAL2": ["graphNode","*graphNode"], 
     "STRING_LITERAL2_START": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG1": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG1_START": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG2": ["graphNode","*graphNode"], 
     "STRING_LITERAL_LONG2_START": ["graphNode","*graphNode"]}, 
  "+graphNodePath" : {
     "(": ["graphNodePath","*graphNodePath"], 
     "[": ["graphNodePath","*graphNodePath"], 
     "VAR1": ["graphNodePath","*graphNodePath"], 
     "VAR2": ["graphNodePath","*graphNodePath"], 
     "NIL": ["graphNodePath","*graphNodePath"], 
     "START_XEXPR": ["graphNodePath","*graphNodePath"], 
     "IRI_REF": ["graphNodePath","*graphNodePath"], 
     "IRI_REF_START": ["graphNodePath","*graphNodePath"], 
     "TRUE": ["graphNodePath","*graphNodePath"], 
     "FALSE": ["graphNodePath","*graphNodePath"], 
     "BLANK_NODE_LABEL": ["graphNodePath","*graphNodePath"], 
     "ANON": ["graphNodePath","*graphNodePath"], 
     "PNAME_LN": ["graphNodePath","*graphNodePath"], 
     "PNAME_NS": ["graphNodePath","*graphNodePath"], 
     "INTEGER": ["graphNodePath","*graphNodePath"], 
     "DECIMAL": ["graphNodePath","*graphNodePath"], 
     "DOUBLE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_POSITIVE": ["graphNodePath","*graphNodePath"], 
     "INTEGER_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DECIMAL_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "DOUBLE_NEGATIVE": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL1_START": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL2": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL2_START": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG1": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG1_START": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG2": ["graphNodePath","*graphNodePath"], 
     "STRING_LITERAL_LONG2_START": ["graphNodePath","*graphNodePath"]}, 
  "+groupCondition" : {
     "(": ["groupCondition","*groupCondition"], 
     "STR": ["groupCondition","*groupCondition"], 
     "LANG": ["groupCondition","*groupCondition"], 
     "LANGMATCHES": ["groupCondition","*groupCondition"], 
     "DATATYPE": ["groupCondition","*groupCondition"], 
     "BOUND": ["groupCondition","*groupCondition"], 
     "IRI": ["groupCondition","*groupCondition"], 
     "URI": ["groupCondition","*groupCondition"], 
     "BNODE": ["groupCondition","*groupCondition"], 
     "RAND": ["groupCondition","*groupCondition"], 
     "ABS": ["groupCondition","*groupCondition"], 
     "CEIL": ["groupCondition","*groupCondition"], 
     "FLOOR": ["groupCondition","*groupCondition"], 
     "ROUND": ["groupCondition","*groupCondition"], 
     "CONCAT": ["groupCondition","*groupCondition"], 
     "STRLEN": ["groupCondition","*groupCondition"], 
     "UCASE": ["groupCondition","*groupCondition"], 
     "LCASE": ["groupCondition","*groupCondition"], 
     "ENCODE_FOR_URI": ["groupCondition","*groupCondition"], 
     "CONTAINS": ["groupCondition","*groupCondition"], 
     "STRSTARTS": ["groupCondition","*groupCondition"], 
     "STRENDS": ["groupCondition","*groupCondition"], 
     "STRBEFORE": ["groupCondition","*groupCondition"], 
     "STRAFTER": ["groupCondition","*groupCondition"], 
     "YEAR": ["groupCondition","*groupCondition"], 
     "MONTH": ["groupCondition","*groupCondition"], 
     "DAY": ["groupCondition","*groupCondition"], 
     "HOURS": ["groupCondition","*groupCondition"], 
     "MINUTES": ["groupCondition","*groupCondition"], 
     "SECONDS": ["groupCondition","*groupCondition"], 
     "TIMEZONE": ["groupCondition","*groupCondition"], 
     "TZ": ["groupCondition","*groupCondition"], 
     "NOW": ["groupCondition","*groupCondition"], 
     "UUID": ["groupCondition","*groupCondition"], 
     "STRUUID": ["groupCondition","*groupCondition"], 
     "MD5": ["groupCondition","*groupCondition"], 
     "SHA1": ["groupCondition","*groupCondition"], 
     "SHA256": ["groupCondition","*groupCondition"], 
     "SHA384": ["groupCondition","*groupCondition"], 
     "SHA512": ["groupCondition","*groupCondition"], 
     "COALESCE": ["groupCondition","*groupCondition"], 
     "IF": ["groupCondition","*groupCondition"], 
     "STRLANG": ["groupCondition","*groupCondition"], 
     "STRDT": ["groupCondition","*groupCondition"], 
     "SAMETERM": ["groupCondition","*groupCondition"], 
     "ISIRI": ["groupCondition","*groupCondition"], 
     "ISURI": ["groupCondition","*groupCondition"], 
     "ISBLANK": ["groupCondition","*groupCondition"], 
     "ISLITERAL": ["groupCondition","*groupCondition"], 
     "ISNUMERIC": ["groupCondition","*groupCondition"], 
     "VAR1": ["groupCondition","*groupCondition"], 
     "VAR2": ["groupCondition","*groupCondition"], 
     "SUBSTR": ["groupCondition","*groupCondition"], 
     "REPLACE": ["groupCondition","*groupCondition"], 
     "REGEX": ["groupCondition","*groupCondition"], 
     "EXISTS": ["groupCondition","*groupCondition"], 
     "NOT": ["groupCondition","*groupCondition"], 
     "IRI_REF": ["groupCondition","*groupCondition"], 
     "PNAME_LN": ["groupCondition","*groupCondition"], 
     "PNAME_NS": ["groupCondition","*groupCondition"]}, 
  "+havingCondition" : {
     "(": ["havingCondition","*havingCondition"], 
     "STR": ["havingCondition","*havingCondition"], 
     "LANG": ["havingCondition","*havingCondition"], 
     "LANGMATCHES": ["havingCondition","*havingCondition"], 
     "DATATYPE": ["havingCondition","*havingCondition"], 
     "BOUND": ["havingCondition","*havingCondition"], 
     "IRI": ["havingCondition","*havingCondition"], 
     "URI": ["havingCondition","*havingCondition"], 
     "BNODE": ["havingCondition","*havingCondition"], 
     "RAND": ["havingCondition","*havingCondition"], 
     "ABS": ["havingCondition","*havingCondition"], 
     "CEIL": ["havingCondition","*havingCondition"], 
     "FLOOR": ["havingCondition","*havingCondition"], 
     "ROUND": ["havingCondition","*havingCondition"], 
     "CONCAT": ["havingCondition","*havingCondition"], 
     "STRLEN": ["havingCondition","*havingCondition"], 
     "UCASE": ["havingCondition","*havingCondition"], 
     "LCASE": ["havingCondition","*havingCondition"], 
     "ENCODE_FOR_URI": ["havingCondition","*havingCondition"], 
     "CONTAINS": ["havingCondition","*havingCondition"], 
     "STRSTARTS": ["havingCondition","*havingCondition"], 
     "STRENDS": ["havingCondition","*havingCondition"], 
     "STRBEFORE": ["havingCondition","*havingCondition"], 
     "STRAFTER": ["havingCondition","*havingCondition"], 
     "YEAR": ["havingCondition","*havingCondition"], 
     "MONTH": ["havingCondition","*havingCondition"], 
     "DAY": ["havingCondition","*havingCondition"], 
     "HOURS": ["havingCondition","*havingCondition"], 
     "MINUTES": ["havingCondition","*havingCondition"], 
     "SECONDS": ["havingCondition","*havingCondition"], 
     "TIMEZONE": ["havingCondition","*havingCondition"], 
     "TZ": ["havingCondition","*havingCondition"], 
     "NOW": ["havingCondition","*havingCondition"], 
     "UUID": ["havingCondition","*havingCondition"], 
     "STRUUID": ["havingCondition","*havingCondition"], 
     "MD5": ["havingCondition","*havingCondition"], 
     "SHA1": ["havingCondition","*havingCondition"], 
     "SHA256": ["havingCondition","*havingCondition"], 
     "SHA384": ["havingCondition","*havingCondition"], 
     "SHA512": ["havingCondition","*havingCondition"], 
     "COALESCE": ["havingCondition","*havingCondition"], 
     "IF": ["havingCondition","*havingCondition"], 
     "STRLANG": ["havingCondition","*havingCondition"], 
     "STRDT": ["havingCondition","*havingCondition"], 
     "SAMETERM": ["havingCondition","*havingCondition"], 
     "ISIRI": ["havingCondition","*havingCondition"], 
     "ISURI": ["havingCondition","*havingCondition"], 
     "ISBLANK": ["havingCondition","*havingCondition"], 
     "ISLITERAL": ["havingCondition","*havingCondition"], 
     "ISNUMERIC": ["havingCondition","*havingCondition"], 
     "SUBSTR": ["havingCondition","*havingCondition"], 
     "REPLACE": ["havingCondition","*havingCondition"], 
     "REGEX": ["havingCondition","*havingCondition"], 
     "EXISTS": ["havingCondition","*havingCondition"], 
     "NOT": ["havingCondition","*havingCondition"], 
     "IRI_REF": ["havingCondition","*havingCondition"], 
     "PNAME_LN": ["havingCondition","*havingCondition"], 
     "PNAME_NS": ["havingCondition","*havingCondition"]}, 
  "+or([var,[ (,expression,AS,var,)]])" : {
     "(": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR1": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"], 
     "VAR2": ["or([var,[ (,expression,AS,var,)]])","*or([var,[ (,expression,AS,var,)]])"]}, 
  "+orderCondition" : {
     "ASC": ["orderCondition","*orderCondition"], 
     "DESC": ["orderCondition","*orderCondition"], 
     "VAR1": ["orderCondition","*orderCondition"], 
     "VAR2": ["orderCondition","*orderCondition"], 
     "(": ["orderCondition","*orderCondition"], 
     "STR": ["orderCondition","*orderCondition"], 
     "LANG": ["orderCondition","*orderCondition"], 
     "LANGMATCHES": ["orderCondition","*orderCondition"], 
     "DATATYPE": ["orderCondition","*orderCondition"], 
     "BOUND": ["orderCondition","*orderCondition"], 
     "IRI": ["orderCondition","*orderCondition"], 
     "URI": ["orderCondition","*orderCondition"], 
     "BNODE": ["orderCondition","*orderCondition"], 
     "RAND": ["orderCondition","*orderCondition"], 
     "ABS": ["orderCondition","*orderCondition"], 
     "CEIL": ["orderCondition","*orderCondition"], 
     "FLOOR": ["orderCondition","*orderCondition"], 
     "ROUND": ["orderCondition","*orderCondition"], 
     "CONCAT": ["orderCondition","*orderCondition"], 
     "STRLEN": ["orderCondition","*orderCondition"], 
     "UCASE": ["orderCondition","*orderCondition"], 
     "LCASE": ["orderCondition","*orderCondition"], 
     "ENCODE_FOR_URI": ["orderCondition","*orderCondition"], 
     "CONTAINS": ["orderCondition","*orderCondition"], 
     "STRSTARTS": ["orderCondition","*orderCondition"], 
     "STRENDS": ["orderCondition","*orderCondition"], 
     "STRBEFORE": ["orderCondition","*orderCondition"], 
     "STRAFTER": ["orderCondition","*orderCondition"], 
     "YEAR": ["orderCondition","*orderCondition"], 
     "MONTH": ["orderCondition","*orderCondition"], 
     "DAY": ["orderCondition","*orderCondition"], 
     "HOURS": ["orderCondition","*orderCondition"], 
     "MINUTES": ["orderCondition","*orderCondition"], 
     "SECONDS": ["orderCondition","*orderCondition"], 
     "TIMEZONE": ["orderCondition","*orderCondition"], 
     "TZ": ["orderCondition","*orderCondition"], 
     "NOW": ["orderCondition","*orderCondition"], 
     "UUID": ["orderCondition","*orderCondition"], 
     "STRUUID": ["orderCondition","*orderCondition"], 
     "MD5": ["orderCondition","*orderCondition"], 
     "SHA1": ["orderCondition","*orderCondition"], 
     "SHA256": ["orderCondition","*orderCondition"], 
     "SHA384": ["orderCondition","*orderCondition"], 
     "SHA512": ["orderCondition","*orderCondition"], 
     "COALESCE": ["orderCondition","*orderCondition"], 
     "IF": ["orderCondition","*orderCondition"], 
     "STRLANG": ["orderCondition","*orderCondition"], 
     "STRDT": ["orderCondition","*orderCondition"], 
     "SAMETERM": ["orderCondition","*orderCondition"], 
     "ISIRI": ["orderCondition","*orderCondition"], 
     "ISURI": ["orderCondition","*orderCondition"], 
     "ISBLANK": ["orderCondition","*orderCondition"], 
     "ISLITERAL": ["orderCondition","*orderCondition"], 
     "ISNUMERIC": ["orderCondition","*orderCondition"], 
     "SUBSTR": ["orderCondition","*orderCondition"], 
     "REPLACE": ["orderCondition","*orderCondition"], 
     "REGEX": ["orderCondition","*orderCondition"], 
     "EXISTS": ["orderCondition","*orderCondition"], 
     "NOT": ["orderCondition","*orderCondition"], 
     "IRI_REF": ["orderCondition","*orderCondition"], 
     "PNAME_LN": ["orderCondition","*orderCondition"], 
     "PNAME_NS": ["orderCondition","*orderCondition"]}, 
  "?." : {
     ".": ["."], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "(": [], 
     "[": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?DISTINCT" : {
     "DISTINCT": ["DISTINCT"], 
     "!": [], 
     "+": [], 
     "-": [], 
     "VAR1": [], 
     "VAR2": [], 
     "(": [], 
     "STR": [], 
     "LANG": [], 
     "LANGMATCHES": [], 
     "DATATYPE": [], 
     "BOUND": [], 
     "IRI": [], 
     "URI": [], 
     "BNODE": [], 
     "RAND": [], 
     "ABS": [], 
     "CEIL": [], 
     "FLOOR": [], 
     "ROUND": [], 
     "CONCAT": [], 
     "STRLEN": [], 
     "UCASE": [], 
     "LCASE": [], 
     "ENCODE_FOR_URI": [], 
     "CONTAINS": [], 
     "STRSTARTS": [], 
     "STRENDS": [], 
     "STRBEFORE": [], 
     "STRAFTER": [], 
     "YEAR": [], 
     "MONTH": [], 
     "DAY": [], 
     "HOURS": [], 
     "MINUTES": [], 
     "SECONDS": [], 
     "TIMEZONE": [], 
     "TZ": [], 
     "NOW": [], 
     "UUID": [], 
     "STRUUID": [], 
     "MD5": [], 
     "SHA1": [], 
     "SHA256": [], 
     "SHA384": [], 
     "SHA512": [], 
     "COALESCE": [], 
     "IF": [], 
     "STRLANG": [], 
     "STRDT": [], 
     "SAMETERM": [], 
     "ISIRI": [], 
     "ISURI": [], 
     "ISBLANK": [], 
     "ISLITERAL": [], 
     "ISNUMERIC": [], 
     "TRUE": [], 
     "FALSE": [], 
     "COUNT": [], 
     "SUM": [], 
     "MIN": [], 
     "MAX": [], 
     "AVG": [], 
     "SAMPLE": [], 
     "GROUP_CONCAT": [], 
     "SUBSTR": [], 
     "REPLACE": [], 
     "REGEX": [], 
     "EXISTS": [], 
     "NOT": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": [], 
     "*": []}, 
  "?SILENT" : {
     "SILENT": ["SILENT"], 
     "VAR1": [], 
     "VAR2": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "START_XEXPR": [], 
     "PNAME_LN": [], 
     "PNAME_NS": []}, 
  "?[,,expression]" : {
     ",": ["[,,expression]"], 
     ")": []}, 
  "?[.,?constructTriples]" : {
     ".": ["[.,?constructTriples]"], 
     "}": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": []}, 
  "?[.,?triplesBlock]" : {
     ".": ["[.,?triplesBlock]"], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?[;,SEPARATOR,=,string]" : {
     ";": ["[;,SEPARATOR,=,string]"], 
     ")": []}, 
  "?[ACCEPT,varOrXIri]" : {
     "ACCEPT": ["[ACCEPT,varOrXIri]"], 
     "AS": []}, 
  "?[AS,var]" : {
     "AS": ["[AS,var]"], 
     ")": []}, 
  "?[or([verbPath,verbSimple]),objectList]" : {
     "VAR1": ["[or([verbPath,verbSimple]),objectList]"], 
     "VAR2": ["[or([verbPath,verbSimple]),objectList]"], 
     "START_XEXPR": ["[or([verbPath,verbSimple]),objectList]"], 
     "^": ["[or([verbPath,verbSimple]),objectList]"], 
     "a": ["[or([verbPath,verbSimple]),objectList]"], 
     "!": ["[or([verbPath,verbSimple]),objectList]"], 
     "(": ["[or([verbPath,verbSimple]),objectList]"], 
     "IRI_REF": ["[or([verbPath,verbSimple]),objectList]"], 
     "IRI_REF_START": ["[or([verbPath,verbSimple]),objectList]"], 
     "PNAME_LN": ["[or([verbPath,verbSimple]),objectList]"], 
     "PNAME_NS": ["[or([verbPath,verbSimple]),objectList]"], 
     ";": [], 
     ".": [], 
     "]": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?[pathOneInPropertySet,*[|,pathOneInPropertySet]]" : {
     "a": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "^": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "IRI_REF": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "IRI_REF_START": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "PNAME_LN": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     "PNAME_NS": ["[pathOneInPropertySet,*[|,pathOneInPropertySet]]"], 
     ")": []}, 
  "?[verb,objectList]" : {
     "a": ["[verb,objectList]"], 
     "VAR1": ["[verb,objectList]"], 
     "VAR2": ["[verb,objectList]"], 
     "NIL": ["[verb,objectList]"], 
     "START_XEXPR": ["[verb,objectList]"], 
     "IRI_REF": ["[verb,objectList]"], 
     "IRI_REF_START": ["[verb,objectList]"], 
     "TRUE": ["[verb,objectList]"], 
     "FALSE": ["[verb,objectList]"], 
     "BLANK_NODE_LABEL": ["[verb,objectList]"], 
     "ANON": ["[verb,objectList]"], 
     "PNAME_LN": ["[verb,objectList]"], 
     "PNAME_NS": ["[verb,objectList]"], 
     "INTEGER": ["[verb,objectList]"], 
     "DECIMAL": ["[verb,objectList]"], 
     "DOUBLE": ["[verb,objectList]"], 
     "INTEGER_POSITIVE": ["[verb,objectList]"], 
     "DECIMAL_POSITIVE": ["[verb,objectList]"], 
     "DOUBLE_POSITIVE": ["[verb,objectList]"], 
     "INTEGER_NEGATIVE": ["[verb,objectList]"], 
     "DECIMAL_NEGATIVE": ["[verb,objectList]"], 
     "DOUBLE_NEGATIVE": ["[verb,objectList]"], 
     "STRING_LITERAL1": ["[verb,objectList]"], 
     "STRING_LITERAL1_START": ["[verb,objectList]"], 
     "STRING_LITERAL2": ["[verb,objectList]"], 
     "STRING_LITERAL2_START": ["[verb,objectList]"], 
     "STRING_LITERAL_LONG1": ["[verb,objectList]"], 
     "STRING_LITERAL_LONG1_START": ["[verb,objectList]"], 
     "STRING_LITERAL_LONG2": ["[verb,objectList]"], 
     "STRING_LITERAL_LONG2_START": ["[verb,objectList]"], 
     ";": [], 
     ".": [], 
     "]": [], 
     "}": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "VALUES": []}, 
  "?argList" : {
     "NIL": ["argList"], 
     "(": ["argList"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "*": [], 
     "/": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "?constructTriples" : {
     "VAR1": ["constructTriples"], 
     "VAR2": ["constructTriples"], 
     "NIL": ["constructTriples"], 
     "(": ["constructTriples"], 
     "[": ["constructTriples"], 
     "START_XEXPR": ["constructTriples"], 
     "IRI_REF": ["constructTriples"], 
     "IRI_REF_START": ["constructTriples"], 
     "TRUE": ["constructTriples"], 
     "FALSE": ["constructTriples"], 
     "BLANK_NODE_LABEL": ["constructTriples"], 
     "ANON": ["constructTriples"], 
     "PNAME_LN": ["constructTriples"], 
     "PNAME_NS": ["constructTriples"], 
     "INTEGER": ["constructTriples"], 
     "DECIMAL": ["constructTriples"], 
     "DOUBLE": ["constructTriples"], 
     "INTEGER_POSITIVE": ["constructTriples"], 
     "DECIMAL_POSITIVE": ["constructTriples"], 
     "DOUBLE_POSITIVE": ["constructTriples"], 
     "INTEGER_NEGATIVE": ["constructTriples"], 
     "DECIMAL_NEGATIVE": ["constructTriples"], 
     "DOUBLE_NEGATIVE": ["constructTriples"], 
     "STRING_LITERAL1": ["constructTriples"], 
     "STRING_LITERAL1_START": ["constructTriples"], 
     "STRING_LITERAL2": ["constructTriples"], 
     "STRING_LITERAL2_START": ["constructTriples"], 
     "STRING_LITERAL_LONG1": ["constructTriples"], 
     "STRING_LITERAL_LONG1_START": ["constructTriples"], 
     "STRING_LITERAL_LONG2": ["constructTriples"], 
     "STRING_LITERAL_LONG2_START": ["constructTriples"], 
     "}": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": []}, 
  "?groupClause" : {
     "GROUP": ["groupClause"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "HAVING": [], 
     "$": [], 
     "}": []}, 
  "?havingClause" : {
     "HAVING": ["havingClause"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "ORDER": [], 
     "$": [], 
     "}": []}, 
  "?limitClause" : {
     "LIMIT": ["limitClause"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "$": [], 
     "}": []}, 
  "?limitOffsetClauses" : {
     "LIMIT": ["limitOffsetClauses"], 
     "OFFSET": ["limitOffsetClauses"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "$": [], 
     "}": []}, 
  "?offsetClause" : {
     "OFFSET": ["offsetClause"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "$": [], 
     "}": []}, 
  "?or([DISTINCT,REDUCED])" : {
     "DISTINCT": ["or([DISTINCT,REDUCED])"], 
     "REDUCED": ["or([DISTINCT,REDUCED])"], 
     "*": [], 
     "(": [], 
     "VAR1": [], 
     "VAR2": []}, 
  "?or([LANGTAG,[^^,iriRef]])" : {
     "LANGTAG": ["or([LANGTAG,[^^,iriRef]])"], 
     "^^": ["or([LANGTAG,[^^,iriRef]])"], 
     "UNDEF": [], 
     "IRI_REF": [], 
     "TRUE": [], 
     "FALSE": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG2": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "}": [], 
     ")": []}, 
  "?or([LANGTAG,[^^,xiri]])" : {
     "LANGTAG": ["or([LANGTAG,[^^,xiri]])"], 
     "^^": ["or([LANGTAG,[^^,xiri]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "*": [], 
     "/": [], 
     "a": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": [], 
     "(": [], 
     "[": [], 
     "^": [], 
     "!": [], 
     ".": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": [], 
     "]": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "VALUES": []}, 
  "?or([WHEREVER,WHERE])" : {
     "WHEREVER": ["or([WHEREVER,WHERE])"], 
     "WHERE": ["or([WHEREVER,WHERE])"], 
     "{": []}, 
  "?or([[*,unaryExpression],[/,unaryExpression]])" : {
     "*": ["or([[*,unaryExpression],[/,unaryExpression]])"], 
     "/": ["or([[*,unaryExpression],[/,unaryExpression]])"], 
     "+": [], 
     "-": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     "&&": [], 
     "=": [], 
     "!=": [], 
     "<": [], 
     ">": [], 
     "<=": [], 
     ">=": [], 
     "IN": [], 
     "NOT": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])" : {
     "=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "!=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "<": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     ">": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "<=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     ">=": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IN": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "NOT": ["or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "AS": [], 
     ")": [], 
     ",": [], 
     "}": [], 
     "||": [], 
     "&&": [], 
     ";": [], 
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": [], 
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": [], 
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": [], 
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": [], 
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "?orderClause" : {
     "ORDER": ["orderClause"], 
     "CONSTRUCT": [], 
     ".": [], 
     "VALUES": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "$": [], 
     "}": []}, 
  "?pathMod" : {
     "*": ["pathMod"], 
     "?": ["pathMod"], 
     "+": ["pathMod"], 
     "{": ["pathMod"], 
     "|": [], 
     "/": [], 
     ")": [], 
     "(": [], 
     "[": [], 
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": []}, 
  "?triplesBlock" : {
     "VAR1": ["triplesBlock"], 
     "VAR2": ["triplesBlock"], 
     "NIL": ["triplesBlock"], 
     "(": ["triplesBlock"], 
     "[": ["triplesBlock"], 
     "START_XEXPR": ["triplesBlock"], 
     "IRI_REF": ["triplesBlock"], 
     "IRI_REF_START": ["triplesBlock"], 
     "TRUE": ["triplesBlock"], 
     "FALSE": ["triplesBlock"], 
     "BLANK_NODE_LABEL": ["triplesBlock"], 
     "ANON": ["triplesBlock"], 
     "PNAME_LN": ["triplesBlock"], 
     "PNAME_NS": ["triplesBlock"], 
     "INTEGER": ["triplesBlock"], 
     "DECIMAL": ["triplesBlock"], 
     "DOUBLE": ["triplesBlock"], 
     "INTEGER_POSITIVE": ["triplesBlock"], 
     "DECIMAL_POSITIVE": ["triplesBlock"], 
     "DOUBLE_POSITIVE": ["triplesBlock"], 
     "INTEGER_NEGATIVE": ["triplesBlock"], 
     "DECIMAL_NEGATIVE": ["triplesBlock"], 
     "DOUBLE_NEGATIVE": ["triplesBlock"], 
     "STRING_LITERAL1": ["triplesBlock"], 
     "STRING_LITERAL1_START": ["triplesBlock"], 
     "STRING_LITERAL2": ["triplesBlock"], 
     "STRING_LITERAL2_START": ["triplesBlock"], 
     "STRING_LITERAL_LONG1": ["triplesBlock"], 
     "STRING_LITERAL_LONG1_START": ["triplesBlock"], 
     "STRING_LITERAL_LONG2": ["triplesBlock"], 
     "STRING_LITERAL_LONG2_START": ["triplesBlock"], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "?whereClause" : {
     "WHEREVER": ["whereClause"], 
     "WHERE": ["whereClause"], 
     "{": ["whereClause"], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "LIMIT": [], 
     "OFFSET": [], 
     "CONSTRUCT": [], 
     ".": [], 
     "$": []}, 
  "[ (,*dataBlockValue,)]" : {
     "(": ["(","*dataBlockValue",")"]}, 
  "[ (,*var,)]" : {
     "(": ["(","*var",")"]}, 
  "[ (,expression,)]" : {
     "(": ["(","expression",")"]}, 
  "[ (,expression,AS,var,)]" : {
     "(": ["(","expression","AS","var",")"]}, 
  "[!=,numericExpression]" : {
     "!=": ["!=","numericExpression"]}, 
  "[&&,valueLogical]" : {
     "&&": ["&&","valueLogical"]}, 
  "[*,unaryExpression]" : {
     "*": ["*","unaryExpression"]}, 
  "[+,multiplicativeExpression]" : {
     "+": ["+","multiplicativeExpression"]}, 
  "[,,expression]" : {
     ",": [",","expression"]}, 
  "[,,integer,}]" : {
     ",": [",","integer","}"]}, 
  "[,,objectPath]" : {
     ",": [",","objectPath"]}, 
  "[,,object]" : {
     ",": [",","object"]}, 
  "[,,or([},[integer,}]])]" : {
     ",": [",","or([},[integer,}]])"]}, 
  "[-,multiplicativeExpression]" : {
     "-": ["-","multiplicativeExpression"]}, 
  "[.,?constructTriples]" : {
     ".": [".","?constructTriples"]}, 
  "[.,?triplesBlock]" : {
     ".": [".","?triplesBlock"]}, 
  "[/,pathEltOrInverse]" : {
     "/": ["/","pathEltOrInverse"]}, 
  "[/,unaryExpression]" : {
     "/": ["/","unaryExpression"]}, 
  "[;,?[or([verbPath,verbSimple]),objectList]]" : {
     ";": [";","?[or([verbPath,verbSimple]),objectList]"]}, 
  "[;,?[verb,objectList]]" : {
     ";": [";","?[verb,objectList]"]}, 
  "[;,SEPARATOR,=,string]" : {
     ";": [";","SEPARATOR","=","string"]}, 
  "[<,numericExpression]" : {
     "<": ["<","numericExpression"]}, 
  "[<=,numericExpression]" : {
     "<=": ["<=","numericExpression"]}, 
  "[=,numericExpression]" : {
     "=": ["=","numericExpression"]}, 
  "[>,numericExpression]" : {
     ">": [">","numericExpression"]}, 
  "[>=,numericExpression]" : {
     ">=": [">=","numericExpression"]}, 
  "[ACCEPT,varOrXIri]" : {
     "ACCEPT": ["ACCEPT","varOrXIri"]}, 
  "[AS,var]" : {
     "AS": ["AS","var"]}, 
  "[IN,expressionList]" : {
     "IN": ["IN","expressionList"]}, 
  "[IRI_REF_START,xiri_Sub]" : {
     "IRI_REF_START": ["IRI_REF_START","xiri_Sub"]}, 
  "[IRI_REF_SUB,xiri_Sub]" : {
     "IRI_REF_SUB": ["IRI_REF_SUB","xiri_Sub"]}, 
  "[NOT,IN,expressionList]" : {
     "NOT": ["NOT","IN","expressionList"]}, 
  "[STRING_LITERAL1_START,xString_Literal1_Sub]" : {
     "STRING_LITERAL1_START": ["STRING_LITERAL1_START","xString_Literal1_Sub"]}, 
  "[STRING_LITERAL1_SUB,xString_Literal1_Sub]" : {
     "STRING_LITERAL1_SUB": ["STRING_LITERAL1_SUB","xString_Literal1_Sub"]}, 
  "[STRING_LITERAL2_START,xString_Literal2_Sub]" : {
     "STRING_LITERAL2_START": ["STRING_LITERAL2_START","xString_Literal2_Sub"]}, 
  "[STRING_LITERAL2_SUB,xString_Literal2_Sub]" : {
     "STRING_LITERAL2_SUB": ["STRING_LITERAL2_SUB","xString_Literal2_Sub"]}, 
  "[STRING_LITERAL_LONG1_START,xString_Literal_Long1_Sub]" : {
     "STRING_LITERAL_LONG1_START": ["STRING_LITERAL_LONG1_START","xString_Literal_Long1_Sub"]}, 
  "[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub]" : {
     "STRING_LITERAL_LONG1_SUB": ["STRING_LITERAL_LONG1_SUB","xString_Literal_Long1_Sub"]}, 
  "[STRING_LITERAL_LONG2_START,xString_Literal_Long2_Sub]" : {
     "STRING_LITERAL_LONG2_START": ["STRING_LITERAL_LONG2_START","xString_Literal_Long2_Sub"]}, 
  "[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub]" : {
     "STRING_LITERAL_LONG2_SUB": ["STRING_LITERAL_LONG2_SUB","xString_Literal_Long2_Sub"]}, 
  "[UNION,groupGraphPattern]" : {
     "UNION": ["UNION","groupGraphPattern"]}, 
  "[^^,iriRef]" : {
     "^^": ["^^","iriRef"]}, 
  "[^^,xiri]" : {
     "^^": ["^^","xiri"]}, 
  "[graphPatternNotTriples,?.,?triplesBlock]" : {
     "{": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "OPTIONAL": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "MINUS": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "GRAPH": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "SERVICE": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "FILTER": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "BIND": ["graphPatternNotTriples","?.","?triplesBlock"], 
     "VALUES": ["graphPatternNotTriples","?.","?triplesBlock"]}, 
  "[integer,or([[,,or([},[integer,}]])],}])]" : {
     "INTEGER": ["integer","or([[,,or([},[integer,}]])],}])"]}, 
  "[integer,}]" : {
     "INTEGER": ["integer","}"]}, 
  "[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]" : {
     "INTEGER_POSITIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_POSITIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_POSITIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER_NEGATIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_NEGATIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_NEGATIVE": ["or([numericLiteralPositive,numericLiteralNegative])","?or([[*,unaryExpression],[/,unaryExpression]])"]}, 
  "[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]" : {
     "GENERATE": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "CONSTRUCT": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "WHEREVER": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "WHERE": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "ORDER": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "HAVING": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "GROUP": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "{": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "ITERATOR": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "ITERATE": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "SOURCE": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "LOOK UP": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "BIND": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "LIMIT": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"], 
     "OFFSET": ["or([subGenerateQuery1,subGenerateQuery2])","?constructTriples"]}, 
  "[or([verbPath,verbSimple]),objectList]" : {
     "VAR1": ["or([verbPath,verbSimple])","objectList"], 
     "VAR2": ["or([verbPath,verbSimple])","objectList"], 
     "START_XEXPR": ["or([verbPath,verbSimple])","objectList"], 
     "^": ["or([verbPath,verbSimple])","objectList"], 
     "a": ["or([verbPath,verbSimple])","objectList"], 
     "!": ["or([verbPath,verbSimple])","objectList"], 
     "(": ["or([verbPath,verbSimple])","objectList"], 
     "IRI_REF": ["or([verbPath,verbSimple])","objectList"], 
     "IRI_REF_START": ["or([verbPath,verbSimple])","objectList"], 
     "PNAME_LN": ["or([verbPath,verbSimple])","objectList"], 
     "PNAME_NS": ["or([verbPath,verbSimple])","objectList"]}, 
  "[pathOneInPropertySet,*[|,pathOneInPropertySet]]" : {
     "a": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "^": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "IRI_REF": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "IRI_REF_START": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "PNAME_LN": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"], 
     "PNAME_NS": ["pathOneInPropertySet","*[|,pathOneInPropertySet]"]}, 
  "[verb,objectList]" : {
     "a": ["verb","objectList"], 
     "VAR1": ["verb","objectList"], 
     "VAR2": ["verb","objectList"], 
     "NIL": ["verb","objectList"], 
     "START_XEXPR": ["verb","objectList"], 
     "IRI_REF": ["verb","objectList"], 
     "IRI_REF_START": ["verb","objectList"], 
     "TRUE": ["verb","objectList"], 
     "FALSE": ["verb","objectList"], 
     "BLANK_NODE_LABEL": ["verb","objectList"], 
     "ANON": ["verb","objectList"], 
     "PNAME_LN": ["verb","objectList"], 
     "PNAME_NS": ["verb","objectList"], 
     "INTEGER": ["verb","objectList"], 
     "DECIMAL": ["verb","objectList"], 
     "DOUBLE": ["verb","objectList"], 
     "INTEGER_POSITIVE": ["verb","objectList"], 
     "DECIMAL_POSITIVE": ["verb","objectList"], 
     "DOUBLE_POSITIVE": ["verb","objectList"], 
     "INTEGER_NEGATIVE": ["verb","objectList"], 
     "DECIMAL_NEGATIVE": ["verb","objectList"], 
     "DOUBLE_NEGATIVE": ["verb","objectList"], 
     "STRING_LITERAL1": ["verb","objectList"], 
     "STRING_LITERAL1_START": ["verb","objectList"], 
     "STRING_LITERAL2": ["verb","objectList"], 
     "STRING_LITERAL2_START": ["verb","objectList"], 
     "STRING_LITERAL_LONG1": ["verb","objectList"], 
     "STRING_LITERAL_LONG1_START": ["verb","objectList"], 
     "STRING_LITERAL_LONG2": ["verb","objectList"], 
     "STRING_LITERAL_LONG2_START": ["verb","objectList"]}, 
  "[|,pathOneInPropertySet]" : {
     "|": ["|","pathOneInPropertySet"]}, 
  "[|,pathSequence]" : {
     "|": ["|","pathSequence"]}, 
  "[||,conditionalAndExpression]" : {
     "||": ["||","conditionalAndExpression"]}, 
  "additiveExpression" : {
     "!": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "+": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "-": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "VAR1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "VAR2": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "(": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "LANG": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "LANGMATCHES": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DATATYPE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "BOUND": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IRI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "URI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "BNODE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "RAND": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ABS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "CEIL": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "FLOOR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ROUND": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "CONCAT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRLEN": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "UCASE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "LCASE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ENCODE_FOR_URI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "CONTAINS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRSTARTS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRENDS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRBEFORE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRAFTER": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "YEAR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MONTH": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DAY": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "HOURS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MINUTES": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SECONDS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "TIMEZONE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "TZ": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "NOW": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "UUID": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRUUID": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MD5": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA256": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA384": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SHA512": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "COALESCE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IF": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRLANG": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRDT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SAMETERM": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISIRI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISURI": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISBLANK": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISLITERAL": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "ISNUMERIC": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "TRUE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "FALSE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "COUNT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SUM": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MIN": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "MAX": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "AVG": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SAMPLE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "GROUP_CONCAT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "SUBSTR": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "REPLACE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "REGEX": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "EXISTS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "NOT": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IRI_REF": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "IRI_REF_START": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_POSITIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_POSITIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_POSITIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "INTEGER_NEGATIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DECIMAL_NEGATIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "DOUBLE_NEGATIVE": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "PNAME_LN": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "PNAME_NS": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL1_START": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL2": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL2_START": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL_LONG1": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL_LONG1_START": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL_LONG2": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"], 
     "STRING_LITERAL_LONG2_START": ["multiplicativeExpression","*or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])"]}, 
  "aggregate" : {
     "COUNT": ["COUNT","(","?DISTINCT","or([*,expression])",")"], 
     "SUM": ["SUM","(","?DISTINCT","expression",")"], 
     "MIN": ["MIN","(","?DISTINCT","expression",")"], 
     "MAX": ["MAX","(","?DISTINCT","expression",")"], 
     "AVG": ["AVG","(","?DISTINCT","expression",")"], 
     "SAMPLE": ["SAMPLE","(","?DISTINCT","expression",")"], 
     "GROUP_CONCAT": ["GROUP_CONCAT","(","?DISTINCT","expression","?[;,SEPARATOR,=,string]",")"]}, 
  "argList" : {
     "NIL": ["NIL"], 
     "(": ["(","?DISTINCT","expression","*[,,expression]",")"]}, 
  "baseDecl" : {
     "BASE": ["BASE","IRI_REF"]}, 
  "bind" : {
     "BIND": ["BIND","(","expression","AS","var",")"]}, 
  "blankNode" : {
     "BLANK_NODE_LABEL": ["BLANK_NODE_LABEL"], 
     "ANON": ["ANON"]}, 
  "blankNodePropertyList" : {
     "[": ["[","propertyListNotEmpty","]"]}, 
  "blankNodePropertyListPath" : {
     "[": ["[","propertyListPathNotEmpty","]"]}, 
  "booleanLiteral" : {
     "TRUE": ["TRUE"], 
     "FALSE": ["FALSE"]}, 
  "brackettedExpression" : {
     "(": ["(","expression",")"]}, 
  "builtInCall" : {
     "STR": ["STR","(","expression",")"], 
     "LANG": ["LANG","(","expression",")"], 
     "LANGMATCHES": ["LANGMATCHES","(","expression",",","expression",")"], 
     "DATATYPE": ["DATATYPE","(","expression",")"], 
     "BOUND": ["BOUND","(","var",")"], 
     "IRI": ["IRI","(","expression",")"], 
     "URI": ["URI","(","expression",")"], 
     "BNODE": ["BNODE","or([[ (,expression,)],NIL])"], 
     "RAND": ["RAND","NIL"], 
     "ABS": ["ABS","(","expression",")"], 
     "CEIL": ["CEIL","(","expression",")"], 
     "FLOOR": ["FLOOR","(","expression",")"], 
     "ROUND": ["ROUND","(","expression",")"], 
     "CONCAT": ["CONCAT","expressionList"], 
     "SUBSTR": ["substringExpression"], 
     "STRLEN": ["STRLEN","(","expression",")"], 
     "REPLACE": ["strReplaceExpression"], 
     "UCASE": ["UCASE","(","expression",")"], 
     "LCASE": ["LCASE","(","expression",")"], 
     "ENCODE_FOR_URI": ["ENCODE_FOR_URI","(","expression",")"], 
     "CONTAINS": ["CONTAINS","(","expression",",","expression",")"], 
     "STRSTARTS": ["STRSTARTS","(","expression",",","expression",")"], 
     "STRENDS": ["STRENDS","(","expression",",","expression",")"], 
     "STRBEFORE": ["STRBEFORE","(","expression",",","expression",")"], 
     "STRAFTER": ["STRAFTER","(","expression",",","expression",")"], 
     "YEAR": ["YEAR","(","expression",")"], 
     "MONTH": ["MONTH","(","expression",")"], 
     "DAY": ["DAY","(","expression",")"], 
     "HOURS": ["HOURS","(","expression",")"], 
     "MINUTES": ["MINUTES","(","expression",")"], 
     "SECONDS": ["SECONDS","(","expression",")"], 
     "TIMEZONE": ["TIMEZONE","(","expression",")"], 
     "TZ": ["TZ","(","expression",")"], 
     "NOW": ["NOW","NIL"], 
     "UUID": ["UUID","NIL"], 
     "STRUUID": ["STRUUID","NIL"], 
     "MD5": ["MD5","(","expression",")"], 
     "SHA1": ["SHA1","(","expression",")"], 
     "SHA256": ["SHA256","(","expression",")"], 
     "SHA384": ["SHA384","(","expression",")"], 
     "SHA512": ["SHA512","(","expression",")"], 
     "COALESCE": ["COALESCE","expressionList"], 
     "IF": ["IF","(","expression",",","expression",",","expression",")"], 
     "STRLANG": ["STRLANG","(","expression",",","expression",")"], 
     "STRDT": ["STRDT","(","expression",",","expression",")"], 
     "SAMETERM": ["SAMETERM","(","expression",",","expression",")"], 
     "ISIRI": ["ISIRI","(","expression",")"], 
     "ISURI": ["ISURI","(","expression",")"], 
     "ISBLANK": ["ISBLANK","(","expression",")"], 
     "ISLITERAL": ["ISLITERAL","(","expression",")"], 
     "ISNUMERIC": ["ISNUMERIC","(","expression",")"], 
     "REGEX": ["regexExpression"], 
     "EXISTS": ["existsFunc"], 
     "NOT": ["notExistsFunc"]}, 
  "collection" : {
     "(": ["(","+graphNode",")"]}, 
  "collectionPath" : {
     "(": ["(","+graphNodePath",")"]}, 
  "conditionalAndExpression" : {
     "!": ["valueLogical","*[&&,valueLogical]"], 
     "+": ["valueLogical","*[&&,valueLogical]"], 
     "-": ["valueLogical","*[&&,valueLogical]"], 
     "VAR1": ["valueLogical","*[&&,valueLogical]"], 
     "VAR2": ["valueLogical","*[&&,valueLogical]"], 
     "(": ["valueLogical","*[&&,valueLogical]"], 
     "STR": ["valueLogical","*[&&,valueLogical]"], 
     "LANG": ["valueLogical","*[&&,valueLogical]"], 
     "LANGMATCHES": ["valueLogical","*[&&,valueLogical]"], 
     "DATATYPE": ["valueLogical","*[&&,valueLogical]"], 
     "BOUND": ["valueLogical","*[&&,valueLogical]"], 
     "IRI": ["valueLogical","*[&&,valueLogical]"], 
     "URI": ["valueLogical","*[&&,valueLogical]"], 
     "BNODE": ["valueLogical","*[&&,valueLogical]"], 
     "RAND": ["valueLogical","*[&&,valueLogical]"], 
     "ABS": ["valueLogical","*[&&,valueLogical]"], 
     "CEIL": ["valueLogical","*[&&,valueLogical]"], 
     "FLOOR": ["valueLogical","*[&&,valueLogical]"], 
     "ROUND": ["valueLogical","*[&&,valueLogical]"], 
     "CONCAT": ["valueLogical","*[&&,valueLogical]"], 
     "STRLEN": ["valueLogical","*[&&,valueLogical]"], 
     "UCASE": ["valueLogical","*[&&,valueLogical]"], 
     "LCASE": ["valueLogical","*[&&,valueLogical]"], 
     "ENCODE_FOR_URI": ["valueLogical","*[&&,valueLogical]"], 
     "CONTAINS": ["valueLogical","*[&&,valueLogical]"], 
     "STRSTARTS": ["valueLogical","*[&&,valueLogical]"], 
     "STRENDS": ["valueLogical","*[&&,valueLogical]"], 
     "STRBEFORE": ["valueLogical","*[&&,valueLogical]"], 
     "STRAFTER": ["valueLogical","*[&&,valueLogical]"], 
     "YEAR": ["valueLogical","*[&&,valueLogical]"], 
     "MONTH": ["valueLogical","*[&&,valueLogical]"], 
     "DAY": ["valueLogical","*[&&,valueLogical]"], 
     "HOURS": ["valueLogical","*[&&,valueLogical]"], 
     "MINUTES": ["valueLogical","*[&&,valueLogical]"], 
     "SECONDS": ["valueLogical","*[&&,valueLogical]"], 
     "TIMEZONE": ["valueLogical","*[&&,valueLogical]"], 
     "TZ": ["valueLogical","*[&&,valueLogical]"], 
     "NOW": ["valueLogical","*[&&,valueLogical]"], 
     "UUID": ["valueLogical","*[&&,valueLogical]"], 
     "STRUUID": ["valueLogical","*[&&,valueLogical]"], 
     "MD5": ["valueLogical","*[&&,valueLogical]"], 
     "SHA1": ["valueLogical","*[&&,valueLogical]"], 
     "SHA256": ["valueLogical","*[&&,valueLogical]"], 
     "SHA384": ["valueLogical","*[&&,valueLogical]"], 
     "SHA512": ["valueLogical","*[&&,valueLogical]"], 
     "COALESCE": ["valueLogical","*[&&,valueLogical]"], 
     "IF": ["valueLogical","*[&&,valueLogical]"], 
     "STRLANG": ["valueLogical","*[&&,valueLogical]"], 
     "STRDT": ["valueLogical","*[&&,valueLogical]"], 
     "SAMETERM": ["valueLogical","*[&&,valueLogical]"], 
     "ISIRI": ["valueLogical","*[&&,valueLogical]"], 
     "ISURI": ["valueLogical","*[&&,valueLogical]"], 
     "ISBLANK": ["valueLogical","*[&&,valueLogical]"], 
     "ISLITERAL": ["valueLogical","*[&&,valueLogical]"], 
     "ISNUMERIC": ["valueLogical","*[&&,valueLogical]"], 
     "TRUE": ["valueLogical","*[&&,valueLogical]"], 
     "FALSE": ["valueLogical","*[&&,valueLogical]"], 
     "COUNT": ["valueLogical","*[&&,valueLogical]"], 
     "SUM": ["valueLogical","*[&&,valueLogical]"], 
     "MIN": ["valueLogical","*[&&,valueLogical]"], 
     "MAX": ["valueLogical","*[&&,valueLogical]"], 
     "AVG": ["valueLogical","*[&&,valueLogical]"], 
     "SAMPLE": ["valueLogical","*[&&,valueLogical]"], 
     "GROUP_CONCAT": ["valueLogical","*[&&,valueLogical]"], 
     "SUBSTR": ["valueLogical","*[&&,valueLogical]"], 
     "REPLACE": ["valueLogical","*[&&,valueLogical]"], 
     "REGEX": ["valueLogical","*[&&,valueLogical]"], 
     "EXISTS": ["valueLogical","*[&&,valueLogical]"], 
     "NOT": ["valueLogical","*[&&,valueLogical]"], 
     "IRI_REF": ["valueLogical","*[&&,valueLogical]"], 
     "IRI_REF_START": ["valueLogical","*[&&,valueLogical]"], 
     "INTEGER": ["valueLogical","*[&&,valueLogical]"], 
     "DECIMAL": ["valueLogical","*[&&,valueLogical]"], 
     "DOUBLE": ["valueLogical","*[&&,valueLogical]"], 
     "INTEGER_POSITIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DECIMAL_POSITIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DOUBLE_POSITIVE": ["valueLogical","*[&&,valueLogical]"], 
     "INTEGER_NEGATIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DECIMAL_NEGATIVE": ["valueLogical","*[&&,valueLogical]"], 
     "DOUBLE_NEGATIVE": ["valueLogical","*[&&,valueLogical]"], 
     "PNAME_LN": ["valueLogical","*[&&,valueLogical]"], 
     "PNAME_NS": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL1": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL1_START": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL2": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL2_START": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL_LONG1": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL_LONG1_START": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL_LONG2": ["valueLogical","*[&&,valueLogical]"], 
     "STRING_LITERAL_LONG2_START": ["valueLogical","*[&&,valueLogical]"]}, 
  "conditionalOrExpression" : {
     "!": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "+": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "-": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "VAR1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "VAR2": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "(": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "LANG": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "LANGMATCHES": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DATATYPE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "BOUND": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IRI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "URI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "BNODE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "RAND": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ABS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "CEIL": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "FLOOR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ROUND": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "CONCAT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRLEN": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "UCASE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "LCASE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ENCODE_FOR_URI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "CONTAINS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRSTARTS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRENDS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRBEFORE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRAFTER": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "YEAR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MONTH": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DAY": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "HOURS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MINUTES": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SECONDS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "TIMEZONE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "TZ": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "NOW": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "UUID": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRUUID": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MD5": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA256": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA384": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SHA512": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "COALESCE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IF": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRLANG": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRDT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SAMETERM": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISIRI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISURI": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISBLANK": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISLITERAL": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "ISNUMERIC": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "TRUE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "FALSE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "COUNT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SUM": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MIN": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "MAX": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "AVG": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SAMPLE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "GROUP_CONCAT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "SUBSTR": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "REPLACE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "REGEX": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "EXISTS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "NOT": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IRI_REF": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "IRI_REF_START": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "INTEGER": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DECIMAL": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DOUBLE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "INTEGER_POSITIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DECIMAL_POSITIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DOUBLE_POSITIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "INTEGER_NEGATIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DECIMAL_NEGATIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "DOUBLE_NEGATIVE": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "PNAME_LN": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "PNAME_NS": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL1_START": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL2": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL2_START": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL_LONG1": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL_LONG1_START": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL_LONG2": ["conditionalAndExpression","*[||,conditionalAndExpression]"], 
     "STRING_LITERAL_LONG2_START": ["conditionalAndExpression","*[||,conditionalAndExpression]"]}, 
  "constraint" : {
     "(": ["brackettedExpression"], 
     "STR": ["builtInCall"], 
     "LANG": ["builtInCall"], 
     "LANGMATCHES": ["builtInCall"], 
     "DATATYPE": ["builtInCall"], 
     "BOUND": ["builtInCall"], 
     "IRI": ["builtInCall"], 
     "URI": ["builtInCall"], 
     "BNODE": ["builtInCall"], 
     "RAND": ["builtInCall"], 
     "ABS": ["builtInCall"], 
     "CEIL": ["builtInCall"], 
     "FLOOR": ["builtInCall"], 
     "ROUND": ["builtInCall"], 
     "CONCAT": ["builtInCall"], 
     "STRLEN": ["builtInCall"], 
     "UCASE": ["builtInCall"], 
     "LCASE": ["builtInCall"], 
     "ENCODE_FOR_URI": ["builtInCall"], 
     "CONTAINS": ["builtInCall"], 
     "STRSTARTS": ["builtInCall"], 
     "STRENDS": ["builtInCall"], 
     "STRBEFORE": ["builtInCall"], 
     "STRAFTER": ["builtInCall"], 
     "YEAR": ["builtInCall"], 
     "MONTH": ["builtInCall"], 
     "DAY": ["builtInCall"], 
     "HOURS": ["builtInCall"], 
     "MINUTES": ["builtInCall"], 
     "SECONDS": ["builtInCall"], 
     "TIMEZONE": ["builtInCall"], 
     "TZ": ["builtInCall"], 
     "NOW": ["builtInCall"], 
     "UUID": ["builtInCall"], 
     "STRUUID": ["builtInCall"], 
     "MD5": ["builtInCall"], 
     "SHA1": ["builtInCall"], 
     "SHA256": ["builtInCall"], 
     "SHA384": ["builtInCall"], 
     "SHA512": ["builtInCall"], 
     "COALESCE": ["builtInCall"], 
     "IF": ["builtInCall"], 
     "STRLANG": ["builtInCall"], 
     "STRDT": ["builtInCall"], 
     "SAMETERM": ["builtInCall"], 
     "ISIRI": ["builtInCall"], 
     "ISURI": ["builtInCall"], 
     "ISBLANK": ["builtInCall"], 
     "ISLITERAL": ["builtInCall"], 
     "ISNUMERIC": ["builtInCall"], 
     "SUBSTR": ["builtInCall"], 
     "REPLACE": ["builtInCall"], 
     "REGEX": ["builtInCall"], 
     "EXISTS": ["builtInCall"], 
     "NOT": ["builtInCall"], 
     "IRI_REF": ["functionCall"], 
     "PNAME_LN": ["functionCall"], 
     "PNAME_NS": ["functionCall"]}, 
  "constructTriples" : {
     "VAR1": ["triplesSameSubject","?[.,?constructTriples]"], 
     "VAR2": ["triplesSameSubject","?[.,?constructTriples]"], 
     "NIL": ["triplesSameSubject","?[.,?constructTriples]"], 
     "(": ["triplesSameSubject","?[.,?constructTriples]"], 
     "[": ["triplesSameSubject","?[.,?constructTriples]"], 
     "START_XEXPR": ["triplesSameSubject","?[.,?constructTriples]"], 
     "IRI_REF": ["triplesSameSubject","?[.,?constructTriples]"], 
     "IRI_REF_START": ["triplesSameSubject","?[.,?constructTriples]"], 
     "TRUE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "FALSE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "BLANK_NODE_LABEL": ["triplesSameSubject","?[.,?constructTriples]"], 
     "ANON": ["triplesSameSubject","?[.,?constructTriples]"], 
     "PNAME_LN": ["triplesSameSubject","?[.,?constructTriples]"], 
     "PNAME_NS": ["triplesSameSubject","?[.,?constructTriples]"], 
     "INTEGER": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DECIMAL": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DOUBLE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "INTEGER_POSITIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DECIMAL_POSITIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DOUBLE_POSITIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "INTEGER_NEGATIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DECIMAL_NEGATIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "DOUBLE_NEGATIVE": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL1": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL1_START": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL2": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL2_START": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL_LONG1": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL_LONG1_START": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL_LONG2": ["triplesSameSubject","?[.,?constructTriples]"], 
     "STRING_LITERAL_LONG2_START": ["triplesSameSubject","?[.,?constructTriples]"]}, 
  "dataBlock" : {
     "NIL": ["or([inlineDataOneVar,inlineDataFull])"], 
     "(": ["or([inlineDataOneVar,inlineDataFull])"], 
     "VAR1": ["or([inlineDataOneVar,inlineDataFull])"], 
     "VAR2": ["or([inlineDataOneVar,inlineDataFull])"]}, 
  "dataBlockValue" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "STRING_LITERAL1": ["rdfLiteral"], 
     "STRING_LITERAL2": ["rdfLiteral"], 
     "STRING_LITERAL_LONG1": ["rdfLiteral"], 
     "STRING_LITERAL_LONG2": ["rdfLiteral"], 
     "INTEGER": ["numericLiteral"], 
     "DECIMAL": ["numericLiteral"], 
     "DOUBLE": ["numericLiteral"], 
     "INTEGER_POSITIVE": ["numericLiteral"], 
     "DECIMAL_POSITIVE": ["numericLiteral"], 
     "DOUBLE_POSITIVE": ["numericLiteral"], 
     "INTEGER_NEGATIVE": ["numericLiteral"], 
     "DECIMAL_NEGATIVE": ["numericLiteral"], 
     "DOUBLE_NEGATIVE": ["numericLiteral"], 
     "TRUE": ["booleanLiteral"], 
     "FALSE": ["booleanLiteral"], 
     "UNDEF": ["UNDEF"]}, 
  "datasetClause" : {
     "FROM": ["FROM","or([defaultGraphClause,namedGraphClause])"]}, 
  "defaultGraphClause" : {
     "IRI_REF": ["sourceSelector"], 
     "PNAME_LN": ["sourceSelector"], 
     "PNAME_NS": ["sourceSelector"]}, 
  "existsFunc" : {
     "EXISTS": ["EXISTS","groupGraphPattern"]}, 
  "expression" : {
     "!": ["conditionalOrExpression"], 
     "+": ["conditionalOrExpression"], 
     "-": ["conditionalOrExpression"], 
     "VAR1": ["conditionalOrExpression"], 
     "VAR2": ["conditionalOrExpression"], 
     "(": ["conditionalOrExpression"], 
     "STR": ["conditionalOrExpression"], 
     "LANG": ["conditionalOrExpression"], 
     "LANGMATCHES": ["conditionalOrExpression"], 
     "DATATYPE": ["conditionalOrExpression"], 
     "BOUND": ["conditionalOrExpression"], 
     "IRI": ["conditionalOrExpression"], 
     "URI": ["conditionalOrExpression"], 
     "BNODE": ["conditionalOrExpression"], 
     "RAND": ["conditionalOrExpression"], 
     "ABS": ["conditionalOrExpression"], 
     "CEIL": ["conditionalOrExpression"], 
     "FLOOR": ["conditionalOrExpression"], 
     "ROUND": ["conditionalOrExpression"], 
     "CONCAT": ["conditionalOrExpression"], 
     "STRLEN": ["conditionalOrExpression"], 
     "UCASE": ["conditionalOrExpression"], 
     "LCASE": ["conditionalOrExpression"], 
     "ENCODE_FOR_URI": ["conditionalOrExpression"], 
     "CONTAINS": ["conditionalOrExpression"], 
     "STRSTARTS": ["conditionalOrExpression"], 
     "STRENDS": ["conditionalOrExpression"], 
     "STRBEFORE": ["conditionalOrExpression"], 
     "STRAFTER": ["conditionalOrExpression"], 
     "YEAR": ["conditionalOrExpression"], 
     "MONTH": ["conditionalOrExpression"], 
     "DAY": ["conditionalOrExpression"], 
     "HOURS": ["conditionalOrExpression"], 
     "MINUTES": ["conditionalOrExpression"], 
     "SECONDS": ["conditionalOrExpression"], 
     "TIMEZONE": ["conditionalOrExpression"], 
     "TZ": ["conditionalOrExpression"], 
     "NOW": ["conditionalOrExpression"], 
     "UUID": ["conditionalOrExpression"], 
     "STRUUID": ["conditionalOrExpression"], 
     "MD5": ["conditionalOrExpression"], 
     "SHA1": ["conditionalOrExpression"], 
     "SHA256": ["conditionalOrExpression"], 
     "SHA384": ["conditionalOrExpression"], 
     "SHA512": ["conditionalOrExpression"], 
     "COALESCE": ["conditionalOrExpression"], 
     "IF": ["conditionalOrExpression"], 
     "STRLANG": ["conditionalOrExpression"], 
     "STRDT": ["conditionalOrExpression"], 
     "SAMETERM": ["conditionalOrExpression"], 
     "ISIRI": ["conditionalOrExpression"], 
     "ISURI": ["conditionalOrExpression"], 
     "ISBLANK": ["conditionalOrExpression"], 
     "ISLITERAL": ["conditionalOrExpression"], 
     "ISNUMERIC": ["conditionalOrExpression"], 
     "TRUE": ["conditionalOrExpression"], 
     "FALSE": ["conditionalOrExpression"], 
     "COUNT": ["conditionalOrExpression"], 
     "SUM": ["conditionalOrExpression"], 
     "MIN": ["conditionalOrExpression"], 
     "MAX": ["conditionalOrExpression"], 
     "AVG": ["conditionalOrExpression"], 
     "SAMPLE": ["conditionalOrExpression"], 
     "GROUP_CONCAT": ["conditionalOrExpression"], 
     "SUBSTR": ["conditionalOrExpression"], 
     "REPLACE": ["conditionalOrExpression"], 
     "REGEX": ["conditionalOrExpression"], 
     "EXISTS": ["conditionalOrExpression"], 
     "NOT": ["conditionalOrExpression"], 
     "IRI_REF": ["conditionalOrExpression"], 
     "IRI_REF_START": ["conditionalOrExpression"], 
     "INTEGER": ["conditionalOrExpression"], 
     "DECIMAL": ["conditionalOrExpression"], 
     "DOUBLE": ["conditionalOrExpression"], 
     "INTEGER_POSITIVE": ["conditionalOrExpression"], 
     "DECIMAL_POSITIVE": ["conditionalOrExpression"], 
     "DOUBLE_POSITIVE": ["conditionalOrExpression"], 
     "INTEGER_NEGATIVE": ["conditionalOrExpression"], 
     "DECIMAL_NEGATIVE": ["conditionalOrExpression"], 
     "DOUBLE_NEGATIVE": ["conditionalOrExpression"], 
     "PNAME_LN": ["conditionalOrExpression"], 
     "PNAME_NS": ["conditionalOrExpression"], 
     "STRING_LITERAL1": ["conditionalOrExpression"], 
     "STRING_LITERAL1_START": ["conditionalOrExpression"], 
     "STRING_LITERAL2": ["conditionalOrExpression"], 
     "STRING_LITERAL2_START": ["conditionalOrExpression"], 
     "STRING_LITERAL_LONG1": ["conditionalOrExpression"], 
     "STRING_LITERAL_LONG1_START": ["conditionalOrExpression"], 
     "STRING_LITERAL_LONG2": ["conditionalOrExpression"], 
     "STRING_LITERAL_LONG2_START": ["conditionalOrExpression"]}, 
  "expressionList" : {
     "NIL": ["NIL"], 
     "(": ["(","expression","*[,,expression]",")"]}, 
  "filter" : {
     "FILTER": ["FILTER","constraint"]}, 
  "functionCall" : {
     "IRI_REF": ["iriRef","argList"], 
     "PNAME_LN": ["iriRef","argList"], 
     "PNAME_NS": ["iriRef","argList"]}, 
  "generate" : {
     "GENERATE": ["prologue","or([generateQuery1,generateQuery2])"], 
     "CONSTRUCT": ["prologue","or([generateQuery1,generateQuery2])"], 
     "WHEREVER": ["prologue","or([generateQuery1,generateQuery2])"], 
     "WHERE": ["prologue","or([generateQuery1,generateQuery2])"], 
     "FROM": ["prologue","or([generateQuery1,generateQuery2])"], 
     "ORDER": ["prologue","or([generateQuery1,generateQuery2])"], 
     "HAVING": ["prologue","or([generateQuery1,generateQuery2])"], 
     "GROUP": ["prologue","or([generateQuery1,generateQuery2])"], 
     "{": ["prologue","or([generateQuery1,generateQuery2])"], 
     "ITERATOR": ["prologue","or([generateQuery1,generateQuery2])"], 
     "ITERATE": ["prologue","or([generateQuery1,generateQuery2])"], 
     "SOURCE": ["prologue","or([generateQuery1,generateQuery2])"], 
     "LOOK UP": ["prologue","or([generateQuery1,generateQuery2])"], 
     "BIND": ["prologue","or([generateQuery1,generateQuery2])"], 
     "LIMIT": ["prologue","or([generateQuery1,generateQuery2])"], 
     "OFFSET": ["prologue","or([generateQuery1,generateQuery2])"], 
     "BASE": ["prologue","or([generateQuery1,generateQuery2])"], 
     "PREFIX": ["prologue","or([generateQuery1,generateQuery2])"]}, 
  "generateQuery1" : {
     "GENERATE": ["GENERATE","generateTemplate","*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier"]}, 
  "generateQuery2" : {
     "CONSTRUCT": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "ORDER": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "HAVING": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "GROUP": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "LIMIT": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "OFFSET": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "WHEREVER": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "WHERE": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "{": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "ITERATOR": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "ITERATE": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "SOURCE": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "LOOK UP": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "BIND": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"], 
     "FROM": ["*datasetClause","*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","generateTemplate"]}, 
  "generateTemplate" : {
     "{": ["{","generateTemplateSub","}"]}, 
  "generateTemplateSub" : {
     "GENERATE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "CONSTRUCT": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "WHEREVER": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "WHERE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ORDER": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "HAVING": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "GROUP": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "{": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ITERATOR": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ITERATE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "SOURCE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "LOOK UP": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "BIND": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "LIMIT": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "OFFSET": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "VAR1": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "VAR2": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "NIL": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "(": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "[": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "START_XEXPR": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "IRI_REF": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "IRI_REF_START": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "TRUE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "FALSE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "BLANK_NODE_LABEL": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "ANON": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "PNAME_LN": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "PNAME_NS": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "INTEGER": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "DECIMAL": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "DOUBLE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "INTEGER_POSITIVE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "DECIMAL_POSITIVE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "DOUBLE_POSITIVE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "INTEGER_NEGATIVE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "DECIMAL_NEGATIVE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "DOUBLE_NEGATIVE": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL1": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL1_START": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL2": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL2_START": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL_LONG1": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL_LONG1_START": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL_LONG2": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "STRING_LITERAL_LONG2_START": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"], 
     "}": ["?constructTriples","*[or([subGenerateQuery1,subGenerateQuery2]),?constructTriples]"]}, 
  "generateUnit" : {
     "GENERATE": ["generate"], 
     "CONSTRUCT": ["generate"], 
     "WHEREVER": ["generate"], 
     "WHERE": ["generate"], 
     "FROM": ["generate"], 
     "BASE": ["generate"], 
     "PREFIX": ["generate"], 
     "ORDER": ["generate"], 
     "HAVING": ["generate"], 
     "GROUP": ["generate"], 
     "{": ["generate"], 
     "ITERATOR": ["generate"], 
     "ITERATE": ["generate"], 
     "SOURCE": ["generate"], 
     "LOOK UP": ["generate"], 
     "BIND": ["generate"], 
     "LIMIT": ["generate"], 
     "OFFSET": ["generate"]}, 
  "graphGraphPattern" : {
     "GRAPH": ["GRAPH","varOrXIri","groupGraphPattern"]}, 
  "graphNode" : {
     "VAR1": ["varOrXTerm"], 
     "VAR2": ["varOrXTerm"], 
     "NIL": ["varOrXTerm"], 
     "START_XEXPR": ["varOrXTerm"], 
     "IRI_REF": ["varOrXTerm"], 
     "IRI_REF_START": ["varOrXTerm"], 
     "TRUE": ["varOrXTerm"], 
     "FALSE": ["varOrXTerm"], 
     "BLANK_NODE_LABEL": ["varOrXTerm"], 
     "ANON": ["varOrXTerm"], 
     "PNAME_LN": ["varOrXTerm"], 
     "PNAME_NS": ["varOrXTerm"], 
     "INTEGER": ["varOrXTerm"], 
     "DECIMAL": ["varOrXTerm"], 
     "DOUBLE": ["varOrXTerm"], 
     "INTEGER_POSITIVE": ["varOrXTerm"], 
     "DECIMAL_POSITIVE": ["varOrXTerm"], 
     "DOUBLE_POSITIVE": ["varOrXTerm"], 
     "INTEGER_NEGATIVE": ["varOrXTerm"], 
     "DECIMAL_NEGATIVE": ["varOrXTerm"], 
     "DOUBLE_NEGATIVE": ["varOrXTerm"], 
     "STRING_LITERAL1": ["varOrXTerm"], 
     "STRING_LITERAL1_START": ["varOrXTerm"], 
     "STRING_LITERAL2": ["varOrXTerm"], 
     "STRING_LITERAL2_START": ["varOrXTerm"], 
     "STRING_LITERAL_LONG1": ["varOrXTerm"], 
     "STRING_LITERAL_LONG1_START": ["varOrXTerm"], 
     "STRING_LITERAL_LONG2": ["varOrXTerm"], 
     "STRING_LITERAL_LONG2_START": ["varOrXTerm"], 
     "(": ["triplesNode"], 
     "[": ["triplesNode"]}, 
  "graphNodePath" : {
     "VAR1": ["varOrXTerm"], 
     "VAR2": ["varOrXTerm"], 
     "NIL": ["varOrXTerm"], 
     "START_XEXPR": ["varOrXTerm"], 
     "IRI_REF": ["varOrXTerm"], 
     "IRI_REF_START": ["varOrXTerm"], 
     "TRUE": ["varOrXTerm"], 
     "FALSE": ["varOrXTerm"], 
     "BLANK_NODE_LABEL": ["varOrXTerm"], 
     "ANON": ["varOrXTerm"], 
     "PNAME_LN": ["varOrXTerm"], 
     "PNAME_NS": ["varOrXTerm"], 
     "INTEGER": ["varOrXTerm"], 
     "DECIMAL": ["varOrXTerm"], 
     "DOUBLE": ["varOrXTerm"], 
     "INTEGER_POSITIVE": ["varOrXTerm"], 
     "DECIMAL_POSITIVE": ["varOrXTerm"], 
     "DOUBLE_POSITIVE": ["varOrXTerm"], 
     "INTEGER_NEGATIVE": ["varOrXTerm"], 
     "DECIMAL_NEGATIVE": ["varOrXTerm"], 
     "DOUBLE_NEGATIVE": ["varOrXTerm"], 
     "STRING_LITERAL1": ["varOrXTerm"], 
     "STRING_LITERAL1_START": ["varOrXTerm"], 
     "STRING_LITERAL2": ["varOrXTerm"], 
     "STRING_LITERAL2_START": ["varOrXTerm"], 
     "STRING_LITERAL_LONG1": ["varOrXTerm"], 
     "STRING_LITERAL_LONG1_START": ["varOrXTerm"], 
     "STRING_LITERAL_LONG2": ["varOrXTerm"], 
     "STRING_LITERAL_LONG2_START": ["varOrXTerm"], 
     "(": ["triplesNodePath"], 
     "[": ["triplesNodePath"]}, 
  "graphPatternNotTriples" : {
     "{": ["groupOrUnionGraphPattern"], 
     "OPTIONAL": ["optionalGraphPattern"], 
     "MINUS": ["minusGraphPattern"], 
     "GRAPH": ["graphGraphPattern"], 
     "SERVICE": ["serviceGraphPattern"], 
     "FILTER": ["filter"], 
     "BIND": ["bind"], 
     "VALUES": ["inlineData"]}, 
  "groupClause" : {
     "GROUP": ["GROUP","BY","+groupCondition"]}, 
  "groupCondition" : {
     "STR": ["builtInCall"], 
     "LANG": ["builtInCall"], 
     "LANGMATCHES": ["builtInCall"], 
     "DATATYPE": ["builtInCall"], 
     "BOUND": ["builtInCall"], 
     "IRI": ["builtInCall"], 
     "URI": ["builtInCall"], 
     "BNODE": ["builtInCall"], 
     "RAND": ["builtInCall"], 
     "ABS": ["builtInCall"], 
     "CEIL": ["builtInCall"], 
     "FLOOR": ["builtInCall"], 
     "ROUND": ["builtInCall"], 
     "CONCAT": ["builtInCall"], 
     "STRLEN": ["builtInCall"], 
     "UCASE": ["builtInCall"], 
     "LCASE": ["builtInCall"], 
     "ENCODE_FOR_URI": ["builtInCall"], 
     "CONTAINS": ["builtInCall"], 
     "STRSTARTS": ["builtInCall"], 
     "STRENDS": ["builtInCall"], 
     "STRBEFORE": ["builtInCall"], 
     "STRAFTER": ["builtInCall"], 
     "YEAR": ["builtInCall"], 
     "MONTH": ["builtInCall"], 
     "DAY": ["builtInCall"], 
     "HOURS": ["builtInCall"], 
     "MINUTES": ["builtInCall"], 
     "SECONDS": ["builtInCall"], 
     "TIMEZONE": ["builtInCall"], 
     "TZ": ["builtInCall"], 
     "NOW": ["builtInCall"], 
     "UUID": ["builtInCall"], 
     "STRUUID": ["builtInCall"], 
     "MD5": ["builtInCall"], 
     "SHA1": ["builtInCall"], 
     "SHA256": ["builtInCall"], 
     "SHA384": ["builtInCall"], 
     "SHA512": ["builtInCall"], 
     "COALESCE": ["builtInCall"], 
     "IF": ["builtInCall"], 
     "STRLANG": ["builtInCall"], 
     "STRDT": ["builtInCall"], 
     "SAMETERM": ["builtInCall"], 
     "ISIRI": ["builtInCall"], 
     "ISURI": ["builtInCall"], 
     "ISBLANK": ["builtInCall"], 
     "ISLITERAL": ["builtInCall"], 
     "ISNUMERIC": ["builtInCall"], 
     "SUBSTR": ["builtInCall"], 
     "REPLACE": ["builtInCall"], 
     "REGEX": ["builtInCall"], 
     "EXISTS": ["builtInCall"], 
     "NOT": ["builtInCall"], 
     "IRI_REF": ["functionCall"], 
     "PNAME_LN": ["functionCall"], 
     "PNAME_NS": ["functionCall"], 
     "(": ["(","expression","?[AS,var]",")"], 
     "VAR1": ["var"], 
     "VAR2": ["var"]}, 
  "groupGraphPattern" : {
     "{": ["{","or([subSelect,groupGraphPatternSub])","}"]}, 
  "groupGraphPatternSub" : {
     "{": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "OPTIONAL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "MINUS": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "GRAPH": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "SERVICE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "FILTER": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "BIND": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VALUES": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VAR1": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "VAR2": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "NIL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "(": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "[": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "START_XEXPR": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "IRI_REF": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "IRI_REF_START": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "TRUE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "FALSE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "BLANK_NODE_LABEL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "ANON": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "PNAME_LN": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "PNAME_NS": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "INTEGER": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DECIMAL": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DOUBLE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "INTEGER_POSITIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DECIMAL_POSITIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DOUBLE_POSITIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "INTEGER_NEGATIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DECIMAL_NEGATIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "DOUBLE_NEGATIVE": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL1": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL1_START": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL2": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL2_START": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL_LONG1": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL_LONG1_START": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL_LONG2": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "STRING_LITERAL_LONG2_START": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"], 
     "}": ["?triplesBlock","*[graphPatternNotTriples,?.,?triplesBlock]"]}, 
  "groupOrUnionGraphPattern" : {
     "{": ["groupGraphPattern","*[UNION,groupGraphPattern]"]}, 
  "havingClause" : {
     "HAVING": ["HAVING","+havingCondition"]}, 
  "havingCondition" : {
     "(": ["constraint"], 
     "STR": ["constraint"], 
     "LANG": ["constraint"], 
     "LANGMATCHES": ["constraint"], 
     "DATATYPE": ["constraint"], 
     "BOUND": ["constraint"], 
     "IRI": ["constraint"], 
     "URI": ["constraint"], 
     "BNODE": ["constraint"], 
     "RAND": ["constraint"], 
     "ABS": ["constraint"], 
     "CEIL": ["constraint"], 
     "FLOOR": ["constraint"], 
     "ROUND": ["constraint"], 
     "CONCAT": ["constraint"], 
     "STRLEN": ["constraint"], 
     "UCASE": ["constraint"], 
     "LCASE": ["constraint"], 
     "ENCODE_FOR_URI": ["constraint"], 
     "CONTAINS": ["constraint"], 
     "STRSTARTS": ["constraint"], 
     "STRENDS": ["constraint"], 
     "STRBEFORE": ["constraint"], 
     "STRAFTER": ["constraint"], 
     "YEAR": ["constraint"], 
     "MONTH": ["constraint"], 
     "DAY": ["constraint"], 
     "HOURS": ["constraint"], 
     "MINUTES": ["constraint"], 
     "SECONDS": ["constraint"], 
     "TIMEZONE": ["constraint"], 
     "TZ": ["constraint"], 
     "NOW": ["constraint"], 
     "UUID": ["constraint"], 
     "STRUUID": ["constraint"], 
     "MD5": ["constraint"], 
     "SHA1": ["constraint"], 
     "SHA256": ["constraint"], 
     "SHA384": ["constraint"], 
     "SHA512": ["constraint"], 
     "COALESCE": ["constraint"], 
     "IF": ["constraint"], 
     "STRLANG": ["constraint"], 
     "STRDT": ["constraint"], 
     "SAMETERM": ["constraint"], 
     "ISIRI": ["constraint"], 
     "ISURI": ["constraint"], 
     "ISBLANK": ["constraint"], 
     "ISLITERAL": ["constraint"], 
     "ISNUMERIC": ["constraint"], 
     "SUBSTR": ["constraint"], 
     "REPLACE": ["constraint"], 
     "REGEX": ["constraint"], 
     "EXISTS": ["constraint"], 
     "NOT": ["constraint"], 
     "IRI_REF": ["constraint"], 
     "PNAME_LN": ["constraint"], 
     "PNAME_NS": ["constraint"]}, 
  "inlineData" : {
     "VALUES": ["VALUES","dataBlock"]}, 
  "inlineDataFull" : {
     "NIL": ["or([NIL,[ (,*var,)]])","{","*or([[ (,*dataBlockValue,)],NIL])","}"], 
     "(": ["or([NIL,[ (,*var,)]])","{","*or([[ (,*dataBlockValue,)],NIL])","}"]}, 
  "inlineDataOneVar" : {
     "VAR1": ["var","{","*dataBlockValue","}"], 
     "VAR2": ["var","{","*dataBlockValue","}"]}, 
  "integer" : {
     "INTEGER": ["INTEGER"]}, 
  "iriRef" : {
     "IRI_REF": ["IRI_REF"], 
     "PNAME_LN": ["prefixedName"], 
     "PNAME_NS": ["prefixedName"]}, 
  "iteratorClause" : {
     "ITERATOR": ["or([ITERATOR,ITERATE])","functionCall","AS","var"], 
     "ITERATE": ["or([ITERATOR,ITERATE])","functionCall","AS","var"]}, 
  "iteratorOrSourceClause" : {
     "ITERATOR": ["or([iteratorClause,sourceClause,bind])"], 
     "ITERATE": ["or([iteratorClause,sourceClause,bind])"], 
     "SOURCE": ["or([iteratorClause,sourceClause,bind])"], 
     "LOOK UP": ["or([iteratorClause,sourceClause,bind])"], 
     "BIND": ["or([iteratorClause,sourceClause,bind])"]}, 
  "limitClause" : {
     "LIMIT": ["LIMIT","INTEGER"]}, 
  "limitOffsetClauses" : {
     "LIMIT": ["limitClause","?offsetClause"], 
     "OFFSET": ["offsetClause","?limitClause"]}, 
  "minusGraphPattern" : {
     "MINUS": ["MINUS","groupGraphPattern"]}, 
  "multiplicativeExpression" : {
     "!": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "+": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "-": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "VAR1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "VAR2": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "(": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "LANG": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "LANGMATCHES": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DATATYPE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "BOUND": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IRI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "URI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "BNODE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "RAND": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ABS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "CEIL": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "FLOOR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ROUND": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "CONCAT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRLEN": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "UCASE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "LCASE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ENCODE_FOR_URI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "CONTAINS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRSTARTS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRENDS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRBEFORE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRAFTER": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "YEAR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MONTH": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DAY": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "HOURS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MINUTES": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SECONDS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "TIMEZONE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "TZ": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "NOW": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "UUID": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRUUID": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MD5": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA256": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA384": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SHA512": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "COALESCE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IF": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRLANG": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRDT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SAMETERM": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISIRI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISURI": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISBLANK": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISLITERAL": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "ISNUMERIC": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "TRUE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "FALSE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "COUNT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SUM": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MIN": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "MAX": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "AVG": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SAMPLE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "GROUP_CONCAT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "SUBSTR": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "REPLACE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "REGEX": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "EXISTS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "NOT": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IRI_REF": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "IRI_REF_START": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER_POSITIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_POSITIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_POSITIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "INTEGER_NEGATIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DECIMAL_NEGATIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "DOUBLE_NEGATIVE": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "PNAME_LN": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "PNAME_NS": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL1_START": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL2": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL2_START": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL_LONG1": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL_LONG1_START": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL_LONG2": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"], 
     "STRING_LITERAL_LONG2_START": ["unaryExpression","*or([[*,unaryExpression],[/,unaryExpression]])"]}, 
  "namedGraphClause" : {
     "NAMED": ["NAMED","sourceSelector"]}, 
  "notExistsFunc" : {
     "NOT": ["NOT","EXISTS","groupGraphPattern"]}, 
  "numericExpression" : {
     "!": ["additiveExpression"], 
     "+": ["additiveExpression"], 
     "-": ["additiveExpression"], 
     "VAR1": ["additiveExpression"], 
     "VAR2": ["additiveExpression"], 
     "(": ["additiveExpression"], 
     "STR": ["additiveExpression"], 
     "LANG": ["additiveExpression"], 
     "LANGMATCHES": ["additiveExpression"], 
     "DATATYPE": ["additiveExpression"], 
     "BOUND": ["additiveExpression"], 
     "IRI": ["additiveExpression"], 
     "URI": ["additiveExpression"], 
     "BNODE": ["additiveExpression"], 
     "RAND": ["additiveExpression"], 
     "ABS": ["additiveExpression"], 
     "CEIL": ["additiveExpression"], 
     "FLOOR": ["additiveExpression"], 
     "ROUND": ["additiveExpression"], 
     "CONCAT": ["additiveExpression"], 
     "STRLEN": ["additiveExpression"], 
     "UCASE": ["additiveExpression"], 
     "LCASE": ["additiveExpression"], 
     "ENCODE_FOR_URI": ["additiveExpression"], 
     "CONTAINS": ["additiveExpression"], 
     "STRSTARTS": ["additiveExpression"], 
     "STRENDS": ["additiveExpression"], 
     "STRBEFORE": ["additiveExpression"], 
     "STRAFTER": ["additiveExpression"], 
     "YEAR": ["additiveExpression"], 
     "MONTH": ["additiveExpression"], 
     "DAY": ["additiveExpression"], 
     "HOURS": ["additiveExpression"], 
     "MINUTES": ["additiveExpression"], 
     "SECONDS": ["additiveExpression"], 
     "TIMEZONE": ["additiveExpression"], 
     "TZ": ["additiveExpression"], 
     "NOW": ["additiveExpression"], 
     "UUID": ["additiveExpression"], 
     "STRUUID": ["additiveExpression"], 
     "MD5": ["additiveExpression"], 
     "SHA1": ["additiveExpression"], 
     "SHA256": ["additiveExpression"], 
     "SHA384": ["additiveExpression"], 
     "SHA512": ["additiveExpression"], 
     "COALESCE": ["additiveExpression"], 
     "IF": ["additiveExpression"], 
     "STRLANG": ["additiveExpression"], 
     "STRDT": ["additiveExpression"], 
     "SAMETERM": ["additiveExpression"], 
     "ISIRI": ["additiveExpression"], 
     "ISURI": ["additiveExpression"], 
     "ISBLANK": ["additiveExpression"], 
     "ISLITERAL": ["additiveExpression"], 
     "ISNUMERIC": ["additiveExpression"], 
     "TRUE": ["additiveExpression"], 
     "FALSE": ["additiveExpression"], 
     "COUNT": ["additiveExpression"], 
     "SUM": ["additiveExpression"], 
     "MIN": ["additiveExpression"], 
     "MAX": ["additiveExpression"], 
     "AVG": ["additiveExpression"], 
     "SAMPLE": ["additiveExpression"], 
     "GROUP_CONCAT": ["additiveExpression"], 
     "SUBSTR": ["additiveExpression"], 
     "REPLACE": ["additiveExpression"], 
     "REGEX": ["additiveExpression"], 
     "EXISTS": ["additiveExpression"], 
     "NOT": ["additiveExpression"], 
     "IRI_REF": ["additiveExpression"], 
     "IRI_REF_START": ["additiveExpression"], 
     "INTEGER": ["additiveExpression"], 
     "DECIMAL": ["additiveExpression"], 
     "DOUBLE": ["additiveExpression"], 
     "INTEGER_POSITIVE": ["additiveExpression"], 
     "DECIMAL_POSITIVE": ["additiveExpression"], 
     "DOUBLE_POSITIVE": ["additiveExpression"], 
     "INTEGER_NEGATIVE": ["additiveExpression"], 
     "DECIMAL_NEGATIVE": ["additiveExpression"], 
     "DOUBLE_NEGATIVE": ["additiveExpression"], 
     "PNAME_LN": ["additiveExpression"], 
     "PNAME_NS": ["additiveExpression"], 
     "STRING_LITERAL1": ["additiveExpression"], 
     "STRING_LITERAL1_START": ["additiveExpression"], 
     "STRING_LITERAL2": ["additiveExpression"], 
     "STRING_LITERAL2_START": ["additiveExpression"], 
     "STRING_LITERAL_LONG1": ["additiveExpression"], 
     "STRING_LITERAL_LONG1_START": ["additiveExpression"], 
     "STRING_LITERAL_LONG2": ["additiveExpression"], 
     "STRING_LITERAL_LONG2_START": ["additiveExpression"]}, 
  "numericLiteral" : {
     "INTEGER": ["numericLiteralUnsigned"], 
     "DECIMAL": ["numericLiteralUnsigned"], 
     "DOUBLE": ["numericLiteralUnsigned"], 
     "INTEGER_POSITIVE": ["numericLiteralPositive"], 
     "DECIMAL_POSITIVE": ["numericLiteralPositive"], 
     "DOUBLE_POSITIVE": ["numericLiteralPositive"], 
     "INTEGER_NEGATIVE": ["numericLiteralNegative"], 
     "DECIMAL_NEGATIVE": ["numericLiteralNegative"], 
     "DOUBLE_NEGATIVE": ["numericLiteralNegative"]}, 
  "numericLiteralNegative" : {
     "INTEGER_NEGATIVE": ["INTEGER_NEGATIVE"], 
     "DECIMAL_NEGATIVE": ["DECIMAL_NEGATIVE"], 
     "DOUBLE_NEGATIVE": ["DOUBLE_NEGATIVE"]}, 
  "numericLiteralPositive" : {
     "INTEGER_POSITIVE": ["INTEGER_POSITIVE"], 
     "DECIMAL_POSITIVE": ["DECIMAL_POSITIVE"], 
     "DOUBLE_POSITIVE": ["DOUBLE_POSITIVE"]}, 
  "numericLiteralUnsigned" : {
     "INTEGER": ["INTEGER"], 
     "DECIMAL": ["DECIMAL"], 
     "DOUBLE": ["DOUBLE"]}, 
  "object" : {
     "(": ["graphNode"], 
     "[": ["graphNode"], 
     "VAR1": ["graphNode"], 
     "VAR2": ["graphNode"], 
     "NIL": ["graphNode"], 
     "START_XEXPR": ["graphNode"], 
     "IRI_REF": ["graphNode"], 
     "IRI_REF_START": ["graphNode"], 
     "TRUE": ["graphNode"], 
     "FALSE": ["graphNode"], 
     "BLANK_NODE_LABEL": ["graphNode"], 
     "ANON": ["graphNode"], 
     "PNAME_LN": ["graphNode"], 
     "PNAME_NS": ["graphNode"], 
     "INTEGER": ["graphNode"], 
     "DECIMAL": ["graphNode"], 
     "DOUBLE": ["graphNode"], 
     "INTEGER_POSITIVE": ["graphNode"], 
     "DECIMAL_POSITIVE": ["graphNode"], 
     "DOUBLE_POSITIVE": ["graphNode"], 
     "INTEGER_NEGATIVE": ["graphNode"], 
     "DECIMAL_NEGATIVE": ["graphNode"], 
     "DOUBLE_NEGATIVE": ["graphNode"], 
     "STRING_LITERAL1": ["graphNode"], 
     "STRING_LITERAL1_START": ["graphNode"], 
     "STRING_LITERAL2": ["graphNode"], 
     "STRING_LITERAL2_START": ["graphNode"], 
     "STRING_LITERAL_LONG1": ["graphNode"], 
     "STRING_LITERAL_LONG1_START": ["graphNode"], 
     "STRING_LITERAL_LONG2": ["graphNode"], 
     "STRING_LITERAL_LONG2_START": ["graphNode"]}, 
  "objectList" : {
     "(": ["object","*[,,object]"], 
     "[": ["object","*[,,object]"], 
     "VAR1": ["object","*[,,object]"], 
     "VAR2": ["object","*[,,object]"], 
     "NIL": ["object","*[,,object]"], 
     "START_XEXPR": ["object","*[,,object]"], 
     "IRI_REF": ["object","*[,,object]"], 
     "IRI_REF_START": ["object","*[,,object]"], 
     "TRUE": ["object","*[,,object]"], 
     "FALSE": ["object","*[,,object]"], 
     "BLANK_NODE_LABEL": ["object","*[,,object]"], 
     "ANON": ["object","*[,,object]"], 
     "PNAME_LN": ["object","*[,,object]"], 
     "PNAME_NS": ["object","*[,,object]"], 
     "INTEGER": ["object","*[,,object]"], 
     "DECIMAL": ["object","*[,,object]"], 
     "DOUBLE": ["object","*[,,object]"], 
     "INTEGER_POSITIVE": ["object","*[,,object]"], 
     "DECIMAL_POSITIVE": ["object","*[,,object]"], 
     "DOUBLE_POSITIVE": ["object","*[,,object]"], 
     "INTEGER_NEGATIVE": ["object","*[,,object]"], 
     "DECIMAL_NEGATIVE": ["object","*[,,object]"], 
     "DOUBLE_NEGATIVE": ["object","*[,,object]"], 
     "STRING_LITERAL1": ["object","*[,,object]"], 
     "STRING_LITERAL1_START": ["object","*[,,object]"], 
     "STRING_LITERAL2": ["object","*[,,object]"], 
     "STRING_LITERAL2_START": ["object","*[,,object]"], 
     "STRING_LITERAL_LONG1": ["object","*[,,object]"], 
     "STRING_LITERAL_LONG1_START": ["object","*[,,object]"], 
     "STRING_LITERAL_LONG2": ["object","*[,,object]"], 
     "STRING_LITERAL_LONG2_START": ["object","*[,,object]"]}, 
  "objectListPath" : {
     "(": ["objectPath","*[,,objectPath]"], 
     "[": ["objectPath","*[,,objectPath]"], 
     "VAR1": ["objectPath","*[,,objectPath]"], 
     "VAR2": ["objectPath","*[,,objectPath]"], 
     "NIL": ["objectPath","*[,,objectPath]"], 
     "START_XEXPR": ["objectPath","*[,,objectPath]"], 
     "IRI_REF": ["objectPath","*[,,objectPath]"], 
     "IRI_REF_START": ["objectPath","*[,,objectPath]"], 
     "TRUE": ["objectPath","*[,,objectPath]"], 
     "FALSE": ["objectPath","*[,,objectPath]"], 
     "BLANK_NODE_LABEL": ["objectPath","*[,,objectPath]"], 
     "ANON": ["objectPath","*[,,objectPath]"], 
     "PNAME_LN": ["objectPath","*[,,objectPath]"], 
     "PNAME_NS": ["objectPath","*[,,objectPath]"], 
     "INTEGER": ["objectPath","*[,,objectPath]"], 
     "DECIMAL": ["objectPath","*[,,objectPath]"], 
     "DOUBLE": ["objectPath","*[,,objectPath]"], 
     "INTEGER_POSITIVE": ["objectPath","*[,,objectPath]"], 
     "DECIMAL_POSITIVE": ["objectPath","*[,,objectPath]"], 
     "DOUBLE_POSITIVE": ["objectPath","*[,,objectPath]"], 
     "INTEGER_NEGATIVE": ["objectPath","*[,,objectPath]"], 
     "DECIMAL_NEGATIVE": ["objectPath","*[,,objectPath]"], 
     "DOUBLE_NEGATIVE": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL1": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL1_START": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL2": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL2_START": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL_LONG1": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL_LONG1_START": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL_LONG2": ["objectPath","*[,,objectPath]"], 
     "STRING_LITERAL_LONG2_START": ["objectPath","*[,,objectPath]"]}, 
  "objectPath" : {
     "(": ["graphNodePath"], 
     "[": ["graphNodePath"], 
     "VAR1": ["graphNodePath"], 
     "VAR2": ["graphNodePath"], 
     "NIL": ["graphNodePath"], 
     "START_XEXPR": ["graphNodePath"], 
     "IRI_REF": ["graphNodePath"], 
     "IRI_REF_START": ["graphNodePath"], 
     "TRUE": ["graphNodePath"], 
     "FALSE": ["graphNodePath"], 
     "BLANK_NODE_LABEL": ["graphNodePath"], 
     "ANON": ["graphNodePath"], 
     "PNAME_LN": ["graphNodePath"], 
     "PNAME_NS": ["graphNodePath"], 
     "INTEGER": ["graphNodePath"], 
     "DECIMAL": ["graphNodePath"], 
     "DOUBLE": ["graphNodePath"], 
     "INTEGER_POSITIVE": ["graphNodePath"], 
     "DECIMAL_POSITIVE": ["graphNodePath"], 
     "DOUBLE_POSITIVE": ["graphNodePath"], 
     "INTEGER_NEGATIVE": ["graphNodePath"], 
     "DECIMAL_NEGATIVE": ["graphNodePath"], 
     "DOUBLE_NEGATIVE": ["graphNodePath"], 
     "STRING_LITERAL1": ["graphNodePath"], 
     "STRING_LITERAL1_START": ["graphNodePath"], 
     "STRING_LITERAL2": ["graphNodePath"], 
     "STRING_LITERAL2_START": ["graphNodePath"], 
     "STRING_LITERAL_LONG1": ["graphNodePath"], 
     "STRING_LITERAL_LONG1_START": ["graphNodePath"], 
     "STRING_LITERAL_LONG2": ["graphNodePath"], 
     "STRING_LITERAL_LONG2_START": ["graphNodePath"]}, 
  "offsetClause" : {
     "OFFSET": ["OFFSET","INTEGER"]}, 
  "optionalGraphPattern" : {
     "OPTIONAL": ["OPTIONAL","groupGraphPattern"]}, 
  "or([*,expression])" : {
     "*": ["*"], 
     "!": ["expression"], 
     "+": ["expression"], 
     "-": ["expression"], 
     "VAR1": ["expression"], 
     "VAR2": ["expression"], 
     "(": ["expression"], 
     "STR": ["expression"], 
     "LANG": ["expression"], 
     "LANGMATCHES": ["expression"], 
     "DATATYPE": ["expression"], 
     "BOUND": ["expression"], 
     "IRI": ["expression"], 
     "URI": ["expression"], 
     "BNODE": ["expression"], 
     "RAND": ["expression"], 
     "ABS": ["expression"], 
     "CEIL": ["expression"], 
     "FLOOR": ["expression"], 
     "ROUND": ["expression"], 
     "CONCAT": ["expression"], 
     "STRLEN": ["expression"], 
     "UCASE": ["expression"], 
     "LCASE": ["expression"], 
     "ENCODE_FOR_URI": ["expression"], 
     "CONTAINS": ["expression"], 
     "STRSTARTS": ["expression"], 
     "STRENDS": ["expression"], 
     "STRBEFORE": ["expression"], 
     "STRAFTER": ["expression"], 
     "YEAR": ["expression"], 
     "MONTH": ["expression"], 
     "DAY": ["expression"], 
     "HOURS": ["expression"], 
     "MINUTES": ["expression"], 
     "SECONDS": ["expression"], 
     "TIMEZONE": ["expression"], 
     "TZ": ["expression"], 
     "NOW": ["expression"], 
     "UUID": ["expression"], 
     "STRUUID": ["expression"], 
     "MD5": ["expression"], 
     "SHA1": ["expression"], 
     "SHA256": ["expression"], 
     "SHA384": ["expression"], 
     "SHA512": ["expression"], 
     "COALESCE": ["expression"], 
     "IF": ["expression"], 
     "STRLANG": ["expression"], 
     "STRDT": ["expression"], 
     "SAMETERM": ["expression"], 
     "ISIRI": ["expression"], 
     "ISURI": ["expression"], 
     "ISBLANK": ["expression"], 
     "ISLITERAL": ["expression"], 
     "ISNUMERIC": ["expression"], 
     "TRUE": ["expression"], 
     "FALSE": ["expression"], 
     "COUNT": ["expression"], 
     "SUM": ["expression"], 
     "MIN": ["expression"], 
     "MAX": ["expression"], 
     "AVG": ["expression"], 
     "SAMPLE": ["expression"], 
     "GROUP_CONCAT": ["expression"], 
     "SUBSTR": ["expression"], 
     "REPLACE": ["expression"], 
     "REGEX": ["expression"], 
     "EXISTS": ["expression"], 
     "NOT": ["expression"], 
     "IRI_REF": ["expression"], 
     "IRI_REF_START": ["expression"], 
     "INTEGER": ["expression"], 
     "DECIMAL": ["expression"], 
     "DOUBLE": ["expression"], 
     "INTEGER_POSITIVE": ["expression"], 
     "DECIMAL_POSITIVE": ["expression"], 
     "DOUBLE_POSITIVE": ["expression"], 
     "INTEGER_NEGATIVE": ["expression"], 
     "DECIMAL_NEGATIVE": ["expression"], 
     "DOUBLE_NEGATIVE": ["expression"], 
     "PNAME_LN": ["expression"], 
     "PNAME_NS": ["expression"], 
     "STRING_LITERAL1": ["expression"], 
     "STRING_LITERAL1_START": ["expression"], 
     "STRING_LITERAL2": ["expression"], 
     "STRING_LITERAL2_START": ["expression"], 
     "STRING_LITERAL_LONG1": ["expression"], 
     "STRING_LITERAL_LONG1_START": ["expression"], 
     "STRING_LITERAL_LONG2": ["expression"], 
     "STRING_LITERAL_LONG2_START": ["expression"]}, 
  "or([+or([var,[ (,expression,AS,var,)]]),*])" : {
     "(": ["+or([var,[ (,expression,AS,var,)]])"], 
     "VAR1": ["+or([var,[ (,expression,AS,var,)]])"], 
     "VAR2": ["+or([var,[ (,expression,AS,var,)]])"], 
     "*": ["*"]}, 
  "or([ASC,DESC])" : {
     "ASC": ["ASC"], 
     "DESC": ["DESC"]}, 
  "or([DISTINCT,REDUCED])" : {
     "DISTINCT": ["DISTINCT"], 
     "REDUCED": ["REDUCED"]}, 
  "or([ITERATOR,ITERATE])" : {
     "ITERATOR": ["ITERATOR"], 
     "ITERATE": ["ITERATE"]}, 
  "or([LANGTAG,[^^,iriRef]])" : {
     "LANGTAG": ["LANGTAG"], 
     "^^": ["[^^,iriRef]"]}, 
  "or([LANGTAG,[^^,xiri]])" : {
     "LANGTAG": ["LANGTAG"], 
     "^^": ["[^^,xiri]"]}, 
  "or([NIL,[ (,*var,)]])" : {
     "NIL": ["NIL"], 
     "(": ["[ (,*var,)]"]}, 
  "or([SOURCE,LOOK UP])" : {
     "SOURCE": ["SOURCE"], 
     "LOOK UP": ["LOOK UP"]}, 
  "or([STRING_LITERAL1,[STRING_LITERAL1_START,xString_Literal1_Sub]])" : {
     "STRING_LITERAL1": ["STRING_LITERAL1"], 
     "STRING_LITERAL1_START": ["[STRING_LITERAL1_START,xString_Literal1_Sub]"]}, 
  "or([STRING_LITERAL2,[STRING_LITERAL2_START,xString_Literal2_Sub]])" : {
     "STRING_LITERAL2": ["STRING_LITERAL2"], 
     "STRING_LITERAL2_START": ["[STRING_LITERAL2_START,xString_Literal2_Sub]"]}, 
  "or([STRING_LITERAL_LONG1,[STRING_LITERAL_LONG1_START,xString_Literal_Long1_Sub]])" : {
     "STRING_LITERAL_LONG1": ["STRING_LITERAL_LONG1"], 
     "STRING_LITERAL_LONG1_START": ["[STRING_LITERAL_LONG1_START,xString_Literal_Long1_Sub]"]}, 
  "or([STRING_LITERAL_LONG2,[STRING_LITERAL_LONG2_START,xString_Literal_Long2_Sub]])" : {
     "STRING_LITERAL_LONG2": ["STRING_LITERAL_LONG2"], 
     "STRING_LITERAL_LONG2_START": ["[STRING_LITERAL_LONG2_START,xString_Literal_Long2_Sub]"]}, 
  "or([WHEREVER,WHERE])" : {
     "WHEREVER": ["WHEREVER"], 
     "WHERE": ["WHERE"]}, 
  "or([[ (,*dataBlockValue,)],NIL])" : {
     "(": ["[ (,*dataBlockValue,)]"], 
     "NIL": ["NIL"]}, 
  "or([[ (,expression,)],NIL])" : {
     "(": ["[ (,expression,)]"], 
     "NIL": ["NIL"]}, 
  "or([[*,unaryExpression],[/,unaryExpression]])" : {
     "*": ["[*,unaryExpression]"], 
     "/": ["[/,unaryExpression]"]}, 
  "or([[+,multiplicativeExpression],[-,multiplicativeExpression],[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]])" : {
     "+": ["[+,multiplicativeExpression]"], 
     "-": ["[-,multiplicativeExpression]"], 
     "INTEGER_POSITIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DECIMAL_POSITIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DOUBLE_POSITIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "INTEGER_NEGATIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DECIMAL_NEGATIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"], 
     "DOUBLE_NEGATIVE": ["[or([numericLiteralPositive,numericLiteralNegative]),?or([[*,unaryExpression],[/,unaryExpression]])]"]}, 
  "or([[,,or([},[integer,}]])],}])" : {
     ",": ["[,,or([},[integer,}]])]"], 
     "}": ["}"]}, 
  "or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])" : {
     "=": ["[=,numericExpression]"], 
     "!=": ["[!=,numericExpression]"], 
     "<": ["[<,numericExpression]"], 
     ">": ["[>,numericExpression]"], 
     "<=": ["[<=,numericExpression]"], 
     ">=": ["[>=,numericExpression]"], 
     "IN": ["[IN,expressionList]"], 
     "NOT": ["[NOT,IN,expressionList]"]}, 
  "or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])" : {
     "IRI_REF_SUB": ["[IRI_REF_SUB,xiri_Sub]"], 
     "IRI_REF_END": ["IRI_REF_END"]}, 
  "or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])" : {
     "STRING_LITERAL1_SUB": ["[STRING_LITERAL1_SUB,xString_Literal1_Sub]"], 
     "STRING_LITERAL1_END": ["STRING_LITERAL1_END"]}, 
  "or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])" : {
     "STRING_LITERAL2_SUB": ["[STRING_LITERAL2_SUB,xString_Literal2_Sub]"], 
     "STRING_LITERAL2_END": ["STRING_LITERAL2_END"]}, 
  "or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])" : {
     "STRING_LITERAL_LONG1_SUB": ["[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub]"], 
     "STRING_LITERAL_LONG1_END": ["STRING_LITERAL_LONG1_END"]}, 
  "or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])" : {
     "STRING_LITERAL_LONG2_SUB": ["[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub]"], 
     "STRING_LITERAL_LONG2_END": ["STRING_LITERAL_LONG2_END"]}, 
  "or([[integer,or([[,,or([},[integer,}]])],}])],[,,integer,}]])" : {
     "INTEGER": ["[integer,or([[,,or([},[integer,}]])],}])]"], 
     ",": ["[,,integer,}]"]}, 
  "or([baseDecl,prefixDecl])" : {
     "BASE": ["baseDecl"], 
     "PREFIX": ["prefixDecl"]}, 
  "or([defaultGraphClause,namedGraphClause])" : {
     "IRI_REF": ["defaultGraphClause"], 
     "PNAME_LN": ["defaultGraphClause"], 
     "PNAME_NS": ["defaultGraphClause"], 
     "NAMED": ["namedGraphClause"]}, 
  "or([generateQuery1,generateQuery2])" : {
     "GENERATE": ["generateQuery1"], 
     "CONSTRUCT": ["generateQuery2"], 
     "WHEREVER": ["generateQuery2"], 
     "WHERE": ["generateQuery2"], 
     "FROM": ["generateQuery2"], 
     "ORDER": ["generateQuery2"], 
     "HAVING": ["generateQuery2"], 
     "GROUP": ["generateQuery2"], 
     "{": ["generateQuery2"], 
     "ITERATOR": ["generateQuery2"], 
     "ITERATE": ["generateQuery2"], 
     "SOURCE": ["generateQuery2"], 
     "LOOK UP": ["generateQuery2"], 
     "BIND": ["generateQuery2"], 
     "LIMIT": ["generateQuery2"], 
     "OFFSET": ["generateQuery2"]}, 
  "or([inlineDataOneVar,inlineDataFull])" : {
     "VAR1": ["inlineDataOneVar"], 
     "VAR2": ["inlineDataOneVar"], 
     "NIL": ["inlineDataFull"], 
     "(": ["inlineDataFull"]}, 
  "or([iriRef,[IRI_REF_START,xiri_Sub]])" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"], 
     "IRI_REF_START": ["[IRI_REF_START,xiri_Sub]"]}, 
  "or([iteratorClause,sourceClause,bind])" : {
     "ITERATOR": ["iteratorClause"], 
     "ITERATE": ["iteratorClause"], 
     "SOURCE": ["sourceClause"], 
     "LOOK UP": ["sourceClause"], 
     "BIND": ["bind"]}, 
  "or([numericLiteralPositive,numericLiteralNegative])" : {
     "INTEGER_POSITIVE": ["numericLiteralPositive"], 
     "DECIMAL_POSITIVE": ["numericLiteralPositive"], 
     "DOUBLE_POSITIVE": ["numericLiteralPositive"], 
     "INTEGER_NEGATIVE": ["numericLiteralNegative"], 
     "DECIMAL_NEGATIVE": ["numericLiteralNegative"], 
     "DOUBLE_NEGATIVE": ["numericLiteralNegative"]}, 
  "or([sourceSelector,generateTemplate])" : {
     "IRI_REF": ["sourceSelector"], 
     "PNAME_LN": ["sourceSelector"], 
     "PNAME_NS": ["sourceSelector"], 
     "{": ["generateTemplate"]}, 
  "or([subGenerateQuery1,subGenerateQuery2])" : {
     "GENERATE": ["subGenerateQuery1"], 
     "CONSTRUCT": ["subGenerateQuery2"], 
     "WHEREVER": ["subGenerateQuery2"], 
     "WHERE": ["subGenerateQuery2"], 
     "ORDER": ["subGenerateQuery2"], 
     "HAVING": ["subGenerateQuery2"], 
     "GROUP": ["subGenerateQuery2"], 
     "{": ["subGenerateQuery2"], 
     "ITERATOR": ["subGenerateQuery2"], 
     "ITERATE": ["subGenerateQuery2"], 
     "SOURCE": ["subGenerateQuery2"], 
     "LOOK UP": ["subGenerateQuery2"], 
     "BIND": ["subGenerateQuery2"], 
     "LIMIT": ["subGenerateQuery2"], 
     "OFFSET": ["subGenerateQuery2"]}, 
  "or([subSelect,groupGraphPatternSub])" : {
     "SELECT": ["subSelect"], 
     "{": ["groupGraphPatternSub"], 
     "OPTIONAL": ["groupGraphPatternSub"], 
     "MINUS": ["groupGraphPatternSub"], 
     "GRAPH": ["groupGraphPatternSub"], 
     "SERVICE": ["groupGraphPatternSub"], 
     "FILTER": ["groupGraphPatternSub"], 
     "BIND": ["groupGraphPatternSub"], 
     "VALUES": ["groupGraphPatternSub"], 
     "VAR1": ["groupGraphPatternSub"], 
     "VAR2": ["groupGraphPatternSub"], 
     "NIL": ["groupGraphPatternSub"], 
     "(": ["groupGraphPatternSub"], 
     "[": ["groupGraphPatternSub"], 
     "START_XEXPR": ["groupGraphPatternSub"], 
     "IRI_REF": ["groupGraphPatternSub"], 
     "IRI_REF_START": ["groupGraphPatternSub"], 
     "TRUE": ["groupGraphPatternSub"], 
     "FALSE": ["groupGraphPatternSub"], 
     "BLANK_NODE_LABEL": ["groupGraphPatternSub"], 
     "ANON": ["groupGraphPatternSub"], 
     "PNAME_LN": ["groupGraphPatternSub"], 
     "PNAME_NS": ["groupGraphPatternSub"], 
     "INTEGER": ["groupGraphPatternSub"], 
     "DECIMAL": ["groupGraphPatternSub"], 
     "DOUBLE": ["groupGraphPatternSub"], 
     "INTEGER_POSITIVE": ["groupGraphPatternSub"], 
     "DECIMAL_POSITIVE": ["groupGraphPatternSub"], 
     "DOUBLE_POSITIVE": ["groupGraphPatternSub"], 
     "INTEGER_NEGATIVE": ["groupGraphPatternSub"], 
     "DECIMAL_NEGATIVE": ["groupGraphPatternSub"], 
     "DOUBLE_NEGATIVE": ["groupGraphPatternSub"], 
     "STRING_LITERAL1": ["groupGraphPatternSub"], 
     "STRING_LITERAL1_START": ["groupGraphPatternSub"], 
     "STRING_LITERAL2": ["groupGraphPatternSub"], 
     "STRING_LITERAL2_START": ["groupGraphPatternSub"], 
     "STRING_LITERAL_LONG1": ["groupGraphPatternSub"], 
     "STRING_LITERAL_LONG1_START": ["groupGraphPatternSub"], 
     "STRING_LITERAL_LONG2": ["groupGraphPatternSub"], 
     "STRING_LITERAL_LONG2_START": ["groupGraphPatternSub"], 
     "}": ["groupGraphPatternSub"]}, 
  "or([var,[ (,expression,AS,var,)]])" : {
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "(": ["[ (,expression,AS,var,)]"]}, 
  "or([var,xExpr])" : {
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "START_XEXPR": ["xExpr"]}, 
  "or([verbPath,verbSimple])" : {
     "^": ["verbPath"], 
     "a": ["verbPath"], 
     "!": ["verbPath"], 
     "(": ["verbPath"], 
     "IRI_REF": ["verbPath"], 
     "IRI_REF_START": ["verbPath"], 
     "PNAME_LN": ["verbPath"], 
     "PNAME_NS": ["verbPath"], 
     "VAR1": ["verbSimple"], 
     "VAR2": ["verbSimple"], 
     "START_XEXPR": ["verbSimple"]}, 
  "or([xiri,a])" : {
     "IRI_REF": ["xiri"], 
     "IRI_REF_START": ["xiri"], 
     "PNAME_LN": ["xiri"], 
     "PNAME_NS": ["xiri"], 
     "a": ["a"]}, 
  "or([},[integer,}]])" : {
     "}": ["}"], 
     "INTEGER": ["[integer,}]"]}, 
  "orderClause" : {
     "ORDER": ["ORDER","BY","+orderCondition"]}, 
  "orderCondition" : {
     "ASC": ["or([ASC,DESC])","brackettedExpression"], 
     "DESC": ["or([ASC,DESC])","brackettedExpression"], 
     "(": ["constraint"], 
     "STR": ["constraint"], 
     "LANG": ["constraint"], 
     "LANGMATCHES": ["constraint"], 
     "DATATYPE": ["constraint"], 
     "BOUND": ["constraint"], 
     "IRI": ["constraint"], 
     "URI": ["constraint"], 
     "BNODE": ["constraint"], 
     "RAND": ["constraint"], 
     "ABS": ["constraint"], 
     "CEIL": ["constraint"], 
     "FLOOR": ["constraint"], 
     "ROUND": ["constraint"], 
     "CONCAT": ["constraint"], 
     "STRLEN": ["constraint"], 
     "UCASE": ["constraint"], 
     "LCASE": ["constraint"], 
     "ENCODE_FOR_URI": ["constraint"], 
     "CONTAINS": ["constraint"], 
     "STRSTARTS": ["constraint"], 
     "STRENDS": ["constraint"], 
     "STRBEFORE": ["constraint"], 
     "STRAFTER": ["constraint"], 
     "YEAR": ["constraint"], 
     "MONTH": ["constraint"], 
     "DAY": ["constraint"], 
     "HOURS": ["constraint"], 
     "MINUTES": ["constraint"], 
     "SECONDS": ["constraint"], 
     "TIMEZONE": ["constraint"], 
     "TZ": ["constraint"], 
     "NOW": ["constraint"], 
     "UUID": ["constraint"], 
     "STRUUID": ["constraint"], 
     "MD5": ["constraint"], 
     "SHA1": ["constraint"], 
     "SHA256": ["constraint"], 
     "SHA384": ["constraint"], 
     "SHA512": ["constraint"], 
     "COALESCE": ["constraint"], 
     "IF": ["constraint"], 
     "STRLANG": ["constraint"], 
     "STRDT": ["constraint"], 
     "SAMETERM": ["constraint"], 
     "ISIRI": ["constraint"], 
     "ISURI": ["constraint"], 
     "ISBLANK": ["constraint"], 
     "ISLITERAL": ["constraint"], 
     "ISNUMERIC": ["constraint"], 
     "SUBSTR": ["constraint"], 
     "REPLACE": ["constraint"], 
     "REGEX": ["constraint"], 
     "EXISTS": ["constraint"], 
     "NOT": ["constraint"], 
     "IRI_REF": ["constraint"], 
     "PNAME_LN": ["constraint"], 
     "PNAME_NS": ["constraint"], 
     "VAR1": ["var"], 
     "VAR2": ["var"]}, 
  "path" : {
     "^": ["pathAlternative"], 
     "a": ["pathAlternative"], 
     "!": ["pathAlternative"], 
     "(": ["pathAlternative"], 
     "IRI_REF": ["pathAlternative"], 
     "IRI_REF_START": ["pathAlternative"], 
     "PNAME_LN": ["pathAlternative"], 
     "PNAME_NS": ["pathAlternative"]}, 
  "pathAlternative" : {
     "^": ["pathSequence","*[|,pathSequence]"], 
     "a": ["pathSequence","*[|,pathSequence]"], 
     "!": ["pathSequence","*[|,pathSequence]"], 
     "(": ["pathSequence","*[|,pathSequence]"], 
     "IRI_REF": ["pathSequence","*[|,pathSequence]"], 
     "IRI_REF_START": ["pathSequence","*[|,pathSequence]"], 
     "PNAME_LN": ["pathSequence","*[|,pathSequence]"], 
     "PNAME_NS": ["pathSequence","*[|,pathSequence]"]}, 
  "pathElt" : {
     "a": ["pathPrimary","?pathMod"], 
     "!": ["pathPrimary","?pathMod"], 
     "(": ["pathPrimary","?pathMod"], 
     "IRI_REF": ["pathPrimary","?pathMod"], 
     "IRI_REF_START": ["pathPrimary","?pathMod"], 
     "PNAME_LN": ["pathPrimary","?pathMod"], 
     "PNAME_NS": ["pathPrimary","?pathMod"]}, 
  "pathEltOrInverse" : {
     "a": ["pathElt"], 
     "!": ["pathElt"], 
     "(": ["pathElt"], 
     "IRI_REF": ["pathElt"], 
     "IRI_REF_START": ["pathElt"], 
     "PNAME_LN": ["pathElt"], 
     "PNAME_NS": ["pathElt"], 
     "^": ["^","pathElt"]}, 
  "pathMod" : {
     "*": ["*"], 
     "?": ["?"], 
     "+": ["+"], 
     "{": ["{","or([[integer,or([[,,or([},[integer,}]])],}])],[,,integer,}]])"]}, 
  "pathNegatedPropertySet" : {
     "a": ["pathOneInPropertySet"], 
     "^": ["pathOneInPropertySet"], 
     "IRI_REF": ["pathOneInPropertySet"], 
     "IRI_REF_START": ["pathOneInPropertySet"], 
     "PNAME_LN": ["pathOneInPropertySet"], 
     "PNAME_NS": ["pathOneInPropertySet"], 
     "(": ["(","?[pathOneInPropertySet,*[|,pathOneInPropertySet]]",")"]}, 
  "pathOneInPropertySet" : {
     "IRI_REF": ["xiri"], 
     "IRI_REF_START": ["xiri"], 
     "PNAME_LN": ["xiri"], 
     "PNAME_NS": ["xiri"], 
     "a": ["a"], 
     "^": ["^","or([xiri,a])"]}, 
  "pathPrimary" : {
     "IRI_REF": ["storeProperty","xiri"], 
     "IRI_REF_START": ["storeProperty","xiri"], 
     "PNAME_LN": ["storeProperty","xiri"], 
     "PNAME_NS": ["storeProperty","xiri"], 
     "a": ["storeProperty","a"], 
     "!": ["!","pathNegatedPropertySet"], 
     "(": ["(","path",")"]}, 
  "pathSequence" : {
     "^": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "a": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "!": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "(": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "IRI_REF": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "IRI_REF_START": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "PNAME_LN": ["pathEltOrInverse","*[/,pathEltOrInverse]"], 
     "PNAME_NS": ["pathEltOrInverse","*[/,pathEltOrInverse]"]}, 
  "prefixDecl" : {
     "PREFIX": ["PREFIX","PNAME_NS","IRI_REF"]}, 
  "prefixedName" : {
     "PNAME_LN": ["PNAME_LN"], 
     "PNAME_NS": ["PNAME_NS"]}, 
  "primaryExpression" : {
     "(": ["brackettedExpression"], 
     "STR": ["builtInCall"], 
     "LANG": ["builtInCall"], 
     "LANGMATCHES": ["builtInCall"], 
     "DATATYPE": ["builtInCall"], 
     "BOUND": ["builtInCall"], 
     "IRI": ["builtInCall"], 
     "URI": ["builtInCall"], 
     "BNODE": ["builtInCall"], 
     "RAND": ["builtInCall"], 
     "ABS": ["builtInCall"], 
     "CEIL": ["builtInCall"], 
     "FLOOR": ["builtInCall"], 
     "ROUND": ["builtInCall"], 
     "CONCAT": ["builtInCall"], 
     "STRLEN": ["builtInCall"], 
     "UCASE": ["builtInCall"], 
     "LCASE": ["builtInCall"], 
     "ENCODE_FOR_URI": ["builtInCall"], 
     "CONTAINS": ["builtInCall"], 
     "STRSTARTS": ["builtInCall"], 
     "STRENDS": ["builtInCall"], 
     "STRBEFORE": ["builtInCall"], 
     "STRAFTER": ["builtInCall"], 
     "YEAR": ["builtInCall"], 
     "MONTH": ["builtInCall"], 
     "DAY": ["builtInCall"], 
     "HOURS": ["builtInCall"], 
     "MINUTES": ["builtInCall"], 
     "SECONDS": ["builtInCall"], 
     "TIMEZONE": ["builtInCall"], 
     "TZ": ["builtInCall"], 
     "NOW": ["builtInCall"], 
     "UUID": ["builtInCall"], 
     "STRUUID": ["builtInCall"], 
     "MD5": ["builtInCall"], 
     "SHA1": ["builtInCall"], 
     "SHA256": ["builtInCall"], 
     "SHA384": ["builtInCall"], 
     "SHA512": ["builtInCall"], 
     "COALESCE": ["builtInCall"], 
     "IF": ["builtInCall"], 
     "STRLANG": ["builtInCall"], 
     "STRDT": ["builtInCall"], 
     "SAMETERM": ["builtInCall"], 
     "ISIRI": ["builtInCall"], 
     "ISURI": ["builtInCall"], 
     "ISBLANK": ["builtInCall"], 
     "ISLITERAL": ["builtInCall"], 
     "ISNUMERIC": ["builtInCall"], 
     "SUBSTR": ["builtInCall"], 
     "REPLACE": ["builtInCall"], 
     "REGEX": ["builtInCall"], 
     "EXISTS": ["builtInCall"], 
     "NOT": ["builtInCall"], 
     "IRI_REF": ["xiriOrFunction"], 
     "IRI_REF_START": ["xiriOrFunction"], 
     "PNAME_LN": ["xiriOrFunction"], 
     "PNAME_NS": ["xiriOrFunction"], 
     "STRING_LITERAL1": ["xRDFLiteral"], 
     "STRING_LITERAL1_START": ["xRDFLiteral"], 
     "STRING_LITERAL2": ["xRDFLiteral"], 
     "STRING_LITERAL2_START": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG1": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG1_START": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG2": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG2_START": ["xRDFLiteral"], 
     "INTEGER": ["numericLiteral"], 
     "DECIMAL": ["numericLiteral"], 
     "DOUBLE": ["numericLiteral"], 
     "INTEGER_POSITIVE": ["numericLiteral"], 
     "DECIMAL_POSITIVE": ["numericLiteral"], 
     "DOUBLE_POSITIVE": ["numericLiteral"], 
     "INTEGER_NEGATIVE": ["numericLiteral"], 
     "DECIMAL_NEGATIVE": ["numericLiteral"], 
     "DOUBLE_NEGATIVE": ["numericLiteral"], 
     "TRUE": ["booleanLiteral"], 
     "FALSE": ["booleanLiteral"], 
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "COUNT": ["aggregate"], 
     "SUM": ["aggregate"], 
     "MIN": ["aggregate"], 
     "MAX": ["aggregate"], 
     "AVG": ["aggregate"], 
     "SAMPLE": ["aggregate"], 
     "GROUP_CONCAT": ["aggregate"]}, 
  "prologue" : {
     "BASE": ["*or([baseDecl,prefixDecl])"], 
     "PREFIX": ["*or([baseDecl,prefixDecl])"], 
     "GENERATE": ["*or([baseDecl,prefixDecl])"], 
     "CONSTRUCT": ["*or([baseDecl,prefixDecl])"], 
     "WHEREVER": ["*or([baseDecl,prefixDecl])"], 
     "WHERE": ["*or([baseDecl,prefixDecl])"], 
     "FROM": ["*or([baseDecl,prefixDecl])"], 
     "ORDER": ["*or([baseDecl,prefixDecl])"], 
     "HAVING": ["*or([baseDecl,prefixDecl])"], 
     "GROUP": ["*or([baseDecl,prefixDecl])"], 
     "{": ["*or([baseDecl,prefixDecl])"], 
     "ITERATOR": ["*or([baseDecl,prefixDecl])"], 
     "ITERATE": ["*or([baseDecl,prefixDecl])"], 
     "SOURCE": ["*or([baseDecl,prefixDecl])"], 
     "LOOK UP": ["*or([baseDecl,prefixDecl])"], 
     "BIND": ["*or([baseDecl,prefixDecl])"], 
     "LIMIT": ["*or([baseDecl,prefixDecl])"], 
     "OFFSET": ["*or([baseDecl,prefixDecl])"]}, 
  "propertyList" : {
     "a": ["propertyListNotEmpty"], 
     "VAR1": ["propertyListNotEmpty"], 
     "VAR2": ["propertyListNotEmpty"], 
     "NIL": ["propertyListNotEmpty"], 
     "START_XEXPR": ["propertyListNotEmpty"], 
     "IRI_REF": ["propertyListNotEmpty"], 
     "IRI_REF_START": ["propertyListNotEmpty"], 
     "TRUE": ["propertyListNotEmpty"], 
     "FALSE": ["propertyListNotEmpty"], 
     "BLANK_NODE_LABEL": ["propertyListNotEmpty"], 
     "ANON": ["propertyListNotEmpty"], 
     "PNAME_LN": ["propertyListNotEmpty"], 
     "PNAME_NS": ["propertyListNotEmpty"], 
     "INTEGER": ["propertyListNotEmpty"], 
     "DECIMAL": ["propertyListNotEmpty"], 
     "DOUBLE": ["propertyListNotEmpty"], 
     "INTEGER_POSITIVE": ["propertyListNotEmpty"], 
     "DECIMAL_POSITIVE": ["propertyListNotEmpty"], 
     "DOUBLE_POSITIVE": ["propertyListNotEmpty"], 
     "INTEGER_NEGATIVE": ["propertyListNotEmpty"], 
     "DECIMAL_NEGATIVE": ["propertyListNotEmpty"], 
     "DOUBLE_NEGATIVE": ["propertyListNotEmpty"], 
     "STRING_LITERAL1": ["propertyListNotEmpty"], 
     "STRING_LITERAL1_START": ["propertyListNotEmpty"], 
     "STRING_LITERAL2": ["propertyListNotEmpty"], 
     "STRING_LITERAL2_START": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1_START": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2_START": ["propertyListNotEmpty"], 
     ".": [], 
     "}": [], 
     "GENERATE": [], 
     "CONSTRUCT": [], 
     "WHEREVER": [], 
     "WHERE": [], 
     "ORDER": [], 
     "HAVING": [], 
     "GROUP": [], 
     "{": [], 
     "ITERATOR": [], 
     "ITERATE": [], 
     "SOURCE": [], 
     "LOOK UP": [], 
     "BIND": [], 
     "LIMIT": [], 
     "OFFSET": []}, 
  "propertyListNotEmpty" : {
     "a": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "VAR1": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "VAR2": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "NIL": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "START_XEXPR": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "IRI_REF": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "IRI_REF_START": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "TRUE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "FALSE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "BLANK_NODE_LABEL": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "ANON": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "PNAME_LN": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "PNAME_NS": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "INTEGER": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "DECIMAL": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "DOUBLE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "INTEGER_POSITIVE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "DECIMAL_POSITIVE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "DOUBLE_POSITIVE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "INTEGER_NEGATIVE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "DECIMAL_NEGATIVE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "DOUBLE_NEGATIVE": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL1": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL1_START": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL2": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL2_START": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL_LONG1": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL_LONG1_START": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL_LONG2": ["verb","objectList","*[;,?[verb,objectList]]"], 
     "STRING_LITERAL_LONG2_START": ["verb","objectList","*[;,?[verb,objectList]]"]}, 
  "propertyListPath" : {
     "a": ["propertyListNotEmpty"], 
     "VAR1": ["propertyListNotEmpty"], 
     "VAR2": ["propertyListNotEmpty"], 
     "NIL": ["propertyListNotEmpty"], 
     "START_XEXPR": ["propertyListNotEmpty"], 
     "IRI_REF": ["propertyListNotEmpty"], 
     "IRI_REF_START": ["propertyListNotEmpty"], 
     "TRUE": ["propertyListNotEmpty"], 
     "FALSE": ["propertyListNotEmpty"], 
     "BLANK_NODE_LABEL": ["propertyListNotEmpty"], 
     "ANON": ["propertyListNotEmpty"], 
     "PNAME_LN": ["propertyListNotEmpty"], 
     "PNAME_NS": ["propertyListNotEmpty"], 
     "INTEGER": ["propertyListNotEmpty"], 
     "DECIMAL": ["propertyListNotEmpty"], 
     "DOUBLE": ["propertyListNotEmpty"], 
     "INTEGER_POSITIVE": ["propertyListNotEmpty"], 
     "DECIMAL_POSITIVE": ["propertyListNotEmpty"], 
     "DOUBLE_POSITIVE": ["propertyListNotEmpty"], 
     "INTEGER_NEGATIVE": ["propertyListNotEmpty"], 
     "DECIMAL_NEGATIVE": ["propertyListNotEmpty"], 
     "DOUBLE_NEGATIVE": ["propertyListNotEmpty"], 
     "STRING_LITERAL1": ["propertyListNotEmpty"], 
     "STRING_LITERAL1_START": ["propertyListNotEmpty"], 
     "STRING_LITERAL2": ["propertyListNotEmpty"], 
     "STRING_LITERAL2_START": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1_START": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2": ["propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2_START": ["propertyListNotEmpty"], 
     ".": [], 
     "{": [], 
     "OPTIONAL": [], 
     "MINUS": [], 
     "GRAPH": [], 
     "SERVICE": [], 
     "FILTER": [], 
     "BIND": [], 
     "VALUES": [], 
     "}": []}, 
  "propertyListPathNotEmpty" : {
     "VAR1": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "VAR2": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "START_XEXPR": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "^": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "a": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "!": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "(": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "IRI_REF": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "IRI_REF_START": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "PNAME_LN": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"], 
     "PNAME_NS": ["or([verbPath,verbSimple])","objectListPath","*[;,?[or([verbPath,verbSimple]),objectList]]"]}, 
  "rdfLiteral" : {
     "STRING_LITERAL1": ["string","?or([LANGTAG,[^^,iriRef]])"], 
     "STRING_LITERAL2": ["string","?or([LANGTAG,[^^,iriRef]])"], 
     "STRING_LITERAL_LONG1": ["string","?or([LANGTAG,[^^,iriRef]])"], 
     "STRING_LITERAL_LONG2": ["string","?or([LANGTAG,[^^,iriRef]])"]}, 
  "regexExpression" : {
     "REGEX": ["REGEX","(","expression",",","expression","?[,,expression]",")"]}, 
  "relationalExpression" : {
     "!": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "+": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "-": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "VAR1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "VAR2": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "(": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "LANG": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "LANGMATCHES": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DATATYPE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "BOUND": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IRI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "URI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "BNODE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "RAND": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ABS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "CEIL": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "FLOOR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ROUND": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "CONCAT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRLEN": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "UCASE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "LCASE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ENCODE_FOR_URI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "CONTAINS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRSTARTS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRENDS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRBEFORE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRAFTER": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "YEAR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MONTH": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DAY": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "HOURS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MINUTES": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SECONDS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "TIMEZONE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "TZ": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "NOW": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "UUID": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRUUID": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MD5": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA256": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA384": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SHA512": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "COALESCE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IF": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRLANG": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRDT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SAMETERM": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISIRI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISURI": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISBLANK": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISLITERAL": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "ISNUMERIC": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "TRUE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "FALSE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "COUNT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SUM": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MIN": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "MAX": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "AVG": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SAMPLE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "GROUP_CONCAT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "SUBSTR": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "REPLACE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "REGEX": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "EXISTS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "NOT": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IRI_REF": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "IRI_REF_START": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "INTEGER": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DECIMAL": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DOUBLE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "INTEGER_POSITIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DECIMAL_POSITIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DOUBLE_POSITIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "INTEGER_NEGATIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DECIMAL_NEGATIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "DOUBLE_NEGATIVE": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "PNAME_LN": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "PNAME_NS": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL1_START": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL2": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL2_START": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL_LONG1": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL_LONG1_START": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL_LONG2": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"], 
     "STRING_LITERAL_LONG2_START": ["numericExpression","?or([[=,numericExpression],[!=,numericExpression],[<,numericExpression],[>,numericExpression],[<=,numericExpression],[>=,numericExpression],[IN,expressionList],[NOT,IN,expressionList]])"]}, 
  "selectClause" : {
     "SELECT": ["SELECT","?or([DISTINCT,REDUCED])","or([+or([var,[ (,expression,AS,var,)]]),*])"]}, 
  "serviceGraphPattern" : {
     "SERVICE": ["SERVICE","?SILENT","varOrXIri","groupGraphPattern"]}, 
  "solutionModifier" : {
     "LIMIT": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "OFFSET": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "ORDER": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "HAVING": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "GROUP": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "CONSTRUCT": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     ".": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "VALUES": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "$": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"], 
     "}": ["?groupClause","?havingClause","?orderClause","?limitOffsetClauses"]}, 
  "sourceClause" : {
     "SOURCE": ["or([SOURCE,LOOK UP])","varOrXIri","?[ACCEPT,varOrXIri]","AS","var"], 
     "LOOK UP": ["or([SOURCE,LOOK UP])","varOrXIri","?[ACCEPT,varOrXIri]","AS","var"]}, 
  "sourceSelector" : {
     "IRI_REF": ["iriRef"], 
     "PNAME_LN": ["iriRef"], 
     "PNAME_NS": ["iriRef"]}, 
  "sparql11" : {
     "GENERATE": ["generateUnit","$"], 
     "CONSTRUCT": ["generateUnit","$"], 
     "WHEREVER": ["generateUnit","$"], 
     "WHERE": ["generateUnit","$"], 
     "FROM": ["generateUnit","$"], 
     "BASE": ["generateUnit","$"], 
     "PREFIX": ["generateUnit","$"], 
     "ORDER": ["generateUnit","$"], 
     "HAVING": ["generateUnit","$"], 
     "GROUP": ["generateUnit","$"], 
     "{": ["generateUnit","$"], 
     "ITERATOR": ["generateUnit","$"], 
     "ITERATE": ["generateUnit","$"], 
     "SOURCE": ["generateUnit","$"], 
     "LOOK UP": ["generateUnit","$"], 
     "BIND": ["generateUnit","$"], 
     "LIMIT": ["generateUnit","$"], 
     "OFFSET": ["generateUnit","$"]}, 
  "storeProperty" : {
     "VAR1": [], 
     "VAR2": [], 
     "NIL": [], 
     "START_XEXPR": [], 
     "IRI_REF": [], 
     "IRI_REF_START": [], 
     "TRUE": [], 
     "FALSE": [], 
     "BLANK_NODE_LABEL": [], 
     "ANON": [], 
     "PNAME_LN": [], 
     "PNAME_NS": [], 
     "INTEGER": [], 
     "DECIMAL": [], 
     "DOUBLE": [], 
     "INTEGER_POSITIVE": [], 
     "DECIMAL_POSITIVE": [], 
     "DOUBLE_POSITIVE": [], 
     "INTEGER_NEGATIVE": [], 
     "DECIMAL_NEGATIVE": [], 
     "DOUBLE_NEGATIVE": [], 
     "STRING_LITERAL1": [], 
     "STRING_LITERAL1_START": [], 
     "STRING_LITERAL2": [], 
     "STRING_LITERAL2_START": [], 
     "STRING_LITERAL_LONG1": [], 
     "STRING_LITERAL_LONG1_START": [], 
     "STRING_LITERAL_LONG2": [], 
     "STRING_LITERAL_LONG2_START": [], 
     "a": []}, 
  "strReplaceExpression" : {
     "REPLACE": ["REPLACE","(","expression",",","expression",",","expression","?[,,expression]",")"]}, 
  "string" : {
     "STRING_LITERAL1": ["STRING_LITERAL1"], 
     "STRING_LITERAL2": ["STRING_LITERAL2"], 
     "STRING_LITERAL_LONG1": ["STRING_LITERAL_LONG1"], 
     "STRING_LITERAL_LONG2": ["STRING_LITERAL_LONG2"]}, 
  "subGenerateQuery1" : {
     "GENERATE": ["GENERATE","or([sourceSelector,generateTemplate])","*iteratorOrSourceClause","?whereClause","solutionModifier","."]}, 
  "subGenerateQuery2" : {
     "CONSTRUCT": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "ORDER": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "HAVING": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "GROUP": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "LIMIT": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "OFFSET": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "WHEREVER": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "WHERE": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "{": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "ITERATOR": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "ITERATE": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "SOURCE": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "LOOK UP": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."], 
     "BIND": ["*iteratorOrSourceClause","?whereClause","solutionModifier","CONSTRUCT","or([sourceSelector,generateTemplate])","."]}, 
  "subSelect" : {
     "SELECT": ["selectClause","whereClause","solutionModifier","valuesClause"]}, 
  "substringExpression" : {
     "SUBSTR": ["SUBSTR","(","expression",",","expression","?[,,expression]",")"]}, 
  "switchToParsingXIRI" : {
     "IRI_REF_SUB": [], 
     "IRI_REF_END": []}, 
  "switchToParsingXL1" : {
     "STRING_LITERAL_LONG1_SUB": [], 
     "STRING_LITERAL_LONG1_END": []}, 
  "switchToParsingXL2" : {
     "STRING_LITERAL_LONG2_SUB": [], 
     "STRING_LITERAL_LONG2_END": []}, 
  "switchToParsingXS1" : {
     "STRING_LITERAL1_SUB": [], 
     "STRING_LITERAL1_END": []}, 
  "switchToParsingXS2" : {
     "STRING_LITERAL2_SUB": [], 
     "STRING_LITERAL2_END": []}, 
  "triplesBlock" : {
     "VAR1": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "VAR2": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "NIL": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "(": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "[": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "START_XEXPR": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "IRI_REF": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "IRI_REF_START": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "TRUE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "FALSE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "BLANK_NODE_LABEL": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "ANON": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "PNAME_LN": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "PNAME_NS": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "INTEGER": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DECIMAL": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DOUBLE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "INTEGER_POSITIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DECIMAL_POSITIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DOUBLE_POSITIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "INTEGER_NEGATIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DECIMAL_NEGATIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "DOUBLE_NEGATIVE": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL1": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL1_START": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL2": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL2_START": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL_LONG1": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL_LONG1_START": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL_LONG2": ["triplesSameSubjectPath","?[.,?triplesBlock]"], 
     "STRING_LITERAL_LONG2_START": ["triplesSameSubjectPath","?[.,?triplesBlock]"]}, 
  "triplesNode" : {
     "(": ["collection"], 
     "[": ["blankNodePropertyList"]}, 
  "triplesNodePath" : {
     "(": ["collectionPath"], 
     "[": ["blankNodePropertyListPath"]}, 
  "triplesSameSubject" : {
     "VAR1": ["varOrXTerm","propertyListNotEmpty"], 
     "VAR2": ["varOrXTerm","propertyListNotEmpty"], 
     "NIL": ["varOrXTerm","propertyListNotEmpty"], 
     "START_XEXPR": ["varOrXTerm","propertyListNotEmpty"], 
     "IRI_REF": ["varOrXTerm","propertyListNotEmpty"], 
     "IRI_REF_START": ["varOrXTerm","propertyListNotEmpty"], 
     "TRUE": ["varOrXTerm","propertyListNotEmpty"], 
     "FALSE": ["varOrXTerm","propertyListNotEmpty"], 
     "BLANK_NODE_LABEL": ["varOrXTerm","propertyListNotEmpty"], 
     "ANON": ["varOrXTerm","propertyListNotEmpty"], 
     "PNAME_LN": ["varOrXTerm","propertyListNotEmpty"], 
     "PNAME_NS": ["varOrXTerm","propertyListNotEmpty"], 
     "INTEGER": ["varOrXTerm","propertyListNotEmpty"], 
     "DECIMAL": ["varOrXTerm","propertyListNotEmpty"], 
     "DOUBLE": ["varOrXTerm","propertyListNotEmpty"], 
     "INTEGER_POSITIVE": ["varOrXTerm","propertyListNotEmpty"], 
     "DECIMAL_POSITIVE": ["varOrXTerm","propertyListNotEmpty"], 
     "DOUBLE_POSITIVE": ["varOrXTerm","propertyListNotEmpty"], 
     "INTEGER_NEGATIVE": ["varOrXTerm","propertyListNotEmpty"], 
     "DECIMAL_NEGATIVE": ["varOrXTerm","propertyListNotEmpty"], 
     "DOUBLE_NEGATIVE": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL1": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL1_START": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL2": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL2_START": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL_LONG1_START": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2": ["varOrXTerm","propertyListNotEmpty"], 
     "STRING_LITERAL_LONG2_START": ["varOrXTerm","propertyListNotEmpty"], 
     "(": ["triplesNode","propertyList"], 
     "[": ["triplesNode","propertyList"]}, 
  "triplesSameSubjectPath" : {
     "VAR1": ["varOrXTerm","propertyListPathNotEmpty"], 
     "VAR2": ["varOrXTerm","propertyListPathNotEmpty"], 
     "NIL": ["varOrXTerm","propertyListPathNotEmpty"], 
     "START_XEXPR": ["varOrXTerm","propertyListPathNotEmpty"], 
     "IRI_REF": ["varOrXTerm","propertyListPathNotEmpty"], 
     "IRI_REF_START": ["varOrXTerm","propertyListPathNotEmpty"], 
     "TRUE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "FALSE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "BLANK_NODE_LABEL": ["varOrXTerm","propertyListPathNotEmpty"], 
     "ANON": ["varOrXTerm","propertyListPathNotEmpty"], 
     "PNAME_LN": ["varOrXTerm","propertyListPathNotEmpty"], 
     "PNAME_NS": ["varOrXTerm","propertyListPathNotEmpty"], 
     "INTEGER": ["varOrXTerm","propertyListPathNotEmpty"], 
     "DECIMAL": ["varOrXTerm","propertyListPathNotEmpty"], 
     "DOUBLE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "INTEGER_POSITIVE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "DECIMAL_POSITIVE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "DOUBLE_POSITIVE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "INTEGER_NEGATIVE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "DECIMAL_NEGATIVE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "DOUBLE_NEGATIVE": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL1": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL1_START": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL2": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL2_START": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL_LONG1": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL_LONG1_START": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL_LONG2": ["varOrXTerm","propertyListPathNotEmpty"], 
     "STRING_LITERAL_LONG2_START": ["varOrXTerm","propertyListPathNotEmpty"], 
     "(": ["triplesNodePath","propertyListPath"], 
     "[": ["triplesNodePath","propertyListPath"]}, 
  "unaryExpression" : {
     "!": ["!","primaryExpression"], 
     "+": ["+","primaryExpression"], 
     "-": ["-","primaryExpression"], 
     "VAR1": ["primaryExpression"], 
     "VAR2": ["primaryExpression"], 
     "(": ["primaryExpression"], 
     "STR": ["primaryExpression"], 
     "LANG": ["primaryExpression"], 
     "LANGMATCHES": ["primaryExpression"], 
     "DATATYPE": ["primaryExpression"], 
     "BOUND": ["primaryExpression"], 
     "IRI": ["primaryExpression"], 
     "URI": ["primaryExpression"], 
     "BNODE": ["primaryExpression"], 
     "RAND": ["primaryExpression"], 
     "ABS": ["primaryExpression"], 
     "CEIL": ["primaryExpression"], 
     "FLOOR": ["primaryExpression"], 
     "ROUND": ["primaryExpression"], 
     "CONCAT": ["primaryExpression"], 
     "STRLEN": ["primaryExpression"], 
     "UCASE": ["primaryExpression"], 
     "LCASE": ["primaryExpression"], 
     "ENCODE_FOR_URI": ["primaryExpression"], 
     "CONTAINS": ["primaryExpression"], 
     "STRSTARTS": ["primaryExpression"], 
     "STRENDS": ["primaryExpression"], 
     "STRBEFORE": ["primaryExpression"], 
     "STRAFTER": ["primaryExpression"], 
     "YEAR": ["primaryExpression"], 
     "MONTH": ["primaryExpression"], 
     "DAY": ["primaryExpression"], 
     "HOURS": ["primaryExpression"], 
     "MINUTES": ["primaryExpression"], 
     "SECONDS": ["primaryExpression"], 
     "TIMEZONE": ["primaryExpression"], 
     "TZ": ["primaryExpression"], 
     "NOW": ["primaryExpression"], 
     "UUID": ["primaryExpression"], 
     "STRUUID": ["primaryExpression"], 
     "MD5": ["primaryExpression"], 
     "SHA1": ["primaryExpression"], 
     "SHA256": ["primaryExpression"], 
     "SHA384": ["primaryExpression"], 
     "SHA512": ["primaryExpression"], 
     "COALESCE": ["primaryExpression"], 
     "IF": ["primaryExpression"], 
     "STRLANG": ["primaryExpression"], 
     "STRDT": ["primaryExpression"], 
     "SAMETERM": ["primaryExpression"], 
     "ISIRI": ["primaryExpression"], 
     "ISURI": ["primaryExpression"], 
     "ISBLANK": ["primaryExpression"], 
     "ISLITERAL": ["primaryExpression"], 
     "ISNUMERIC": ["primaryExpression"], 
     "TRUE": ["primaryExpression"], 
     "FALSE": ["primaryExpression"], 
     "COUNT": ["primaryExpression"], 
     "SUM": ["primaryExpression"], 
     "MIN": ["primaryExpression"], 
     "MAX": ["primaryExpression"], 
     "AVG": ["primaryExpression"], 
     "SAMPLE": ["primaryExpression"], 
     "GROUP_CONCAT": ["primaryExpression"], 
     "SUBSTR": ["primaryExpression"], 
     "REPLACE": ["primaryExpression"], 
     "REGEX": ["primaryExpression"], 
     "EXISTS": ["primaryExpression"], 
     "NOT": ["primaryExpression"], 
     "IRI_REF": ["primaryExpression"], 
     "IRI_REF_START": ["primaryExpression"], 
     "INTEGER": ["primaryExpression"], 
     "DECIMAL": ["primaryExpression"], 
     "DOUBLE": ["primaryExpression"], 
     "INTEGER_POSITIVE": ["primaryExpression"], 
     "DECIMAL_POSITIVE": ["primaryExpression"], 
     "DOUBLE_POSITIVE": ["primaryExpression"], 
     "INTEGER_NEGATIVE": ["primaryExpression"], 
     "DECIMAL_NEGATIVE": ["primaryExpression"], 
     "DOUBLE_NEGATIVE": ["primaryExpression"], 
     "PNAME_LN": ["primaryExpression"], 
     "PNAME_NS": ["primaryExpression"], 
     "STRING_LITERAL1": ["primaryExpression"], 
     "STRING_LITERAL1_START": ["primaryExpression"], 
     "STRING_LITERAL2": ["primaryExpression"], 
     "STRING_LITERAL2_START": ["primaryExpression"], 
     "STRING_LITERAL_LONG1": ["primaryExpression"], 
     "STRING_LITERAL_LONG1_START": ["primaryExpression"], 
     "STRING_LITERAL_LONG2": ["primaryExpression"], 
     "STRING_LITERAL_LONG2_START": ["primaryExpression"]}, 
  "valueLogical" : {
     "!": ["relationalExpression"], 
     "+": ["relationalExpression"], 
     "-": ["relationalExpression"], 
     "VAR1": ["relationalExpression"], 
     "VAR2": ["relationalExpression"], 
     "(": ["relationalExpression"], 
     "STR": ["relationalExpression"], 
     "LANG": ["relationalExpression"], 
     "LANGMATCHES": ["relationalExpression"], 
     "DATATYPE": ["relationalExpression"], 
     "BOUND": ["relationalExpression"], 
     "IRI": ["relationalExpression"], 
     "URI": ["relationalExpression"], 
     "BNODE": ["relationalExpression"], 
     "RAND": ["relationalExpression"], 
     "ABS": ["relationalExpression"], 
     "CEIL": ["relationalExpression"], 
     "FLOOR": ["relationalExpression"], 
     "ROUND": ["relationalExpression"], 
     "CONCAT": ["relationalExpression"], 
     "STRLEN": ["relationalExpression"], 
     "UCASE": ["relationalExpression"], 
     "LCASE": ["relationalExpression"], 
     "ENCODE_FOR_URI": ["relationalExpression"], 
     "CONTAINS": ["relationalExpression"], 
     "STRSTARTS": ["relationalExpression"], 
     "STRENDS": ["relationalExpression"], 
     "STRBEFORE": ["relationalExpression"], 
     "STRAFTER": ["relationalExpression"], 
     "YEAR": ["relationalExpression"], 
     "MONTH": ["relationalExpression"], 
     "DAY": ["relationalExpression"], 
     "HOURS": ["relationalExpression"], 
     "MINUTES": ["relationalExpression"], 
     "SECONDS": ["relationalExpression"], 
     "TIMEZONE": ["relationalExpression"], 
     "TZ": ["relationalExpression"], 
     "NOW": ["relationalExpression"], 
     "UUID": ["relationalExpression"], 
     "STRUUID": ["relationalExpression"], 
     "MD5": ["relationalExpression"], 
     "SHA1": ["relationalExpression"], 
     "SHA256": ["relationalExpression"], 
     "SHA384": ["relationalExpression"], 
     "SHA512": ["relationalExpression"], 
     "COALESCE": ["relationalExpression"], 
     "IF": ["relationalExpression"], 
     "STRLANG": ["relationalExpression"], 
     "STRDT": ["relationalExpression"], 
     "SAMETERM": ["relationalExpression"], 
     "ISIRI": ["relationalExpression"], 
     "ISURI": ["relationalExpression"], 
     "ISBLANK": ["relationalExpression"], 
     "ISLITERAL": ["relationalExpression"], 
     "ISNUMERIC": ["relationalExpression"], 
     "TRUE": ["relationalExpression"], 
     "FALSE": ["relationalExpression"], 
     "COUNT": ["relationalExpression"], 
     "SUM": ["relationalExpression"], 
     "MIN": ["relationalExpression"], 
     "MAX": ["relationalExpression"], 
     "AVG": ["relationalExpression"], 
     "SAMPLE": ["relationalExpression"], 
     "GROUP_CONCAT": ["relationalExpression"], 
     "SUBSTR": ["relationalExpression"], 
     "REPLACE": ["relationalExpression"], 
     "REGEX": ["relationalExpression"], 
     "EXISTS": ["relationalExpression"], 
     "NOT": ["relationalExpression"], 
     "IRI_REF": ["relationalExpression"], 
     "IRI_REF_START": ["relationalExpression"], 
     "INTEGER": ["relationalExpression"], 
     "DECIMAL": ["relationalExpression"], 
     "DOUBLE": ["relationalExpression"], 
     "INTEGER_POSITIVE": ["relationalExpression"], 
     "DECIMAL_POSITIVE": ["relationalExpression"], 
     "DOUBLE_POSITIVE": ["relationalExpression"], 
     "INTEGER_NEGATIVE": ["relationalExpression"], 
     "DECIMAL_NEGATIVE": ["relationalExpression"], 
     "DOUBLE_NEGATIVE": ["relationalExpression"], 
     "PNAME_LN": ["relationalExpression"], 
     "PNAME_NS": ["relationalExpression"], 
     "STRING_LITERAL1": ["relationalExpression"], 
     "STRING_LITERAL1_START": ["relationalExpression"], 
     "STRING_LITERAL2": ["relationalExpression"], 
     "STRING_LITERAL2_START": ["relationalExpression"], 
     "STRING_LITERAL_LONG1": ["relationalExpression"], 
     "STRING_LITERAL_LONG1_START": ["relationalExpression"], 
     "STRING_LITERAL_LONG2": ["relationalExpression"], 
     "STRING_LITERAL_LONG2_START": ["relationalExpression"]}, 
  "valuesClause" : {
     "VALUES": ["VALUES","dataBlock"], 
     "}": []}, 
  "var" : {
     "VAR1": ["VAR1"], 
     "VAR2": ["VAR2"]}, 
  "varOrXExpr" : {
     "VAR1": ["or([var,xExpr])"], 
     "VAR2": ["or([var,xExpr])"], 
     "START_XEXPR": ["or([var,xExpr])"]}, 
  "varOrXIri" : {
     "VAR1": ["varOrXExpr"], 
     "VAR2": ["varOrXExpr"], 
     "START_XEXPR": ["varOrXExpr"], 
     "IRI_REF": ["xiri"], 
     "IRI_REF_START": ["xiri"], 
     "PNAME_LN": ["xiri"], 
     "PNAME_NS": ["xiri"]}, 
  "varOrXTerm" : {
     "VAR1": ["var"], 
     "VAR2": ["var"], 
     "NIL": ["xTerm"], 
     "START_XEXPR": ["xTerm"], 
     "IRI_REF": ["xTerm"], 
     "IRI_REF_START": ["xTerm"], 
     "TRUE": ["xTerm"], 
     "FALSE": ["xTerm"], 
     "BLANK_NODE_LABEL": ["xTerm"], 
     "ANON": ["xTerm"], 
     "PNAME_LN": ["xTerm"], 
     "PNAME_NS": ["xTerm"], 
     "INTEGER": ["xTerm"], 
     "DECIMAL": ["xTerm"], 
     "DOUBLE": ["xTerm"], 
     "INTEGER_POSITIVE": ["xTerm"], 
     "DECIMAL_POSITIVE": ["xTerm"], 
     "DOUBLE_POSITIVE": ["xTerm"], 
     "INTEGER_NEGATIVE": ["xTerm"], 
     "DECIMAL_NEGATIVE": ["xTerm"], 
     "DOUBLE_NEGATIVE": ["xTerm"], 
     "STRING_LITERAL1": ["xTerm"], 
     "STRING_LITERAL1_START": ["xTerm"], 
     "STRING_LITERAL2": ["xTerm"], 
     "STRING_LITERAL2_START": ["xTerm"], 
     "STRING_LITERAL_LONG1": ["xTerm"], 
     "STRING_LITERAL_LONG1_START": ["xTerm"], 
     "STRING_LITERAL_LONG2": ["xTerm"], 
     "STRING_LITERAL_LONG2_START": ["xTerm"]}, 
  "verb" : {
     "VAR1": ["storeProperty","varOrXTerm"], 
     "VAR2": ["storeProperty","varOrXTerm"], 
     "NIL": ["storeProperty","varOrXTerm"], 
     "START_XEXPR": ["storeProperty","varOrXTerm"], 
     "IRI_REF": ["storeProperty","varOrXTerm"], 
     "IRI_REF_START": ["storeProperty","varOrXTerm"], 
     "TRUE": ["storeProperty","varOrXTerm"], 
     "FALSE": ["storeProperty","varOrXTerm"], 
     "BLANK_NODE_LABEL": ["storeProperty","varOrXTerm"], 
     "ANON": ["storeProperty","varOrXTerm"], 
     "PNAME_LN": ["storeProperty","varOrXTerm"], 
     "PNAME_NS": ["storeProperty","varOrXTerm"], 
     "INTEGER": ["storeProperty","varOrXTerm"], 
     "DECIMAL": ["storeProperty","varOrXTerm"], 
     "DOUBLE": ["storeProperty","varOrXTerm"], 
     "INTEGER_POSITIVE": ["storeProperty","varOrXTerm"], 
     "DECIMAL_POSITIVE": ["storeProperty","varOrXTerm"], 
     "DOUBLE_POSITIVE": ["storeProperty","varOrXTerm"], 
     "INTEGER_NEGATIVE": ["storeProperty","varOrXTerm"], 
     "DECIMAL_NEGATIVE": ["storeProperty","varOrXTerm"], 
     "DOUBLE_NEGATIVE": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL1": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL1_START": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL2": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL2_START": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL_LONG1": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL_LONG1_START": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL_LONG2": ["storeProperty","varOrXTerm"], 
     "STRING_LITERAL_LONG2_START": ["storeProperty","varOrXTerm"], 
     "a": ["storeProperty","a"]}, 
  "verbPath" : {
     "^": ["path"], 
     "a": ["path"], 
     "!": ["path"], 
     "(": ["path"], 
     "IRI_REF": ["path"], 
     "IRI_REF_START": ["path"], 
     "PNAME_LN": ["path"], 
     "PNAME_NS": ["path"]}, 
  "verbSimple" : {
     "VAR1": ["varOrXExpr"], 
     "VAR2": ["varOrXExpr"], 
     "START_XEXPR": ["varOrXExpr"]}, 
  "whereClause" : {
     "{": ["?or([WHEREVER,WHERE])","groupGraphPattern"], 
     "WHEREVER": ["?or([WHEREVER,WHERE])","groupGraphPattern"], 
     "WHERE": ["?or([WHEREVER,WHERE])","groupGraphPattern"]}, 
  "xExpr" : {
     "START_XEXPR": ["START_XEXPR","expression","}"]}, 
  "xNode" : {
     "START_XEXPR": ["xExpr"], 
     "STRING_LITERAL1": ["xRDFLiteral"], 
     "STRING_LITERAL1_START": ["xRDFLiteral"], 
     "STRING_LITERAL2": ["xRDFLiteral"], 
     "STRING_LITERAL2_START": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG1": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG1_START": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG2": ["xRDFLiteral"], 
     "STRING_LITERAL_LONG2_START": ["xRDFLiteral"], 
     "IRI_REF": ["xiri"], 
     "IRI_REF_START": ["xiri"], 
     "PNAME_LN": ["xiri"], 
     "PNAME_NS": ["xiri"]}, 
  "xRDFLiteral" : {
     "STRING_LITERAL1": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL1_START": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL2": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL2_START": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL_LONG1": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL_LONG1_START": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL_LONG2": ["xString","?or([LANGTAG,[^^,xiri]])"], 
     "STRING_LITERAL_LONG2_START": ["xString","?or([LANGTAG,[^^,xiri]])"]}, 
  "xString" : {
     "STRING_LITERAL1": ["xString_Literal1"], 
     "STRING_LITERAL1_START": ["xString_Literal1"], 
     "STRING_LITERAL2": ["xString_Literal2"], 
     "STRING_LITERAL2_START": ["xString_Literal2"], 
     "STRING_LITERAL_LONG1": ["xString_Literal_Long1"], 
     "STRING_LITERAL_LONG1_START": ["xString_Literal_Long1"], 
     "STRING_LITERAL_LONG2": ["xString_Literal_Long2"], 
     "STRING_LITERAL_LONG2_START": ["xString_Literal_Long2"]}, 
  "xString_Literal1" : {
     "STRING_LITERAL1": ["or([STRING_LITERAL1,[STRING_LITERAL1_START,xString_Literal1_Sub]])"], 
     "STRING_LITERAL1_START": ["or([STRING_LITERAL1,[STRING_LITERAL1_START,xString_Literal1_Sub]])"]}, 
  "xString_Literal1_Sub" : {
     "!": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "+": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "-": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "VAR1": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "VAR2": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "(": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STR": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "LANG": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "LANGMATCHES": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DATATYPE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "BOUND": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "IRI": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "URI": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "BNODE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "RAND": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ABS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "CEIL": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "FLOOR": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ROUND": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "CONCAT": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRLEN": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "UCASE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "LCASE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ENCODE_FOR_URI": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "CONTAINS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRSTARTS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRENDS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRBEFORE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRAFTER": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "YEAR": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "MONTH": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DAY": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "HOURS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "MINUTES": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SECONDS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "TIMEZONE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "TZ": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "NOW": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "UUID": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRUUID": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "MD5": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SHA1": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SHA256": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SHA384": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SHA512": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "COALESCE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "IF": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRLANG": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRDT": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SAMETERM": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ISIRI": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ISURI": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ISBLANK": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ISLITERAL": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "ISNUMERIC": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "TRUE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "FALSE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "COUNT": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SUM": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "MIN": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "MAX": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "AVG": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SAMPLE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "GROUP_CONCAT": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "SUBSTR": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "REPLACE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "REGEX": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "EXISTS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "NOT": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "IRI_REF": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "IRI_REF_START": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "INTEGER": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DECIMAL": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DOUBLE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "INTEGER_POSITIVE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DECIMAL_POSITIVE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DOUBLE_POSITIVE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "INTEGER_NEGATIVE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DECIMAL_NEGATIVE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "DOUBLE_NEGATIVE": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "PNAME_LN": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "PNAME_NS": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL1": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL1_START": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL2": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL2_START": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL_LONG1": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL_LONG1_START": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL_LONG2": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"], 
     "STRING_LITERAL_LONG2_START": ["expression","switchToParsingXS1","or([[STRING_LITERAL1_SUB,xString_Literal1_Sub],STRING_LITERAL1_END])"]}, 
  "xString_Literal2" : {
     "STRING_LITERAL2": ["or([STRING_LITERAL2,[STRING_LITERAL2_START,xString_Literal2_Sub]])"], 
     "STRING_LITERAL2_START": ["or([STRING_LITERAL2,[STRING_LITERAL2_START,xString_Literal2_Sub]])"]}, 
  "xString_Literal2_Sub" : {
     "!": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "+": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "-": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "VAR1": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "VAR2": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "(": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STR": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "LANG": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "LANGMATCHES": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DATATYPE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "BOUND": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "IRI": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "URI": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "BNODE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "RAND": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ABS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "CEIL": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "FLOOR": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ROUND": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "CONCAT": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRLEN": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "UCASE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "LCASE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ENCODE_FOR_URI": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "CONTAINS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRSTARTS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRENDS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRBEFORE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRAFTER": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "YEAR": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "MONTH": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DAY": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "HOURS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "MINUTES": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SECONDS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "TIMEZONE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "TZ": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "NOW": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "UUID": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRUUID": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "MD5": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SHA1": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SHA256": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SHA384": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SHA512": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "COALESCE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "IF": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRLANG": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRDT": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SAMETERM": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ISIRI": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ISURI": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ISBLANK": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ISLITERAL": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "ISNUMERIC": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "TRUE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "FALSE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "COUNT": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SUM": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "MIN": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "MAX": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "AVG": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SAMPLE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "GROUP_CONCAT": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "SUBSTR": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "REPLACE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "REGEX": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "EXISTS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "NOT": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "IRI_REF": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "IRI_REF_START": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "INTEGER": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DECIMAL": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DOUBLE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "INTEGER_POSITIVE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DECIMAL_POSITIVE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DOUBLE_POSITIVE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "INTEGER_NEGATIVE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DECIMAL_NEGATIVE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "DOUBLE_NEGATIVE": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "PNAME_LN": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "PNAME_NS": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL1": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL1_START": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL2": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL2_START": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL_LONG1": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL_LONG1_START": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL_LONG2": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"], 
     "STRING_LITERAL_LONG2_START": ["expression","switchToParsingXS2","or([[STRING_LITERAL2_SUB,xString_Literal2_Sub],STRING_LITERAL2_END])"]}, 
  "xString_Literal_Long1" : {
     "STRING_LITERAL_LONG1": ["or([STRING_LITERAL_LONG1,[STRING_LITERAL_LONG1_START,xString_Literal_Long1_Sub]])"], 
     "STRING_LITERAL_LONG1_START": ["or([STRING_LITERAL_LONG1,[STRING_LITERAL_LONG1_START,xString_Literal_Long1_Sub]])"]}, 
  "xString_Literal_Long1_Sub" : {
     "!": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "+": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "-": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "VAR1": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "VAR2": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "(": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STR": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "LANG": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "LANGMATCHES": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DATATYPE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "BOUND": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "IRI": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "URI": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "BNODE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "RAND": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ABS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "CEIL": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "FLOOR": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ROUND": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "CONCAT": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRLEN": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "UCASE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "LCASE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ENCODE_FOR_URI": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "CONTAINS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRSTARTS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRENDS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRBEFORE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRAFTER": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "YEAR": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "MONTH": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DAY": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "HOURS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "MINUTES": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SECONDS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "TIMEZONE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "TZ": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "NOW": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "UUID": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRUUID": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "MD5": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SHA1": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SHA256": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SHA384": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SHA512": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "COALESCE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "IF": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRLANG": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRDT": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SAMETERM": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ISIRI": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ISURI": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ISBLANK": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ISLITERAL": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "ISNUMERIC": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "TRUE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "FALSE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "COUNT": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SUM": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "MIN": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "MAX": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "AVG": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SAMPLE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "GROUP_CONCAT": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "SUBSTR": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "REPLACE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "REGEX": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "EXISTS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "NOT": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "IRI_REF": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "IRI_REF_START": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "INTEGER": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DECIMAL": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DOUBLE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "INTEGER_POSITIVE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DECIMAL_POSITIVE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DOUBLE_POSITIVE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "INTEGER_NEGATIVE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DECIMAL_NEGATIVE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "DOUBLE_NEGATIVE": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "PNAME_LN": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "PNAME_NS": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL1": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL1_START": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL2": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL2_START": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL_LONG1": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL_LONG1_START": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL_LONG2": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"], 
     "STRING_LITERAL_LONG2_START": ["expression","switchToParsingXL1","or([[STRING_LITERAL_LONG1_SUB,xString_Literal_Long1_Sub],STRING_LITERAL_LONG1_END])"]}, 
  "xString_Literal_Long2" : {
     "STRING_LITERAL_LONG2": ["or([STRING_LITERAL_LONG2,[STRING_LITERAL_LONG2_START,xString_Literal_Long2_Sub]])"], 
     "STRING_LITERAL_LONG2_START": ["or([STRING_LITERAL_LONG2,[STRING_LITERAL_LONG2_START,xString_Literal_Long2_Sub]])"]}, 
  "xString_Literal_Long2_Sub" : {
     "!": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "+": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "-": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "VAR1": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "VAR2": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "(": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STR": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "LANG": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "LANGMATCHES": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DATATYPE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "BOUND": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "IRI": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "URI": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "BNODE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "RAND": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ABS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "CEIL": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "FLOOR": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ROUND": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "CONCAT": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRLEN": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "UCASE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "LCASE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ENCODE_FOR_URI": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "CONTAINS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRSTARTS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRENDS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRBEFORE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRAFTER": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "YEAR": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "MONTH": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DAY": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "HOURS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "MINUTES": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SECONDS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "TIMEZONE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "TZ": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "NOW": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "UUID": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRUUID": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "MD5": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SHA1": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SHA256": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SHA384": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SHA512": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "COALESCE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "IF": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRLANG": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRDT": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SAMETERM": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ISIRI": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ISURI": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ISBLANK": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ISLITERAL": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "ISNUMERIC": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "TRUE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "FALSE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "COUNT": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SUM": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "MIN": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "MAX": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "AVG": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SAMPLE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "GROUP_CONCAT": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "SUBSTR": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "REPLACE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "REGEX": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "EXISTS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "NOT": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "IRI_REF": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "IRI_REF_START": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "INTEGER": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DECIMAL": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DOUBLE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "INTEGER_POSITIVE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DECIMAL_POSITIVE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DOUBLE_POSITIVE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "INTEGER_NEGATIVE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DECIMAL_NEGATIVE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "DOUBLE_NEGATIVE": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "PNAME_LN": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "PNAME_NS": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL1": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL1_START": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL2": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL2_START": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL_LONG1": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL_LONG1_START": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL_LONG2": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"], 
     "STRING_LITERAL_LONG2_START": ["expression","switchToParsingXL2","or([[STRING_LITERAL_LONG2_SUB,xString_Literal_Long2_Sub],STRING_LITERAL_LONG2_END])"]}, 
  "xTerm" : {
     "START_XEXPR": ["xNode"], 
     "IRI_REF": ["xNode"], 
     "IRI_REF_START": ["xNode"], 
     "PNAME_LN": ["xNode"], 
     "PNAME_NS": ["xNode"], 
     "STRING_LITERAL1": ["xNode"], 
     "STRING_LITERAL1_START": ["xNode"], 
     "STRING_LITERAL2": ["xNode"], 
     "STRING_LITERAL2_START": ["xNode"], 
     "STRING_LITERAL_LONG1": ["xNode"], 
     "STRING_LITERAL_LONG1_START": ["xNode"], 
     "STRING_LITERAL_LONG2": ["xNode"], 
     "STRING_LITERAL_LONG2_START": ["xNode"], 
     "INTEGER": ["numericLiteral"], 
     "DECIMAL": ["numericLiteral"], 
     "DOUBLE": ["numericLiteral"], 
     "INTEGER_POSITIVE": ["numericLiteral"], 
     "DECIMAL_POSITIVE": ["numericLiteral"], 
     "DOUBLE_POSITIVE": ["numericLiteral"], 
     "INTEGER_NEGATIVE": ["numericLiteral"], 
     "DECIMAL_NEGATIVE": ["numericLiteral"], 
     "DOUBLE_NEGATIVE": ["numericLiteral"], 
     "TRUE": ["booleanLiteral"], 
     "FALSE": ["booleanLiteral"], 
     "BLANK_NODE_LABEL": ["blankNode"], 
     "ANON": ["blankNode"], 
     "NIL": ["NIL"]}, 
  "xiri" : {
     "IRI_REF": ["or([iriRef,[IRI_REF_START,xiri_Sub]])"], 
     "IRI_REF_START": ["or([iriRef,[IRI_REF_START,xiri_Sub]])"], 
     "PNAME_LN": ["or([iriRef,[IRI_REF_START,xiri_Sub]])"], 
     "PNAME_NS": ["or([iriRef,[IRI_REF_START,xiri_Sub]])"]}, 
  "xiriOrFunction" : {
     "IRI_REF": ["xiri","?argList"], 
     "IRI_REF_START": ["xiri","?argList"], 
     "PNAME_LN": ["xiri","?argList"], 
     "PNAME_NS": ["xiri","?argList"]}, 
  "xiri_Sub" : {
     "!": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "+": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "-": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "VAR1": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "VAR2": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "(": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STR": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "LANG": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "LANGMATCHES": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DATATYPE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "BOUND": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "IRI": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "URI": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "BNODE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "RAND": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ABS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "CEIL": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "FLOOR": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ROUND": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "CONCAT": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRLEN": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "UCASE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "LCASE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ENCODE_FOR_URI": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "CONTAINS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRSTARTS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRENDS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRBEFORE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRAFTER": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "YEAR": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "MONTH": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DAY": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "HOURS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "MINUTES": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SECONDS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "TIMEZONE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "TZ": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "NOW": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "UUID": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRUUID": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "MD5": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SHA1": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SHA256": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SHA384": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SHA512": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "COALESCE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "IF": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRLANG": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRDT": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SAMETERM": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ISIRI": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ISURI": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ISBLANK": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ISLITERAL": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "ISNUMERIC": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "TRUE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "FALSE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "COUNT": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SUM": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "MIN": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "MAX": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "AVG": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SAMPLE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "GROUP_CONCAT": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "SUBSTR": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "REPLACE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "REGEX": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "EXISTS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "NOT": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "IRI_REF": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "IRI_REF_START": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "INTEGER": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DECIMAL": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DOUBLE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "INTEGER_POSITIVE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DECIMAL_POSITIVE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DOUBLE_POSITIVE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "INTEGER_NEGATIVE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DECIMAL_NEGATIVE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "DOUBLE_NEGATIVE": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "PNAME_LN": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "PNAME_NS": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL1": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL1_START": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL2": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL2_START": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL_LONG1": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL_LONG1_START": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL_LONG2": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"], 
     "STRING_LITERAL_LONG2_START": ["expression","switchToParsingXIRI","or([[IRI_REF_SUB,xiri_Sub],IRI_REF_END])"]}
},

keywords:/^(GROUP_CONCAT|DATATYPE|BASE|PREFIX|GENERATE|ITERATOR|ITERATE|SOURCE|LOOK UP|ACCEPT|WHEREVER|SELECT|CONSTRUCT|DESCRIBE|ASK|FROM|NAMED|ORDER|BY|LIMIT|ASC|DESC|OFFSET|DISTINCT|REDUCED|WHERE|GRAPH|OPTIONAL|UNION|FILTER|GROUP|HAVING|AS|VALUES|LOAD|CLEAR|DROP|CREATE|MOVE|COPY|SILENT|INSERT|DELETE|DATA|WITH|TO|USING|NAMED|MINUS|BIND|LANGMATCHES|LANG|BOUND|SAMETERM|ISIRI|ISURI|ISBLANK|ISLITERAL|REGEX|TRUE|FALSE|UNDEF|ADD|DEFAULT|ALL|SERVICE|INTO|IN|NOT|IRI|URI|BNODE|RAND|ABS|CEIL|FLOOR|ROUND|CONCAT|STRLEN|UCASE|LCASE|ENCODE_FOR_URI|CONTAINS|STRSTARTS|STRENDS|STRBEFORE|STRAFTER|YEAR|MONTH|DAY|HOURS|MINUTES|SECONDS|TIMEZONE|TZ|NOW|UUID|STRUUID|MD5|SHA1|SHA256|SHA384|SHA512|COALESCE|IF|STRLANG|STRDT|ISNUMERIC|SUBSTR|REPLACE|EXISTS|COUNT|SUM|MIN|MAX|AVG|SAMPLE|SEPARATOR|STR)/i ,

punct:/^(\*|a|\.|\{|\}|,|\(|\)|;|\[|\]|\|\||&&|=|!=|!|<=|>=|<|>|\+|-|\/|\^\^|\?|\||\^)/ ,

startSymbol:"sparql11",
acceptEmpty:true,
}
},{}],3:[function(require,module,exports){
"use strict";
var CodeMirror = (function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})();
CodeMirror.defineMode("sparql11", function(config, parserConfig) {
  var indentUnit = config.indentUnit;

  var grammar = require("./_tokenizer-table.js");
  var ll1_table = grammar.table;

  var IRI_REF = '<[^<>"`\|\{\}\^\\\x00-\x20]*>';
  var IRI_REF_START = '<[^<>"`\|\{\}\^\\\x00-\x20]*\\{';
  var IRI_REF_SUB = '}[^<>"`\|\{\}\^\\\x00-\x20]*\\{';
  var IRI_REF_END = '}[^<>"`\|\{\}\^\\\x00-\x20]*>';
  /*
	 * PN_CHARS_BASE =
	 * '[A-Z]|[a-z]|[\\u00C0-\\u00D6]|[\\u00D8-\\u00F6]|[\\u00F8-\\u02FF]|[\\u0370-\\u037D]|[\\u037F-\\u1FFF]|[\\u200C-\\u200D]|[\\u2070-\\u218F]|[\\u2C00-\\u2FEF]|[\\u3001-\\uD7FF]|[\\uF900-\\uFDCF]|[\\uFDF0-\\uFFFD]|[\\u10000-\\uEFFFF]';
	 */

  var PN_CHARS_BASE = "[A-Za-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD]";
  var PN_CHARS_U = PN_CHARS_BASE + "|_";

  var PN_CHARS = "(" + PN_CHARS_U + "|-|[0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040])";
  var VARNAME = "(" + PN_CHARS_U + "|[0-9])" + "(" + PN_CHARS_U + "|[0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040])*";
  var VAR1 = "\\?" + VARNAME;
  var VAR2 = "\\$" + VARNAME;

  var START_XEXPR = "(\\$|\\?)\\{";

  var PN_PREFIX = "(" + PN_CHARS_BASE + ")(((" + PN_CHARS + ")|\\.)*(" + PN_CHARS + "))?";

  var HEX = "[0-9A-Fa-f]";
  var PERCENT = "(%" + HEX + HEX + ")";
  var PN_LOCAL_ESC = "(\\\\[_~\\.\\-!\\$&'\\(\\)\\*\\+,;=/\\?#@%])";
  var PLX = "(" + PERCENT + "|" + PN_LOCAL_ESC + ")";
  var PN_LOCAL = "(" +
    PN_CHARS_U +
    "|:|[0-9]|" +
    PLX +
    ")((" +
    PN_CHARS +
    "|\\.|:|" +
    PLX +
    ")*(" +
    PN_CHARS +
    "|:|" +
    PLX +
    "))?";
  var BLANK_NODE_LABEL = "_:(" + PN_CHARS_U + "|[0-9])((" + PN_CHARS + "|\\.)*" + PN_CHARS + ")?";
  var PNAME_NS = "(" + PN_PREFIX + ")?:";
  var PNAME_LN = PNAME_NS + PN_LOCAL;
  var LANGTAG = "@[a-zA-Z]+(-[a-zA-Z0-9]+)*";

  var EXPONENT = "[eE][\\+-]?[0-9]+";
  var INTEGER = "[0-9]+";
  var DECIMAL = "(([0-9]+\\.[0-9]*)|(\\.[0-9]+))";
  var DOUBLE = "(([0-9]+\\.[0-9]*" + EXPONENT + ")|" + "(\\.[0-9]+" + EXPONENT + ")|" + "([0-9]+" + EXPONENT + "))";

  var INTEGER_POSITIVE = "\\+" + INTEGER;
  var DECIMAL_POSITIVE = "\\+" + DECIMAL;
  var DOUBLE_POSITIVE = "\\+" + DOUBLE;
  var INTEGER_NEGATIVE = "-" + INTEGER;
  var DECIMAL_NEGATIVE = "-" + DECIMAL;
  var DOUBLE_NEGATIVE = "-" + DOUBLE;

  var ECHAR = "\\\\[tbnrf\\\\\"'\\{}]";

  //IMPORTANT: this unicode rule is not in the official grammar.
  //Reason: https://github.com/YASGUI/YASQE/issues/49
  //unicode escape sequences (which the sparql spec considers part of the pre-processing of sparql queries)
  //are marked as invalid. We have little choice (other than adding a layer of complixity) than to modify the grammar accordingly
  //however, for now only allow these escape sequences in literals (where actually, this should be allows in e.g. prefixes as well)
  var hex4 = HEX + "{4}";
  var unicode = "(\\\\u" + hex4 + "|\\\\U00(10|0" + HEX + ")" + hex4 + ")";
  var LINE_BREAK = "\n";

  var OPEN_EXPR = "\\{";
  var CLOSE_EXPR = "\\}";

  var STRING_LITERAL1 = "'(([^\\x27\\x5C\\x0A\\x0D\\{])|" + ECHAR + "|" + unicode + ")*'";
  var STRING_LITERAL1_START = "'(([^\\x27\\x5C\\x0A\\x0D\\{])|" + ECHAR + "|" + unicode + ")*" + OPEN_EXPR;
  var STRING_LITERAL1_END = CLOSE_EXPR + "(([^\\x27\\x5C\\x0A\\x0D\\{])|" + ECHAR + "|" + unicode + ")*'";
  var STRING_LITERAL1_SUB = CLOSE_EXPR + "(([^\\x27\\x5C\\x0A\\x0D\\{])|" + ECHAR + "|" + unicode + ")*" + OPEN_EXPR;

  var STRING_LITERAL2 = '"(([^\\x22\\x5C\\x0A\\x0D\\{])|' + ECHAR + "|" + unicode + ')*"';
  var STRING_LITERAL2_START = '"(([^\\x22\\x5C\\x0A\\x0D\\{])|' + ECHAR + "|" + unicode + ')*' + OPEN_EXPR;
  var STRING_LITERAL2_END = CLOSE_EXPR + '(([^\\x22\\x5C\\x0A\\x0D\\{])|' + ECHAR + "|" + unicode + ')*"';
  var STRING_LITERAL2_SUB = CLOSE_EXPR + '(([^\\x22\\x5C\\x0A\\x0D\\{])|' + ECHAR + "|" + unicode + ')*' + OPEN_EXPR;

  var STRING_LITERAL_LONG1_QUOTES = "'''";
  var STRING_LITERAL_LONG1_CONTENT = "(('|'')?([^'\\\\\\{]|" + ECHAR + "|" + unicode + "))*";

  var STRING_LITERAL_LONG2_QUOTES = '"""';
  var STRING_LITERAL_LONG2_CONTENT = '(("|"")?([^"\\\\\\{]|' + ECHAR + "|" + unicode + "))*";


  var WS = "[\\x20\\x09\\x0D\\x0A]";
  // Careful! Code mirror feeds one line at a time with no \n
  // ... but otherwise comment is terminated by \n
  var COMMENT = "#([^\\n\\r]*[\\n\\r]|[^\\n\\r]*$)";
  var WS_OR_COMMENT_STAR = "(" + WS + "|(" + COMMENT + "))*";
  var NIL = "\\(" + WS_OR_COMMENT_STAR + "\\)";
  var ANON = "\\[" + WS_OR_COMMENT_STAR + "\\]";

  var terminals = { 
    "default" : [
    {
      name: "WS",
      regex: new RegExp("^" + WS + "+"),
      style: "ws"
    },
    {
      name: "COMMENT",
      regex: new RegExp("^" + COMMENT),
      style: "comment"
    },
    {
      name: "IRI_REF",
      regex: new RegExp("^" + IRI_REF),
      style: "variable-3"
    },
    {
      name: "IRI_REF_START",
      regex: new RegExp("^" + IRI_REF_START),
      style: "variable-3"
    },
    {
      name: "VAR1",
      regex: new RegExp("^" + VAR1),
      style: "atom"
    },
    {
      name: "VAR2",
      regex: new RegExp("^" + VAR2),
      style: "atom"
    },
    {
      name: "START_XEXPR",
      regex: new RegExp("^" + START_XEXPR),
      style: "atom"
    },
    {
      name: "LANGTAG",
      regex: new RegExp("^" + LANGTAG),
      style: "meta"
    },
    {
      name: "DOUBLE",
      regex: new RegExp("^" + DOUBLE),
      style: "number"
    },
    {
      name: "DECIMAL",
      regex: new RegExp("^" + DECIMAL),
      style: "number"
    },
    {
      name: "INTEGER",
      regex: new RegExp("^" + INTEGER),
      style: "number"
    },
    {
      name: "DOUBLE_POSITIVE",
      regex: new RegExp("^" + DOUBLE_POSITIVE),
      style: "number"
    },
    {
      name: "DECIMAL_POSITIVE",
      regex: new RegExp("^" + DECIMAL_POSITIVE),
      style: "number"
    },
    {
      name: "INTEGER_POSITIVE",
      regex: new RegExp("^" + INTEGER_POSITIVE),
      style: "number"
    },
    {
      name: "DOUBLE_NEGATIVE",
      regex: new RegExp("^" + DOUBLE_NEGATIVE),
      style: "number"
    },
    {
      name: "DECIMAL_NEGATIVE",
      regex: new RegExp("^" + DECIMAL_NEGATIVE),
      style: "number"
    },
    {
      name: "INTEGER_NEGATIVE",
      regex: new RegExp("^" + INTEGER_NEGATIVE),
      style: "number"
    },
    {
      name: "STRING_LITERAL_LONG1",
      regex: new RegExp("^" + STRING_LITERAL_LONG1_QUOTES + STRING_LITERAL_LONG1_CONTENT + STRING_LITERAL_LONG1_QUOTES),
      style: "string"
    },
    {
      name: "STRING_LITERAL_LONG1_START",
      regex: new RegExp("^" + STRING_LITERAL_LONG1_QUOTES + STRING_LITERAL_LONG1_CONTENT + "('|'')?" + OPEN_EXPR),
      style: "string"
    },
    {
      name: "STRING_LITERAL_LONG1_START_TRUNC", 
      regex: new RegExp("^" + STRING_LITERAL_LONG1_QUOTES + STRING_LITERAL_LONG1_CONTENT + "$"),
      style: "string",
      switchTo: "trunc_l1"
    },
    {
      name: "STRING_LITERAL_LONG2",
      regex: new RegExp("^" + STRING_LITERAL_LONG2_QUOTES + STRING_LITERAL_LONG2_CONTENT + STRING_LITERAL_LONG2_QUOTES),
      style: "string"
    },
    {
      name: "STRING_LITERAL_LONG2_START", 
      regex: new RegExp("^" + STRING_LITERAL_LONG2_QUOTES + STRING_LITERAL_LONG2_CONTENT + '("|"")?' + OPEN_EXPR),
      style: "string"
    },
    {
      name: "STRING_LITERAL_LONG2_START_TRUNC",
      regex: new RegExp("^" + STRING_LITERAL_LONG2_QUOTES + STRING_LITERAL_LONG2_CONTENT + "$"),
      style: "string",
      switchTo: "trunc_l2"
    },
    {
      name: "STRING_LITERAL1",
      regex: new RegExp("^" + STRING_LITERAL1),
      style: "string"
    },
    {
      name: "STRING_LITERAL1_START",
      regex: new RegExp("^" + STRING_LITERAL1_START),
      style: "string"
    },
    {
      name: "STRING_LITERAL2",
      regex: new RegExp("^" + STRING_LITERAL2),
      style: "string"
    },
    {
      name: "STRING_LITERAL2_START",
      regex: new RegExp("^" + STRING_LITERAL2_START),
      style: "string"
    },
    // Enclosed comments won't be highlighted
    {
      name: "NIL",
      regex: new RegExp("^" + NIL),
      style: "punc"
    },
    // Enclosed comments won't be highlighted
    {
      name: "ANON",
      regex: new RegExp("^" + ANON),
      style: "punc"
    },
    {
      name: "PNAME_LN",
      regex: new RegExp("^" + PNAME_LN),
      style: "string-2"
    },
    {
      name: "PNAME_NS",
      regex: new RegExp("^" + PNAME_NS),
      style: "string-2"
    },
    {
      name: "BLANK_NODE_LABEL",
      regex: new RegExp("^" + BLANK_NODE_LABEL),
      style: "string-2"
    }
  ] ,
  "xiri" : [
    {
      name: "IRI_REF_END",
      regex: new RegExp("^" + IRI_REF_END),
      style: "variable-3",
      switchTo: "default"
    },
    {
      name: "IRI_REF_SUB",
      regex: new RegExp("^" + IRI_REF_SUB),
      style: "variable-3"
    }
  ] ,
  "xs1" : [
    {
      name: "STRING_LITERAL1_END",
      regex: new RegExp("^" + STRING_LITERAL1_END),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL1_SUB",
      regex: new RegExp("^" + STRING_LITERAL1_SUB),
      style: "string",
      switchTo: "default"
    }
  ] ,
  "xs2" : [
    {
      name: "STRING_LITERAL2_SUB",
      regex: new RegExp("^" + STRING_LITERAL2_SUB),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL2_END",
      regex: new RegExp("^" + STRING_LITERAL2_END),
      style: "string",
      switchTo: "default"
    }
  ]  ,
  "trunc_l1" : [
    {
      name: "STRING_LITERAL_LONG1_TRUNC_END", 
      regex: new RegExp("^" + STRING_LITERAL_LONG1_CONTENT + STRING_LITERAL_LONG1_QUOTES),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG1_TRUNC_OPEN", 
      regex: new RegExp("^" + STRING_LITERAL_LONG1_CONTENT + OPEN_EXPR),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG1_TRUNC_TRUNC",
      regex: new RegExp("^" + STRING_LITERAL_LONG1_CONTENT + "$"),
      style: "string"
    }
  ] ,
  "trunc_l2" : [
    {
      name: "STRING_LITERAL_LONG2_TRUNC_END",
      regex: new RegExp("^" + STRING_LITERAL_LONG2_CONTENT + STRING_LITERAL_LONG2_QUOTES),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG2_TRUNC_OPEN",
      regex: new RegExp("^" + STRING_LITERAL_LONG2_CONTENT + OPEN_EXPR),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG2_TRUNC_TRUNC",
      regex: new RegExp("^" + STRING_LITERAL_LONG2_CONTENT + "$"),
      style: "string"
    }
  ] ,
  "xl1" : [
    {
      name: "STRING_LITERAL_LONG1_END",
      regex: new RegExp("^" + CLOSE_EXPR + STRING_LITERAL_LONG1_CONTENT + STRING_LITERAL_LONG1_QUOTES),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG1_SUB",
      regex: new RegExp("^" + CLOSE_EXPR + STRING_LITERAL_LONG1_CONTENT + OPEN_EXPR),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG1_CLOSE_TRUNC", // switch to trunc_l1
      regex: new RegExp("^" + CLOSE_EXPR + STRING_LITERAL_LONG1_CONTENT + "$"),
      style: "string",
      switchTo: "trunc_l2"      
    }
  ] ,
  "xl2" : [
    {
      name: "STRING_LITERAL_LONG2_END",
      regex: new RegExp("^" + CLOSE_EXPR + STRING_LITERAL_LONG2_CONTENT + STRING_LITERAL_LONG2_QUOTES),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG2_SUB",
      regex: new RegExp("^" + CLOSE_EXPR + STRING_LITERAL_LONG2_CONTENT + OPEN_EXPR),
      style: "string",
      switchTo: "default"
    },
    {
      name: "STRING_LITERAL_LONG2_CLOSE_TRUNC",
      regex: new RegExp("^" + CLOSE_EXPR + STRING_LITERAL_LONG2_CONTENT + "$"),
      style: "string",
      switchTo: "trunc_l2"
    }
  ] } ;

  function getPossibles(symbol) {
    var possibles = [], possiblesOb = ll1_table[symbol];
    if (possiblesOb != undefined) {
      for (var property in possiblesOb) {
        possibles.push(property.toString());
      }
    } else {
      possibles.push(symbol);
    }
    return possibles;
  }

  function tokenBase(stream, state) {
    // console.log("called with stream ", stream)

    function nextToken(consume) {
      var consumed = null;

      // Tokens defined by individual regular expressions in the current lexical state
      var termls = terminals[state.lexicalState];
      for (var i = 0; i < termls.length; ++i) {
        consumed = stream.match(termls[i].regex, consume, false);
        if (consumed) {
          var result = {
            cat: termls[i].name,
            style: termls[i].style,
            text: consumed[0],
            start: stream.start,
            switchTo: termls[i].switchTo
          };
          return result;
        }
      }

      // Keywords
      consumed = stream.match(grammar.keywords, consume, false);
      if (consumed) {
        return {
          cat: consumed[0].toUpperCase(),
          style: "keyword",
          text: consumed[0].toUpperCase(),
          start: stream.start
        };
      }

      // Punctuation
      consumed = stream.match(grammar.punct, consume, false);
      if (consumed)
        return {
          cat: consumed[0],
          style: "punc",
          text: consumed[0],
          start: stream.start
        };

      // Token is invalid
      // better consume something anyway, or else we're stuck
      consumed = stream.match(/^.[A-Za-z0-9]*/, consume, false);
      return {
        cat: "<invalid_token>",
        style: "error",
        text: consumed ? consumed[0] : "$",
        start: stream.start
      };
    }

    function recordFailurePos(tokenOb) {
      var col = stream.column();
      state.errorStartPos = col;
      if(tokenOb && tokenOb.text) {
        state.errorEndPos = col + tokenOb.text.length;
      }
    }

    function setQueryType(s) {
      if (state.queryType == null) {
        if (
          s == "GENERATE" ||
          s == "SELECT" ||
          s == "CONSTRUCT" ||
          s == "ASK" ||
          s == "DESCRIBE" ||
          s == "INSERT" ||
          s == "DELETE" ||
          s == "LOAD" ||
          s == "CLEAR" ||
          s == "CREATE" ||
          s == "DROP" ||
          s == "COPY" ||
          s == "MOVE" ||
          s == "ADD"
        )
          state.queryType = s;
      }
    }

    // Some fake non-terminals are just there to have side-effect on state
    // - i.e. allow or disallow variables and bnodes in certain non-nesting
    // contexts
    function setSideConditions(topSymbol) {
      if (topSymbol === "prefixDecl") {
        state.inPrefixDecl = true;
      } else {
        state.inPrefixDecl = false;
      }
      switch (topSymbol) {
        case "disallowVars":
          state.allowVars = false;
          break;
        case "allowVars":
          state.allowVars = true;
          break;
        case "disallowBnodes":
          state.allowBnodes = false;
          break;
        case "allowBnodes":
          state.allowBnodes = true;
          break;
        case "storeProperty":
          state.storeProperty = true;
          break;
      }
    }

    function checkSideConditions(topSymbol) {
      return (state.allowVars || topSymbol != "var") &&
        (state.allowBnodes ||
          (topSymbol != "blankNode" &&
            topSymbol != "blankNodePropertyList" &&
            topSymbol != "blankNodePropertyListPath"));
    }

    function changeLexicalState(topSymbol) {
      switch (topSymbol) {
        case "switchToParsingXIRI":
          state.lexicalState = "xiri";
          break;
        case "switchToParsingXS1":
          state.lexicalState = "xs1";
          break;
        case "switchToParsingXS2":
          state.lexicalState = "xs2";
          break;
        case "switchToParsingXL1":
          state.lexicalState = "xl1";
          break;
        case "switchToParsingXL2":
          state.lexicalState = "xl2";
          break;
      }
    }

    function checkinLiteral(tokenOb) {
      if(tokenOb.cat.includes("TRUNC_") && !state.inLiteral) {
        console.error("TRUNC string out of nowhere");
        return;
      }
      switch (tokenOb.cat) {
        case "STRING_LITERAL_LONG1_START_TRUNC":
          state.inLiteral = tokenOb;
          state.inLiteral.cat = "STRING_LITERAL_LONG1_START";
          break;
        case "STRING_LITERAL_LONG1_TRUNC_END":
          switch (state.inLiteral.cat) {
            case "STRING_LITERAL_LONG1_START":
              tokenOb.cat = "STRING_LITERAL_LONG1";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            case "STRING_LITERAL_LONG1_CLOSE":
              tokenOb.cat = "STRING_LITERAL_LONG1_END";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            default:
              console.error(" in token ", state.inLiteral);
          }
          break;
        case "STRING_LITERAL_LONG1_TRUNC_OPEN":
          switch (state.inLiteral.cat) {
            case "STRING_LITERAL_LONG1_START":
              tokenOb.cat = "STRING_LITERAL_LONG1_START";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            case "STRING_LITERAL_LONG1_CLOSE":
              tokenOb.cat = "STRING_LITERAL_LONG1_SUB";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            default:
              console.error(" in token ", state.inLiteral);
          }
          break;
        case "STRING_LITERAL_LONG1_TRUNC_TRUNC":
          state.inLiteral.text += ".";
          break;
        case "STRING_LITERAL_LONG1_CLOSE_TRUNC":
          state.inLiteral = tokenOb;
          state.inLiteral.cat = "STRING_LITERAL_LONG1_CLOSE";
          break;
        case "STRING_LITERAL_LONG2_START_TRUNC":
          state.inLiteral = tokenOb;
          state.inLiteral.cat = "STRING_LITERAL_LONG2_START";
          break;
        case "STRING_LITERAL_LONG2_TRUNC_END":
          switch (state.inLiteral.cat) {
            case "STRING_LITERAL_LONG2_START":
              tokenOb.cat = "STRING_LITERAL_LONG2";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            case "STRING_LITERAL_LONG2_CLOSE":
              tokenOb.cat = "STRING_LITERAL_LONG2_END";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            default:
              console.error(" in token ", state.inLiteral);
          }
          break;
        case "STRING_LITERAL_LONG2_TRUNC_OPEN":
          switch (state.inLiteral.cat) {
            case "STRING_LITERAL_LONG2_START":
              tokenOb.cat = "STRING_LITERAL_LONG2_START";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            case "STRING_LITERAL_LONG2_CLOSE":
              tokenOb.cat = "STRING_LITERAL_LONG2_SUB";
              tokenOb.text = state.inLiteral.text + "\n" + tokenOb.text;
              state.inLiteral = null;
              break;
            default:
              console.error(" in token ", state.inLiteral);
          }
          break;
        case "STRING_LITERAL_LONG2_TRUNC_TRUNC":
          state.inLiteral.text += ".";
          break;
        case "STRING_LITERAL_LONG2_CLOSE_TRUNC":
          state.inLiteral = tokenOb;
          state.inLiteral.cat = "STRING_LITERAL_LONG2_CLOSE";
          break;
      }
    }

    function attemptConsume() {
      var consumed = false;

      if (stream.pos == 0) {
        state.possibleCurrent = state.possibleNext;
      }

      var tokenOb = nextToken(false);
      if (tokenOb.cat == "<invalid_token>") {
        nextToken(true);
        consumed = true;
        if (state.OK==true) {
          state.OK=false;
          recordFailurePos(tokenOb);
        }
        state.complete=false;
        return tokenOb.style;
      }

      if (tokenOb.cat == "WS" || tokenOb.cat == "COMMENT") {
        state.possibleCurrent = state.possibleNext;
        nextToken(true);
        consumed = true;
        return tokenOb.style;
      }

      if(tokenOb.cat.includes("TRUNC")) {
        nextToken(true);
        consumed = true;
        checkinLiteral(tokenOb);
      }  
      // if(!state.OK) {
      //   stream.match(/^.[A-Za-z0-9]*/, true, false);
      //   return "error";
      // }
      if(state.inLiteral) {
        state.possibleCurrent = state.possibleNext;
        return state.inLiteral.style;
      }

      // Run the parser until the token is digested or failure
      var finished = false;
      var token = tokenOb.cat;
      var topSymbol;

      // Incremental LL1 parse
      while (state.stack.length > 0 && token && state.OK && !finished) {
        // console.log("----------------" + topSymbol);
        topSymbol = state.stack.pop();

        if (!ll1_table[topSymbol]) {
          // Top symbol is a terminal
          if (topSymbol == token) {
            if (state.inPrefixDecl) {
              if (topSymbol === "PNAME_NS" && tokenOb.text.length > 0) {
                state.currentPnameNs = tokenOb.text.slice(0, -1);
              } else if (state.currentPnameNs !== undefined && tokenOb.text.length > 2) {
                state.prefixes[state.currentPnameNs] = tokenOb.text.slice(1, -1);
                //reset current pname ns
                state.currentPnameNs = undefined;
              }
            }
            // Matching terminals
            // - ensure token is consumed from input stream
            finished = true;

            // console.log("consumed" + token);
            setQueryType(topSymbol);
            // Check whether $ (end of input token) is poss next
            // for everything on stack
            var allNillable = true;
            for (var sp = state.stack.length; sp > 0; --sp) {
              var item = ll1_table[state.stack[sp - 1]];
              if (!item || !item["$"]) allNillable = false;
            }
            state.complete = allNillable;
            if (state.storeProperty && token.cat != "punc") {
              state.lastProperty = tokenOb.text;
              state.storeProperty = false;
            }

            //check whether a used prefix is actually defined
            if (!state.inPrefixDecl && (token === "PNAME_NS" || token === "PNAME_LN")) {
              var colonIndex = tokenOb.text.indexOf(":");
              if (colonIndex >= 0) {
                var prefNs = tokenOb.text.slice(0, colonIndex);
                //avoid warnings for missing bif prefixes (yuck, virtuoso-specific)
                if (!state.prefixes[prefNs] && ["bif", "xsd", "sql"].indexOf(prefNs) < 0) {
                  state.OK = false;
                  recordFailurePos(tokenOb);
                  state.errorMsg = "Prefix '" + prefNs + "' is not defined";
                }
              }
            }
          } else {
            state.OK = false;
            state.complete = false;
            recordFailurePos(tokenOb);
          }
        } else {
          // topSymbol is nonterminal
          // - see if there is an entry for topSymbol
          // and nextToken in table
          var nextSymbols = ll1_table[topSymbol][token];
          if (nextSymbols != undefined && checkSideConditions(topSymbol)) {
            // Match - copy RHS of rule to stack
            for (var i = nextSymbols.length - 1; i >= 0; --i) {
              state.stack.push(nextSymbols[i]);
            }
            // Peform any non-grammatical side-effects
            setSideConditions(topSymbol);
          } else if(topSymbol.startsWith("switchTo")) {
            // Attempt with a chage of the lexical state
            changeLexicalState(topSymbol);
            return attemptConsume();
          } else {
            // No match in table - fail
            state.OK = false;
            state.complete = false;
            recordFailurePos(tokenOb);
            state.stack.push(topSymbol); // Shove topSymbol back on stack
          }
        }
      }
      if (!finished && state.OK) {
        state.OK = false;
        state.complete = false;
        recordFailurePos(tokenOb);
      }

      if (state.possibleCurrent.indexOf("a") >= 0) {
        state.lastPredicateOffset = tokenOb.start;
      }
      state.possibleCurrent = state.possibleNext;

      state.possibleNext = getPossibles(state.stack[state.stack.length - 1]);

      if(!consumed) {
        nextToken(true);
      }
      if(tokenOb.switchTo) {
        state.lexicalState = tokenOb.switchTo;
      }
      return tokenOb.style;
    }

    // CodeMirror works with one line at a time,
    // but newline should behave like whitespace
    // - i.e. a definite break between tokens (for autocompleter)
    return attemptConsume();
  }

  var indentTop = {
    "*[,, object]": 3,
    "*[(,),object]": 3,
    "*[(,),objectPath]": 3,
    "*[/,pathEltOrInverse]": 2,
    object: 2,
    objectPath: 2,
    objectList: 2,
    objectListPath: 2,
    storeProperty: 2,
    pathMod: 2,
    "?pathMod": 2,
    propertyListNotEmpty: 1,
    propertyList: 1,
    propertyListPath: 1,
    propertyListPathNotEmpty: 1,
    "?[verb,objectList]": 1
    //		"?[or([verbPath, verbSimple]),objectList]": 1,
  };

  var indentTable = {
    "}": 1,
    "]": 1,
    ")": 1,
    "{": -1,
    "(": -1,
    "[": -1
    //		"*[;,?[or([verbPath,verbSimple]),objectList]]": 1,
  };

  function indent(state, textAfter) {
    //just avoid we don't indent multi-line  literals
    if (state.inLiteral) return 0;
    if (state.stack.length && state.stack[state.stack.length - 1] == "?[or([verbPath,verbSimple]),objectList]") {
      //we are after a semi-colon. I.e., nicely align this line with predicate position of previous line
      return state.lastPredicateOffset;
    } else {
      var n = 0; // indent level
      var i = state.stack.length - 1;
      if (/^[\}\]\)]/.test(textAfter)) {
        // Skip stack items until after matching bracket
        var closeBracket = textAfter.substr(0, 1);
        for (; i >= 0; --i) {
          if (state.stack[i] == closeBracket) {
            --i;
            break;
          }
        }
      } else {
        // Consider nullable non-terminals if at top of stack
        var dn = indentTop[state.stack[i]];
        if (dn) {
          n += dn;
          --i;
        }
      }
      for (; i >= 0; --i) {
        var dn = indentTable[state.stack[i]];
        if (dn) {
          n += dn;
        }
      }
      return n * config.indentUnit;
    }
  }

  return {
    token: tokenBase,
    startState: function(base) {
      return {
        tokenize: tokenBase,
        OK: true,
        complete: grammar.acceptEmpty,
        errorStartPos: null,
        errorEndPos: null,
        queryType: null,
        possibleCurrent: getPossibles(grammar.startSymbol),
        possibleNext: getPossibles(grammar.startSymbol),
        allowVars: true,
        allowBnodes: true,
        storeProperty: false,
        lastProperty: "",
        lexicalState: "default",
        inLiteral: null,
        stack: [grammar.startSymbol],
        lastPredicateOffset: config.indentUnit,
        prefixes: {}
      };
    },
    indent: indent,
    electricChars: "])"
  };
});
CodeMirror.defineMIME("application/vnd.sparql-generate", "sparql11");

},{"./_tokenizer-table.js":2,"codemirror":undefined}],4:[function(require,module,exports){
/*
* TRIE implementation in Javascript
* Copyright (c) 2010 Saurabh Odhyan | http://odhyan.com
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
* Date: Nov 7, 2010
*/

/*
* A trie, or prefix tree, is a multi-way tree structure useful for storing strings over an alphabet.
* It has been used to store large dictionaries of English (say) words in spell-checking programs
* and in natural-language "understanding" programs.
* @see http://en.wikipedia.org/wiki/Trie
* @see http://www.csse.monash.edu.au/~lloyd/tildeAlgDS/Tree/Trie/
/*

* @class Trie
* @constructor
*/

var Trie = module.exports = function() {
  this.words = 0;
  this.prefixes = 0;
  this.children = [];
};

Trie.prototype = {
  /*
    * Insert a word into the dictionary.
    * Recursively traverse through the trie nodes, and create new node if does not already exist.
    *
    * @method insert
    * @param {String} str Word to insert in the dictionary
    * @param {Integer} pos Current index of the string to be inserted
    * @return {Void}
    */
  insert: function(str, pos) {
    if (str.length == 0) {
      //blank string cannot be inserted
      return;
    }

    var T = this, k, child;

    if (pos === undefined) {
      pos = 0;
    }
    if (pos === str.length) {
      T.words++;
      return;
    }
    T.prefixes++;
    k = str[pos];
    if (T.children[k] === undefined) {
      //if node for this char doesn't exist, create one
      T.children[k] = new Trie();
    }
    child = T.children[k];
    child.insert(str, pos + 1);
  },

  /*
    * Remove a word from the dictionary.
    *
    * @method remove
    * @param {String} str Word to be removed
    * @param {Integer} pos Current index of the string to be removed
    * @return {Void}
    */
  remove: function(str, pos) {
    if (str.length == 0) {
      return;
    }

    var T = this, k, child;

    if (pos === undefined) {
      pos = 0;
    }
    if (T === undefined) {
      return;
    }
    if (pos === str.length) {
      T.words--;
      return;
    }
    T.prefixes--;
    k = str[pos];
    child = T.children[k];
    child.remove(str, pos + 1);
  },

  /*
    * Update an existing word in the dictionary.
    * This method removes the old word from the dictionary and inserts the new word.
    *
    * @method update
    * @param {String} strOld The old word to be replaced
    * @param {String} strNew The new word to be inserted
    * @return {Void}
    */
  update: function(strOld, strNew) {
    if (strOld.length == 0 || strNew.length == 0) {
      return;
    }
    this.remove(strOld);
    this.insert(strNew);
  },

  /*
    * Count the number of times a given word has been inserted into the dictionary
    *
    * @method countWord
    * @param {String} str Word to get count of
    * @param {Integer} pos Current index of the given word
    * @return {Integer} The number of times a given word exists in the dictionary
    */
  countWord: function(str, pos) {
    if (str.length == 0) {
      return 0;
    }

    var T = this, k, child, ret = 0;

    if (pos === undefined) {
      pos = 0;
    }
    if (pos === str.length) {
      return T.words;
    }
    k = str[pos];
    child = T.children[k];
    if (child !== undefined) {
      //node exists
      ret = child.countWord(str, pos + 1);
    }
    return ret;
  },

  /*
    * Count the number of times a given prefix exists in the dictionary
    *
    * @method countPrefix
    * @param {String} str Prefix to get count of
    * @param {Integer} pos Current index of the given prefix
    * @return {Integer} The number of times a given prefix exists in the dictionary
    */
  countPrefix: function(str, pos) {
    if (str.length == 0) {
      return 0;
    }

    var T = this, k, child, ret = 0;

    if (pos === undefined) {
      pos = 0;
    }
    if (pos === str.length) {
      return T.prefixes;
    }
    var k = str[pos];
    child = T.children[k];
    if (child !== undefined) {
      //node exists
      ret = child.countPrefix(str, pos + 1);
    }
    return ret;
  },

  /*
    * Find a word in the dictionary
    *
    * @method find
    * @param {String} str The word to find in the dictionary
    * @return {Boolean} True if the word exists in the dictionary, else false
    */
  find: function(str) {
    if (str.length == 0) {
      return false;
    }

    if (this.countWord(str) > 0) {
      return true;
    } else {
      return false;
    }
  },

  /*
    * Get all words in the dictionary
    *
    * @method getAllWords
    * @param {String} str Prefix of current word
    * @return {Array} Array of words in the dictionary
    */
  getAllWords: function(str) {
    var T = this, k, child, ret = [];
    if (str === undefined) {
      str = "";
    }
    if (T === undefined) {
      return [];
    }
    if (T.words > 0) {
      ret.push(str);
    }
    for (k in T.children) {
      if (T.children.hasOwnProperty(k)) {
        child = T.children[k];
        ret = ret.concat(child.getAllWords(str + k));
      }
    }
    return ret;
  },

  /*
    * Autocomplete a given prefix
    *
    * @method autoComplete
    * @param {String} str Prefix to be completed based on dictionary entries
    * @param {Integer} pos Current index of the prefix
    * @return {Array} Array of possible suggestions
    */
  autoComplete: function(str, pos) {
    var T = this, k, child;
    if (str.length == 0) {
      if (pos === undefined) {
        return T.getAllWords(str);
      } else {
        return [];
      }
    }
    if (pos === undefined) {
      pos = 0;
    }
    k = str[pos];
    child = T.children[k];
    if (child === undefined) {
      //node doesn't exist
      return [];
    }
    if (pos === str.length - 1) {
      return child.getAllWords(str);
    }
    return child.autoComplete(str, pos + 1);
  }
};

},{}],5:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("fullScreen", false, function(cm, val, old) {
    if (old == CodeMirror.Init) old = false;
    if (!old == !val) return;
    if (val) setFullscreen(cm);
    else setNormal(cm);
  });

  function setFullscreen(cm) {
    var wrap = cm.getWrapperElement();
    cm.state.fullScreenRestore = {scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset,
                                  width: wrap.style.width, height: wrap.style.height};
    wrap.style.width = "";
    wrap.style.height = "auto";
    wrap.className += " CodeMirror-fullscreen";
    document.documentElement.style.overflow = "hidden";
    cm.refresh();
  }

  function setNormal(cm) {
    var wrap = cm.getWrapperElement();
    wrap.className = wrap.className.replace(/\s*CodeMirror-fullscreen\b/, "");
    document.documentElement.style.overflow = "";
    var info = cm.state.fullScreenRestore;
    wrap.style.width = info.width; wrap.style.height = info.height;
    window.scrollTo(info.scrollLeft, info.scrollTop);
    cm.refresh();
  }
});

},{"codemirror":undefined}],6:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  var ie_lt8 = /MSIE \d/.test(navigator.userAgent) &&
    (document.documentMode == null || document.documentMode < 8);

  var Pos = CodeMirror.Pos;

  var matching = {"(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<"};

  function findMatchingBracket(cm, where, strict, config) {
    var line = cm.getLineHandle(where.line), pos = where.ch - 1;
    var match = (pos >= 0 && matching[line.text.charAt(pos)]) || matching[line.text.charAt(++pos)];
    if (!match) return null;
    var dir = match.charAt(1) == ">" ? 1 : -1;
    if (strict && (dir > 0) != (pos == where.ch)) return null;
    var style = cm.getTokenTypeAt(Pos(where.line, pos + 1));

    var found = scanForBracket(cm, Pos(where.line, pos + (dir > 0 ? 1 : 0)), dir, style || null, config);
    if (found == null) return null;
    return {from: Pos(where.line, pos), to: found && found.pos,
            match: found && found.ch == match.charAt(0), forward: dir > 0};
  }

  // bracketRegex is used to specify which type of bracket to scan
  // should be a regexp, e.g. /[[\]]/
  //
  // Note: If "where" is on an open bracket, then this bracket is ignored.
  //
  // Returns false when no bracket was found, null when it reached
  // maxScanLines and gave up
  function scanForBracket(cm, where, dir, style, config) {
    var maxScanLen = (config && config.maxScanLineLength) || 10000;
    var maxScanLines = (config && config.maxScanLines) || 1000;

    var stack = [];
    var re = config && config.bracketRegex ? config.bracketRegex : /[(){}[\]]/;
    var lineEnd = dir > 0 ? Math.min(where.line + maxScanLines, cm.lastLine() + 1)
                          : Math.max(cm.firstLine() - 1, where.line - maxScanLines);
    for (var lineNo = where.line; lineNo != lineEnd; lineNo += dir) {
      var line = cm.getLine(lineNo);
      if (!line) continue;
      var pos = dir > 0 ? 0 : line.length - 1, end = dir > 0 ? line.length : -1;
      if (line.length > maxScanLen) continue;
      if (lineNo == where.line) pos = where.ch - (dir < 0 ? 1 : 0);
      for (; pos != end; pos += dir) {
        var ch = line.charAt(pos);
        if (re.test(ch) && (style === undefined || cm.getTokenTypeAt(Pos(lineNo, pos + 1)) == style)) {
          var match = matching[ch];
          if ((match.charAt(1) == ">") == (dir > 0)) stack.push(ch);
          else if (!stack.length) return {pos: Pos(lineNo, pos), ch: ch};
          else stack.pop();
        }
      }
    }
    return lineNo - dir == (dir > 0 ? cm.lastLine() : cm.firstLine()) ? false : null;
  }

  function matchBrackets(cm, autoclear, config) {
    // Disable brace matching in long lines, since it'll cause hugely slow updates
    var maxHighlightLen = cm.state.matchBrackets.maxHighlightLineLength || 1000;
    var marks = [], ranges = cm.listSelections();
    for (var i = 0; i < ranges.length; i++) {
      var match = ranges[i].empty() && findMatchingBracket(cm, ranges[i].head, false, config);
      if (match && cm.getLine(match.from.line).length <= maxHighlightLen) {
        var style = match.match ? "CodeMirror-matchingbracket" : "CodeMirror-nonmatchingbracket";
        marks.push(cm.markText(match.from, Pos(match.from.line, match.from.ch + 1), {className: style}));
        if (match.to && cm.getLine(match.to.line).length <= maxHighlightLen)
          marks.push(cm.markText(match.to, Pos(match.to.line, match.to.ch + 1), {className: style}));
      }
    }

    if (marks.length) {
      // Kludge to work around the IE bug from issue #1193, where text
      // input stops going to the textare whever this fires.
      if (ie_lt8 && cm.state.focused) cm.focus();

      var clear = function() {
        cm.operation(function() {
          for (var i = 0; i < marks.length; i++) marks[i].clear();
        });
      };
      if (autoclear) setTimeout(clear, 800);
      else return clear;
    }
  }

  var currentlyHighlighted = null;
  function doMatchBrackets(cm) {
    cm.operation(function() {
      if (currentlyHighlighted) {currentlyHighlighted(); currentlyHighlighted = null;}
      currentlyHighlighted = matchBrackets(cm, false, cm.state.matchBrackets);
    });
  }

  CodeMirror.defineOption("matchBrackets", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init)
      cm.off("cursorActivity", doMatchBrackets);
    if (val) {
      cm.state.matchBrackets = typeof val == "object" ? val : {};
      cm.on("cursorActivity", doMatchBrackets);
    }
  });

  CodeMirror.defineExtension("matchBrackets", function() {matchBrackets(this, true);});
  CodeMirror.defineExtension("findMatchingBracket", function(pos, strict, config){
    return findMatchingBracket(this, pos, strict, config);
  });
  CodeMirror.defineExtension("scanForBracket", function(pos, dir, style, config){
    return scanForBracket(this, pos, dir, style, config);
  });
});

},{"codemirror":undefined}],7:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.registerHelper("fold", "brace", function(cm, start) {
  var line = start.line, lineText = cm.getLine(line);
  var tokenType;

  function findOpening(openCh) {
    for (var at = start.ch, pass = 0;;) {
      var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
      if (found == -1) {
        if (pass == 1) break;
        pass = 1;
        at = lineText.length;
        continue;
      }
      if (pass == 1 && found < start.ch) break;
      tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
      if (!/^(comment|string)/.test(tokenType)) return found + 1;
      at = found - 1;
    }
  }

  var startToken = "{", endToken = "}", startCh = findOpening("{");
  if (startCh == null) {
    startToken = "[", endToken = "]";
    startCh = findOpening("[");
  }

  if (startCh == null) return;
  var count = 1, lastLine = cm.lastLine(), end, endCh;
  outer: for (var i = line; i <= lastLine; ++i) {
    var text = cm.getLine(i), pos = i == line ? startCh : 0;
    for (;;) {
      var nextOpen = text.indexOf(startToken, pos), nextClose = text.indexOf(endToken, pos);
      if (nextOpen < 0) nextOpen = text.length;
      if (nextClose < 0) nextClose = text.length;
      pos = Math.min(nextOpen, nextClose);
      if (pos == text.length) break;
      if (cm.getTokenTypeAt(CodeMirror.Pos(i, pos + 1)) == tokenType) {
        if (pos == nextOpen) ++count;
        else if (!--count) { end = i; endCh = pos; break outer; }
      }
      ++pos;
    }
  }
  if (end == null || line == end && endCh == startCh) return;
  return {from: CodeMirror.Pos(line, startCh),
          to: CodeMirror.Pos(end, endCh)};
});

CodeMirror.registerHelper("fold", "import", function(cm, start) {
  function hasImport(line) {
    if (line < cm.firstLine() || line > cm.lastLine()) return null;
    var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
    if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
    if (start.type != "keyword" || start.string != "import") return null;
    // Now find closing semicolon, return its position
    for (var i = line, e = Math.min(cm.lastLine(), line + 10); i <= e; ++i) {
      var text = cm.getLine(i), semi = text.indexOf(";");
      if (semi != -1) return {startCh: start.end, end: CodeMirror.Pos(i, semi)};
    }
  }

  var startLine = start.line, has = hasImport(startLine), prev;
  if (!has || hasImport(startLine - 1) || ((prev = hasImport(startLine - 2)) && prev.end.line == startLine - 1))
    return null;
  for (var end = has.end;;) {
    var next = hasImport(end.line + 1);
    if (next == null) break;
    end = next.end;
  }
  return {from: cm.clipPos(CodeMirror.Pos(startLine, has.startCh + 1)), to: end};
});

CodeMirror.registerHelper("fold", "include", function(cm, start) {
  function hasInclude(line) {
    if (line < cm.firstLine() || line > cm.lastLine()) return null;
    var start = cm.getTokenAt(CodeMirror.Pos(line, 1));
    if (!/\S/.test(start.string)) start = cm.getTokenAt(CodeMirror.Pos(line, start.end + 1));
    if (start.type == "meta" && start.string.slice(0, 8) == "#include") return start.start + 8;
  }

  var startLine = start.line, has = hasInclude(startLine);
  if (has == null || hasInclude(startLine - 1) != null) return null;
  for (var end = startLine;;) {
    var next = hasInclude(end + 1);
    if (next == null) break;
    ++end;
  }
  return {from: CodeMirror.Pos(startLine, has + 1),
          to: cm.clipPos(CodeMirror.Pos(end))};
});

});

},{"codemirror":undefined}],8:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function doFold(cm, pos, options, force) {
    if (options && options.call) {
      var finder = options;
      options = null;
    } else {
      var finder = getOption(cm, options, "rangeFinder");
    }
    if (typeof pos == "number") pos = CodeMirror.Pos(pos, 0);
    var minSize = getOption(cm, options, "minFoldSize");

    function getRange(allowFolded) {
      var range = finder(cm, pos);
      if (!range || range.to.line - range.from.line < minSize) return null;
      var marks = cm.findMarksAt(range.from);
      for (var i = 0; i < marks.length; ++i) {
        if (marks[i].__isFold && force !== "fold") {
          if (!allowFolded) return null;
          range.cleared = true;
          marks[i].clear();
        }
      }
      return range;
    }

    var range = getRange(true);
    if (getOption(cm, options, "scanUp")) while (!range && pos.line > cm.firstLine()) {
      pos = CodeMirror.Pos(pos.line - 1, 0);
      range = getRange(false);
    }
    if (!range || range.cleared || force === "unfold") return;

    var myWidget = makeWidget(cm, options);
    CodeMirror.on(myWidget, "mousedown", function(e) {
      myRange.clear();
      CodeMirror.e_preventDefault(e);
    });
    var myRange = cm.markText(range.from, range.to, {
      replacedWith: myWidget,
      clearOnEnter: getOption(cm, options, "clearOnEnter"),
      __isFold: true
    });
    myRange.on("clear", function(from, to) {
      CodeMirror.signal(cm, "unfold", cm, from, to);
    });
    CodeMirror.signal(cm, "fold", cm, range.from, range.to);
  }

  function makeWidget(cm, options) {
    var widget = getOption(cm, options, "widget");
    if (typeof widget == "string") {
      var text = document.createTextNode(widget);
      widget = document.createElement("span");
      widget.appendChild(text);
      widget.className = "CodeMirror-foldmarker";
    }
    return widget;
  }

  // Clumsy backwards-compatible interface
  CodeMirror.newFoldFunction = function(rangeFinder, widget) {
    return function(cm, pos) { doFold(cm, pos, {rangeFinder: rangeFinder, widget: widget}); };
  };

  // New-style interface
  CodeMirror.defineExtension("foldCode", function(pos, options, force) {
    doFold(this, pos, options, force);
  });

  CodeMirror.defineExtension("isFolded", function(pos) {
    var marks = this.findMarksAt(pos);
    for (var i = 0; i < marks.length; ++i)
      if (marks[i].__isFold) return true;
  });

  CodeMirror.commands.toggleFold = function(cm) {
    cm.foldCode(cm.getCursor());
  };
  CodeMirror.commands.fold = function(cm) {
    cm.foldCode(cm.getCursor(), null, "fold");
  };
  CodeMirror.commands.unfold = function(cm) {
    cm.foldCode(cm.getCursor(), null, "unfold");
  };
  CodeMirror.commands.foldAll = function(cm) {
    cm.operation(function() {
      for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
        cm.foldCode(CodeMirror.Pos(i, 0), null, "fold");
    });
  };
  CodeMirror.commands.unfoldAll = function(cm) {
    cm.operation(function() {
      for (var i = cm.firstLine(), e = cm.lastLine(); i <= e; i++)
        cm.foldCode(CodeMirror.Pos(i, 0), null, "unfold");
    });
  };

  CodeMirror.registerHelper("fold", "combine", function() {
    var funcs = Array.prototype.slice.call(arguments, 0);
    return function(cm, start) {
      for (var i = 0; i < funcs.length; ++i) {
        var found = funcs[i](cm, start);
        if (found) return found;
      }
    };
  });

  CodeMirror.registerHelper("fold", "auto", function(cm, start) {
    var helpers = cm.getHelpers(start, "fold");
    for (var i = 0; i < helpers.length; i++) {
      var cur = helpers[i](cm, start);
      if (cur) return cur;
    }
  });

  var defaultOptions = {
    rangeFinder: CodeMirror.fold.auto,
    widget: "\u2194",
    minFoldSize: 0,
    scanUp: false,
    clearOnEnter: true
  };

  CodeMirror.defineOption("foldOptions", null);

  function getOption(cm, options, name) {
    if (options && options[name] !== undefined)
      return options[name];
    var editorOptions = cm.options.foldOptions;
    if (editorOptions && editorOptions[name] !== undefined)
      return editorOptions[name];
    return defaultOptions[name];
  }

  CodeMirror.defineExtension("foldOption", function(options, name) {
    return getOption(this, options, name);
  });
});

},{"codemirror":undefined}],9:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})(), require("./foldcode"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "./foldcode"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  CodeMirror.defineOption("foldGutter", false, function(cm, val, old) {
    if (old && old != CodeMirror.Init) {
      cm.clearGutter(cm.state.foldGutter.options.gutter);
      cm.state.foldGutter = null;
      cm.off("gutterClick", onGutterClick);
      cm.off("change", onChange);
      cm.off("viewportChange", onViewportChange);
      cm.off("fold", onFold);
      cm.off("unfold", onFold);
      cm.off("swapDoc", onChange);
    }
    if (val) {
      cm.state.foldGutter = new State(parseOptions(val));
      updateInViewport(cm);
      cm.on("gutterClick", onGutterClick);
      cm.on("change", onChange);
      cm.on("viewportChange", onViewportChange);
      cm.on("fold", onFold);
      cm.on("unfold", onFold);
      cm.on("swapDoc", onChange);
    }
  });

  var Pos = CodeMirror.Pos;

  function State(options) {
    this.options = options;
    this.from = this.to = 0;
  }

  function parseOptions(opts) {
    if (opts === true) opts = {};
    if (opts.gutter == null) opts.gutter = "CodeMirror-foldgutter";
    if (opts.indicatorOpen == null) opts.indicatorOpen = "CodeMirror-foldgutter-open";
    if (opts.indicatorFolded == null) opts.indicatorFolded = "CodeMirror-foldgutter-folded";
    return opts;
  }

  function isFolded(cm, line) {
    var marks = cm.findMarks(Pos(line, 0), Pos(line + 1, 0));
    for (var i = 0; i < marks.length; ++i)
      if (marks[i].__isFold && marks[i].find().from.line == line) return marks[i];
  }

  function marker(spec) {
    if (typeof spec == "string") {
      var elt = document.createElement("div");
      elt.className = spec + " CodeMirror-guttermarker-subtle";
      return elt;
    } else {
      return spec.cloneNode(true);
    }
  }

  function updateFoldInfo(cm, from, to) {
    var opts = cm.state.foldGutter.options, cur = from;
    var minSize = cm.foldOption(opts, "minFoldSize");
    var func = cm.foldOption(opts, "rangeFinder");
    cm.eachLine(from, to, function(line) {
      var mark = null;
      if (isFolded(cm, cur)) {
        mark = marker(opts.indicatorFolded);
      } else {
        var pos = Pos(cur, 0);
        var range = func && func(cm, pos);
        if (range && range.to.line - range.from.line >= minSize)
          mark = marker(opts.indicatorOpen);
      }
      cm.setGutterMarker(line, opts.gutter, mark);
      ++cur;
    });
  }

  function updateInViewport(cm) {
    var vp = cm.getViewport(), state = cm.state.foldGutter;
    if (!state) return;
    cm.operation(function() {
      updateFoldInfo(cm, vp.from, vp.to);
    });
    state.from = vp.from; state.to = vp.to;
  }

  function onGutterClick(cm, line, gutter) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var opts = state.options;
    if (gutter != opts.gutter) return;
    var folded = isFolded(cm, line);
    if (folded) folded.clear();
    else cm.foldCode(Pos(line, 0), opts.rangeFinder);
  }

  function onChange(cm) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var opts = state.options;
    state.from = state.to = 0;
    clearTimeout(state.changeUpdate);
    state.changeUpdate = setTimeout(function() { updateInViewport(cm); }, opts.foldOnChangeTimeSpan || 600);
  }

  function onViewportChange(cm) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var opts = state.options;
    clearTimeout(state.changeUpdate);
    state.changeUpdate = setTimeout(function() {
      var vp = cm.getViewport();
      if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
        updateInViewport(cm);
      } else {
        cm.operation(function() {
          if (vp.from < state.from) {
            updateFoldInfo(cm, vp.from, state.from);
            state.from = vp.from;
          }
          if (vp.to > state.to) {
            updateFoldInfo(cm, state.to, vp.to);
            state.to = vp.to;
          }
        });
      }
    }, opts.updateViewportTimeSpan || 400);
  }

  function onFold(cm, from) {
    var state = cm.state.foldGutter;
    if (!state) return;
    var line = from.line;
    if (line >= state.from && line < state.to)
      updateFoldInfo(cm, line, line + 1);
  }
});

},{"./foldcode":8,"codemirror":undefined}],10:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var Pos = CodeMirror.Pos;
  function cmp(a, b) { return a.line - b.line || a.ch - b.ch; }

  var nameStartChar = "A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";
  var nameChar = nameStartChar + "\-\:\.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040";
  var xmlTagStart = new RegExp("<(/?)([" + nameStartChar + "][" + nameChar + "]*)", "g");

  function Iter(cm, line, ch, range) {
    this.line = line; this.ch = ch;
    this.cm = cm; this.text = cm.getLine(line);
    this.min = range ? range.from : cm.firstLine();
    this.max = range ? range.to - 1 : cm.lastLine();
  }

  function tagAt(iter, ch) {
    var type = iter.cm.getTokenTypeAt(Pos(iter.line, ch));
    return type && /\btag\b/.test(type);
  }

  function nextLine(iter) {
    if (iter.line >= iter.max) return;
    iter.ch = 0;
    iter.text = iter.cm.getLine(++iter.line);
    return true;
  }
  function prevLine(iter) {
    if (iter.line <= iter.min) return;
    iter.text = iter.cm.getLine(--iter.line);
    iter.ch = iter.text.length;
    return true;
  }

  function toTagEnd(iter) {
    for (;;) {
      var gt = iter.text.indexOf(">", iter.ch);
      if (gt == -1) { if (nextLine(iter)) continue; else return; }
      if (!tagAt(iter, gt + 1)) { iter.ch = gt + 1; continue; }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }
  function toTagStart(iter) {
    for (;;) {
      var lt = iter.ch ? iter.text.lastIndexOf("<", iter.ch - 1) : -1;
      if (lt == -1) { if (prevLine(iter)) continue; else return; }
      if (!tagAt(iter, lt + 1)) { iter.ch = lt; continue; }
      xmlTagStart.lastIndex = lt;
      iter.ch = lt;
      var match = xmlTagStart.exec(iter.text);
      if (match && match.index == lt) return match;
    }
  }

  function toNextTag(iter) {
    for (;;) {
      xmlTagStart.lastIndex = iter.ch;
      var found = xmlTagStart.exec(iter.text);
      if (!found) { if (nextLine(iter)) continue; else return; }
      if (!tagAt(iter, found.index + 1)) { iter.ch = found.index + 1; continue; }
      iter.ch = found.index + found[0].length;
      return found;
    }
  }
  function toPrevTag(iter) {
    for (;;) {
      var gt = iter.ch ? iter.text.lastIndexOf(">", iter.ch - 1) : -1;
      if (gt == -1) { if (prevLine(iter)) continue; else return; }
      if (!tagAt(iter, gt + 1)) { iter.ch = gt; continue; }
      var lastSlash = iter.text.lastIndexOf("/", gt);
      var selfClose = lastSlash > -1 && !/\S/.test(iter.text.slice(lastSlash + 1, gt));
      iter.ch = gt + 1;
      return selfClose ? "selfClose" : "regular";
    }
  }

  function findMatchingClose(iter, tag) {
    var stack = [];
    for (;;) {
      var next = toNextTag(iter), end, startLine = iter.line, startCh = iter.ch - (next ? next[0].length : 0);
      if (!next || !(end = toTagEnd(iter))) return;
      if (end == "selfClose") continue;
      if (next[1]) { // closing tag
        for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == next[2]) {
          stack.length = i;
          break;
        }
        if (i < 0 && (!tag || tag == next[2])) return {
          tag: next[2],
          from: Pos(startLine, startCh),
          to: Pos(iter.line, iter.ch)
        };
      } else { // opening tag
        stack.push(next[2]);
      }
    }
  }
  function findMatchingOpen(iter, tag) {
    var stack = [];
    for (;;) {
      var prev = toPrevTag(iter);
      if (!prev) return;
      if (prev == "selfClose") { toTagStart(iter); continue; }
      var endLine = iter.line, endCh = iter.ch;
      var start = toTagStart(iter);
      if (!start) return;
      if (start[1]) { // closing tag
        stack.push(start[2]);
      } else { // opening tag
        for (var i = stack.length - 1; i >= 0; --i) if (stack[i] == start[2]) {
          stack.length = i;
          break;
        }
        if (i < 0 && (!tag || tag == start[2])) return {
          tag: start[2],
          from: Pos(iter.line, iter.ch),
          to: Pos(endLine, endCh)
        };
      }
    }
  }

  CodeMirror.registerHelper("fold", "xml", function(cm, start) {
    var iter = new Iter(cm, start.line, 0);
    for (;;) {
      var openTag = toNextTag(iter), end;
      if (!openTag || iter.line != start.line || !(end = toTagEnd(iter))) return;
      if (!openTag[1] && end != "selfClose") {
        var startPos = Pos(iter.line, iter.ch);
        var endPos = findMatchingClose(iter, openTag[2]);
        return endPos && {from: startPos, to: endPos.from};
      }
    }
  });
  CodeMirror.findMatchingTag = function(cm, pos, range) {
    var iter = new Iter(cm, pos.line, pos.ch, range);
    if (iter.text.indexOf(">") == -1 && iter.text.indexOf("<") == -1) return;
    var end = toTagEnd(iter), to = end && Pos(iter.line, iter.ch);
    var start = end && toTagStart(iter);
    if (!end || !start || cmp(iter, pos) > 0) return;
    var here = {from: Pos(iter.line, iter.ch), to: to, tag: start[2]};
    if (end == "selfClose") return {open: here, close: null, at: "open"};

    if (start[1]) { // closing tag
      return {open: findMatchingOpen(iter, start[2]), close: here, at: "close"};
    } else { // opening tag
      iter = new Iter(cm, to.line, to.ch, range);
      return {open: here, close: findMatchingClose(iter, start[2]), at: "open"};
    }
  };

  CodeMirror.findEnclosingTag = function(cm, pos, range) {
    var iter = new Iter(cm, pos.line, pos.ch, range);
    for (;;) {
      var open = findMatchingOpen(iter);
      if (!open) break;
      var forward = new Iter(cm, pos.line, pos.ch, range);
      var close = findMatchingClose(forward, open.tag);
      if (close) return {open: open, close: close};
    }
  };

  // Used by addon/edit/closetag.js
  CodeMirror.scanForClosingTag = function(cm, pos, name, end) {
    var iter = new Iter(cm, pos.line, pos.ch, end ? {from: 0, to: end} : null);
    return findMatchingClose(iter, name);
  };
});

},{"codemirror":undefined}],11:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var HINT_ELEMENT_CLASS        = "CodeMirror-hint";
  var ACTIVE_HINT_ELEMENT_CLASS = "CodeMirror-hint-active";

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function(cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    var newOpts = {hint: getHints};
    if (options) for (var prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  CodeMirror.defineExtension("showHint", function(options) {
    options = parseOptions(this, this.getCursor("start"), options);
    var selections = this.listSelections()
    if (selections.length > 1) return;
    // By default, don't allow completion when something is selected.
    // A hint function can have a `supportsSelection` property to
    // indicate that it can handle selections.
    if (this.somethingSelected()) {
      if (!options.hint.supportsSelection) return;
      // Don't try with cross-line selections
      for (var i = 0; i < selections.length; i++)
        if (selections[i].head.line != selections[i].anchor.line) return;
    }

    if (this.state.completionActive) this.state.completionActive.close();
    var completion = this.state.completionActive = new Completion(this, options);
    if (!completion.options.hint) return;

    CodeMirror.signal(this, "startCompletion", this);
    completion.update(true);
  });

  function Completion(cm, options) {
    this.cm = cm;
    this.options = options;
    this.widget = null;
    this.debounce = 0;
    this.tick = 0;
    this.startPos = this.cm.getCursor("start");
    this.startLen = this.cm.getLine(this.startPos.line).length - this.cm.getSelection().length;

    var self = this;
    cm.on("cursorActivity", this.activityFunc = function() { self.cursorActivity(); });
  }

  var requestAnimationFrame = window.requestAnimationFrame || function(fn) {
    return setTimeout(fn, 1000/60);
  };
  var cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

  Completion.prototype = {
    close: function() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;
      this.tick = null;
      this.cm.off("cursorActivity", this.activityFunc);

      if (this.widget && this.data) CodeMirror.signal(this.data, "close");
      if (this.widget) this.widget.close();
      CodeMirror.signal(this.cm, "endCompletion", this.cm);
    },

    active: function() {
      return this.cm.state.completionActive == this;
    },

    pick: function(data, i) {
      var completion = data.list[i];
      if (completion.hint) completion.hint(this.cm, data, completion);
      else this.cm.replaceRange(getText(completion), completion.from || data.from,
                                completion.to || data.to, "complete");
      CodeMirror.signal(data, "pick", completion);
      this.close();
    },

    cursorActivity: function() {
      if (this.debounce) {
        cancelAnimationFrame(this.debounce);
        this.debounce = 0;
      }

      var pos = this.cm.getCursor(), line = this.cm.getLine(pos.line);
      if (pos.line != this.startPos.line || line.length - pos.ch != this.startLen - this.startPos.ch ||
          pos.ch < this.startPos.ch || this.cm.somethingSelected() ||
          (pos.ch && this.options.closeCharacters.test(line.charAt(pos.ch - 1)))) {
        this.close();
      } else {
        var self = this;
        this.debounce = requestAnimationFrame(function() {self.update();});
        if (this.widget) this.widget.disable();
      }
    },

    update: function(first) {
      if (this.tick == null) return
      var self = this, myTick = ++this.tick
      fetchHints(this.options.hint, this.cm, this.options, function(data) {
        if (self.tick == myTick) self.finishUpdate(data, first)
      })
    },

    finishUpdate: function(data, first) {
      if (this.data) CodeMirror.signal(this.data, "update");

      var picked = (this.widget && this.widget.picked) || (first && this.options.completeSingle);
      if (this.widget) this.widget.close();

      if (data && this.data && isNewCompletion(this.data, data)) return;
      this.data = data;

      if (data && data.list.length) {
        if (picked && data.list.length == 1) {
          this.pick(data, 0);
        } else {
          this.widget = new Widget(this, data);
          CodeMirror.signal(data, "shown");
        }
      }
    }
  };

  function isNewCompletion(old, nw) {
    var moved = CodeMirror.cmpPos(nw.from, old.from)
    return moved > 0 && old.to.ch - old.from.ch != nw.to.ch - nw.from.ch
  }

  function parseOptions(cm, pos, options) {
    var editor = cm.options.hintOptions;
    var out = {};
    for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
    if (editor) for (var prop in editor)
      if (editor[prop] !== undefined) out[prop] = editor[prop];
    if (options) for (var prop in options)
      if (options[prop] !== undefined) out[prop] = options[prop];
    if (out.hint.resolve) out.hint = out.hint.resolve(cm, pos)
    return out;
  }

  function getText(completion) {
    if (typeof completion == "string") return completion;
    else return completion.text;
  }

  function buildKeyMap(completion, handle) {
    var baseMap = {
      Up: function() {handle.moveFocus(-1);},
      Down: function() {handle.moveFocus(1);},
      PageUp: function() {handle.moveFocus(-handle.menuSize() + 1, true);},
      PageDown: function() {handle.moveFocus(handle.menuSize() - 1, true);},
      Home: function() {handle.setFocus(0);},
      End: function() {handle.setFocus(handle.length - 1);},
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close
    };
    var custom = completion.options.customKeys;
    var ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      var bound;
      if (typeof val != "string")
        bound = function(cm) { return val(cm, handle); };
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val))
        bound = baseMap[val];
      else
        bound = val;
      ourMap[key] = bound;
    }
    if (custom)
      for (var key in custom) if (custom.hasOwnProperty(key))
        addBinding(key, custom[key]);
    var extra = completion.options.extraKeys;
    if (extra)
      for (var key in extra) if (extra.hasOwnProperty(key))
        addBinding(key, extra[key]);
    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === "LI" && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  function Widget(completion, data) {
    this.completion = completion;
    this.data = data;
    this.picked = false;
    var widget = this, cm = completion.cm;

    var hints = this.hints = document.createElement("ul");
    hints.className = "CodeMirror-hints";
    this.selectedHint = data.selectedHint || 0;

    var completions = data.list;
    for (var i = 0; i < completions.length; ++i) {
      var elt = hints.appendChild(document.createElement("li")), cur = completions[i];
      var className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? "" : " " + ACTIVE_HINT_ELEMENT_CLASS);
      if (cur.className != null) className = cur.className + " " + className;
      elt.className = className;
      if (cur.render) cur.render(elt, data, cur);
      else elt.appendChild(document.createTextNode(cur.displayText || getText(cur)));
      elt.hintId = i;
    }

    var pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
    var left = pos.left, top = pos.bottom, below = true;
    hints.style.left = left + "px";
    hints.style.top = top + "px";
    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
    var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    var winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
    (completion.options.container || document.body).appendChild(hints);
    var box = hints.getBoundingClientRect(), overlapY = box.bottom - winH;
    var scrolls = hints.scrollHeight > hints.clientHeight + 1
    var startScroll = cm.getScrollInfo();

    if (overlapY > 0) {
      var height = box.bottom - box.top, curTop = pos.top - (pos.bottom - box.top);
      if (curTop - height > 0) { // Fits above cursor
        hints.style.top = (top = pos.top - height) + "px";
        below = false;
      } else if (height > winH) {
        hints.style.height = (winH - 5) + "px";
        hints.style.top = (top = pos.bottom - box.top) + "px";
        var cursor = cm.getCursor();
        if (data.from.ch != cursor.ch) {
          pos = cm.cursorCoords(cursor);
          hints.style.left = (left = pos.left) + "px";
          box = hints.getBoundingClientRect();
        }
      }
    }
    var overlapX = box.right - winW;
    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        hints.style.width = (winW - 5) + "px";
        overlapX -= (box.right - box.left) - winW;
      }
      hints.style.left = (left = pos.left - overlapX) + "px";
    }
    if (scrolls) for (var node = hints.firstChild; node; node = node.nextSibling)
      node.style.paddingRight = cm.display.nativeBarWidth + "px"

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus: function(n, avoidWrap) { widget.changeActive(widget.selectedHint + n, avoidWrap); },
      setFocus: function(n) { widget.changeActive(n); },
      menuSize: function() { return widget.screenAmount(); },
      length: completions.length,
      close: function() { completion.close(); },
      pick: function() { widget.pick(); },
      data: data
    }));

    if (completion.options.closeOnUnfocus) {
      var closingOnBlur;
      cm.on("blur", this.onBlur = function() { closingOnBlur = setTimeout(function() { completion.close(); }, 100); });
      cm.on("focus", this.onFocus = function() { clearTimeout(closingOnBlur); });
    }

    cm.on("scroll", this.onScroll = function() {
      var curScroll = cm.getScrollInfo(), editor = cm.getWrapperElement().getBoundingClientRect();
      var newTop = top + startScroll.top - curScroll.top;
      var point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
      if (!below) point += hints.offsetHeight;
      if (point <= editor.top || point >= editor.bottom) return completion.close();
      hints.style.top = newTop + "px";
      hints.style.left = (left + startScroll.left - curScroll.left) + "px";
    });

    CodeMirror.on(hints, "dblclick", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {widget.changeActive(t.hintId); widget.pick();}
    });

    CodeMirror.on(hints, "click", function(e) {
      var t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        if (completion.options.completeOnSingleClick) widget.pick();
      }
    });

    CodeMirror.on(hints, "mousedown", function() {
      setTimeout(function(){cm.focus();}, 20);
    });

    CodeMirror.signal(data, "select", completions[0], hints.firstChild);
    return true;
  }

  Widget.prototype = {
    close: function() {
      if (this.completion.widget != this) return;
      this.completion.widget = null;
      this.hints.parentNode.removeChild(this.hints);
      this.completion.cm.removeKeyMap(this.keyMap);

      var cm = this.completion.cm;
      if (this.completion.options.closeOnUnfocus) {
        cm.off("blur", this.onBlur);
        cm.off("focus", this.onFocus);
      }
      cm.off("scroll", this.onScroll);
    },

    disable: function() {
      this.completion.cm.removeKeyMap(this.keyMap);
      var widget = this;
      this.keyMap = {Enter: function() { widget.picked = true; }};
      this.completion.cm.addKeyMap(this.keyMap);
    },

    pick: function() {
      this.completion.pick(this.data, this.selectedHint);
    },

    changeActive: function(i, avoidWrap) {
      if (i >= this.data.list.length)
        i = avoidWrap ? this.data.list.length - 1 : 0;
      else if (i < 0)
        i = avoidWrap ? 0  : this.data.list.length - 1;
      if (this.selectedHint == i) return;
      var node = this.hints.childNodes[this.selectedHint];
      node.className = node.className.replace(" " + ACTIVE_HINT_ELEMENT_CLASS, "");
      node = this.hints.childNodes[this.selectedHint = i];
      node.className += " " + ACTIVE_HINT_ELEMENT_CLASS;
      if (node.offsetTop < this.hints.scrollTop)
        this.hints.scrollTop = node.offsetTop - 3;
      else if (node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight)
        this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3;
      CodeMirror.signal(this.data, "select", this.data.list[this.selectedHint], node);
    },

    screenAmount: function() {
      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
    }
  };

  function applicableHelpers(cm, helpers) {
    if (!cm.somethingSelected()) return helpers
    var result = []
    for (var i = 0; i < helpers.length; i++)
      if (helpers[i].supportsSelection) result.push(helpers[i])
    return result
  }

  function fetchHints(hint, cm, options, callback) {
    if (hint.async) {
      hint(cm, callback, options)
    } else {
      var result = hint(cm, options)
      if (result && result.then) result.then(callback)
      else callback(result)
    }
  }

  function resolveAutoHints(cm, pos) {
    var helpers = cm.getHelpers(pos, "hint"), words
    if (helpers.length) {
      var resolved = function(cm, callback, options) {
        var app = applicableHelpers(cm, helpers);
        function run(i) {
          if (i == app.length) return callback(null)
          fetchHints(app[i], cm, options, function(result) {
            if (result && result.list.length > 0) callback(result)
            else run(i + 1)
          })
        }
        run(0)
      }
      resolved.async = true
      resolved.supportsSelection = true
      return resolved
    } else if (words = cm.getHelper(cm.getCursor(), "hintWords")) {
      return function(cm) { return CodeMirror.hint.fromList(cm, {words: words}) }
    } else if (CodeMirror.hint.anyword) {
      return function(cm, options) { return CodeMirror.hint.anyword(cm, options) }
    } else {
      return function() {}
    }
  }

  CodeMirror.registerHelper("hint", "auto", {
    resolve: resolveAutoHints
  });

  CodeMirror.registerHelper("hint", "fromList", function(cm, options) {
    var cur = cm.getCursor(), token = cm.getTokenAt(cur);
    var to = CodeMirror.Pos(cur.line, token.end);
    if (token.string && /\w/.test(token.string[token.string.length - 1])) {
      var term = token.string, from = CodeMirror.Pos(cur.line, token.start);
    } else {
      var term = "", from = to;
    }
    var found = [];
    for (var i = 0; i < options.words.length; i++) {
      var word = options.words[i];
      if (word.slice(0, term.length) == term)
        found.push(word);
    }

    if (found.length) return {list: found, from: from, to: to};
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnUnfocus: true,
    completeOnSingleClick: true,
    container: null,
    customKeys: null,
    extraKeys: null
  };

  CodeMirror.defineOption("hintOptions", null);
});

},{"codemirror":undefined}],12:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.runMode = function(string, modespec, callback, options) {
  var mode = CodeMirror.getMode(CodeMirror.defaults, modespec);
  var ie = /MSIE \d/.test(navigator.userAgent);
  var ie_lt9 = ie && (document.documentMode == null || document.documentMode < 9);

  if (callback.appendChild) {
    var tabSize = (options && options.tabSize) || CodeMirror.defaults.tabSize;
    var node = callback, col = 0;
    node.innerHTML = "";
    callback = function(text, style) {
      if (text == "\n") {
        // Emitting LF or CRLF on IE8 or earlier results in an incorrect display.
        // Emitting a carriage return makes everything ok.
        node.appendChild(document.createTextNode(ie_lt9 ? '\r' : text));
        col = 0;
        return;
      }
      var content = "";
      // replace tabs
      for (var pos = 0;;) {
        var idx = text.indexOf("\t", pos);
        if (idx == -1) {
          content += text.slice(pos);
          col += text.length - pos;
          break;
        } else {
          col += idx - pos;
          content += text.slice(pos, idx);
          var size = tabSize - col % tabSize;
          col += size;
          for (var i = 0; i < size; ++i) content += " ";
          pos = idx + 1;
        }
      }

      if (style) {
        var sp = node.appendChild(document.createElement("span"));
        sp.className = "cm-" + style.replace(/ +/g, " cm-");
        sp.appendChild(document.createTextNode(content));
      } else {
        node.appendChild(document.createTextNode(content));
      }
    };
  }

  var lines = CodeMirror.splitLines(string), state = (options && options.state) || CodeMirror.startState(mode);
  for (var i = 0, e = lines.length; i < e; ++i) {
    if (i) callback("\n");
    var stream = new CodeMirror.StringStream(lines[i]);
    if (!stream.string && mode.blankLine) mode.blankLine(state);
    while (!stream.eol()) {
      var style = mode.token(stream, state);
      callback(stream.current(), style, i, stream.start, state);
      stream.start = stream.pos;
    }
  }
};

});

},{"codemirror":undefined}],13:[function(require,module,exports){
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod((function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})());
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  var Pos = CodeMirror.Pos;

  function SearchCursor(doc, query, pos, caseFold) {
    this.atOccurrence = false; this.doc = doc;
    if (caseFold == null && typeof query == "string") caseFold = false;

    pos = pos ? doc.clipPos(pos) : Pos(0, 0);
    this.pos = {from: pos, to: pos};

    // The matches method is filled in based on the type of query.
    // It takes a position and a direction, and returns an object
    // describing the next occurrence of the query, or null if no
    // more matches were found.
    if (typeof query != "string") { // Regexp match
      if (!query.global) query = new RegExp(query.source, query.ignoreCase ? "ig" : "g");
      this.matches = function(reverse, pos) {
        if (reverse) {
          query.lastIndex = 0;
          var line = doc.getLine(pos.line).slice(0, pos.ch), cutOff = 0, match, start;
          for (;;) {
            query.lastIndex = cutOff;
            var newMatch = query.exec(line);
            if (!newMatch) break;
            match = newMatch;
            start = match.index;
            cutOff = match.index + (match[0].length || 1);
            if (cutOff == line.length) break;
          }
          var matchLen = (match && match[0].length) || 0;
          if (!matchLen) {
            if (start == 0 && line.length == 0) {match = undefined;}
            else if (start != doc.getLine(pos.line).length) {
              matchLen++;
            }
          }
        } else {
          query.lastIndex = pos.ch;
          var line = doc.getLine(pos.line), match = query.exec(line);
          var matchLen = (match && match[0].length) || 0;
          var start = match && match.index;
          if (start + matchLen != line.length && !matchLen) matchLen = 1;
        }
        if (match && matchLen)
          return {from: Pos(pos.line, start),
                  to: Pos(pos.line, start + matchLen),
                  match: match};
      };
    } else { // String query
      var origQuery = query;
      if (caseFold) query = query.toLowerCase();
      var fold = caseFold ? function(str){return str.toLowerCase();} : function(str){return str;};
      var target = query.split("\n");
      // Different methods for single-line and multi-line queries
      if (target.length == 1) {
        if (!query.length) {
          // Empty string would match anything and never progress, so
          // we define it to match nothing instead.
          this.matches = function() {};
        } else {
          this.matches = function(reverse, pos) {
            if (reverse) {
              var orig = doc.getLine(pos.line).slice(0, pos.ch), line = fold(orig);
              var match = line.lastIndexOf(query);
              if (match > -1) {
                match = adjustPos(orig, line, match);
                return {from: Pos(pos.line, match), to: Pos(pos.line, match + origQuery.length)};
              }
             } else {
               var orig = doc.getLine(pos.line).slice(pos.ch), line = fold(orig);
               var match = line.indexOf(query);
               if (match > -1) {
                 match = adjustPos(orig, line, match) + pos.ch;
                 return {from: Pos(pos.line, match), to: Pos(pos.line, match + origQuery.length)};
               }
            }
          };
        }
      } else {
        var origTarget = origQuery.split("\n");
        this.matches = function(reverse, pos) {
          var last = target.length - 1;
          if (reverse) {
            if (pos.line - (target.length - 1) < doc.firstLine()) return;
            if (fold(doc.getLine(pos.line).slice(0, origTarget[last].length)) != target[target.length - 1]) return;
            var to = Pos(pos.line, origTarget[last].length);
            for (var ln = pos.line - 1, i = last - 1; i >= 1; --i, --ln)
              if (target[i] != fold(doc.getLine(ln))) return;
            var line = doc.getLine(ln), cut = line.length - origTarget[0].length;
            if (fold(line.slice(cut)) != target[0]) return;
            return {from: Pos(ln, cut), to: to};
          } else {
            if (pos.line + (target.length - 1) > doc.lastLine()) return;
            var line = doc.getLine(pos.line), cut = line.length - origTarget[0].length;
            if (fold(line.slice(cut)) != target[0]) return;
            var from = Pos(pos.line, cut);
            for (var ln = pos.line + 1, i = 1; i < last; ++i, ++ln)
              if (target[i] != fold(doc.getLine(ln))) return;
            if (fold(doc.getLine(ln).slice(0, origTarget[last].length)) != target[last]) return;
            return {from: from, to: Pos(ln, origTarget[last].length)};
          }
        };
      }
    }
  }

  SearchCursor.prototype = {
    findNext: function() {return this.find(false);},
    findPrevious: function() {return this.find(true);},

    find: function(reverse) {
      var self = this, pos = this.doc.clipPos(reverse ? this.pos.from : this.pos.to);
      function savePosAndFail(line) {
        var pos = Pos(line, 0);
        self.pos = {from: pos, to: pos};
        self.atOccurrence = false;
        return false;
      }

      for (;;) {
        if (this.pos = this.matches(reverse, pos)) {
          this.atOccurrence = true;
          return this.pos.match || true;
        }
        if (reverse) {
          if (!pos.line) return savePosAndFail(0);
          pos = Pos(pos.line-1, this.doc.getLine(pos.line-1).length);
        }
        else {
          var maxLine = this.doc.lineCount();
          if (pos.line == maxLine - 1) return savePosAndFail(maxLine);
          pos = Pos(pos.line + 1, 0);
        }
      }
    },

    from: function() {if (this.atOccurrence) return this.pos.from;},
    to: function() {if (this.atOccurrence) return this.pos.to;},

    replace: function(newText, origin) {
      if (!this.atOccurrence) return;
      var lines = CodeMirror.splitLines(newText);
      this.doc.replaceRange(lines, this.pos.from, this.pos.to, origin);
      this.pos.to = Pos(this.pos.from.line + lines.length - 1,
                        lines[lines.length - 1].length + (lines.length == 1 ? this.pos.from.ch : 0));
    }
  };

  // Maps a position in a case-folded line back to a position in the original line
  // (compensating for codepoints increasing in number during folding)
  function adjustPos(orig, folded, pos) {
    if (orig.length == folded.length) return pos;
    for (var pos1 = Math.min(pos, orig.length);;) {
      var len1 = orig.slice(0, pos1).toLowerCase().length;
      if (len1 < pos) ++pos1;
      else if (len1 > pos) --pos1;
      else return pos1;
    }
  }

  CodeMirror.defineExtension("getSearchCursor", function(query, pos, caseFold) {
    return new SearchCursor(this.doc, query, pos, caseFold);
  });
  CodeMirror.defineDocExtension("getSearchCursor", function(query, pos, caseFold) {
    return new SearchCursor(this, query, pos, caseFold);
  });

  CodeMirror.defineExtension("selectMatches", function(query, caseFold) {
    var ranges = [];
    var cur = this.getSearchCursor(query, this.getCursor("from"), caseFold);
    while (cur.findNext()) {
      if (CodeMirror.cmpPos(cur.to(), this.getCursor("to")) > 0) break;
      ranges.push({anchor: cur.from(), head: cur.to()});
    }
    if (ranges.length)
      this.setSelections(ranges, 0);
  });
});

},{"codemirror":undefined}],14:[function(require,module,exports){
var engine = require('../src/store-engine')

var storages = require('../storages/all')
var plugins = [require('../plugins/json2')]

module.exports = engine.createStore(storages, plugins)

},{"../plugins/json2":15,"../src/store-engine":17,"../storages/all":19}],15:[function(require,module,exports){
module.exports = json2Plugin

function json2Plugin() {
	require('./lib/json2')
	return {}
}

},{"./lib/json2":16}],16:[function(require,module,exports){
/* eslint-disable */

//  json2.js
//  2016-10-28
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());
},{}],17:[function(require,module,exports){
var util = require('./util')
var slice = util.slice
var pluck = util.pluck
var each = util.each
var bind = util.bind
var create = util.create
var isList = util.isList
var isFunction = util.isFunction
var isObject = util.isObject

module.exports = {
	createStore: createStore
}

var storeAPI = {
	version: '2.0.12',
	enabled: false,
	
	// get returns the value of the given key. If that value
	// is undefined, it returns optionalDefaultValue instead.
	get: function(key, optionalDefaultValue) {
		var data = this.storage.read(this._namespacePrefix + key)
		return this._deserialize(data, optionalDefaultValue)
	},

	// set will store the given value at key and returns value.
	// Calling set with value === undefined is equivalent to calling remove.
	set: function(key, value) {
		if (value === undefined) {
			return this.remove(key)
		}
		this.storage.write(this._namespacePrefix + key, this._serialize(value))
		return value
	},

	// remove deletes the key and value stored at the given key.
	remove: function(key) {
		this.storage.remove(this._namespacePrefix + key)
	},

	// each will call the given callback once for each key-value pair
	// in this store.
	each: function(callback) {
		var self = this
		this.storage.each(function(val, namespacedKey) {
			callback.call(self, self._deserialize(val), (namespacedKey || '').replace(self._namespaceRegexp, ''))
		})
	},

	// clearAll will remove all the stored key-value pairs in this store.
	clearAll: function() {
		this.storage.clearAll()
	},

	// additional functionality that can't live in plugins
	// ---------------------------------------------------

	// hasNamespace returns true if this store instance has the given namespace.
	hasNamespace: function(namespace) {
		return (this._namespacePrefix == '__storejs_'+namespace+'_')
	},

	// createStore creates a store.js instance with the first
	// functioning storage in the list of storage candidates,
	// and applies the the given mixins to the instance.
	createStore: function() {
		return createStore.apply(this, arguments)
	},
	
	addPlugin: function(plugin) {
		this._addPlugin(plugin)
	},
	
	namespace: function(namespace) {
		return createStore(this.storage, this.plugins, namespace)
	}
}

function _warn() {
	var _console = (typeof console == 'undefined' ? null : console)
	if (!_console) { return }
	var fn = (_console.warn ? _console.warn : _console.log)
	fn.apply(_console, arguments)
}

function createStore(storages, plugins, namespace) {
	if (!namespace) {
		namespace = ''
	}
	if (storages && !isList(storages)) {
		storages = [storages]
	}
	if (plugins && !isList(plugins)) {
		plugins = [plugins]
	}

	var namespacePrefix = (namespace ? '__storejs_'+namespace+'_' : '')
	var namespaceRegexp = (namespace ? new RegExp('^'+namespacePrefix) : null)
	var legalNamespaces = /^[a-zA-Z0-9_\-]*$/ // alpha-numeric + underscore and dash
	if (!legalNamespaces.test(namespace)) {
		throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes')
	}
	
	var _privateStoreProps = {
		_namespacePrefix: namespacePrefix,
		_namespaceRegexp: namespaceRegexp,

		_testStorage: function(storage) {
			try {
				var testStr = '__storejs__test__'
				storage.write(testStr, testStr)
				var ok = (storage.read(testStr) === testStr)
				storage.remove(testStr)
				return ok
			} catch(e) {
				return false
			}
		},

		_assignPluginFnProp: function(pluginFnProp, propName) {
			var oldFn = this[propName]
			this[propName] = function pluginFn() {
				var args = slice(arguments, 0)
				var self = this

				// super_fn calls the old function which was overwritten by
				// this mixin.
				function super_fn() {
					if (!oldFn) { return }
					each(arguments, function(arg, i) {
						args[i] = arg
					})
					return oldFn.apply(self, args)
				}

				// Give mixing function access to super_fn by prefixing all mixin function
				// arguments with super_fn.
				var newFnArgs = [super_fn].concat(args)

				return pluginFnProp.apply(self, newFnArgs)
			}
		},

		_serialize: function(obj) {
			return JSON.stringify(obj)
		},

		_deserialize: function(strVal, defaultVal) {
			if (!strVal) { return defaultVal }
			// It is possible that a raw string value has been previously stored
			// in a storage without using store.js, meaning it will be a raw
			// string value instead of a JSON serialized string. By defaulting
			// to the raw string value in case of a JSON parse error, we allow
			// for past stored values to be forwards-compatible with store.js
			var val = ''
			try { val = JSON.parse(strVal) }
			catch(e) { val = strVal }

			return (val !== undefined ? val : defaultVal)
		},
		
		_addStorage: function(storage) {
			if (this.enabled) { return }
			if (this._testStorage(storage)) {
				this.storage = storage
				this.enabled = true
			}
		},

		_addPlugin: function(plugin) {
			var self = this

			// If the plugin is an array, then add all plugins in the array.
			// This allows for a plugin to depend on other plugins.
			if (isList(plugin)) {
				each(plugin, function(plugin) {
					self._addPlugin(plugin)
				})
				return
			}

			// Keep track of all plugins we've seen so far, so that we
			// don't add any of them twice.
			var seenPlugin = pluck(this.plugins, function(seenPlugin) {
				return (plugin === seenPlugin)
			})
			if (seenPlugin) {
				return
			}
			this.plugins.push(plugin)

			// Check that the plugin is properly formed
			if (!isFunction(plugin)) {
				throw new Error('Plugins must be function values that return objects')
			}

			var pluginProperties = plugin.call(this)
			if (!isObject(pluginProperties)) {
				throw new Error('Plugins must return an object of function properties')
			}

			// Add the plugin function properties to this store instance.
			each(pluginProperties, function(pluginFnProp, propName) {
				if (!isFunction(pluginFnProp)) {
					throw new Error('Bad plugin property: '+propName+' from plugin '+plugin.name+'. Plugins should only return functions.')
				}
				self._assignPluginFnProp(pluginFnProp, propName)
			})
		},
		
		// Put deprecated properties in the private API, so as to not expose it to accidential
		// discovery through inspection of the store object.
		
		// Deprecated: addStorage
		addStorage: function(storage) {
			_warn('store.addStorage(storage) is deprecated. Use createStore([storages])')
			this._addStorage(storage)
		}
	}

	var store = create(_privateStoreProps, storeAPI, {
		plugins: []
	})
	store.raw = {}
	each(store, function(prop, propName) {
		if (isFunction(prop)) {
			store.raw[propName] = bind(store, prop)			
		}
	})
	each(storages, function(storage) {
		store._addStorage(storage)
	})
	each(plugins, function(plugin) {
		store._addPlugin(plugin)
	})
	return store
}

},{"./util":18}],18:[function(require,module,exports){
(function (global){
var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
	assign: assign,
	create: create,
	trim: trim,
	bind: bind,
	slice: slice,
	each: each,
	map: map,
	pluck: pluck,
	isList: isList,
	isFunction: isFunction,
	isObject: isObject,
	Global: Global
}

function make_assign() {
	if (Object.assign) {
		return Object.assign
	} else {
		return function shimAssign(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) {
				each(Object(arguments[i]), function(val, key) {
					obj[key] = val
				})
			}			
			return obj
		}
	}
}

function make_create() {
	if (Object.create) {
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
		}
	} else {
		function F() {} // eslint-disable-line no-inner-declarations
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			F.prototype = obj
			return assign.apply(this, [new F()].concat(assignArgsList))
		}
	}
}

function make_trim() {
	if (String.prototype.trim) {
		return function trim(str) {
			return String.prototype.trim.call(str)
		}
	} else {
		return function trim(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
		}
	}
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
	}
}

function slice(arr, index) {
	return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
	pluck(obj, function(val, key) {
		fn(val, key)
		return false
	})
}

function map(obj, fn) {
	var res = (isList(obj) ? [] : {})
	pluck(obj, function(v, k) {
		res[k] = fn(v, k)
		return false
	})
	return res
}

function pluck(obj, fn) {
	if (isList(obj)) {
		for (var i=0; i<obj.length; i++) {
			if (fn(obj[i], i)) {
				return obj[i]
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn(obj[key], key)) {
					return obj[key]
				}
			}
		}
	}
}

function isList(val) {
	return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
	return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
	return val && {}.toString.call(val) === '[object Object]'
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
module.exports = [
	// Listed in order of usage preference
	require('./localStorage'),
	require('./oldFF-globalStorage'),
	require('./oldIE-userDataStorage'),
	require('./cookieStorage'),
	require('./sessionStorage'),
	require('./memoryStorage')
]

},{"./cookieStorage":20,"./localStorage":21,"./memoryStorage":22,"./oldFF-globalStorage":23,"./oldIE-userDataStorage":24,"./sessionStorage":25}],20:[function(require,module,exports){
// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

var util = require('../src/util')
var Global = util.Global
var trim = util.trim

module.exports = {
	name: 'cookieStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var doc = Global.document

function read(key) {
	if (!key || !_has(key)) { return null }
	var regexpStr = "(?:^|.*;\\s*)" +
		escape(key).replace(/[\-\.\+\*]/g, "\\$&") +
		"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
	return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"))
}

function each(callback) {
	var cookies = doc.cookie.split(/; ?/g)
	for (var i = cookies.length - 1; i >= 0; i--) {
		if (!trim(cookies[i])) {
			continue
		}
		var kvp = cookies[i].split('=')
		var key = unescape(kvp[0])
		var val = unescape(kvp[1])
		callback(val, key)
	}
}

function write(key, data) {
	if(!key) { return }
	doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
}

function remove(key) {
	if (!key || !_has(key)) {
		return
	}
	doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
}

function clearAll() {
	each(function(_, key) {
		remove(key)
	})
}

function _has(key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie)
}

},{"../src/util":18}],21:[function(require,module,exports){
var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function localStorage() {
	return Global.localStorage
}

function read(key) {
	return localStorage().getItem(key)
}

function write(key, data) {
	return localStorage().setItem(key, data)
}

function each(fn) {
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return localStorage().removeItem(key)
}

function clearAll() {
	return localStorage().clear()
}

},{"../src/util":18}],22:[function(require,module,exports){
// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

module.exports = {
	name: 'memoryStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var memoryStorage = {}

function read(key) {
	return memoryStorage[key]
}

function write(key, data) {
	memoryStorage[key] = data
}

function each(callback) {
	for (var key in memoryStorage) {
		if (memoryStorage.hasOwnProperty(key)) {
			callback(memoryStorage[key], key)
		}
	}
}

function remove(key) {
	delete memoryStorage[key]
}

function clearAll(key) {
	memoryStorage = {}
}

},{}],23:[function(require,module,exports){
// oldFF-globalStorage provides storage for Firefox
// versions 6 and 7, where no localStorage, etc
// is available.

var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'oldFF-globalStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var globalStorage = Global.globalStorage

function read(key) {
	return globalStorage[key]
}

function write(key, data) {
	globalStorage[key] = data
}

function each(fn) {
	for (var i = globalStorage.length - 1; i >= 0; i--) {
		var key = globalStorage.key(i)
		fn(globalStorage[key], key)
	}
}

function remove(key) {
	return globalStorage.removeItem(key)
}

function clearAll() {
	each(function(key, _) {
		delete globalStorage[key]
	})
}

},{"../src/util":18}],24:[function(require,module,exports){
// oldIE-userDataStorage provides storage for Internet Explorer
// versions 6 and 7, where no localStorage, sessionStorage, etc
// is available.

var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'oldIE-userDataStorage',
	write: write,
	read: read,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var storageName = 'storejs'
var doc = Global.document
var _withStorageEl = _makeIEStorageElFunction()
var disable = (Global.navigator ? Global.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./) // MSIE 9.x, MSIE 10.x

function write(unfixedKey, data) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.setAttribute(fixedKey, data)
		storageEl.save(storageName)
	})
}

function read(unfixedKey) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	var res = null
	_withStorageEl(function(storageEl) {
		res = storageEl.getAttribute(fixedKey)
	})
	return res
}

function each(callback) {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		for (var i=attributes.length-1; i>=0; i--) {
			var attr = attributes[i]
			callback(storageEl.getAttribute(attr.name), attr.name)
		}
	})
}

function remove(unfixedKey) {
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.removeAttribute(fixedKey)
		storageEl.save(storageName)
	})
}

function clearAll() {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		storageEl.load(storageName)
		for (var i=attributes.length-1; i>=0; i--) {
			storageEl.removeAttribute(attributes[i].name)
		}
		storageEl.save(storageName)
	})
}

// Helpers
//////////

// In IE7, keys cannot start with a digit or contain certain chars.
// See https://github.com/marcuswestin/store.js/issues/40
// See https://github.com/marcuswestin/store.js/issues/83
var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
function fixKey(key) {
	return key.replace(/^\d/, '___$&').replace(forbiddenCharsRegex, '___')
}

function _makeIEStorageElFunction() {
	if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) {
		return null
	}
	var scriptTag = 'script',
		storageOwner,
		storageContainer,
		storageEl

	// Since #userData storage applies only to specific paths, we need to
	// somehow link our data to a specific path.  We choose /favicon.ico
	// as a pretty safe option, since all browsers already make a request to
	// this URL anyway and being a 404 will not hurt us here.  We wrap an
	// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	// since the iframe access rules appear to allow direct access and
	// manipulation of the document element, even for a 404 page.  This
	// document can be used instead of the current document (which would
	// have been limited to the current path) to perform #userData storage.
	try {
		/* global ActiveXObject */
		storageContainer = new ActiveXObject('htmlfile')
		storageContainer.open()
		storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
		storageContainer.close()
		storageOwner = storageContainer.w.frames[0].document
		storageEl = storageOwner.createElement('div')
	} catch(e) {
		// somehow ActiveXObject instantiation failed (perhaps some special
		// security settings or otherwse), fall back to per-path storage
		storageEl = doc.createElement('div')
		storageOwner = doc.body
	}

	return function(storeFunction) {
		var args = [].slice.call(arguments, 0)
		args.unshift(storageEl)
		// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
		// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
		storageOwner.appendChild(storageEl)
		storageEl.addBehavior('#default#userData')
		storageEl.load(storageName)
		storeFunction.apply(this, args)
		storageOwner.removeChild(storageEl)
		return
	}
}

},{"../src/util":18}],25:[function(require,module,exports){
var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'sessionStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll
}

function sessionStorage() {
	return Global.sessionStorage
}

function read(key) {
	return sessionStorage().getItem(key)
}

function write(key, data) {
	return sessionStorage().setItem(key, data)
}

function each(fn) {
	for (var i = sessionStorage().length - 1; i >= 0; i--) {
		var key = sessionStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return sessionStorage().removeItem(key)
}

function clearAll() {
	return sessionStorage().clear()
}

},{"../src/util":18}],26:[function(require,module,exports){
module.exports={
  "_args": [
    [
      {
        "raw": "yasgui-utils@^1.6.7",
        "scope": null,
        "escapedName": "yasgui-utils",
        "name": "yasgui-utils",
        "rawSpec": "^1.6.7",
        "spec": ">=1.6.7 <2.0.0",
        "type": "range"
      },
      "C:\\Users\\maxime.lefrancois\\Dropbox\\_Recherche\\netbeansprojects\\YASGUI.YASQE"
    ]
  ],
  "_from": "yasgui-utils@>=1.6.7 <2.0.0",
  "_id": "yasgui-utils@1.6.7",
  "_inCache": true,
  "_location": "/yasgui-utils",
  "_nodeVersion": "7.10.0",
  "_npmOperationalInternal": {
    "host": "s3://npm-registry-packages",
    "tmp": "tmp/yasgui-utils-1.6.7.tgz_1495459781202_0.06725964159704745"
  },
  "_npmUser": {
    "name": "laurens.rietveld",
    "email": "laurens.rietveld@gmail.com"
  },
  "_npmVersion": "4.2.0",
  "_phantomChildren": {},
  "_requested": {
    "raw": "yasgui-utils@^1.6.7",
    "scope": null,
    "escapedName": "yasgui-utils",
    "name": "yasgui-utils",
    "rawSpec": "^1.6.7",
    "spec": ">=1.6.7 <2.0.0",
    "type": "range"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/yasgui-utils/-/yasgui-utils-1.6.7.tgz",
  "_shasum": "2bcfc5a315688de3ae6057883d9ae342b205f267",
  "_shrinkwrap": null,
  "_spec": "yasgui-utils@^1.6.7",
  "_where": "C:\\Users\\maxime.lefrancois\\Dropbox\\_Recherche\\netbeansprojects\\YASGUI.YASQE",
  "author": {
    "name": "Laurens Rietveld"
  },
  "bugs": {
    "url": "https://github.com/YASGUI/Utils/issues"
  },
  "dependencies": {
    "store": "^2.0.4"
  },
  "description": "Utils for YASGUI libs",
  "devDependencies": {},
  "directories": {},
  "dist": {
    "shasum": "2bcfc5a315688de3ae6057883d9ae342b205f267",
    "tarball": "https://registry.npmjs.org/yasgui-utils/-/yasgui-utils-1.6.7.tgz"
  },
  "gitHead": "6031b1cb732d390b29cd5376dceb9a9d665bbd11",
  "homepage": "https://github.com/YASGUI/Utils",
  "licenses": [
    {
      "type": "MIT",
      "url": "http://yasgui.github.io/license.txt"
    }
  ],
  "main": "src/main.js",
  "maintainers": [
    {
      "name": "laurens.rietveld",
      "email": "laurens.rietveld@gmail.com"
    }
  ],
  "name": "yasgui-utils",
  "optionalDependencies": {},
  "readme": "ERROR: No README data found!",
  "repository": {
    "type": "git",
    "url": "git://github.com/YASGUI/Utils.git"
  },
  "scripts": {},
  "version": "1.6.7"
}

},{}],27:[function(require,module,exports){
window.console = window.console || {"log":function(){}};//make sure any console statements don't break IE
module.exports = {
	storage: require("./storage.js"),
	svg: require("./svg.js"),
	version: {
		"yasgui-utils" : require("../package.json").version,
	},
	nestedExists : function(obj) {
		var args = Array.prototype.slice.call(arguments, 1);

		for (var i = 0; i < args.length; i++) {
			if (!obj || !obj.hasOwnProperty(args[i])) {
				return false;
			}
			obj = obj[args[i]];
		}
		return true;
	}
};

},{"../package.json":26,"./storage.js":28,"./svg.js":29}],28:[function(require,module,exports){
var store = require("store");
var times = {
  day: function() {
    return 1000 * 3600 * 24; //millis to day
  },
  month: function() {
    times.day() * 30;
  },
  year: function() {
    times.month() * 12;
  }
};
function isQuotaExceeded(e) {
  var quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === "NS_ERROR_DOM_QUOTA_REACHED") {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}
var root = (module.exports = {
  set: function(key, val, exp, onQuotaExceeded) {
    if (!store.enabled) return; //this is probably in private mode. Don't run, as we might get Js errors
    if (key && val !== undefined) {
      if (typeof exp == "string") {
        exp = times[exp]();
      }
      //try to store string for dom objects (e.g. XML result). Otherwise, we might get a circular reference error when stringifying this
      if (val.documentElement) val = new XMLSerializer().serializeToString(val.documentElement);
      try {
        store.set(key, {
          val: val,
          exp: exp,
          time: new Date().getTime()
        });
      } catch (e) {
        e.quotaExceeded = isQuotaExceeded(e);
        if (e.quotaExceeded && onQuotaExceeded) {
          onQuotaExceeded(e);
        } else {
          throw e;
        }
      }
    }
  },
  remove: function(key) {
    if (!store.enabled) return; //this is probably in private mode. Don't run, as we might get Js errors
    if (key) store.remove(key);
  },
  removeAll: function(filter) {
    if (!store.enabled) return; //this is probably in private mode. Don't run, as we might get Js errors
    if (!filter) {
      store.clearAll();
    } else if (typeof filter === "function") {
      store.each(function(value, key) {
        if (filter(key, value)) root.remove(key);
      });
    }
  },
  get: function(key) {
    if (!store.enabled) return null; //this is probably in private mode. Don't run, as we might get Js errors
    if (key) {
      var info = store.get(key);
      if (!info) {
        return null;
      }
      if (info.exp && new Date().getTime() - info.time > info.exp) {
        return null;
      }
      return info.val;
    } else {
      return null;
    }
  }
});

},{"store":14}],29:[function(require,module,exports){
module.exports = {
	draw: function(parent, svgString) {
		if (!parent) return;
		var el = module.exports.getElement(svgString);
		if (el) {
			if (parent.append) {
				parent.append(el);
			} else {
				//regular dom doc
				parent.appendChild(el);
			}
		}
	},
	getElement: function(svgString) {
		if (svgString && svgString.indexOf("<svg") == 0) {
			//no style passed via config. guess own styles
			var parser = new DOMParser();
			var dom = parser.parseFromString(svgString, "text/xml");
			var svg = dom.documentElement;
			
			var svgContainer = document.createElement("div");
			svgContainer.className = 'svgImg';
			svgContainer.appendChild(svg);
			return svgContainer;
		}
		return false;
	}
};
},{}],30:[function(require,module,exports){
module.exports={
  "name": "yasgui-yasqe",
  "description": "Yet Another SPARQL Query Editor",
  "version": "2.11.14",
  "main": "src/main.js",
  "license": "MIT",
  "author": "Laurens Rietveld",
  "homepage": "http://yasqe.yasgui.org",
  "scripts": {
    "dev": "gulp serve",
    "build": "gulp",
    "patch": "gulp patch",
    "minor": "gulp minor",
    "major": "gulp major"
  },
  "devDependencies": {
    "bootstrap-sass": "^3.3.7",
    "browserify": "^13.1.0",
    "browserify-shim": "^3.8.12",
    "browserify-transform-tools": "^1.6.0",
    "exorcist": "^0.4.0",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-bump": "^2.2.0",
    "gulp-concat": "^2.6.0",
    "gulp-connect": "^4.2.0",
    "gulp-cssimport": "^3.1.0",
    "gulp-cssnano": "^2.1.2",
    "gulp-embedlr": "^0.5.2",
    "gulp-filter": "^4.0.0",
    "gulp-git": "^2.4.1",
    "gulp-jsvalidate": "^2.1.0",
    "gulp-livereload": "^3.8.1",
    "gulp-notify": "^2.2.0",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.3.2",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-streamify": "1.0.2",
    "gulp-tag-version": "^1.3.0",
    "gulp-uglify": "^1.5.4",
    "node-sass": "^3.8.0",
    "require-dir": "^0.3.2",
    "run-sequence": "^1.2.2",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "~1.1.0",
    "vinyl-transform": "1.0.0",
    "watchify": "^3.7.0"
  },
  "bugs": "https://github.com/YASGUI/YASQE/issues/",
  "keywords": [
    "JavaScript",
    "SPARQL",
    "Editor",
    "Semantic Web",
    "Linked Data"
  ],
  "maintainers": [
    {
      "name": "Laurens Rietveld",
      "email": "laurens.rietveld@gmail.com",
      "web": "http://laurensrietveld.nl"
    }
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/YASGUI/YASQE.git"
  },
  "dependencies": {
    "codemirror": "5.17.0",
    "jquery": "^2.2.4",
    "node-sass": "^3.8.0",
    "prettier": "^1.4.4",
    "run-sequence": "^1.2.2",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "~1.1.0",
    "vinyl-transform": "1.0.0",
    "yasgui-utils": "^1.6.7"
  },
  "optionalShim": {
    "codemirror": {
      "require": "codemirror",
      "global": "CodeMirror"
    },
    "jquery": {
      "require": "jquery",
      "global": "jQuery"
    },
    "../../lib/codemirror": {
      "require": "codemirror",
      "global": "CodeMirror"
    }
  }
}

},{}],31:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})(),
  utils = require("../utils.js"),
  yutils = require("yasgui-utils"),
  Trie = require("../../lib/trie.js"),
  YASQE = require("../main.js");

module.exports = function(YASQE, yasqe) {
  var completionNotifications = {};
  var completers = {};
  var tries = {};

  yasqe.on("cursorActivity", function(yasqe, eventInfo) {
    autoComplete(true);
  });
  yasqe.on("change", function() {
    var needPossibleAdjustment = [];
    for (var notificationName in completionNotifications) {
      if (completionNotifications[notificationName].is(":visible")) {
        needPossibleAdjustment.push(completionNotifications[notificationName]);
      }
    }
    if (needPossibleAdjustment.length > 0) {
      //position completion notifications
      var scrollBar = $(yasqe.getWrapperElement()).find(".CodeMirror-vscrollbar");
      var offset = 0;
      if (scrollBar.is(":visible")) {
        offset = scrollBar.outerWidth();
      }
      needPossibleAdjustment.forEach(function(notification) {
        notification.css("right", offset);
      });
    }
  });

  /**
	 * Store bulk completions in memory as trie, and store these in localstorage as well (if enabled)
	 *
	 * @method doc.storeBulkCompletions
	 * @param completions {array}
	 */
  var storeBulkCompletions = function(completer, completions) {
    // store array as trie
    tries[completer.name] = new Trie();
    for (var i = 0; i < completions.length; i++) {
      tries[completer.name].insert(completions[i]);
    }
    // store in localstorage as well
    var storageId = utils.getPersistencyId(yasqe, completer.persistent);
    if (storageId) yutils.storage.set(storageId, completions, "month", yasqe.options.onQuotaExceeded);
  };

  var initCompleter = function(name, completionInit) {
    var completer = (completers[name] = new completionInit(yasqe, name));
    completer.name = name;
    if (completer.bulk) {
      var storeArrayAsBulk = function(suggestions) {
        if (suggestions && suggestions instanceof Array && suggestions.length > 0) {
          storeBulkCompletions(completer, suggestions);
        }
      };
      if (completer.get instanceof Array) {
        // we don't care whether the completions are already stored in
        // localstorage. just use this one
        storeArrayAsBulk(completer.get);
      } else {
        // if completions are defined in localstorage, use those! (calling the
        // function may come with overhead (e.g. async calls))
        var completionsFromStorage = null;
        var persistencyIdentifier = utils.getPersistencyId(yasqe, completer.persistent);
        if (persistencyIdentifier) completionsFromStorage = yutils.storage.get(persistencyIdentifier);
        if (completionsFromStorage && completionsFromStorage.length > 0) {
          storeArrayAsBulk(completionsFromStorage);
        } else {
          // nothing in storage. check whether we have a function via which we
          // can get our prefixes
          if (completer.get instanceof Function) {
            if (completer.async) {
              completer.get(null, storeArrayAsBulk);
            } else {
              storeArrayAsBulk(completer.get());
            }
          }
        }
      }
    }
  };

  var autoComplete = function(fromAutoShow) {
    if (yasqe.somethingSelected()) return;
    var tryHintType = function(completer) {
      if (
        fromAutoShow && // from autoShow, i.e. this gets called each time the editor content changes
        (!completer.autoShow || // autoshow for  this particular type of autocompletion is -not- enabled
          (!completer.bulk && completer.async)) // async is enabled (don't want to re-do ajax-like request for every editor change)
      ) {
        return false;
      }

      var hintConfig = {
        closeCharacters: /(?=a)b/,
        completeSingle: false
      };
      if (!completer.bulk && completer.async) {
        hintConfig.async = true;
      }
      var wrappedHintCallback = function(yasqe, callback) {
        return getCompletionHintsObject(completer, callback);
      };
      var result = YASQE.showHint(yasqe, wrappedHintCallback, hintConfig);
      return true;
    };
    for (var completerName in completers) {
      if ($.inArray(completerName, yasqe.options.autocompleters) == -1) continue; //this completer is disabled
      var completer = completers[completerName];
      if (!completer.isValidCompletionPosition) continue; //no way to check whether we are in a valid position

      if (!completer.isValidCompletionPosition()) {
        //if needed, fire callbacks for when we are -not- in valid completion position
        if (completer.callbacks && completer.callbacks.invalidPosition) {
          completer.callbacks.invalidPosition(yasqe, completer);
        }
        //not in a valid position, so continue to next completion candidate type
        continue;
      }
      // run valid position handler, if there is one (if it returns false, stop the autocompletion!)
      if (completer.callbacks && completer.callbacks.validPosition) {
        if (completer.callbacks.validPosition(yasqe, completer) === false) continue;
      }
      var success = tryHintType(completer);
      if (success) break;
    }
  };

  var getCompletionHintsObject = function(completer, callback) {
    var getSuggestionsFromToken = function(partialToken) {
      var stringToAutocomplete = partialToken.autocompletionString || partialToken.string;
      var suggestions = [];
      if (tries[completer.name]) {
        suggestions = tries[completer.name].autoComplete(stringToAutocomplete);
      } else if (typeof completer.get == "function" && completer.async == false) {
        suggestions = completer.get(stringToAutocomplete);
      } else if (typeof completer.get == "object") {
        var partialTokenLength = stringToAutocomplete.length;
        for (var i = 0; i < completer.get.length; i++) {
          var completion = completer.get[i];
          if (completion.slice(0, partialTokenLength) == stringToAutocomplete) {
            suggestions.push(completion);
          }
        }
      }
      return getSuggestionsAsHintObject(suggestions, completer, partialToken);
    };

    var token = yasqe.getCompleteToken();
    if (completer.preProcessToken) {
      token = completer.preProcessToken(token);
    }

    if (token) {
      // use custom completionhint function, to avoid reaching a loop when the
      // completionhint is the same as the current token
      // regular behaviour would keep changing the codemirror dom, hence
      // constantly calling this callback
      if (!completer.bulk && completer.async) {
        var wrappedCallback = function(suggestions) {
          callback(getSuggestionsAsHintObject(suggestions, completer, token));
        };
        completer.get(token, wrappedCallback);
      } else {
        return getSuggestionsFromToken(token);
      }
    }
  };

  /**
	 *  get our array of suggestions (strings) in the codemirror hint format
	 */
  var getSuggestionsAsHintObject = function(suggestions, completer, token) {
    var hintList = [];
    for (var i = 0; i < suggestions.length; i++) {
      var suggestedString = suggestions[i];
      if (completer.postProcessToken) {
        suggestedString = completer.postProcessToken(token, suggestedString);
      }
      hintList.push({
        text: suggestedString,
        displayText: suggestedString,
        hint: selectHint
      });
    }

    var cur = yasqe.getCursor();
    var returnObj = {
      completionToken: token.string,
      list: hintList,
      from: {
        line: cur.line,
        ch: token.start
      },
      to: {
        line: cur.line,
        ch: token.end
      }
    };
    //if we have some autocompletion handlers specified, add these these to the object. Codemirror will take care of firing these
    if (completer.callbacks) {
      for (var callbackName in completer.callbacks) {
        if (completer.callbacks[callbackName]) {
          YASQE.on(returnObj, callbackName, completer.callbacks[callbackName]);
        }
      }
    }
    return returnObj;
  };

  return {
    init: initCompleter,
    completers: completers,
    notifications: {
      getEl: function(completer) {
        return $(completionNotifications[completer.name]);
      },
      show: function(yasqe, completer) {
        //only draw when the user needs to use a keypress to summon autocompletions
        if (!completer.autoshow) {
          if (!completionNotifications[completer.name])
            completionNotifications[completer.name] = $("<div class='completionNotification'></div>");
          completionNotifications[completer.name]
            .show()
            .text("Press CTRL - <spacebar> to autocomplete")
            .appendTo($(yasqe.getWrapperElement()));
        }
      },
      hide: function(yasqe, completer) {
        if (completionNotifications[completer.name]) {
          completionNotifications[completer.name].hide();
        }
      }
    },
    autoComplete: autoComplete,
    getTrie: function(completer) {
      return typeof completer == "string" ? tries[completer] : tries[completer.name];
    }
  };
};

/**
 * function which fires after the user selects a completion. this function checks whether we actually need to store this one (if completion is same as current token, don't do anything)
 */
var selectHint = function(yasqe, data, completion) {
  if (completion.text != yasqe.getTokenAt(yasqe.getCursor()).string) {
    yasqe.replaceRange(completion.text, data.from, data.to);
  }
};

//
//module.exports = {
//	preprocessPrefixTokenForCompletion: preprocessPrefixTokenForCompletion,
//	postprocessResourceTokenForCompletion: postprocessResourceTokenForCompletion,
//	preprocessResourceTokenForCompletion: preprocessResourceTokenForCompletion,
//	showCompletionNotification: showCompletionNotification,
//	hideCompletionNotification: hideCompletionNotification,
//	autoComplete: autoComplete,
//	autocompleteVariables: autocompleteVariables,
//	fetchFromPrefixCc: fetchFromPrefixCc,
//	fetchFromLov: fetchFromLov,
////	storeBulkCompletions: storeBulkCompletions,
//	loadBulkCompletions: loadBulkCompletions,
//};

},{"../../lib/trie.js":4,"../main.js":41,"../utils.js":47,"jquery":undefined,"yasgui-utils":27}],32:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();
module.exports = function(yasqe, name) {
  return {
    isValidCompletionPosition: function() {
      return module.exports.isValidCompletionPosition(yasqe);
    },
    get: function(token, callback) {
      return require("./utils").fetchFromLov(yasqe, this, token, callback);
    },
    preProcessToken: function(token) {
      return module.exports.preProcessToken(yasqe, token);
    },
    postProcessToken: function(token, suggestedString) {
      return module.exports.postProcessToken(yasqe, token, suggestedString);
    },
    async: true,
    bulk: false,
    autoShow: false,
    persistent: name,
    callbacks: {
      validPosition: yasqe.autocompleters.notifications.show,
      invalidPosition: yasqe.autocompleters.notifications.hide
    }
  };
};

module.exports.isValidCompletionPosition = function(yasqe) {
  var token = yasqe.getCompleteToken();
  if (token.string.indexOf("?") == 0) return false;
  var cur = yasqe.getCursor();
  var previousToken = yasqe.getPreviousNonWsToken(cur.line, token);
  if (previousToken.string == "a") return true;
  if (previousToken.string == "rdf:type") return true;
  if (previousToken.string == "rdfs:domain") return true;
  if (previousToken.string == "rdfs:range") return true;
  return false;
};
module.exports.preProcessToken = function(yasqe, token) {
  return require("./utils.js").preprocessResourceTokenForCompletion(yasqe, token);
};
module.exports.postProcessToken = function(yasqe, token, suggestedString) {
  return require("./utils.js").postprocessResourceTokenForCompletion(yasqe, token, suggestedString);
};

},{"./utils":35,"./utils.js":35,"jquery":undefined}],33:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();
//this is a mapping from the class names (generic ones, for compatability with codemirror themes), to what they -actually- represent
var tokenTypes = {
  "string-2": "prefixed",
  atom: "var"
};

module.exports = function(yasqe, completerName) {
  //this autocompleter also fires on-change!
  yasqe.on("change", function() {
    module.exports.appendPrefixIfNeeded(yasqe, completerName);
  });

  return {
    isValidCompletionPosition: function() {
      return module.exports.isValidCompletionPosition(yasqe);
    },
    get: function(token, callback) {
      $.get(module.exports.fetchFrom, function(data) {
        var prefixArray = [];
        for (var prefix in data) {
          if (prefix == "bif") continue; // skip this one! see #231
          var completeString = prefix + ": <" + data[prefix] + ">";
          prefixArray.push(completeString); // the array we want to store in localstorage
        }

        prefixArray.sort();
        callback(prefixArray);
      });
    },
    preProcessToken: function(token) {
      return module.exports.preprocessPrefixTokenForCompletion(yasqe, token);
    },
    async: true,
    bulk: true,
    autoShow: true,
    persistent: completerName,
    callbacks: {
      pick: function() {
        yasqe.collapsePrefixes(false);
      }
    }
  };
};
module.exports.isValidCompletionPosition = function(yasqe) {
  var cur = yasqe.getCursor(), token = yasqe.getTokenAt(cur);

  // not at end of line
  if (yasqe.getLine(cur.line).length > cur.ch) return false;

  if (token.type != "ws") {
    // we want to complete token, e.g. when the prefix starts with an a
    // (treated as a token in itself..)
    // but we to avoid including the PREFIX tag. So when we have just
    // typed a space after the prefix tag, don't get the complete token
    token = yasqe.getCompleteToken();
  }

  // we shouldnt be at the uri part the prefix declaration
  // also check whether current token isnt 'a' (that makes codemirror
  // thing a namespace is a possiblecurrent
  if (!token.string.indexOf("a") == 0 && $.inArray("PNAME_NS", token.state.possibleCurrent) == -1) return false;

  // First token of line needs to be PREFIX,
  // there should be no trailing text (otherwise, text is wrongly inserted
  // in between)
  var previousToken = yasqe.getPreviousNonWsToken(cur.line, token);
  if (!previousToken || previousToken.string.toUpperCase() != "PREFIX") return false;
  return true;
};
module.exports.preprocessPrefixTokenForCompletion = function(yasqe, token) {
  var previousToken = yasqe.getPreviousNonWsToken(yasqe.getCursor().line, token);
  if (previousToken && previousToken.string && previousToken.string.slice(-1) == ":") {
    //combine both tokens! In this case we have the cursor at the end of line "PREFIX bla: <".
    //we want the token to be "bla: <", en not "<"
    token = {
      start: previousToken.start,
      end: token.end,
      string: previousToken.string + " " + token.string,
      state: token.state
    };
  }
  return token;
};
/**
 * Check whether typed prefix is declared. If not, automatically add declaration
 * using list from prefix.cc
 *
 * @param yasqe
 */
module.exports.appendPrefixIfNeeded = function(yasqe, completerName) {
  if (!yasqe.autocompleters.getTrie(completerName)) return; // no prefixed defined. just stop
  if (!yasqe.options.autocompleters || yasqe.options.autocompleters.indexOf(completerName) == -1) return; //this autocompleter is disabled
  var cur = yasqe.getCursor();

  var token = yasqe.getTokenAt(cur);
  if (tokenTypes[token.type] == "prefixed") {
    var colonIndex = token.string.indexOf(":");
    if (colonIndex !== -1) {
      // check previous token isnt PREFIX, or a '<'(which would mean we are in a uri)
      //			var firstTokenString = yasqe.getNextNonWsToken(cur.line).string.toUpperCase();
      var lastNonWsTokenString = yasqe.getPreviousNonWsToken(cur.line, token).string.toUpperCase();
      var previousToken = yasqe.getTokenAt({
        line: cur.line,
        ch: token.start
      }); // needs to be null (beginning of line), or whitespace
      if (lastNonWsTokenString != "PREFIX" && (previousToken.type == "ws" || previousToken.type == null)) {
        // check whether it isnt defined already (saves us from looping
        // through the array)
        var currentPrefix = token.string.substring(0, colonIndex + 1);
        var queryPrefixes = yasqe.getPrefixesFromQuery();
        if (queryPrefixes[currentPrefix.slice(0, -1)] == null) {
          // ok, so it isnt added yet!
          var completions = yasqe.autocompleters.getTrie(completerName).autoComplete(currentPrefix);
          if (completions.length > 0) {
            yasqe.addPrefixes(completions[0]);
          }
        }
      }
    }
  }
};

module.exports.fetchFrom = (window.location.protocol.indexOf("http") === 0 ? "//" : "http://") +
  "prefix.cc/popular/all.file.json";

},{"jquery":undefined}],34:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();
module.exports = function(yasqe, name) {
  return {
    isValidCompletionPosition: function() {
      return module.exports.isValidCompletionPosition(yasqe);
    },
    get: function(token, callback) {
      return require("./utils").fetchFromLov(yasqe, this, token, callback);
    },
    preProcessToken: function(token) {
      return module.exports.preProcessToken(yasqe, token);
    },
    postProcessToken: function(token, suggestedString) {
      return module.exports.postProcessToken(yasqe, token, suggestedString);
    },
    async: true,
    bulk: false,
    autoShow: false,
    persistent: name,
    callbacks: {
      validPosition: yasqe.autocompleters.notifications.show,
      invalidPosition: yasqe.autocompleters.notifications.hide
    }
  };
};

module.exports.isValidCompletionPosition = function(yasqe) {
  var token = yasqe.getCompleteToken();
  if (token.string.length == 0) return false; //we want -something- to autocomplete
  if (token.string.indexOf("?") == 0) return false; // we are typing a var
  if ($.inArray("a", token.state.possibleCurrent) >= 0) return true; // predicate pos
  var cur = yasqe.getCursor();
  var previousToken = yasqe.getPreviousNonWsToken(cur.line, token);
  if (previousToken.string == "rdfs:subPropertyOf") return true;

  // hmm, we would like -better- checks here, e.g. checking whether we are
  // in a subject, and whether next item is a rdfs:subpropertyof.
  // difficult though... the grammar we use is unreliable when the query
  // is invalid (i.e. during typing), and often the predicate is not typed
  // yet, when we are busy writing the subject...
  return false;
};
module.exports.preProcessToken = function(yasqe, token) {
  return require("./utils.js").preprocessResourceTokenForCompletion(yasqe, token);
};
module.exports.postProcessToken = function(yasqe, token, suggestedString) {
  return require("./utils.js").postprocessResourceTokenForCompletion(yasqe, token, suggestedString);
};

},{"./utils":35,"./utils.js":35,"jquery":undefined}],35:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})(), utils = require("./utils.js"), yutils = require("yasgui-utils");
/**
 * Where the base class only contains functionality related to -all- completions, this class contains some utils used here and there in our autocompletions
 */

/**
 * Converts rdf:type to http://.../type and converts <http://...> to http://...
 * Stores additional info such as the used namespace and prefix in the token object
 */
var preprocessResourceTokenForCompletion = function(yasqe, token) {
  var queryPrefixes = yasqe.getPrefixesFromQuery();
  if (!token.string.indexOf("<") == 0) {
    token.tokenPrefix = token.string.substring(0, token.string.indexOf(":") + 1);

    if (queryPrefixes[token.tokenPrefix.slice(0, -1)] != null) {
      token.tokenPrefixUri = queryPrefixes[token.tokenPrefix.slice(0, -1)];
    }
  }

  token.autocompletionString = token.string.trim();
  if (!token.string.indexOf("<") == 0 && token.string.indexOf(":") > -1) {
    // hmm, the token is prefixed. We still need the complete uri for autocompletions. generate this!
    for (var prefix in queryPrefixes) {
      if (token.tokenPrefix === prefix + ":") {
        token.autocompletionString = queryPrefixes[prefix];
        token.autocompletionString += token.string.substring(prefix.length + 1);
        break;
      }
    }
  }

  if (token.autocompletionString.indexOf("<") == 0)
    token.autocompletionString = token.autocompletionString.substring(1);
  if (token.autocompletionString.indexOf(">", token.length - 1) !== -1)
    token.autocompletionString = token.autocompletionString.substring(0, token.autocompletionString.length - 1);
  return token;
};

var postprocessResourceTokenForCompletion = function(yasqe, token, suggestedString) {
  if (token.tokenPrefix && token.autocompletionString && token.tokenPrefixUri) {
    // we need to get the suggested string back to prefixed form
    suggestedString = token.tokenPrefix + suggestedString.substring(token.tokenPrefixUri.length);
  } else {
    // it is a regular uri. add '<' and '>' to string
    suggestedString = "<" + suggestedString + ">";
  }
  return suggestedString;
};

//Use protocol relative request when served via http[s]*. Otherwise (e.g. file://, fetch via http)
var reqProtocol = window.location.protocol.indexOf("http") === 0 ? "//" : "http://";
var fetchFromLov = function(yasqe, completer, token, callback) {
  if (!token || !token.string || token.string.trim().length == 0) {
    yasqe.autocompleters.notifications.getEl(completer).empty().append("Nothing to autocomplete yet!");
    return false;
  }
  var maxResults = 50;

  var args = {
    q: token.autocompletionString,
    page: 1
  };
  if (completer.name == "classes") {
    args.type = "class";
  } else {
    args.type = "property";
  }
  var results = [];
  var url = "";
  var updateUrl = function() {
    url = reqProtocol + "lov.okfn.org/dataset/lov/api/v2/autocomplete/terms?" + $.param(args);
  };
  updateUrl();
  var increasePage = function() {
    args.page++;
    updateUrl();
  };
  var doRequests = function() {
    $.get(url, function(data) {
      for (var i = 0; i < data.results.length; i++) {
        if ($.isArray(data.results[i].uri) && data.results[i].uri.length > 0) {
          results.push(data.results[i].uri[0]);
        } else {
          results.push(data.results[i].uri);
        }
      }
      if (results.length < data.total_results && results.length < maxResults) {
        increasePage();
        doRequests();
      } else {
        //if notification bar is there, show feedback, or close
        if (results.length > 0) {
          yasqe.autocompleters.notifications.hide(yasqe, completer);
        } else {
          yasqe.autocompleters.notifications.getEl(completer).text("0 matches found...");
        }
        callback(results);
        // requests done! Don't call this function again
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      yasqe.autocompleters.notifications.getEl(completer).empty().append("Failed fetching suggestions..");
    });
  };
  //if notification bar is there, show a loader
  yasqe.autocompleters.notifications
    .getEl(completer)
    .empty()
    .append($("<span>Fetchting autocompletions &nbsp;</span>"))
    .append($(yutils.svg.getElement(require("../imgs.js").loader)).addClass("notificationLoader"));
  doRequests();
};

module.exports = {
  fetchFromLov: fetchFromLov,
  preprocessResourceTokenForCompletion: preprocessResourceTokenForCompletion,
  postprocessResourceTokenForCompletion: postprocessResourceTokenForCompletion
};

},{"../imgs.js":40,"./utils.js":35,"jquery":undefined,"yasgui-utils":27}],36:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();
module.exports = function(yasqe) {
  return {
    isValidCompletionPosition: function() {
      var token = yasqe.getTokenAt(yasqe.getCursor());
      if (token.type != "ws") {
        token = yasqe.getCompleteToken(token);
        if (token && token.string.indexOf("?") == 0) {
          return true;
        }
      }
      return false;
    },
    get: function(token) {
      if (token.trim().length == 0) return []; //nothing to autocomplete
      var distinctVars = {};
      //do this outside of codemirror. I expect jquery to be faster here (just finding dom elements with classnames)
      $(yasqe.getWrapperElement()).find(".cm-atom").each(function() {
        var variable = this.innerHTML;
        if (variable.indexOf("?") == 0) {
          //ok, lets check if the next element in the div is an atom as well. In that case, they belong together (may happen sometimes when query is not syntactically valid)
          var nextEl = $(this).next();
          var nextElClass = nextEl.attr("class");
          if (nextElClass && nextEl.attr("class").indexOf("cm-atom") >= 0) {
            variable += nextEl.text();
          }

          //skip single questionmarks
          if (variable.length <= 1) return;

          //it should match our token ofcourse
          if (variable.indexOf(token) !== 0) return;

          //skip exact matches
          if (variable == token) return;

          //store in map so we have a unique list
          distinctVars[variable] = true;
        }
      });
      var variables = [];
      for (var variable in distinctVars) {
        variables.push(variable);
      }
      variables.sort();
      return variables;
    },
    async: false,
    bulk: false,
    autoShow: true
  };
};

},{"jquery":undefined}],37:[function(require,module,exports){
var sparql = require("./sparql.js"), $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();
var quote = function(string) {
  return "'" + string + "'";
};
module.exports = {
  createCurlString: function(yasqe, config) {
    var ajaxConfig = sparql.getAjaxConfig(yasqe, config);
    var url = ajaxConfig.url;
    if (ajaxConfig.url.indexOf("http") !== 0) {
      //this is either a relative or absolute url, which is not supported by CURL.
      //Add domain, schema, etc etc
      var url = window.location.protocol + "//" + window.location.host;
      if (ajaxConfig.url.indexOf("/") === 0) {
        //its an absolute path
        url += ajaxConfig.url;
      } else {
        //relative, so append current location to url first
        url += window.location.pathname + ajaxConfig.url;
      }
    }
    var cmds = ["curl", url, "-X", yasqe.options.sparql.requestMethod];
    if (yasqe.options.sparql.requestMethod == "POST") {
      cmds.push("--data " + quote($.param(ajaxConfig.data)));
    }
    for (var header in ajaxConfig.headers) {
      cmds.push("-H " + quote(header + ": " + ajaxConfig.headers[header]));
    }
    return cmds.join(" ");
  }
};

},{"./sparql.js":44,"jquery":undefined}],38:[function(require,module,exports){
/**
 * The default options of YASQE (check the CodeMirror documentation for even
 * more options, such as disabling line numbers, or changing keyboard shortcut
 * keys). Either change the default options by setting YASQE.defaults, or by
 * passing your own options as second argument to the YASQE constructor
 */
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})(), YASQE = require("./main.js");
YASQE.defaults = $.extend(true, {}, YASQE.defaults, {
  mode: "sparql11",
  /**
	 * Query string
	 */
  value: "PREFIX iter: <http://w3id.org/sparql-generate/iter/>\nPREFIX fn: <http://w3id.org/sparql-generate/fn/>\nPREFIX ex: <http://example.org/>\nPREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>\n\nSOURCE <venue.json> AS ?source\nITERATOR iter:JSONPath(?source, '$.*' ) AS ?venue\nWHERE {} \nLIMIT 10\nCONSTRUCT { \n  <http://loc.example.com/city/{ fn:JSONPath(?venue, '$.location.city' ) }> a ex:City ;\n     geo:lat  ?{ fn:JSONPath(?venue, '$.venue.latitude' ) } ;\n     geo:long ?{ fn:JSONPath(?venue, '$.venue.longitude' ) } ;\n     ex:countryCode 'The country code is { fn:JSONPath(?venue, '$.location.country' ) }'@en .\n}\n",
  highlightSelectionMatches: {
    showToken: /\w/
  },
  tabMode: "indent",
  lineNumbers: true,
  lineWrapping: true,
  backdrop: false,
  foldGutter: {
    rangeFinder: new YASQE.fold.combine(YASQE.fold.brace, YASQE.fold.prefix)
  },
  collapsePrefixesOnLoad: false,
  gutters: ["gutterErrorBar", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  matchBrackets: true,
  fixedGutter: true,
  syntaxErrorCheck: true,
  onQuotaExceeded: function(e) {
    //fail silently
    console.warn("Could not store in localstorage. Skipping..", e);
  },
  /**
	 * Extra shortcut keys. Check the CodeMirror manual on how to add your own
	 *
	 * @property extraKeys
	 * @type object
	 */
  extraKeys: {
    //					"Ctrl-Space" : function(yasqe) {
    //						YASQE.autoComplete(yasqe);
    //					},
    "Ctrl-Space": YASQE.autoComplete,

    "Cmd-Space": YASQE.autoComplete,
    "Ctrl-D": YASQE.deleteLine,
    "Ctrl-K": YASQE.deleteLine,
    "Shift-Ctrl-K": YASQE.deleteLine,
    "Cmd-D": YASQE.deleteLine,
    "Cmd-K": YASQE.deleteLine,
    "Ctrl-/": YASQE.commentLines,
    "Cmd-/": YASQE.commentLines,
    "Ctrl-Alt-Down": YASQE.copyLineDown,
    "Ctrl-Alt-Up": YASQE.copyLineUp,
    "Cmd-Alt-Down": YASQE.copyLineDown,
    "Cmd-Alt-Up": YASQE.copyLineUp,
    "Shift-Ctrl-F": YASQE.doAutoFormat,
    "Shift-Cmd-F": YASQE.doAutoFormat,
    "Ctrl-]": YASQE.indentMore,
    "Cmd-]": YASQE.indentMore,
    "Ctrl-[": YASQE.indentLess,
    "Cmd-[": YASQE.indentLess,
    "Ctrl-S": YASQE.storeQuery,
    "Cmd-S": YASQE.storeQuery,
    "Ctrl-Enter": YASQE.executeQuery,
    "Cmd-Enter": YASQE.executeQuery,
    F11: function(yasqe) {
      yasqe.setOption("fullScreen", !yasqe.getOption("fullScreen"));
    },
    Esc: function(yasqe) {
      if (yasqe.getOption("fullScreen")) yasqe.setOption("fullScreen", false);
    }
  },
  cursorHeight: 0.9,

  /**
	 * Show a button with which users can create a link to this query. Set this value to null to disable this functionality.
	 * By default, this feature is enabled, and the only the query value is appended to the link.
	 * ps. This function should return an object which is parseable by jQuery.param (http://api.jquery.com/jQuery.param/)
	 */
  createShareLink: YASQE.createShareLink,

  createShortLink: null,

  /**
	 * Consume links shared by others, by checking the url for arguments coming from a query link. Defaults by only checking the 'query=' argument in the url
	 */
  consumeShareLink: YASQE.consumeShareLink,

  /**
	 * Change persistency settings for the YASQE query value. Setting the values
	 * to null, will disable persistancy: nothing is stored between browser
	 * sessions Setting the values to a string (or a function which returns a
	 * string), will store the query in localstorage using the specified string.
	 * By default, the ID is dynamically generated using the closest dom ID, to avoid collissions when using multiple YASQE items on one
	 * page
	 *
	 * @type function|string
	 */
  persistent: function(yasqe) {
    return "yasqe_" + $(yasqe.getWrapperElement()).closest("[id]").attr("id") + "_queryVal";
  },

  /**
	 * Settings for querying sparql endpoints
	 */
  sparql: {
    queryName: function(yasqe) {
      return yasqe.getQueryMode();
    },
    showQueryButton: false,

    /**f
		 * Endpoint to query
		 *
		 * @property sparql.endpoint
		 * @type String|function
		 */
    endpoint: "http://dbpedia.org/sparql",
    /**
		 * Request method via which to access SPARQL endpoint
		 *
		 * @property sparql.requestMethod
		 * @type String|function
		 */
    requestMethod: "POST",

    /**
		 * @type String|function
		 */
    acceptHeaderGraph: "text/turtle,*/*;q=0.9",
    /**
		 * @type String|function
		 */
    acceptHeaderSelect: "application/sparql-results+json,*/*;q=0.9",
    /**
		 * @type String|function
		 */
    acceptHeaderUpdate: "text/plain,*/*;q=0.9",

    /**
		 * Named graphs to query.
		 */
    namedGraphs: [],
    /**
		 * Default graphs to query.
		 */
    defaultGraphs: [],

    /**
		 * Additional request arguments. Add them in the form: {name: "name", value: "value"}
		 */
    args: [],

    /**
		 * Additional request headers
		 */
    headers: {},

    getQueryForAjax: null,
    /**
		 * Set of ajax callbacks
		 */
    callbacks: {
      beforeSend: null,
      complete: null,
      error: null,
      success: null
    },
    handlers: {} //keep here for backwards compatability
  }
});

},{"./main.js":41,"jquery":undefined}],39:[function(require,module,exports){
//this is the entry-point for browserify.
//the current browserify version does not support require-ing js files which are used as entry-point
//this way, we can still require our main.js file
module.exports = require("./main.js");

},{"./main.js":41}],40:[function(require,module,exports){
"use strict";
module.exports = {
  query: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><path d="M64.622 2.41H14.995c-6.627 0-12 5.374-12 12V64.31c0 6.627 5.373 12 12 12h49.627c6.627 0 12-5.373 12-12V14.41c0-6.627-5.373-12-12-12zM24.125 63.907V15.093L61 39.168 24.125 63.906z"/></svg>',
  queryInvalid: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.627 73.897"><path d="M61.627 0H12C5.373 0 0 5.373 0 12v49.897c0 6.627 5.373 12 12 12h49.627c6.627 0 12-5.373 12-12V12c0-6.628-5.373-12-12-12zM21.13 61.495V12.682l36.875 24.075L21.13 61.495z"/><path d="M66.13 65.904H49.77c-1.647 0-2.89-.58-3.5-1.636-.608-1.056-.49-2.422.334-3.848l8.18-14.167c.822-1.427 1.947-2.212 3.165-2.212s2.342.786 3.165 2.213l8.18 14.167c.824 1.426.942 2.792.333 3.848-.61 1.055-1.852 1.636-3.5 1.636zm-6.51-4.986c0-.85-.69-1.54-1.54-1.54-.85 0-1.54.69-1.54 1.54 0 .85.69 1.54 1.54 1.54.85 0 1.54-.69 1.54-1.54zm.04-9.266c0-.873-.708-1.58-1.58-1.58-.874 0-1.582.707-1.582 1.58l.374 5.61h.005c.054.62.568 1.108 1.202 1.108.586 0 1.075-.415 1.188-.968.01-.045.01-.093.014-.14h.01l.368-5.61z" fill="#a80"/></svg>',
  download: '<svg xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" viewBox="0 0 100 100"><path fill-rule="evenodd" d="M88 84v-2c0-2.96-.86-4-4-4H16c-2.96 0-4 .98-4 4v2c0 3.102 1.04 4 4 4h68c3.02 0 4-.96 4-4zM58 12H42c-5 0-6 .94-6 6v22H16l34 34 34-34H64V18c0-5.06-1.06-6-6-6z"/></svg>',
  share: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M36.764 50c0 .308-.07.598-.088.905l32.247 16.12c2.76-2.34 6.293-3.798 10.195-3.798C87.89 63.227 95 70.337 95 79.11 95 87.89 87.89 95 79.118 95c-8.78 0-15.882-7.11-15.882-15.89 0-.317.07-.6.088-.906l-32.247-16.12c-2.77 2.33-6.293 3.79-10.195 3.79C12.11 65.873 5 58.77 5 50c0-8.78 7.11-15.89 15.882-15.89 3.902 0 7.427 1.467 10.195 3.796l32.247-16.12c-.018-.307-.088-.597-.088-.913C63.236 12.11 70.338 5 79.118 5 87.89 5 95 12.11 95 20.873c0 8.78-7.11 15.89-15.882 15.89-3.91 0-7.436-1.467-10.195-3.805L36.676 49.086c.017.308.088.598.088.914z"/></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.399998 66.399998"><g fill="red"><path d="M33.2 0C14.9 0 0 14.9 0 33.2c0 18.3 14.9 33.2 33.2 33.2 18.3 0 33.2-14.9 33.2-33.2C66.4 14.9 51.5 0 33.2 0zm0 59.4C18.7 59.4 7 47.6 7 33.2 7 18.7 18.8 7 33.2 7c14.4 0 26.2 11.8 26.2 26.2 0 14.4-11.8 26.2-26.2 26.2z"/><path d="M33.1 45.6c-1.4 0-2.5.5-3.5 1.5-.9 1-1.4 2.2-1.4 3.6 0 1.6.5 2.8 1.5 3.8 1 .9 2.1 1.3 3.4 1.3 1.3 0 2.4-.5 3.4-1.4 1-.9 1.5-2.2 1.5-3.7 0-1.4-.5-2.6-1.4-3.6-.9-1-2.1-1.5-3.5-1.5zM33.3 12.4c-1.5 0-2.8.5-3.7 1.6-.9 1-1.4 2.4-1.4 4.2 0 1.1.1 2.9.2 5.6l.8 13.1c.2 1.8.4 3.2.9 4.1.5 1.2 1.5 1.8 2.9 1.8 1.3 0 2.3-.7 2.9-1.9.5-1 .7-2.3.9-4l1.1-13.4c.1-1.3.2-2.5.2-3.8 0-2.2-.3-3.9-.8-5.1-.5-1-1.6-2.2-4-2.2z"/></g></svg>',
  fullscreen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="5 -10 100 100"><path d="M5-10v38.89L21.667 12.22 38.334 28.89l5.555-5.556L27.22 6.667 43.89-10H5zM105-10v38.89L88.333 12.22 71.667 28.89l-5.556-5.556L82.778 6.667 66.11-10H105zM5 90V51.11l16.667 16.667L38.334 51.11l5.555 5.557L27.22 73.333 43.89 90H5zM105 90V51.11L88.333 67.778 71.667 51.11l-5.556 5.557 16.667 16.666L66.11 90H105z" fill="#010101"/></svg>',
  smallscreen: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="5 -10 100 100"><path d="M43.89 28.89V-10L27.22 6.667 10.555-10 5-4.445l16.667 16.667L5 28.89h38.89zM66.11 28.89V-10L82.78 6.667 99.444-10 105-4.445 88.334 12.222 105 28.89H66.11zM43.89 51.11V90L27.22 73.334 10.555 90 5 84.444l16.667-16.666L5 51.11h38.89zM66.11 51.11V90L82.78 73.334 99.444 90 105 84.444 88.334 67.778 105 51.11H66.11z" fill="#010101"/></svg>'
};

},{}],41:[function(require,module,exports){
"use strict";
//make sure any console statements
window.console = window.console || {
  log: function() {}
};

/**
 * Load libraries
 */
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})(),
  CodeMirror = (function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})(),
  utils = require("./utils.js"),
  yutils = require("yasgui-utils"),
  imgs = require("./imgs.js");

require("../lib/deparam.js");
require("codemirror/addon/fold/foldcode.js");
require("codemirror/addon/fold/foldgutter.js");
require("codemirror/addon/fold/xml-fold.js");
require("codemirror/addon/fold/brace-fold.js");
require("./prefixFold.js");
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/search/searchcursor.js");
require("codemirror/addon/edit/matchbrackets.js");
require("codemirror/addon/runmode/runmode.js");
require("codemirror/addon/display/fullscreen.js");
require("../lib/grammar/tokenizer.js");

/**
 * Main YASQE constructor. Pass a DOM element as argument to append the editor to, and (optionally) pass along config settings (see the YASQE.defaults object below, as well as the regular CodeMirror documentation, for more information on configurability)
 *
 * @constructor
 * @param {DOM-Element} parent element to append editor to.
 * @param {object} settings
 * @class YASQE
 * @return {doc} YASQE document
 */
var root = (module.exports = function(parent, config) {
  var rootEl = $("<div>", {
    class: "yasqe"
  }).appendTo($(parent));
  config = extendConfig(config);
  var yasqe = extendCmInstance(CodeMirror(rootEl[0], config));
  postProcessCmElement(yasqe);
  return yasqe;
});

/**
 * Extend config object, which we will pass on to the CM constructor later on.
 * Need this, to make sure our own 'onBlur' etc events do not get overwritten by
 * people who add their own onblur events to the config Additionally, need this
 * to include the CM defaults ourselves. CodeMirror has a method for including
 * defaults, but we can't rely on that one: it assumes flat config object, where
 * we have nested objects (e.g. the persistency option)
 *
 * @private
 */
var extendConfig = function(config) {
  var extendedConfig = $.extend(true, {}, root.defaults, config);

  // I know, codemirror deals with  default options as well.
  //However, it does not do this recursively (i.e. the persistency option)

  return extendedConfig;
};
/**
 * Add extra functions to the CM document (i.e. the codemirror instantiated
 * object)
 *
 * @private
 */
var extendCmInstance = function(yasqe) {
  //instantiate autocompleters
  yasqe.autocompleters = require("./autocompleters/autocompleterBase.js")(root, yasqe);
  if (yasqe.options.autocompleters) {
    yasqe.options.autocompleters.forEach(function(name) {
      if (root.Autocompleters[name]) yasqe.autocompleters.init(name, root.Autocompleters[name]);
    });
  }
  yasqe.lastQueryDuration = null;
  yasqe.getCompleteToken = function(token, cur) {
    return require("./tokenUtils.js").getCompleteToken(yasqe, token, cur);
  };
  yasqe.getPreviousNonWsToken = function(line, token) {
    return require("./tokenUtils.js").getPreviousNonWsToken(yasqe, line, token);
  };
  yasqe.getNextNonWsToken = function(lineNumber, charNumber) {
    return require("./tokenUtils.js").getNextNonWsToken(yasqe, lineNumber, charNumber);
  };
  yasqe.collapsePrefixes = function(collapse) {
    if (collapse === undefined) collapse = true;
    yasqe.foldCode(
      require("./prefixFold.js").findFirstPrefixLine(yasqe),
      root.fold.prefix,
      collapse ? "fold" : "unfold"
    );
  };
  var backdrop = null;
  var animateSpeed = null;
  yasqe.setBackdrop = function(show) {
    if (yasqe.options.backdrop || yasqe.options.backdrop === 0 || yasqe.options.backdrop === "0") {
      if (animateSpeed === null) {
        animateSpeed = +yasqe.options.backdrop;
        if (animateSpeed === 1) {
          //ah, yasqe.options.backdrop was 'true'. Set this to default animate speed 400
          animateSpeed = 400;
        }
      }

      if (!backdrop) {
        backdrop = $("<div>", {
          class: "backdrop"
        })
          .click(function() {
            $(this).hide();
          })
          .insertAfter($(yasqe.getWrapperElement()));
      }
      if (show) {
        backdrop.show(animateSpeed);
      } else {
        backdrop.hide(animateSpeed);
      }
    }
  };
  /**
	 * Execute query. Pass a callback function, or a configuration object (see
	 * default settings below for possible values) I.e., you can change the
	 * query configuration by either changing the default settings, changing the
	 * settings of this document, or by passing query settings to this function
	 *
	 * @method doc.query
	 * @param function|object
	 */
  yasqe.query = function(callbackOrConfig) {
    root.executeQuery(yasqe, callbackOrConfig);
  };

  yasqe.getUrlArguments = function(config) {
    return root.getUrlArguments(yasqe, config);
  };

  /**
	 * Fetch defined prefixes from query string
	 *
	 * @method doc.getPrefixesFromQuery
	 * @return object
	 */
  yasqe.getPrefixesFromQuery = function() {
    return require("./prefixUtils.js").getPrefixesFromQuery(yasqe);
  };

  yasqe.addPrefixes = function(prefixes) {
    return require("./prefixUtils.js").addPrefixes(yasqe, prefixes);
  };
  yasqe.removePrefixes = function(prefixes) {
    return require("./prefixUtils.js").removePrefixes(yasqe, prefixes);
  };

  yasqe.getValueWithoutComments = function() {
    var cleanedQuery = "";
    root.runMode(yasqe.getValue(), "sparql11", function(stringVal, className) {
      if (className != "comment") {
        cleanedQuery += stringVal;
      }
    });
    return cleanedQuery;
  };
  /**
	 * Fetch the query type (e.g., SELECT||DESCRIBE||INSERT||DELETE||ASK||CONSTRUCT)
	 *
	 * @method doc.getQueryType
	 * @return string
	 *
	 */
  yasqe.getQueryType = function() {
    return yasqe.queryType;
  };
  /**
	 * Fetch the query mode: 'query' or 'update'
	 *
	 * @method doc.getQueryMode
	 * @return string
	 *
	 */
  yasqe.getQueryMode = function() {
    var type = yasqe.getQueryType();
    if (
      type == "INSERT" ||
      type == "DELETE" ||
      type == "LOAD" ||
      type == "CLEAR" ||
      type == "CREATE" ||
      type == "DROP" ||
      type == "COPY" ||
      type == "MOVE" ||
      type == "ADD"
    ) {
      return "update";
    } else {
      return "query";
    }
  };

  yasqe.setCheckSyntaxErrors = function(isEnabled) {
    yasqe.options.syntaxErrorCheck = isEnabled;
    checkSyntax(yasqe);
  };

  yasqe.enableCompleter = function(name) {
    addCompleterToSettings(yasqe.options, name);
    if (root.Autocompleters[name]) yasqe.autocompleters.init(name, root.Autocompleters[name]);
  };
  yasqe.disableCompleter = function(name) {
    removeCompleterFromSettings(yasqe.options, name);
  };
  return yasqe;
};

var addCompleterToSettings = function(settings, name) {
  if (!settings.autocompleters) settings.autocompleters = [];
  settings.autocompleters.push(name);
};
var removeCompleterFromSettings = function(settings, name) {
  if (typeof settings.autocompleters == "object") {
    var index = $.inArray(name, settings.autocompleters);
    if (index >= 0) {
      settings.autocompleters.splice(index, 1);
      removeCompleterFromSettings(settings, name); //just in case. suppose 1 completer is listed twice
    }
  }
};
var postProcessCmElement = function(yasqe) {
  /**
	 * Set doc value
	 */
  var storageId = utils.getPersistencyId(yasqe, yasqe.options.persistent);
  if (storageId) {
    var valueFromStorage = yutils.storage.get(storageId);
    if (valueFromStorage) yasqe.setValue(valueFromStorage);
  }

  root.drawButtons(yasqe);

  /**
	 * Add event handlers
	 */
  yasqe.on("blur", function(yasqe, eventInfo) {
    root.storeQuery(yasqe);
  });
  yasqe.on("change", function(yasqe, eventInfo) {
    checkSyntax(yasqe);
    root.updateQueryButton(yasqe);
    root.positionButtons(yasqe);
  });
  yasqe.on("changes", function() {
    //e.g. on paste
    checkSyntax(yasqe);
    root.updateQueryButton(yasqe);
    root.positionButtons(yasqe);
  });

  yasqe.on("cursorActivity", function(yasqe, eventInfo) {
    updateButtonsTransparency(yasqe);
  });
  yasqe.prevQueryValid = false;
  checkSyntax(yasqe); // on first load, check as well (our stored or default query might be incorrect)
  root.positionButtons(yasqe);

  $(yasqe.getWrapperElement())
    .on("mouseenter", ".cm-atom", function() {
      var matchText = $(this).text();
      $(yasqe.getWrapperElement())
        .find(".cm-atom")
        .filter(function() {
          return $(this).text() === matchText;
        })
        .addClass("matchingVar");
    })
    .on("mouseleave", ".cm-atom", function() {
      $(yasqe.getWrapperElement()).find(".matchingVar").removeClass("matchingVar");
    });
  /**
	 * check url args and modify yasqe settings if needed
	 */
  if (yasqe.options.consumeShareLink) {
    yasqe.options.consumeShareLink(yasqe, getUrlParams());
    //and: add a hash listener!
    window.addEventListener("hashchange", function() {
      yasqe.options.consumeShareLink(yasqe, getUrlParams());
    });
  }
  if (yasqe.options.collapsePrefixesOnLoad) yasqe.collapsePrefixes(true);
};

/**
 * get url params. first try fetching using hash. If it fails, try the regular query parameters (for backwards compatability)
 */
var getUrlParams = function() {
  //first try hash
  var urlParams = null;
  if (window.location.hash.length > 1) {
    //firefox does some decoding if we're using window.location.hash (e.g. the + sign in contentType settings)
    //Don't want this. So simply get the hash string ourselves
    urlParams = $.deparam(location.href.split("#")[1]);
  }
  if ((!urlParams || !("query" in urlParams)) && window.location.search.length > 1) {
    //ok, then just try regular url params
    urlParams = $.deparam(window.location.search.substring(1));
  }
  return urlParams;
};

/**
 * Update transparency of buttons. Increase transparency when cursor is below buttons
 */

var updateButtonsTransparency = function(yasqe) {
  yasqe.cursor = $(".CodeMirror-cursor");
  if (yasqe.buttons && yasqe.buttons.is(":visible") && yasqe.cursor.length > 0) {
    if (utils.elementsOverlap(yasqe.cursor, yasqe.buttons)) {
      yasqe.buttons.find("svg").attr("opacity", "0.2");
    } else {
      yasqe.buttons.find("svg").attr("opacity", "1.0");
    }
  }
};

var clearError = null;
var checkSyntax = function(yasqe, deepcheck) {
  yasqe.queryValid = true;

  yasqe.clearGutter("gutterErrorBar");

  var state = null;
  for (var l = 0; l < yasqe.lineCount(); ++l) {
    var precise = false;
    if (!yasqe.prevQueryValid) {
      // we don't want cached information in this case, otherwise the
      // previous error sign might still show up,
      // even though the syntax error might be gone already
      precise = true;
    }

    var token = yasqe.getTokenAt(
      {
        line: l,
        ch: yasqe.getLine(l).length
      },
      precise
    );
    var state = token.state;
    yasqe.queryType = state.queryType;
    if (state.OK == false) {
      if (!yasqe.options.syntaxErrorCheck) {
        //the library we use already marks everything as being an error. Overwrite this class attribute.
        $(yasqe.getWrapperElement).find(".sp-error").css("color", "black");
        //we don't want to gutter error, so return
        return;
      }

      var warningEl = yutils.svg.getElement(imgs.warning);
      if (state.errorMsg) {
        require("./tooltip")(yasqe, warningEl, function() {
          return $("<div/>").text(token.state.errorMsg).html();
        });
      } else if (state.possibleCurrent && state.possibleCurrent.length > 0) {
        //				warningEl.style.zIndex = "99999999";
        require("./tooltip")(yasqe, warningEl, function() {
          var expectedEncoded = [];
          state.possibleCurrent.forEach(function(expected) {
            expectedEncoded.push(
              "<strong style='text-decoration:underline'>" + $("<div/>").text(expected).html() + "</strong>"
            );
          });
          return "This line is invalid. Expected: " + expectedEncoded.join(", ");
        });
      }
      warningEl.style.marginTop = "2px";
      warningEl.style.marginLeft = "2px";
      warningEl.className = "parseErrorIcon";
      yasqe.setGutterMarker(l, "gutterErrorBar", warningEl);

      yasqe.queryValid = false;
      break;
    }
  }
  yasqe.prevQueryValid = yasqe.queryValid;
  if (deepcheck) {
    if (state != null && state.stack != undefined) {
      var stack = state.stack, len = state.stack.length;
      // Because incremental parser doesn't receive end-of-input
      // it can't clear stack, so we have to check that whatever
      // is left on the stack is nillable
      if (len > 1) yasqe.queryValid = false;
      else if (len == 1) {
        if (stack[0] != "solutionModifier" && stack[0] != "?limitOffsetClauses" && stack[0] != "?offsetClause")
          yasqe.queryValid = false;
      }
    }
  }
};
/**
 * Static Utils
 */
// first take all CodeMirror references and store them in the YASQE object
$.extend(root, CodeMirror);

//add registrar for autocompleters
root.Autocompleters = {};
root.registerAutocompleter = function(name, constructor) {
  root.Autocompleters[name] = constructor;
  addCompleterToSettings(root.defaults, name);
};

root.autoComplete = function(yasqe) {
  //this function gets called when pressing the keyboard shortcut. I.e., autoShow = false
  yasqe.autocompleters.autoComplete(false);
};
//include the autocompleters we provide out-of-the-box
root.registerAutocompleter("prefixes", require("./autocompleters/prefixes.js"));
root.registerAutocompleter("properties", require("./autocompleters/properties.js"));
root.registerAutocompleter("classes", require("./autocompleters/classes.js"));
root.registerAutocompleter("variables", require("./autocompleters/variables.js"));

root.positionButtons = function(yasqe) {
  var scrollBar = $(yasqe.getWrapperElement()).find(".CodeMirror-vscrollbar");
  var offset = 0;
  if (scrollBar.is(":visible")) {
    offset = scrollBar.outerWidth();
  }
  if (yasqe.buttons.is(":visible")) yasqe.buttons.css("right", offset + 4);
};

/**
 * Create a share link
 *
 * @method YASQE.createShareLink
 * @param {doc} YASQE document
 * @default {query: doc.getValue()}
 * @return object
 */
root.createShareLink = function(yasqe) {
  //extend existing link, so first fetch current arguments
  var urlParams = {};
  if (window.location.hash.length > 1) urlParams = $.deparam(window.location.hash.substring(1));
  urlParams["query"] = yasqe.getValue();
  return urlParams;
};
root.getAsCurl = function(yasqe, ajaxConfig) {
  var curl = require("./curl.js");
  return curl.createCurlString(yasqe, ajaxConfig);
};
/**
 * Consume the share link, by parsing the document URL for possible yasqe arguments, and setting the appropriate values in the YASQE doc
 *
 * @method YASQE.consumeShareLink
 * @param {doc} YASQE document
 */
root.consumeShareLink = function(yasqe, urlParams) {
  if (urlParams && urlParams.query) {
    yasqe.setValue(urlParams.query);
  }
};
root.drawButtons = function(yasqe) {
  yasqe.buttons = $("<div class='yasqe_buttons'></div>").appendTo($(yasqe.getWrapperElement()));

  /**
	 * draw share link button
	 */
  if (yasqe.options.createShareLink) {
    var svgShare = $(yutils.svg.getElement(imgs.share));
    svgShare
      .click(function(event) {
        event.stopPropagation();
        var popup = $("<div class='yasqe_sharePopup'></div>").appendTo(yasqe.buttons);
        $("html").click(function() {
          if (popup) popup.remove();
        });

        popup.click(function(event) {
          event.stopPropagation();
        });
        var $input = $("<input>").val(
          location.protocol +
            "//" +
            location.host +
            location.pathname +
            location.search +
            "#" +
            $.param(yasqe.options.createShareLink(yasqe))
        );

        $input.focus(function() {
          var $this = $(this);
          $this.select();

          // Work around Chrome's little problem
          $this.mouseup(function() {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
          });
        });

        popup.empty().append($("<div>", { class: "inputWrapper" }).append($input));
        if (yasqe.options.createShortLink) {
          popup.addClass("enableShort");
          $("<button>Shorten</button>")
            .addClass("yasqe_btn yasqe_btn-sm yasqe_btn-primary")
            .click(function() {
              $(this).parent().find("button").attr("disabled", "disabled");
              yasqe.options.createShortLink($input.val(), function(errString, shortLink) {
                if (errString) {
                  $input.remove();
                  popup.find(".inputWrapper").append($("<span>", { class: "shortlinkErr" }).text(errString));
                } else {
                  $input.val(shortLink).focus();
                }
              });
            })
            .appendTo(popup);
        }
        $("<button>CURL</button>")
          .addClass("yasqe_btn yasqe_btn-sm yasqe_btn-primary")
          .click(function() {
            $(this).parent().find("button").attr("disabled", "disabled");
            $input.val(root.getAsCurl(yasqe)).focus();
          })
          .appendTo(popup);
        var positions = svgShare.position();
        popup
          .css("top", positions.top + svgShare.outerHeight() + parseInt(popup.css("padding-top")) + "px")
          .css("left", positions.left + svgShare.outerWidth() - popup.outerWidth() + "px");
        $input.focus();
      })
      .addClass("yasqe_share")
      .attr("title", "Share your query")
      .appendTo(yasqe.buttons);
  }

  /**
	 * draw fullscreen button
	 */

  var toggleFullscreen = $("<div>", {
    class: "fullscreenToggleBtns"
  })
    .append(
      $(yutils.svg.getElement(imgs.fullscreen))
        .addClass("yasqe_fullscreenBtn")
        .attr("title", "Set editor full screen")
        .click(function() {
          yasqe.setOption("fullScreen", true);
        })
    )
    .append(
      $(yutils.svg.getElement(imgs.smallscreen))
        .addClass("yasqe_smallscreenBtn")
        .attr("title", "Set editor to normal size")
        .click(function() {
          yasqe.setOption("fullScreen", false);
        })
    );
  yasqe.buttons.append(toggleFullscreen);

  if (yasqe.options.sparql.showQueryButton) {
    $("<div>", {
      class: "yasqe_queryButton"
    })
      .click(function() {
        if ($(this).hasClass("query_busy")) {
          if (yasqe.xhr) yasqe.xhr.abort();
          root.updateQueryButton(yasqe);
        } else {
          yasqe.query();
        }
      })
      .appendTo(yasqe.buttons);
    root.updateQueryButton(yasqe);
  }
};

var queryButtonIds = {
  busy: "loader",
  valid: "query",
  error: "queryInvalid"
};

/**
 * Update the query button depending on current query status. If no query status is passed via the parameter, it auto-detects the current query status
 *
 * @param {doc} YASQE document
 * @param status {string|null, "busy"|"valid"|"error"}
 */
root.updateQueryButton = function(yasqe, status) {
  var queryButton = $(yasqe.getWrapperElement()).find(".yasqe_queryButton");
  if (queryButton.length == 0) return; //no query button drawn

  //detect status
  if (!status) {
    status = "valid";
    if (yasqe.queryValid === false) status = "error";
  }

  if (status != yasqe.queryStatus) {
    queryButton.empty().removeClass(function(index, classNames) {
      return classNames
        .split(" ")
        .filter(function(c) {
          //remove classname from previous status
          return c.indexOf("query_") == 0;
        })
        .join(" ");
    });

    if (status == "busy") {
      queryButton.append(
        $("<div>", {
          class: "loader"
        })
      );
      yasqe.queryStatus = status;
    } else if (status == "valid" || status == "error") {
      queryButton.addClass("query_" + status);
      yutils.svg.draw(queryButton, imgs[queryButtonIds[status]]);
      yasqe.queryStatus = status;
    }
  }
};
/**
 * Initialize YASQE from an existing text area (see http://codemirror.net/doc/manual.html#fromTextArea for more info)
 *
 * @method YASQE.fromTextArea
 * @param textArea {DOM element}
 * @param config {object}
 * @returns {doc} YASQE document
 */
root.fromTextArea = function(textAreaEl, config) {
  config = extendConfig(config);
  //add yasqe div as parent (needed for styles to be manageable and scoped).
  //In this case, I -also- put it as parent el of the text area. This is wrapped in a div now
  var rootEl = $("<div>", {
    class: "yasqe"
  })
    .insertBefore($(textAreaEl))
    .append($(textAreaEl));
  var yasqe = extendCmInstance(CodeMirror.fromTextArea(textAreaEl, config));
  postProcessCmElement(yasqe);
  return yasqe;
};

root.storeQuery = function(yasqe) {
  var storageId = utils.getPersistencyId(yasqe, yasqe.options.persistent);
  if (storageId) {
    yutils.storage.set(storageId, yasqe.getValue(), "month", yasqe.options.onQuotaExceeded);
  }
};
root.commentLines = function(yasqe) {
  var startLine = yasqe.getCursor(true).line;
  var endLine = yasqe.getCursor(false).line;
  var min = Math.min(startLine, endLine);
  var max = Math.max(startLine, endLine);

  // if all lines start with #, remove this char. Otherwise add this char
  var linesAreCommented = true;
  for (var i = min; i <= max; i++) {
    var line = yasqe.getLine(i);
    if (line.length == 0 || line.substring(0, 1) != "#") {
      linesAreCommented = false;
      break;
    }
  }
  for (var i = min; i <= max; i++) {
    if (linesAreCommented) {
      // lines are commented, so remove comments
      yasqe.replaceRange(
        "",
        {
          line: i,
          ch: 0
        },
        {
          line: i,
          ch: 1
        }
      );
    } else {
      // Not all lines are commented, so add comments
      yasqe.replaceRange("#", {
        line: i,
        ch: 0
      });
    }
  }
};

root.copyLineUp = function(yasqe) {
  var cursor = yasqe.getCursor();
  var lineCount = yasqe.lineCount();
  // First create new empty line at end of text
  yasqe.replaceRange("\n", {
    line: lineCount - 1,
    ch: yasqe.getLine(lineCount - 1).length
  });
  // Copy all lines to their next line
  for (var i = lineCount; i > cursor.line; i--) {
    var line = yasqe.getLine(i - 1);
    yasqe.replaceRange(
      line,
      {
        line: i,
        ch: 0
      },
      {
        line: i,
        ch: yasqe.getLine(i).length
      }
    );
  }
};
root.copyLineDown = function(yasqe) {
  root.copyLineUp(yasqe);
  // Make sure cursor goes one down (we are copying downwards)
  var cursor = yasqe.getCursor();
  cursor.line++;
  yasqe.setCursor(cursor);
};
root.doAutoFormat = function(yasqe) {
  if (!yasqe.somethingSelected()) yasqe.execCommand("selectAll");
  var to = {
    line: yasqe.getCursor(false).line,
    ch: yasqe.getSelection().length
  };
  autoFormatRange(yasqe, yasqe.getCursor(true), to);
};

var autoFormatRange = function(yasqe, from, to) {
  var absStart = yasqe.indexFromPos(from);
  var absEnd = yasqe.indexFromPos(to);
  // Insert additional line breaks where necessary according to the
  // mode's syntax
  var res = autoFormatLineBreaks(yasqe.getValue(), absStart, absEnd);

  // Replace and auto-indent the range
  yasqe.operation(function() {
    yasqe.replaceRange(res, from, to);
    var startLine = yasqe.posFromIndex(absStart).line;
    var endLine = yasqe.posFromIndex(absStart + res.length).line;
    for (var i = startLine; i <= endLine; i++) {
      yasqe.indentLine(i, "smart");
    }
  });
};

var autoFormatLineBreaks = function(text, start, end) {
  text = text.substring(start, end);
  var breakAfterArray = [
    ["keyword", "ws", "prefixed", "ws", "uri"], // i.e. prefix declaration
    ["keyword", "ws", "uri"] // i.e. base
  ];
  var breakAfterCharacters = ["{", ".", ";"];
  var breakBeforeCharacters = ["}"];
  var getBreakType = function(stringVal, type) {
    for (var i = 0; i < breakAfterArray.length; i++) {
      if (stackTrace.valueOf().toString() == breakAfterArray[i].valueOf().toString()) {
        return 1;
      }
    }
    for (var i = 0; i < breakAfterCharacters.length; i++) {
      if (stringVal == breakAfterCharacters[i]) {
        return 1;
      }
    }
    for (var i = 0; i < breakBeforeCharacters.length; i++) {
      // don't want to issue 'breakbefore' AND 'breakafter', so check
      // current line
      if ($.trim(currentLine) != "" && stringVal == breakBeforeCharacters[i]) {
        return -1;
      }
    }
    return 0;
  };
  var formattedQuery = "";
  var currentLine = "";
  var stackTrace = [];
  CodeMirror.runMode(text, "sparql11", function(stringVal, type) {
    stackTrace.push(type);
    var breakType = getBreakType(stringVal, type);
    if (breakType != 0) {
      if (breakType == 1) {
        formattedQuery += stringVal + "\n";
        currentLine = "";
      } else {
        // (-1)
        formattedQuery += "\n" + stringVal;
        currentLine = stringVal;
      }
      stackTrace = [];
    } else {
      currentLine += stringVal;
      formattedQuery += stringVal;
    }
    if (stackTrace.length == 1 && stackTrace[0] == "sp-ws") stackTrace = [];
  });
  return $.trim(formattedQuery.replace(/\n\s*\n/g, "\n"));
};

require("./sparql.js"), require("./defaults.js");
root.$ = $;
root.version = {
  CodeMirror: CodeMirror.version,
  YASQE: require("../package.json").version,
  jquery: $.fn.jquery,
  "yasgui-utils": yutils.version
};

},{"../lib/deparam.js":1,"../lib/grammar/tokenizer.js":3,"../package.json":30,"./autocompleters/autocompleterBase.js":31,"./autocompleters/classes.js":32,"./autocompleters/prefixes.js":33,"./autocompleters/properties.js":34,"./autocompleters/variables.js":36,"./curl.js":37,"./defaults.js":38,"./imgs.js":40,"./prefixFold.js":42,"./prefixUtils.js":43,"./sparql.js":44,"./tokenUtils.js":45,"./tooltip":46,"./utils.js":47,"codemirror":undefined,"codemirror/addon/display/fullscreen.js":5,"codemirror/addon/edit/matchbrackets.js":6,"codemirror/addon/fold/brace-fold.js":7,"codemirror/addon/fold/foldcode.js":8,"codemirror/addon/fold/foldgutter.js":9,"codemirror/addon/fold/xml-fold.js":10,"codemirror/addon/hint/show-hint.js":11,"codemirror/addon/runmode/runmode.js":12,"codemirror/addon/search/searchcursor.js":13,"jquery":undefined,"yasgui-utils":27}],42:[function(require,module,exports){
var CodeMirror = (function(){try{return require('codemirror')}catch(e){return window.CodeMirror}})(), tokenUtils = require("./tokenUtils.js");

("use strict");
var lookFor = "PREFIX";
module.exports = {
  findFirstPrefixLine: function(cm) {
    var lastLine = cm.lastLine();
    for (var i = 0; i <= lastLine; ++i) {
      if (findFirstPrefix(cm, i) >= 0) {
        return i;
      }
    }
  }
};

function findFirstPrefix(cm, line, ch, lineText) {
  if (!ch) ch = 0;
  if (!lineText) lineText = cm.getLine(line);
  lineText = lineText.toUpperCase();
  for (var at = ch, pass = 0; ; ) {
    var found = lineText.indexOf(lookFor, at);
    if (found == -1) {
      //no prefix on this line
      if (pass == 1) break;
      pass = 1;
      at = lineText.length;
      continue;
    }
    if (pass == 1 && found < ch) break;
    var tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
    if (!/^(comment|string)/.test(tokenType)) return found + 1;
    at = found - 1;
    //Could not find a prefix, no use looping any further. Probably invalid query
    if (at === pass) break;
  }
}

CodeMirror.registerHelper("fold", "prefix", function(cm, start) {
  var line = start.line, lineText = cm.getLine(line);

  var startCh, tokenType;

  function hasPreviousPrefix() {
    var hasPreviousPrefix = false;
    for (var i = line - 1; i >= 0; i--) {
      if (cm.getLine(i).toUpperCase().indexOf(lookFor) >= 0) {
        hasPreviousPrefix = true;
        break;
      }
    }
    return hasPreviousPrefix;
  }

  function findOpening(openCh) {
    for (var at = start.ch, pass = 0; ; ) {
      var found = at <= 0 ? -1 : lineText.lastIndexOf(openCh, at - 1);
      if (found == -1) {
        if (pass == 1) break;
        pass = 1;
        at = lineText.length;
        continue;
      }
      if (pass == 1 && found < start.ch) break;
      tokenType = cm.getTokenTypeAt(CodeMirror.Pos(line, found + 1));
      if (!/^(comment|string)/.test(tokenType)) return found + 1;
      at = found - 1;
    }
  }
  var getLastPrefixPos = function(line, ch) {
    var prefixKeywordToken = cm.getTokenAt(CodeMirror.Pos(line, ch + 1));
    if (!prefixKeywordToken || prefixKeywordToken.type != "keyword") return -1;
    var prefixShortname = tokenUtils.getNextNonWsToken(cm, line, prefixKeywordToken.end + 1);
    if (!prefixShortname || prefixShortname.type != "string-2") return -1; //missing prefix keyword shortname
    var prefixUri = tokenUtils.getNextNonWsToken(cm, line, prefixShortname.end + 1);
    if (!prefixUri || prefixUri.type != "variable-3") return -1; //missing prefix uri
    return prefixUri.end;
  };

  //only use opening prefix declaration
  if (hasPreviousPrefix()) return;
  var prefixStart = findFirstPrefix(cm, line, start.ch, lineText);

  if (prefixStart == null) return;
  var stopAt = "{"; //if this char is there, we won't have a chance of finding more prefixes
  var stopAtNextLine = false;
  var count = 1, lastLine = cm.lastLine(), end, endCh;
  var prefixEndChar = getLastPrefixPos(line, prefixStart);
  var prefixEndLine = line;

  outer:
  for (var i = line; i <= lastLine; ++i) {
    if (stopAtNextLine) break;
    var text = cm.getLine(i), pos = i == line ? prefixStart + 1 : 0;

    for (;;) {
      if (!stopAtNextLine && text.indexOf(stopAt) >= 0) stopAtNextLine = true;

      var nextPrefixDeclaration = text.toUpperCase().indexOf(lookFor, pos);

      if (nextPrefixDeclaration >= 0) {
        if ((endCh = getLastPrefixPos(i, nextPrefixDeclaration)) > 0) {
          prefixEndChar = endCh;
          prefixEndLine = i;
          pos = prefixEndChar;
        }
        pos++;
      } else {
        break;
      }
    }
  }
  return {
    from: CodeMirror.Pos(line, prefixStart + lookFor.length),
    to: CodeMirror.Pos(prefixEndLine, prefixEndChar)
  };
});

},{"./tokenUtils.js":45,"codemirror":undefined}],43:[function(require,module,exports){
"use strict";
/**
 * Append prefix declaration to list of prefixes in query window.
 *
 * @param yasqe
 * @param prefix
 */
var addPrefixes = function(yasqe, prefixes) {
  var existingPrefixes = yasqe.getPrefixesFromQuery();
  //for backwards compatability, we stil support prefixes value as string (e.g. 'rdf: <http://fbfgfgf>'
  if (typeof prefixes == "string") {
    addPrefixAsString(yasqe, prefixes);
  } else {
    for (var pref in prefixes) {
      if (!(pref in existingPrefixes)) addPrefixAsString(yasqe, pref + ": <" + prefixes[pref] + ">");
    }
  }
  yasqe.collapsePrefixes(false);
};

var addPrefixAsString = function(yasqe, prefixString) {
  var lastPrefix = null;
  var lastPrefixLine = 0;
  var numLines = yasqe.lineCount();
  for (var i = 0; i < numLines; i++) {
    var firstToken = yasqe.getNextNonWsToken(i);
    if (firstToken != null && (firstToken.string == "PREFIX" || firstToken.string == "BASE")) {
      lastPrefix = firstToken;
      lastPrefixLine = i;
    }
  }

  if (lastPrefix == null) {
    yasqe.replaceRange("PREFIX " + prefixString + "\n", {
      line: 0,
      ch: 0
    });
  } else {
    var previousIndent = getIndentFromLine(yasqe, lastPrefixLine);
    yasqe.replaceRange("\n" + previousIndent + "PREFIX " + prefixString, {
      line: lastPrefixLine
    });
  }
  yasqe.collapsePrefixes(false);
};
var removePrefixes = function(yasqe, prefixes) {
  var escapeRegex = function(string) {
    //taken from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };
  for (var pref in prefixes) {
    yasqe.setValue(
      yasqe
        .getValue()
        .replace(new RegExp("PREFIX\\s*" + pref + ":\\s*" + escapeRegex("<" + prefixes[pref] + ">") + "\\s*", "ig"), "")
    );
  }
  yasqe.collapsePrefixes(false);
};

/**
 * Get defined prefixes from query as array, in format {"prefix:" "uri"}
 *
 * @param cm
 * @returns {Array}
 */
var getPrefixesFromQuery = function(yasqe) {
  //Use precise here. We want to be sure we use the most up to date state. If we're
  //not, we might get outdated prefixes from the current query (creating loops such
  //as https://github.com/OpenTriply/YASGUI/issues/84)
  return yasqe.getTokenAt({ line: yasqe.lastLine(), ch: yasqe.getLine(yasqe.lastLine()).length }, true).state.prefixes;
};

/**
 * Get the used indentation for a certain line
 *
 * @param yasqe
 * @param line
 * @param charNumber
 * @returns
 */
var getIndentFromLine = function(yasqe, line, charNumber) {
  if (charNumber == undefined) charNumber = 1;
  var token = yasqe.getTokenAt({
    line: line,
    ch: charNumber
  });
  if (token == null || token == undefined || token.type != "ws") {
    return "";
  } else {
    return token.string + getIndentFromLine(yasqe, line, token.end + 1);
  }
};

module.exports = {
  addPrefixes: addPrefixes,
  getPrefixesFromQuery: getPrefixesFromQuery,
  removePrefixes: removePrefixes
};

},{}],44:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})(),
  utils = require("./utils.js"),
  YASQE = require("./main.js");

YASQE.getAjaxConfig = function(yasqe, callbackOrConfig) {
  var callback = typeof callbackOrConfig == "function" ? callbackOrConfig : null;
  var config = typeof callbackOrConfig == "object" ? callbackOrConfig : {};

  if (yasqe.options.sparql) config = $.extend({}, yasqe.options.sparql, config);

  //for backwards compatability, make sure we copy sparql handlers to sparql callbacks
  if (config.handlers) $.extend(true, config.callbacks, config.handlers);

  if (!config.endpoint || config.endpoint.length == 0) return; // nothing to query!
  var queryMode = yasqe.getQueryMode();
  /**
	 * initialize ajax config
	 */
  var ajaxConfig = {
    url: typeof config.endpoint == "function" ? config.endpoint(yasqe) : config.endpoint,
    type: queryMode == "update"
      ? "POST"
      : typeof config.requestMethod == "function" ? config.requestMethod(yasqe) : config.requestMethod,
    headers: {
      Accept: getAcceptHeader(yasqe, config)
    }
  };
  if (config.xhrFields) ajaxConfig.xhrFields = config.xhrFields;
  /**
	 * add complete, beforesend, etc callbacks (if specified)
	 */
  var handlerDefined = false;
  if (config.callbacks) {
    for (var handler in config.callbacks) {
      if (config.callbacks[handler]) {
        handlerDefined = true;
        ajaxConfig[handler] = config.callbacks[handler];
      }
    }
  }
  if (ajaxConfig.type === "GET") {
    //we need to do encoding ourselve, as jquery does not properly encode the url string
    //https://github.com/OpenTriply/YASGUI/issues/75
    var first = true;
    $.each(yasqe.getUrlArguments(config), function(key, val) {
      ajaxConfig.url += (first ? "?" : "&") + val.name + "=" + encodeURIComponent(val.value);
      first = false;
    });
  } else {
    ajaxConfig.data = yasqe.getUrlArguments(config);
  }
  if (!handlerDefined && !callback) return; // ok, we can query, but have no callbacks. just stop now

  // if only callback is passed as arg, add that on as 'onComplete' callback
  if (callback) ajaxConfig.complete = callback;

  /**
	 * merge additional request headers
	 */
  if (config.headers && !$.isEmptyObject(config.headers)) $.extend(ajaxConfig.headers, config.headers);

  var queryStart = new Date();
  var updateYasqe = function() {
    yasqe.lastQueryDuration = new Date() - queryStart;
    YASQE.updateQueryButton(yasqe);
    yasqe.setBackdrop(false);
  };
  //Make sure the query button is updated again on complete
  var completeCallbacks = [
    function() {
      require("./main.js").signal(yasqe, "queryFinish", arguments);
    },
    updateYasqe
  ];

  if (ajaxConfig.complete) {
    completeCallbacks.push(ajaxConfig.complete);
  }
  ajaxConfig.complete = completeCallbacks;
  return ajaxConfig;
};

YASQE.executeQuery = function(yasqe, callbackOrConfig) {
  YASQE.signal(yasqe, "query", yasqe, callbackOrConfig);
  YASQE.updateQueryButton(yasqe, "busy");
  yasqe.setBackdrop(true);
  yasqe.xhr = $.ajax(YASQE.getAjaxConfig(yasqe, callbackOrConfig));
};

YASQE.getUrlArguments = function(yasqe, config) {
  var queryMode = yasqe.getQueryMode();
  var data = [
    {
      name: utils.getString(yasqe, yasqe.options.sparql.queryName),
      value: config.getQueryForAjax ? config.getQueryForAjax(yasqe) : yasqe.getValue()
    }
  ];

  /**
	 * add named graphs to ajax config
	 */
  if (config.namedGraphs && config.namedGraphs.length > 0) {
    var argName = queryMode == "query" ? "named-graph-uri" : "using-named-graph-uri ";
    for (var i = 0; i < config.namedGraphs.length; i++)
      data.push({
        name: argName,
        value: config.namedGraphs[i]
      });
  }
  /**
	 * add default graphs to ajax config
	 */
  if (config.defaultGraphs && config.defaultGraphs.length > 0) {
    var argName = queryMode == "query" ? "default-graph-uri" : "using-graph-uri ";
    for (var i = 0; i < config.defaultGraphs.length; i++)
      data.push({
        name: argName,
        value: config.defaultGraphs[i]
      });
  }

  /**
	 * add additional request args
	 */
  if (config.args && config.args.length > 0) $.merge(data, config.args);

  return data;
};
var getAcceptHeader = function(yasqe, config) {
  var acceptHeader = null;
  if (config.acceptHeader && !config.acceptHeaderGraph && !config.acceptHeaderSelect && !config.acceptHeaderUpdate) {
    //this is the old config. For backwards compatability, keep supporting it
    if (typeof config.acceptHeader == "function") {
      acceptHeader = config.acceptHeader(yasqe);
    } else {
      acceptHeader = config.acceptHeader;
    }
  } else {
    if (yasqe.getQueryMode() == "update") {
      acceptHeader = typeof config.acceptHeader == "function"
        ? config.acceptHeaderUpdate(yasqe)
        : config.acceptHeaderUpdate;
    } else {
      var qType = yasqe.getQueryType();
      if (qType == "DESCRIBE" || qType == "CONSTRUCT") {
        acceptHeader = typeof config.acceptHeaderGraph == "function"
          ? config.acceptHeaderGraph(yasqe)
          : config.acceptHeaderGraph;
      } else {
        acceptHeader = typeof config.acceptHeaderSelect == "function"
          ? config.acceptHeaderSelect(yasqe)
          : config.acceptHeaderSelect;
      }
    }
  }
  return acceptHeader;
};

module.exports = {
  getAjaxConfig: YASQE.getAjaxConfig
};

},{"./main.js":41,"./utils.js":47,"jquery":undefined}],45:[function(require,module,exports){
"use strict";
/**
 * When typing a query, this query is sometimes syntactically invalid, causing
 * the current tokens to be incorrect This causes problem for autocompletion.
 * http://bla might result in two tokens: http:// and bla. We'll want to combine
 * these
 * 
 * @param yasqe {doc}
 * @param token {object}
 * @param cursor {object}
 * @return token {object}
 * @method YASQE.getCompleteToken
 */
var getCompleteToken = function(yasqe, token, cur) {
  if (!cur) {
    cur = yasqe.getCursor();
  }
  if (!token) {
    token = yasqe.getTokenAt(cur);
  }
  var prevToken = yasqe.getTokenAt({
    line: cur.line,
    ch: token.start
  });
  // not start of line, and not whitespace
  if (prevToken.type != null && prevToken.type != "ws" && token.type != null && token.type != "ws") {
    token.start = prevToken.start;
    token.string = prevToken.string + token.string;
    return getCompleteToken(yasqe, token, {
      line: cur.line,
      ch: prevToken.start
    }); // recursively, might have multiple tokens which it should include
  } else if (token.type != null && token.type == "ws") {
    //always keep 1 char of whitespace between tokens. Otherwise, autocompletions might end up next to the previous node, without whitespace between them
    token.start = token.start + 1;
    token.string = token.string.substring(1);
    return token;
  } else {
    return token;
  }
};
var getPreviousNonWsToken = function(yasqe, line, token) {
  var previousToken = yasqe.getTokenAt({
    line: line,
    ch: token.start
  });
  if (previousToken != null && previousToken.type == "ws") {
    previousToken = getPreviousNonWsToken(yasqe, line, previousToken);
  }
  return previousToken;
};
var getNextNonWsToken = function(yasqe, lineNumber, charNumber) {
  if (charNumber == undefined) charNumber = 1;
  var token = yasqe.getTokenAt({
    line: lineNumber,
    ch: charNumber
  });
  if (token == null || token == undefined || token.end < charNumber) {
    return null;
  }
  if (token.type == "ws") {
    return getNextNonWsToken(yasqe, lineNumber, token.end + 1);
  }
  return token;
};

module.exports = {
  getPreviousNonWsToken: getPreviousNonWsToken,
  getCompleteToken: getCompleteToken,
  getNextNonWsToken: getNextNonWsToken
};

},{}],46:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})(), utils = require("./utils.js");

/**
 * Write our own tooltip, to avoid loading another library for just this functionality. For now, we only use tooltip for showing parse errors, so this is quite a tailored solution
 * Requirements: 
 * 		position tooltip within codemirror frame as much as possible, to avoid z-index issues with external things on page
 * 		use html as content
 */
module.exports = function(yasqe, parent, html) {
  var parent = $(parent);
  var tooltip;
  parent.hover(
    function() {
      if (typeof html == "function") html = html();
      tooltip = $("<div>").addClass("yasqe_tooltip").html(html).appendTo(parent);
      repositionTooltip();
    },
    function() {
      $(".yasqe_tooltip").remove();
    }
  );

  /**
	 * only need to take into account top and bottom offset for this usecase
	 */
  var repositionTooltip = function() {
    if ($(yasqe.getWrapperElement()).offset().top >= tooltip.offset().top) {
      //shit, move the tooltip down. The tooltip now hovers over the top edge of the yasqe instance
      tooltip.css("bottom", "auto");
      tooltip.css("top", "26px");
    }
  };
};

},{"./utils.js":47,"jquery":undefined}],47:[function(require,module,exports){
"use strict";
var $ = (function(){try{return require('jquery')}catch(e){return window.jQuery}})();

var keyExists = function(objectToTest, key) {
  var exists = false;
  try {
    if (objectToTest[key] !== undefined) exists = true;
  } catch (e) {}
  return exists;
};

var getPersistencyId = function(yasqe, persistentIdCreator) {
  var persistencyId = null;

  if (persistentIdCreator) {
    if (typeof persistentIdCreator == "string") {
      persistencyId = persistentIdCreator;
    } else {
      persistencyId = persistentIdCreator(yasqe);
    }
  }
  return persistencyId;
};

var elementsOverlap = (function() {
  function getPositions(elem) {
    var pos, width, height;
    pos = $(elem).offset();
    width = $(elem).width();
    height = $(elem).height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
  }

  function comparePositions(p1, p2) {
    var r1, r2;
    r1 = p1[0] < p2[0] ? p1 : p2;
    r2 = p1[0] < p2[0] ? p2 : p1;
    return r1[1] > r2[0] || r1[0] === r2[0];
  }

  return function(a, b) {
    var pos1 = getPositions(a), pos2 = getPositions(b);
    return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
  };
})();

var getString = function(yasqe, item) {
  if (typeof item == "function") {
    return item(yasqe);
  } else {
    return item;
  }
};
module.exports = {
  keyExists: keyExists,
  getPersistencyId: getPersistencyId,
  elementsOverlap: elementsOverlap,
  getString: getString
};

},{"jquery":undefined}]},{},[39])(39)
});
//# sourceMappingURL=yasqe.js.map
