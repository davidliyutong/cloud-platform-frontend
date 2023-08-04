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
import TemplateCreateResponseTemplate from './TemplateCreateResponseTemplate';

/**
 * The TemplateGetResponse model module.
 * @module model/TemplateGetResponse
 * @version 1.0.0
 */
class TemplateGetResponse {
    /**
     * Constructs a new <code>TemplateGetResponse</code>.
     *      Get response for templates, the same as create response     
     * @alias module:model/TemplateGetResponse
     * @param status {Number} 
     * @param message {String} 
     */
    constructor(status, message) { 
        
        TemplateGetResponse.initialize(this, status, message);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, status, message) { 
        obj['status'] = status;
        obj['message'] = message;
    }

    /**
     * Constructs a <code>TemplateGetResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TemplateGetResponse} obj Optional instance to populate.
     * @return {module:model/TemplateGetResponse} The populated <code>TemplateGetResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TemplateGetResponse();

            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'Number');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('template')) {
                obj['template'] = TemplateCreateResponseTemplate.constructFromObject(data['template']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TemplateGetResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TemplateGetResponse</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of TemplateGetResponse.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }
        // validate the optional field `template`
        if (data['template']) { // data not null
          TemplateCreateResponseTemplate.validateJSON(data['template']);
        }

        return true;
    }


}

TemplateGetResponse.RequiredProperties = ["status", "message"];

/**
 * @member {String} description
 * @default ''
 */
TemplateGetResponse.prototype['description'] = '';

/**
 * @member {Number} status
 */
TemplateGetResponse.prototype['status'] = undefined;

/**
 * @member {String} message
 */
TemplateGetResponse.prototype['message'] = undefined;

/**
 * @member {module:model/TemplateCreateResponseTemplate} template
 */
TemplateGetResponse.prototype['template'] = undefined;






export default TemplateGetResponse;

