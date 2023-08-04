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
import TimeoutS from './TimeoutS';
import Username from './Username';
import Values from './Values';

/**
 * The PodCreateRequest model module.
 * @module model/PodCreateRequest
 * @version 1.0.0
 */
class PodCreateRequest {
    /**
     * Constructs a new <code>PodCreateRequest</code>.
     *      Create request for pods. values is the values for the template (not used).     timeout_s is the timeout for the pod to run. max is 86400 seconds (24 hours).     
     * @alias module:model/PodCreateRequest
     * @param name {String} 
     * @param description {String} 
     * @param templateRef {String} 
     * @param cpuLimMCpu {Number} 
     * @param memLimMb {Number} 
     * @param storageLimMb {Number} 
     */
    constructor(name, description, templateRef, cpuLimMCpu, memLimMb, storageLimMb) { 
        
        PodCreateRequest.initialize(this, name, description, templateRef, cpuLimMCpu, memLimMb, storageLimMb);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, description, templateRef, cpuLimMCpu, memLimMb, storageLimMb) { 
        obj['name'] = name;
        obj['description'] = description;
        obj['template_ref'] = templateRef;
        obj['cpu_lim_m_cpu'] = cpuLimMCpu;
        obj['mem_lim_mb'] = memLimMb;
        obj['storage_lim_mb'] = storageLimMb;
    }

    /**
     * Constructs a <code>PodCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PodCreateRequest} obj Optional instance to populate.
     * @return {module:model/PodCreateRequest} The populated <code>PodCreateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PodCreateRequest();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('template_ref')) {
                obj['template_ref'] = ApiClient.convertToType(data['template_ref'], 'String');
            }
            if (data.hasOwnProperty('cpu_lim_m_cpu')) {
                obj['cpu_lim_m_cpu'] = ApiClient.convertToType(data['cpu_lim_m_cpu'], 'Number');
            }
            if (data.hasOwnProperty('mem_lim_mb')) {
                obj['mem_lim_mb'] = ApiClient.convertToType(data['mem_lim_mb'], 'Number');
            }
            if (data.hasOwnProperty('storage_lim_mb')) {
                obj['storage_lim_mb'] = ApiClient.convertToType(data['storage_lim_mb'], 'Number');
            }
            if (data.hasOwnProperty('username')) {
                obj['username'] = Username.constructFromObject(data['username']);
            }
            if (data.hasOwnProperty('timeout_s')) {
                obj['timeout_s'] = TimeoutS.constructFromObject(data['timeout_s']);
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = Values.constructFromObject(data['values']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>PodCreateRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>PodCreateRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of PodCreateRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['template_ref'] && !(typeof data['template_ref'] === 'string' || data['template_ref'] instanceof String)) {
            throw new Error("Expected the field `template_ref` to be a primitive type in the JSON string but got " + data['template_ref']);
        }
        // validate the optional field `username`
        if (data['username']) { // data not null
          Username.validateJSON(data['username']);
        }
        // validate the optional field `timeout_s`
        if (data['timeout_s']) { // data not null
          TimeoutS.validateJSON(data['timeout_s']);
        }
        // validate the optional field `values`
        if (data['values']) { // data not null
          Values.validateJSON(data['values']);
        }

        return true;
    }


}

PodCreateRequest.RequiredProperties = ["name", "description", "template_ref", "cpu_lim_m_cpu", "mem_lim_mb", "storage_lim_mb"];

/**
 * @member {String} name
 */
PodCreateRequest.prototype['name'] = undefined;

/**
 * @member {String} description
 */
PodCreateRequest.prototype['description'] = undefined;

/**
 * @member {String} template_ref
 */
PodCreateRequest.prototype['template_ref'] = undefined;

/**
 * @member {Number} cpu_lim_m_cpu
 */
PodCreateRequest.prototype['cpu_lim_m_cpu'] = undefined;

/**
 * @member {Number} mem_lim_mb
 */
PodCreateRequest.prototype['mem_lim_mb'] = undefined;

/**
 * @member {Number} storage_lim_mb
 */
PodCreateRequest.prototype['storage_lim_mb'] = undefined;

/**
 * @member {module:model/Username} username
 */
PodCreateRequest.prototype['username'] = undefined;

/**
 * @member {module:model/TimeoutS} timeout_s
 */
PodCreateRequest.prototype['timeout_s'] = undefined;

/**
 * @member {module:model/Values} values
 */
PodCreateRequest.prototype['values'] = undefined;






export default PodCreateRequest;

