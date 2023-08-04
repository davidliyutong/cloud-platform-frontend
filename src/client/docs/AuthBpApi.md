# Api.AuthBpApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getauthBpRetrieveUserEndpoint**](AuthBpApi.md#getauthBpRetrieveUserEndpoint) | **GET** /v1/auth/jwt/me | Retrieveuserendpoint
[**getauthBpVerifyEndpoint**](AuthBpApi.md#getauthBpVerifyEndpoint) | **GET** /v1/auth/jwt/verify | Verifyendpoint
[**postauthBpAuthenticateEndpoint**](AuthBpApi.md#postauthBpAuthenticateEndpoint) | **POST** /v1/auth/jwt/login | Authenticateendpoint
[**postauthBpRefreshEndpoint**](AuthBpApi.md#postauthBpRefreshEndpoint) | **POST** /v1/auth/jwt/refresh | Refreshendpoint



## getauthBpRetrieveUserEndpoint

> getauthBpRetrieveUserEndpoint()

Retrieveuserendpoint

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthBpApi();
apiInstance.getauthBpRetrieveUserEndpoint((error, data, response) => {
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
- **Accept**: Not defined


## getauthBpVerifyEndpoint

> getauthBpVerifyEndpoint()

Verifyendpoint

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthBpApi();
apiInstance.getauthBpVerifyEndpoint((error, data, response) => {
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
- **Accept**: Not defined


## postauthBpAuthenticateEndpoint

> postauthBpAuthenticateEndpoint()

Authenticateendpoint

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthBpApi();
apiInstance.postauthBpAuthenticateEndpoint((error, data, response) => {
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
- **Accept**: Not defined


## postauthBpRefreshEndpoint

> postauthBpRefreshEndpoint()

Refreshendpoint

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.AuthBpApi();
apiInstance.postauthBpRefreshEndpoint((error, data, response) => {
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
- **Accept**: Not defined

