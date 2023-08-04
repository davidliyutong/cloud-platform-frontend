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
    instance = new Api.UserModelQuota();
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

  describe('UserModelQuota', function() {
    it('should create an instance of UserModelQuota', function() {
      // uncomment below and update the code to test UserModelQuota
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be.a(Api.UserModelQuota);
    });

    it('should have the property committed (base name: "committed")', function() {
      // uncomment below and update the code to test the property committed
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

    it('should have the property cpuM (base name: "cpu_m")', function() {
      // uncomment below and update the code to test the property cpuM
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

    it('should have the property memoryMb (base name: "memory_mb")', function() {
      // uncomment below and update the code to test the property memoryMb
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

    it('should have the property storageMb (base name: "storage_mb")', function() {
      // uncomment below and update the code to test the property storageMb
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

    it('should have the property gpu (base name: "gpu")', function() {
      // uncomment below and update the code to test the property gpu
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

    it('should have the property networkMb (base name: "network_mb")', function() {
      // uncomment below and update the code to test the property networkMb
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

    it('should have the property podN (base name: "pod_n")', function() {
      // uncomment below and update the code to test the property podN
      //var instance = new Api.UserModelQuota();
      //expect(instance).to.be();
    });

  });

}));
