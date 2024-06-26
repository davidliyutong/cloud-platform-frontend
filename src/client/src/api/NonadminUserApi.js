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


import ApiClient from "../ApiClient";
import UserGetResponse from '../model/UserGetResponse';
import UserUpdateRequest from '../model/UserUpdateRequest';
import UserUpdateResponse from '../model/UserUpdateResponse';

/**
* NonadminUser service.
* @module api/NonadminUserApi
* @version 1.0.0
*/
export default class NonadminUserApi {

    /**
    * Constructs a new NonadminUserApi. 
    * @alias module:api/NonadminUserApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the getnonadminUserNonadminUserGet operation.
     * @callback module:api/NonadminUserApi~getnonadminUserNonadminUserGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserGetResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get user by username.
     * @param {String} username 
     * @param {module:api/NonadminUserApi~getnonadminUserNonadminUserGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserGetResponse}
     */
    getnonadminUserNonadminUserGet(username, callback) {
      let postBody = null;
      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling getnonadminUserNonadminUserGet");
      }

      let pathParams = {
        'username': username
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['token'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = UserGetResponse;
      return this.apiClient.callApi(
        '/v1/users/{username}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the putnonadminUserNonadminUserUpdate operation.
     * @callback module:api/NonadminUserApi~putnonadminUserNonadminUserUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserUpdateResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update user by username.
     * @param {String} username 
     * @param {Object} opts Optional parameters
     * @param {module:model/UserUpdateRequest} [userUpdateRequest] 
     * @param {module:api/NonadminUserApi~putnonadminUserNonadminUserUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserUpdateResponse}
     */
    putnonadminUserNonadminUserUpdate(username, opts, callback) {
      opts = opts || {};
      let postBody = opts['userUpdateRequest'];
      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling putnonadminUserNonadminUserUpdate");
      }

      let pathParams = {
        'username': username
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['token'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = UserUpdateResponse;
      return this.apiClient.callApi(
        '/v1/users/{username}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
