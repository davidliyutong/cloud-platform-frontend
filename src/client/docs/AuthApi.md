# Api.AuthApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getauthBasic**](AuthApi.md#getauthBasic) | **GET** /v1/auth/basic | Basic auth for any user
[**getauthBasicUser**](AuthApi.md#getauthBasicUser) | **GET** /v1/auth/basic/{username} | Basic auth for specific user
[**getauthTokenValidateUser**](AuthApi.md#getauthTokenValidateUser) | **GET** /v1/auth/token/validate/{username} | This function validates the token in:
[**postauthTokenLogin**](AuthApi.md#postauthTokenLogin) | **POST** /v1/auth/token/login | this is a hack to assign 10yr valid token to user
[**postauthTokenRefresh**](AuthApi.md#postauthTokenRefresh) | **POST** /v1/auth/token/refresh | this is a hack to verify the long-term token and sign short term token



## getauthBasic

> Object getauthBasic()

Basic auth for any user

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
apiInstance.getauthBasic((error, data, response) => {
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


## getauthBasicUser

> Object getauthBasicUser(username)

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
apiInstance.getauthBasicUser(username, (error, data, response) => {
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


## getauthTokenValidateUser

> Object getauthTokenValidateUser(username)

This function validates the token in:

- header.Authorization&lt;br&gt;- urlParam.clpl_auth_token&lt;br&gt;&lt;br&gt;If the validation succeed, return 200 OK and set cookie clpl_auth_token&#x3D;${JWT}

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
let username = "username_example"; // String | 
apiInstance.getauthTokenValidateUser(username, (error, data, response) => {
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
- **Accept**: */*, application/json


## postauthTokenLogin

> TokenResponse1 postauthTokenLogin(opts)

this is a hack to assign 10yr valid token to user

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthApi();
let opts = {
  'loginCredential1': new Api.LoginCredential1() // LoginCredential1 | 
};
apiInstance.postauthTokenLogin(opts, (error, data, response) => {
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
 **loginCredential1** | [**LoginCredential1**](LoginCredential1.md)|  | [optional] 

### Return type

[**TokenResponse1**](TokenResponse1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## postauthTokenRefresh

> TokenResponse1 postauthTokenRefresh()

this is a hack to verify the long-term token and sign short term token

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AuthApi();
apiInstance.postauthTokenRefresh((error, data, response) => {
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

[**TokenResponse1**](TokenResponse1.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

