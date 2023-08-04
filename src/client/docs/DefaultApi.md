# Api.DefaultApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**gethealth**](DefaultApi.md#gethealth) | **GET** /health | Health check. Return a 200 OK response.
[**getv1Health**](DefaultApi.md#getv1Health) | **GET** /v1/health | Health check. Return a 200 OK response.



## gethealth

> gethealth()

Health check. Return a 200 OK response.

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.DefaultApi();
apiInstance.gethealth((error, data, response) => {
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


## getv1Health

> getv1Health()

Health check. Return a 200 OK response.

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.DefaultApi();
apiInstance.getv1Health((error, data, response) => {
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

