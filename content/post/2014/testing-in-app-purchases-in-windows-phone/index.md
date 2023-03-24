+++
title = "Testing in-app purchases in Windows Phone"
author = "Igor Kulman"
date = "2014-03-17"
url = "/testing-in-app-purchases-in-windows-phone/"
categories = ["Windows Phone"]
tags = ["Csharp","In-app purchases","Windows Phone","Windows Store"]
+++
Windows Phone Store does not offer developers any sandbox to test in-app purchases in their apps, like stores on other platforms do. If you want test in-app purchases in your Windows Phone apps, you need to use other options.

To make in-app purchases implementation easier, I created a simple Windows Phone Store service interface in my [Kulman.WP8][1] library (also [available on Nuget][2])

```csharp
    /// <summary>
    /// Interface for Windows Phone Store service
    /// </summary>
    public interface IWindowsPhoneStoreService
    {
        /// <summary>
        /// Checks if a product is purchased
        /// </summary>
        /// <param name="productId">Product id</param>
        /// <returns>True if the product is purchased</returns>
        bool IsPurchased(string productId);

        /// <summary>
        /// Tries to purchase a product
        /// </summary>
        /// <param name="productId">Product id</param>
        /// <returns>True on success, false otherwise</returns>
        Task<bool> Purchase(string productId);

        /// <summary>
        /// Gets the price of a product
        /// </summary>
        /// <param name="productId">Product id</param>
        /// <returns>Product price</returns>
        Task<string> GetPrice(string productId);        
    }
```

<!--more-->

**Private beta**

If you publish your app as a private beta and add the in-app products, you can test them. All the in-app purchases are always free in this scenario. The disadvantage is that you cannot debug anything, it either works or it does not (if you use my [implementation from Kulman.WP8][3], it should :).

**Real app testing**

If your app is already in the Windows Phone Store, create an in-app product and try to buy it from your app run from Visual Studio, you may be wondering, why you are getting an error. The problem is that the app run from Visual Studio has a different app id from the app in Windows Phone Store. If you change the app id in the manifest to the app id state in Windows Phone Store (the details view), you will be able to make a real in-app purchase. 

**Mocking library**

To mock in-app purchases you can use the [Mock In-App Purchase Library][4]. To make testing easier, implement my interface using this library

```csharp
using MockIAPLib;
using Store = MockIAPLib;

namespace YourAPP
{
    
    /// <summary>
    /// Service for mocking in-app purchases in debug mode
    /// </summary>
    public class MockWindowsPhoneStoreService: IWindowsPhoneStoreService
    {
        /// <summary>
        /// Checks if a product is purchased
        /// </summary>
        /// <param name="productId">Product id</param>
        /// <returns>True if the product is purchased</returns>
        public bool IsPurchased(string productId)
        {
            if (String.IsNullOrEmpty(productId)) return false;

            var licenseInformation = CurrentApp.LicenseInformation;
            return licenseInformation.ProductLicenses[productId].IsActive;
        }

        /// <summary>
        /// Tries to purchase a product
        /// </summary>
        /// <param name="productId">Product id</param>
        /// <returns>True on success, false otherwise</returns>
        public async Task<bool> Purchase(string productId)
        {
            if (String.IsNullOrEmpty(productId))
            {
                return false;
            }


            try
            {
                await CurrentApp.RequestProductPurchaseAsync(productId, false);

                try
                {
                    var licenses = CurrentApp.LicenseInformation.ProductLicenses;
                    if (licenses[productId].IsConsumable && licenses[productId].IsActive)
                    {
                        CurrentApp.ReportProductFulfillment(productId);
                    }
                }
                catch (Exception e)
                {

                }

                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        /// <summary>
        /// Gets the price of a product
        /// </summary>
        /// <param name="productId">Product id</param>
        /// <returns>Product price</returns>
        public async Task<string> GetPrice(string productId)
        {
            try
            {
                var products = await CurrentApp.LoadListingInformationAsync();

                var product = products.ProductListings.SingleOrDefault(l => l.Value.ProductId == productId);
                if (product.Value == null) return string.Empty;

                return product.Value.FormattedPrice;
            }
            catch
            {
                return string.Empty;
            }
        }
    }
}
```

And setup the products you want to use at your app startup

```csharp
private void SetupMockIAP()
{
            MockIAP.Init();
 
            MockIAP.RunInMockMode(true);
            MockIAP.SetListingInformation(1, "en-us", "A description", "1", "TestApp");
 
            // Add some more items manually.
            ProductListing p = new ProductListing
            {
                Name = "img.2",
                ImageUri = new Uri("/Res/Image/2.jpg", UriKind.Relative),
                ProductId = "img.2",
                ProductType = Windows.ApplicationModel.Store.ProductType.Durable,
                Keywords = new string[] { "image" },
                Description = "An image",
                FormattedPrice = "1.0",
                Tag = string.Empty
            };
            MockIAP.AddProductListing("img.2", p);
}
```

The advantage of this approach is that you just switch the IWindowsStoreService implementation between then mock on and the [real one][3], depending on the situation. For example (Caliburn.Micro Bootstrapper)

```csharp
#if DEBUG
            container.RegisterSingleton(typeof(IWindowsPhoneStoreService), "windowsPhoneStoreService", typeof(MockWindowsPhoneStoreService));
#else
            container.RegisterSingleton(typeof(IWindowsPhoneStoreService), "windowsPhoneStoreService", typeof(WindowsPhoneStoreService));
#endif
```

 [1]: https://github.com/igorkulman/Kulman.WP8
 [2]: http://www.nuget.org/packages/Kulman.WP8/
 [3]: https://github.com/igorkulman/Kulman.WP8/blob/master/Kulman.WP8/Services/WindowsPhoneStoreService.cs
 [4]: http://code.msdn.microsoft.com/wpapps/Mock-In-App-Purchase-33080f0c

{{% github-repo "igorkulman/Kulman.WP8" %}}
