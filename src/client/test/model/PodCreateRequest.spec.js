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
    instance = new Api.PodCreateRequest();
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

  describe('PodCreateRequest', function() {
    it('should create an instance of PodCreateRequest', function() {
      // uncomment below and update the code to test PodCreateRequest
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be.a(Api.PodCreateRequest);
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property templateRef (base name: "template_ref")', function() {
      // uncomment below and update the code to test the property templateRef
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property cpuLimMCpu (base name: "cpu_lim_m_cpu")', function() {
      // uncomment below and update the code to test the property cpuLimMCpu
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property memLimMb (base name: "mem_lim_mb")', function() {
      // uncomment below and update the code to test the property memLimMb
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property storageLimMb (base name: "storage_lim_mb")', function() {
      // uncomment below and update the code to test the property storageLimMb
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property username (base name: "username")', function() {
      // uncomment below and update the code to test the property username
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property timeoutS (base name: "timeout_s")', function() {
      // uncomment below and update the code to test the property timeoutS
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

    it('should have the property values (base name: "values")', function() {
      // uncomment below and update the code to test the property values
      //var instance = new Api.PodCreateRequest();
      //expect(instance).to.be();
    });

  });

}));
