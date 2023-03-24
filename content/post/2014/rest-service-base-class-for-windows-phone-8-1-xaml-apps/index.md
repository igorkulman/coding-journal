+++
title = "REST service base class for Windows Phone 8.1 XAML apps"
author = "Igor Kulman"
date = "2014-11-24"
url = "/rest-service-base-class-for-windows-phone-8-1-xaml-apps/"
categories = ["Windows Phone","WinRT"]
tags = ["Csharp","Nuget","Windows Phone","Windows Store","WinRT"]
+++
Communicating with a JSON based REST service is a task that many Windows Phone apps have to do. My apps sure do it a lot so I came up with a base class that I use in all of them, [put it on Github][1] and [created a Nuget package][2], so your apps could use it to. 

The usage of this base class is simple. Create your service class and inherit from BaseRestService. The minimum you need to do to make it work is to override the GetBaseUrl() method to set the base url for all the requests. You can (but do not have to) also override the GetRequestHeaders() method to set the default request headers.

```csharp
public class MyDataService: BaseRestService
{
  protected override string GetBaseUrl()
  {
    return "my base url";
  }
  
  protected override Dictionary<string, string> GetRequestHeaders()
  {
    return new Dictionary<string, string>
    {
      {"Accept-Encoding", "gzip, deflate"},
      {"Accept", "application/json"},
    };
  }
}
```

and you can now use the following protected methods

<!--more-->

```csharp
Task<T> Get<T>(string url);
Task<T> Put<T>(string url, object request);
Task<T> Post<T>(string url, object request);
Task<T> Patch<T>(string url, object request);
Task Delete(string url);
```

All the JSON serialization and deserialization is automatically done for you. If you need to execute some action before every request (like checking if the OAuth token expired and refreshing it), simply override the OnBeforeRequest() method.

Methods in your service may then look like this

```csharp
public Task<List<Account>> GetAccounts()
{
  return Get<List<Account>>("/accounts");
}

public Task<Account> UpdateAccount(Account account)
{
  return Patch<Account>("/accounts",account);
}
```

In case of an error, the methods throw either a DeserialziationException with the original data if deserialization failed, or a ConnectionException with the HTTP status code.

if you need some additional features, just raise an issue in the [Github repo][1], or create a pull request.

{{% github-repo "igorkulman/Kulman.WPA81.BaseRestService" %}}

 [1]: https://github.com/igorkulman/Kulman.WPA81.BaseRestService
 [2]: https://www.nuget.org/packages/Kulman.WPA81.BaseRestService/
