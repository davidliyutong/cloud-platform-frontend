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
 * The QuotaModel model module.
 * @module model/QuotaModel
 * @version 1.0.0
 */
class QuotaModel {
    /**
     * Constructs a new <code>QuotaModel</code>.
     *      Quota model, used to define user quota     
     * @alias module:model/QuotaModel
     * @param version {String} 
     * @param cpuM {Number} 
     * @param memoryMb {Number} 
     * @param storageMb {Number} 
     * @param gpu {Number} 
     * @param networkMb {Number} 
     * @param podN {Number} 
     */
    constructor(version, cpuM, memoryMb, storageMb, gpu, networkMb, podN) { 
        
        QuotaModel.initialize(this, version, cpuM, memoryMb, storageMb, gpu, networkMb, podN);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, version, cpuM, memoryMb, storageMb, gpu, networkMb, podN) { 
        obj['version'] = version;
        obj['cpu_m'] = cpuM;
        obj['memory_mb'] = memoryMb;
        obj['storage_mb'] = storageMb;
        obj['gpu'] = gpu;
        obj['network_mb'] = networkMb;
        obj['pod_n'] = podN;
    }

    /**
     * Constructs a <code>QuotaModel</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QuotaModel} obj Optional instance to populate.
     * @return {module:model/QuotaModel} The populated <code>QuotaModel</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new QuotaModel();

            if (data.hasOwnProperty('version')) {
                obj['version'] = ApiClient.convertToType(data['version'], 'String');
            }
            if (data.hasOwnProperty('committed')) {
                obj['committed'] = ApiClient.convertToType(data['committed'], 'Boolean');
            }
            if (data.hasOwnProperty('cpu_m')) {
                obj['cpu_m'] = ApiClient.convertToType(data['cpu_m'], 'Number');
            }
            if (data.hasOwnProperty('memory_mb')) {
                obj['memory_mb'] = ApiClient.convertToType(data['memory_mb'], 'Number');
            }
            if (data.hasOwnProperty('storage_mb')) {
                obj['storage_mb'] = ApiClient.convertToType(data['storage_mb'], 'Number');
            }
            if (data.hasOwnProperty('gpu')) {
                obj['gpu'] = ApiClient.convertToType(data['gpu'], 'Number');
            }
            if (data.hasOwnProperty('network_mb')) {
                obj['network_mb'] = ApiClient.convertToType(data['network_mb'], 'Number');
            }
            if (data.hasOwnProperty('pod_n')) {
                obj['pod_n'] = ApiClient.convertToType(data['pod_n'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>QuotaModel</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>QuotaModel</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of QuotaModel.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['version'] && !(typeof data['version'] === 'string' || data['version'] instanceof String)) {
            throw new Error("Expected the field `version` to be a primitive type in the JSON string but got " + data['version']);
        }

        return true;
    }


}

QuotaModel.RequiredProperties = ["version", "cpu_m", "memory_mb", "storage_mb", "gpu", "network_mb", "pod_n"];

/**
 * @member {String} version
 */
QuotaModel.prototype['version'] = undefined;

/**
 * @member {Boolean} committed
 * @default false
 */
QuotaModel.prototype['committed'] = false;

/**
 * @member {Number} cpu_m
 */
QuotaModel.prototype['cpu_m'] = undefined;

/**
 * @member {Number} memory_mb
 */
QuotaModel.prototype['memory_mb'] = undefined;

/**
 * @member {Number} storage_mb
 */
QuotaModel.prototype['storage_mb'] = undefined;

/**
 * @member {Number} gpu
 */
QuotaModel.prototype['gpu'] = undefined;

/**
 * @member {Number} network_mb
 */
QuotaModel.prototype['network_mb'] = undefined;

/**
 * @member {Number} pod_n
 */
QuotaModel.prototype['pod_n'] = undefined;






export default QuotaModel;

