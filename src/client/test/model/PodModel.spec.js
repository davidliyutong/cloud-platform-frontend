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
    instance = new Api.PodModel();
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

  describe('PodModel', function() {
    it('should create an instance of PodModel', function() {
      // uncomment below and update the code to test PodModel
      //var instance = new Api.PodModel();
      //expect(instance).to.be.a(Api.PodModel);
    });

    it('should have the property resourceStatus (base name: "resource_status")', function() {
      // uncomment below and update the code to test the property resourceStatus
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property podId (base name: "pod_id")', function() {
      // uncomment below and update the code to test the property podId
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property templateRef (base name: "template_ref")', function() {
      // uncomment below and update the code to test the property templateRef
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property cpuLimMCpu (base name: "cpu_lim_m_cpu")', function() {
      // uncomment below and update the code to test the property cpuLimMCpu
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property memLimMb (base name: "mem_lim_mb")', function() {
      // uncomment below and update the code to test the property memLimMb
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property storageLimMb (base name: "storage_lim_mb")', function() {
      // uncomment below and update the code to test the property storageLimMb
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property username (base name: "username")', function() {
      // uncomment below and update the code to test the property username
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "created_at")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property startedAt (base name: "started_at")', function() {
      // uncomment below and update the code to test the property startedAt
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property accessedAt (base name: "accessed_at")', function() {
      // uncomment below and update the code to test the property accessedAt
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property timeoutS (base name: "timeout_s")', function() {
      // uncomment below and update the code to test the property timeoutS
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property currentStatus (base name: "current_status")', function() {
      // uncomment below and update the code to test the property currentStatus
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

    it('should have the property targetStatus (base name: "target_status")', function() {
      // uncomment below and update the code to test the property targetStatus
      //var instance = new Api.PodModel();
      //expect(instance).to.be();
    });

  });

}));
