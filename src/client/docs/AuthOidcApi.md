# Api.AuthOidcApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getauthOidcAuthorize**](AuthOidcApi.md#getauthOidcAuthorize) | **GET** /v1/auth/oidc/authorize | This endpoint is called by identity provider after user login, will redirect to frontend login page with token
[**getauthOidcLogin**](AuthOidcApi.md#getauthOidcLogin) | **GET** /v1/auth/oidc/login | Login
[**getauthOidcStatus**](AuthOidcApi.md#getauthOidcStatus) | **GET** /v1/auth/oidc/status | Status



## getauthOidcAuthorize

> getauthOidcAuthorize()

This endpoint is called by identity provider after user login, will redirect to frontend login page with token

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthOidcApi();
apiInstance.getauthOidcAuthorize((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getauthOidcLogin

> getauthOidcLogin()

Login

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthOidcApi();
apiInstance.getauthOidcLogin((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getauthOidcStatus

> OIDCStatusResponse1 getauthOidcStatus()

Status

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthOidcApi();
apiInstance.getauthOidcStatus((error, data, response) => {
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

[**OIDCStatusResponse1**](OIDCStatusResponse1.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

