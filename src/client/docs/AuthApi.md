# Api.AuthApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getauthAuthBasic**](AuthApi.md#getauthAuthBasic) | **GET** /v1/auth/basic | Basic auth for any user
[**getauthAuthBasicUser**](AuthApi.md#getauthAuthBasicUser) | **GET** /v1/auth/basic/{username} | Basic auth for specific user
[**postauthAuthTokenLogin**](AuthApi.md#postauthAuthTokenLogin) | **POST** /v1/auth/token/login | this is a hack to assign 10yr valid token to user
[**postauthAuthTokenRefresh**](AuthApi.md#postauthAuthTokenRefresh) | **POST** /v1/auth/token/refresh | this is a hack to verify the long-term token and sign short term token



## getauthAuthBasic

> Object getauthAuthBasic()

Basic auth for any user

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
apiInstance.getauthAuthBasic((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getauthAuthBasicUser

> Object getauthAuthBasicUser(username)

Basic auth for specific user

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let username = "username_example"; // String | 
apiInstance.getauthAuthBasicUser(username, (error, data, response) => {
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

**Object**

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## postauthAuthTokenLogin

> TokenResponse postauthAuthTokenLogin(opts)

this is a hack to assign 10yr valid token to user

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthApi();
let opts = {
  'loginCredential': new Api.LoginCredential() // LoginCredential | 
};
apiInstance.postauthAuthTokenLogin(opts, (error, data, response) => {
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
 **loginCredential** | [**LoginCredential**](LoginCredential.md)|  | [optional] 

### Return type

[**TokenResponse**](TokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## postauthAuthTokenRefresh

> TokenResponse postauthAuthTokenRefresh()

this is a hack to verify the long-term token and sign short term token

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
apiInstance.postauthAuthTokenRefresh((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**TokenResponse**](TokenResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

