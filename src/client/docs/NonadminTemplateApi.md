# Api.NonadminTemplateApi

All URIs are relative to *http://127.0.0.1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getnonadminTemplateNonadminTemplateGet**](NonadminTemplateApi.md#getnonadminTemplateNonadminTemplateGet) | **GET** /v1/templates/{template_id} | Get a template by id. Returns 404 if the template does not exist or is disabled.
[**getnonadminTemplateNonadminTemplateList**](NonadminTemplateApi.md#getnonadminTemplateNonadminTemplateList) | **GET** /v1/templates | List enabled templates. Only templates with enabled&#x3D;true are returned;



## getnonadminTemplateNonadminTemplateGet

> TemplateGetResponse getnonadminTemplateNonadminTemplateGet(templateId)

Get a template by id. Returns 404 if the template does not exist or is disabled.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminTemplateApi();
let templateId = "templateId_example"; // String | 
apiInstance.getnonadminTemplateNonadminTemplateGet(templateId, (error, data, response) => {
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


## getnonadminTemplateNonadminTemplateList

> TemplateListResponse getnonadminTemplateNonadminTemplateList(opts)

List enabled templates. Only templates with enabled&#x3D;true are returned;

disabled templates are invisible to non-admin users.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminTemplateApi();
let opts = {
  'indexStart': 56, // Number | 
  'indexEnd': 56, // Number | 
  'extraQueryFilter': "extraQueryFilter_example" // String | 
};
apiInstance.getnonadminTemplateNonadminTemplateList(opts, (error, data, response) => {
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

