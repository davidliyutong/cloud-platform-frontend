# Api.AdminUserApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteadminUserAdminUserDelete**](AdminUserApi.md#deleteadminUserAdminUserDelete) | **DELETE** /v1/admin/users/{username} | Delete a user. This will mark the user as deleted.
[**getadminUserAdminUserGet**](AdminUserApi.md#getadminUserAdminUserGet) | **GET** /v1/admin/users/{username} | Get a user.
[**getadminUserAdminUserList**](AdminUserApi.md#getadminUserAdminUserList) | **GET** /v1/admin/users | List all users.
[**postadminUserAdminUserCreate**](AdminUserApi.md#postadminUserAdminUserCreate) | **POST** /v1/admin/users | Create a user.
[**putadminUserAdminUserUpdate**](AdminUserApi.md#putadminUserAdminUserUpdate) | **PUT** /v1/admin/users/{username} | Update a user.



## deleteadminUserAdminUserDelete

> UserDeleteResponse deleteadminUserAdminUserDelete(username)

Delete a user. This will mark the user as deleted.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminUserApi();
let username = "username_example"; // String | 
apiInstance.deleteadminUserAdminUserDelete(username, (error, data, response) => {
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

[**UserDeleteResponse**](UserDeleteResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getadminUserAdminUserGet

> UserGetResponse getadminUserAdminUserGet(username)

Get a user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminUserApi();
let username = "username_example"; // String | 
apiInstance.getadminUserAdminUserGet(username, (error, data, response) => {
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


## getadminUserAdminUserList

> UserListResponse getadminUserAdminUserList(opts)

List all users.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminUserApi();
let opts = {
  'indexStart': 56, // Number | 
  'indexEnd': 56, // Number | 
  'extraQueryFilter': "extraQueryFilter_example" // String | 
};
apiInstance.getadminUserAdminUserList(opts, (error, data, response) => {
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

[**UserListResponse**](UserListResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## postadminUserAdminUserCreate

> UserCreateResponse postadminUserAdminUserCreate(opts)

Create a user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminUserApi();
let opts = {
  'userCreateRequest': new Api.UserCreateRequest() // UserCreateRequest | 
};
apiInstance.postadminUserAdminUserCreate(opts, (error, data, response) => {
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
 **userCreateRequest** | [**UserCreateRequest**](UserCreateRequest.md)|  | [optional] 

### Return type

[**UserCreateResponse**](UserCreateResponse.md)

### Authorization

[token](../README.md#token)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## putadminUserAdminUserUpdate

> UserUpdateResponse putadminUserAdminUserUpdate(username, opts)

Update a user.

### Example

```javascript
import Api from 'api';
let defaultClient = Api.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: token
let token = defaultClient.authentications['token'];
token.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new Api.AdminUserApi();
let username = "username_example"; // String | 
let opts = {
  'userUpdateRequest': new Api.UserUpdateRequest() // UserUpdateRequest | 
};
apiInstance.putadminUserAdminUserUpdate(username, opts, (error, data, response) => {
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

