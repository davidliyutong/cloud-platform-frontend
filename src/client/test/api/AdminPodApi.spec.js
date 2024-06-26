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
    instance = new Api.AdminPodApi();
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

  describe('AdminPodApi', function() {
    describe('deleteadminPodAdminPodDelete', function() {
      it('should call deleteadminPodAdminPodDelete successfully', function(done) {
        //uncomment below and update the code to test deleteadminPodAdminPodDelete
        //instance.deleteadminPodAdminPodDelete(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getadminPodAdminPodGet', function() {
      it('should call getadminPodAdminPodGet successfully', function(done) {
        //uncomment below and update the code to test getadminPodAdminPodGet
        //instance.getadminPodAdminPodGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getadminPodAdminPodList', function() {
      it('should call getadminPodAdminPodList successfully', function(done) {
        //uncomment below and update the code to test getadminPodAdminPodList
        //instance.getadminPodAdminPodList(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postadminPodAdminPodCreate', function() {
      it('should call postadminPodAdminPodCreate successfully', function(done) {
        //uncomment below and update the code to test postadminPodAdminPodCreate
        //instance.postadminPodAdminPodCreate(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('putadminPodAdminPodUpdate', function() {
      it('should call putadminPodAdminPodUpdate successfully', function(done) {
        //uncomment below and update the code to test putadminPodAdminPodUpdate
        //instance.putadminPodAdminPodUpdate(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
