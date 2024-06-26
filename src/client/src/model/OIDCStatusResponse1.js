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

import ApiClient from '../ApiClient';

/**
 * The OIDCStatusResponse1 model module.
 * @module model/OIDCStatusResponse1
 * @version 1.0.0
 */
class OIDCStatusResponse1 {
    /**
     * Constructs a new <code>OIDCStatusResponse1</code>.
     * @alias module:model/OIDCStatusResponse1
     * @param name {String} 
     * @param path {String} 
     */
    constructor(name, path) { 
        
        OIDCStatusResponse1.initialize(this, name, path);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, path) { 
        obj['name'] = name;
        obj['path'] = path;
    }

    /**
     * Constructs a <code>OIDCStatusResponse1</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OIDCStatusResponse1} obj Optional instance to populate.
     * @return {module:model/OIDCStatusResponse1} The populated <code>OIDCStatusResponse1</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new OIDCStatusResponse1();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('path')) {
                obj['path'] = ApiClient.convertToType(data['path'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>OIDCStatusResponse1</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>OIDCStatusResponse1</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of OIDCStatusResponse1.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['path'] && !(typeof data['path'] === 'string' || data['path'] instanceof String)) {
            throw new Error("Expected the field `path` to be a primitive type in the JSON string but got " + data['path']);
        }

        return true;
    }


}

OIDCStatusResponse1.RequiredProperties = ["name", "path"];

/**
 * @member {String} name
 */
OIDCStatusResponse1.prototype['name'] = undefined;

/**
 * @member {String} path
 */
OIDCStatusResponse1.prototype['path'] = undefined;






export default OIDCStatusResponse1;

