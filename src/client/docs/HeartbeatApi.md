# Api.HeartbeatApi

All URIs are relative to *http://0.0.0.0*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getheartbeatHeartbeatUser**](HeartbeatApi.md#getheartbeatHeartbeatUser) | **GET** /v1/heartbeat/user | partial(func, *args, **keywords) - new function with partial application



## getheartbeatHeartbeatUser

> getheartbeatHeartbeatUser()

partial(func, *args, **keywords) - new function with partial application

of the given arguments and keywords.

### Example

```javascript
import Api from 'api';

let apiInstance = new Api.HeartbeatApi();
apiInstance.getheartbeatHeartbeatUser((error, data, response) => {
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

