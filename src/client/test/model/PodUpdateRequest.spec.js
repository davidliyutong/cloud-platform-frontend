/**
 * API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Api);
  }
}(this, function(expect, Api) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Api.PodUpdateRequest();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('PodUpdateRequest', function() {
    it('should create an instance of PodUpdateRequest', function() {
      // uncomment below and update the code to test PodUpdateRequest
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be.a(Api.PodUpdateRequest);
    });

    it('should have the property podId (base name: "pod_id")', function() {
      // uncomment below and update the code to test the property podId
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be();
    });

    it('should have the property username (base name: "username")', function() {
      // uncomment below and update the code to test the property username
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be();
    });

    it('should have the property timeoutS (base name: "timeout_s")', function() {
      // uncomment below and update the code to test the property timeoutS
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be();
    });

    it('should have the property targetStatus (base name: "target_status")', function() {
      // uncomment below and update the code to test the property targetStatus
      //var instance = new Api.PodUpdateRequest();
      //expect(instance).to.be();
    });

  });

}));
