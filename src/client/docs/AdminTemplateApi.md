# Api.AdminTemplateApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteadminTemplateAdminTemplateDelete**](AdminTemplateApi.md#deleteadminTemplateAdminTemplateDelete) | **DELETE** /v1/admin/templates/{template_id} | Delete a template. This will mark the pod as deleted.
[**getadminTemplateAdminTemplateGet**](AdminTemplateApi.md#getadminTemplateAdminTemplateGet) | **GET** /v1/admin/templates/{template_id} | Get a template.
[**getadminTemplateAdminTemplateList**](AdminTemplateApi.md#getadminTemplateAdminTemplateList) | **GET** /v1/admin/templates | List all templates.
[**postadminTemplateAdminTemplateCreate**](AdminTemplateApi.md#postadminTemplateAdminTemplateCreate) | **POST** /v1/admin/templates | Create a template.
[**putadminTemplateAdminTemplateUpdate**](AdminTemplateApi.md#putadminTemplateAdminTemplateUpdate) | **PUT** /v1/admin/templates/{template_id} | Update a template.



## deleteadminTemplateAdminTemplateDelete

> TemplateDeleteResponse deleteadminTemplateAdminTemplateDelete(templateId)

Delete a template. This will mark the pod as deleted.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminTemplateApi();
let templateId = "templateId_example"; // String | 
apiInstance.deleteadminTemplateAdminTemplateDelete(templateId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateId** | **String**|  | 

### Return type

[**TemplateDeleteResponse**](TemplateDeleteResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getadminTemplateAdminTemplateGet

> TemplateGetResponse getadminTemplateAdminTemplateGet(templateId)

Get a template.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminTemplateApi();
let templateId = "templateId_example"; // String | 
apiInstance.getadminTemplateAdminTemplateGet(templateId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateId** | **String**|  | 

### Return type

[**TemplateGetResponse**](TemplateGetResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getadminTemplateAdminTemplateList

> TemplateListResponse getadminTemplateAdminTemplateList(opts)

List all templates.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminTemplateApi();
let opts = {
  'indexStart': 56, // Number | 
  'indexEnd': 56, // Number | 
  'extraQueryFilter': "extraQueryFilter_example" // String | 
};
apiInstance.getadminTemplateAdminTemplateList(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **indexStart** | **Number**|  | [optional] 
 **indexEnd** | **Number**|  | [optional] 
 **extraQueryFilter** | **String**|  | [optional] 

### Return type

[**TemplateListResponse**](TemplateListResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## postadminTemplateAdminTemplateCreate

> TemplateCreateResponse postadminTemplateAdminTemplateCreate(opts)

Create a template.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminTemplateApi();
let opts = {
  'templateCreateRequest': new Api.TemplateCreateRequest() // TemplateCreateRequest | 
};
apiInstance.postadminTemplateAdminTemplateCreate(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateCreateRequest** | [**TemplateCreateRequest**](TemplateCreateRequest.md)|  | [optional] 

### Return type

[**TemplateCreateResponse**](TemplateCreateResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## putadminTemplateAdminTemplateUpdate

> TemplateUpdateResponse putadminTemplateAdminTemplateUpdate(templateId, opts)

Update a template.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminTemplateApi();
let templateId = "templateId_example"; // String | 
let opts = {
  'templateUpdateRequest': new Api.TemplateUpdateRequest() // TemplateUpdateRequest | 
};
apiInstance.putadminTemplateAdminTemplateUpdate(templateId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **templateId** | **String**|  | 
 **templateUpdateRequest** | [**TemplateUpdateRequest**](TemplateUpdateRequest.md)|  | [optional] 

### Return type

[**TemplateUpdateResponse**](TemplateUpdateResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

