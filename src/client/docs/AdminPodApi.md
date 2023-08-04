# Api.AdminPodApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteadminPodAdminPodDelete**](AdminPodApi.md#deleteadminPodAdminPodDelete) | **DELETE** /v1/admin/pods/{pod_id} | Delete a pod. This will mark the pod as deleted.
[**getadminPodAdminPodGet**](AdminPodApi.md#getadminPodAdminPodGet) | **GET** /v1/admin/pods/{pod_id} | Get a pod.
[**getadminPodAdminPodList**](AdminPodApi.md#getadminPodAdminPodList) | **GET** /v1/admin/pods | List all pods.
[**postadminPodAdminPodCreate**](AdminPodApi.md#postadminPodAdminPodCreate) | **POST** /v1/admin/pods | Create a pod.
[**putadminPodAdminPodUpdate**](AdminPodApi.md#putadminPodAdminPodUpdate) | **PUT** /v1/admin/pods/{pod_id} | Update a pod.



## deleteadminPodAdminPodDelete

> PodDeleteResponse deleteadminPodAdminPodDelete(podId)

Delete a pod. This will mark the pod as deleted.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminPodApi();
let podId = "podId_example"; // String | 
apiInstance.deleteadminPodAdminPodDelete(podId, (error, data, response) => {
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
 **podId** | **String**|  | 

### Return type

[**PodDeleteResponse**](PodDeleteResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getadminPodAdminPodGet

> PodGetResponse getadminPodAdminPodGet(podId)

Get a pod.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminPodApi();
let podId = "podId_example"; // String | 
apiInstance.getadminPodAdminPodGet(podId, (error, data, response) => {
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
 **podId** | **String**|  | 

### Return type

[**PodGetResponse**](PodGetResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getadminPodAdminPodList

> PodListResponse getadminPodAdminPodList(opts)

List all pods.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminPodApi();
let opts = {
  'indexStart': 56, // Number | 
  'indexEnd': 56, // Number | 
  'extraQueryFilter': "extraQueryFilter_example" // String | 
};
apiInstance.getadminPodAdminPodList(opts, (error, data, response) => {
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

[**PodListResponse**](PodListResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## postadminPodAdminPodCreate

> PodCreateResponse postadminPodAdminPodCreate(opts)

Create a pod.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminPodApi();
let opts = {
  'podCreateRequest': new Api.PodCreateRequest() // PodCreateRequest | 
};
apiInstance.postadminPodAdminPodCreate(opts, (error, data, response) => {
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
 **podCreateRequest** | [**PodCreateRequest**](PodCreateRequest.md)|  | [optional] 

### Return type

[**PodCreateResponse**](PodCreateResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## putadminPodAdminPodUpdate

> PodUpdateResponse putadminPodAdminPodUpdate(podId, opts)

Update a pod.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminPodApi();
let podId = "podId_example"; // String | 
let opts = {
  'podUpdateRequest': new Api.PodUpdateRequest() // PodUpdateRequest | 
};
apiInstance.putadminPodAdminPodUpdate(podId, opts, (error, data, response) => {
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
 **podId** | **String**|  | 
 **podUpdateRequest** | [**PodUpdateRequest**](PodUpdateRequest.md)|  | [optional] 

### Return type

[**PodUpdateResponse**](PodUpdateResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

