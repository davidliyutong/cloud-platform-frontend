# Api.NonadminPodApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deletenonadminPodNonadminPodDelete**](NonadminPodApi.md#deletenonadminPodNonadminPodDelete) | **DELETE** /v1/pods/{pod_id} | Delete a pod owned by the user.
[**getnonadminPodNonadminPodGet**](NonadminPodApi.md#getnonadminPodNonadminPodGet) | **GET** /v1/pods/{pod_id} | Get a pod owned by the user.
[**getnonadminPodNonadminPodList**](NonadminPodApi.md#getnonadminPodNonadminPodList) | **GET** /v1/pods | List all pods. Only pods owned by the user will be returned.
[**postnonadminPodNonadminPodCreate**](NonadminPodApi.md#postnonadminPodNonadminPodCreate) | **POST** /v1/pods | Create a pod owned by the user.
[**putnonadminPodNonadminPodUpdate**](NonadminPodApi.md#putnonadminPodNonadminPodUpdate) | **PUT** /v1/pods/{pod_id} | Update a pod owned by the user.



## deletenonadminPodNonadminPodDelete

> PodDeleteResponse deletenonadminPodNonadminPodDelete(podId)

Delete a pod owned by the user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminPodApi();
let podId = "podId_example"; // String | 
apiInstance.deletenonadminPodNonadminPodDelete(podId, (error, data, response) => {
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


## getnonadminPodNonadminPodGet

> PodGetResponse getnonadminPodNonadminPodGet(podId)

Get a pod owned by the user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminPodApi();
let podId = "podId_example"; // String | 
apiInstance.getnonadminPodNonadminPodGet(podId, (error, data, response) => {
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


## getnonadminPodNonadminPodList

> PodListResponse getnonadminPodNonadminPodList(opts)

List all pods. Only pods owned by the user will be returned.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminPodApi();
let opts = {
  'indexStart': 56, // Number | 
  'indexEnd': 56, // Number | 
  'extraQueryFilter': "extraQueryFilter_example" // String | 
};
apiInstance.getnonadminPodNonadminPodList(opts, (error, data, response) => {
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


## postnonadminPodNonadminPodCreate

> PodCreateResponse postnonadminPodNonadminPodCreate(opts)

Create a pod owned by the user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminPodApi();
let opts = {
  'podCreateRequest': new Api.PodCreateRequest() // PodCreateRequest | 
};
apiInstance.postnonadminPodNonadminPodCreate(opts, (error, data, response) => {
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


## putnonadminPodNonadminPodUpdate

> PodUpdateResponse putnonadminPodNonadminPodUpdate(podId, opts)

Update a pod owned by the user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminPodApi();
let podId = "podId_example"; // String | 
let opts = {
  'podUpdateRequest': new Api.PodUpdateRequest() // PodUpdateRequest | 
};
apiInstance.putnonadminPodNonadminPodUpdate(podId, opts, (error, data, response) => {
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

