# Api.NonadminUserApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getnonadminUserNonadminUserGet**](NonadminUserApi.md#getnonadminUserNonadminUserGet) | **GET** /v1/users/{username} | Get user by username.
[**putnonadminUserNonadminUserUpdate**](NonadminUserApi.md#putnonadminUserNonadminUserUpdate) | **PUT** /v1/users/{username} | Update user by username.



## getnonadminUserNonadminUserGet

> UserGetResponse getnonadminUserNonadminUserGet(username)

Get user by username.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminUserApi();
let username = "username_example"; // String | 
apiInstance.getnonadminUserNonadminUserGet(username, (error, data, response) => {
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
 **username** | **String**|  | 

### Return type

[**UserGetResponse**](UserGetResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## putnonadminUserNonadminUserUpdate

> UserUpdateResponse putnonadminUserNonadminUserUpdate(username, opts)

Update user by username.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.NonadminUserApi();
let username = "username_example"; // String | 
let opts = {
  'userUpdateRequest': new Api.UserUpdateRequest() // UserUpdateRequest | 
};
apiInstance.putnonadminUserNonadminUserUpdate(username, opts, (error, data, response) => {
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
 **username** | **String**|  | 
 **userUpdateRequest** | [**UserUpdateRequest**](UserUpdateRequest.md)|  | [optional] 

### Return type

[**UserUpdateResponse**](UserUpdateResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

