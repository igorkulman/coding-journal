+++
Categories = ["Swift", "iOS"]
Description = ""
Tags = ["Swift", "iOS"]
Keywords = ["Swift", "iOS"]
author = "Igor Kulman"
date = "2025-07-16T05:29:12+01:00"
title = "Generating and displaying QR codes in Swift"
url = "/generating-qr-codes-on-ios"

+++

Generating and displaying QR codes in an iOS app can be done natively, without any third-party dependencies. This approach works on both iOS and Mac Catalyst, using only system frameworks.

## Generating a QR Code Image

Apple’s Core Image framework provides everything needed to generate QR codes. A `CIFilter` of type `CIQRCodeGenerator` encodes the data, and the resulting `CIImage` can be rendered as a `UIImage` (or `NSImage` on macOS).

The following Swift function generates a QR code from a string and scales it to the desired size

```swift
import UIKit
import CoreImage

func generateQRCode(from string: String, size: CGFloat = 256) -> UIImage? {
    let data = string.data(using: .utf8)
    guard let filter = CIFilter(name: "CIQRCodeGenerator") else { return nil }
    filter.setValue(data, forKey: "inputMessage")
    filter.setValue("M", forKey: "inputCorrectionLevel")

    guard let ciImage = filter.outputImage else { return nil }
    let transform = CGAffineTransform(scaleX: size / ciImage.extent.size.width,
                                      y: size / ciImage.extent.size.height)
    let scaledImage = ciImage.transformed(by: transform)
    return UIImage(ciImage: scaledImage)
}
```

## Displaying the QR Code

A standard `UIImageView` in UIKit can be used to display the generated QR code image.

```swift
let qrImageView = UIImageView()
qrImageView.translatesAutoresizingMaskIntoConstraints = false
qrImageView.contentMode = .scaleAspectFit
qrImageView.image = generateQRCode(from: "https://blog.kulman.sk")
```

Add the image view to the view hierarchy and set up constraints as needed.

## Customizing the QR Code

To customize the QR code’s color, apply a color filter. For example, to generate a black-and-white QR code

```swift
if let qrImage = filter.outputImage {
    let colorFilter = CIFilter(name: "CIFalseColor",
                               parameters: [
                                   "inputImage": qrImage,
                                   "inputColor0": CIColor(color: .black),
                                   "inputColor1": CIColor(color: .white)
                               ])
    if let coloredImage = colorFilter?.outputImage {
        // Use coloredImage as before
    }
}
```

## Exporting or Sharing the QR Code

Since the QR code is a `UIImage`, it can be shared or exported using standard UIKit APIs, such as `UIActivityViewController`.

## Conclusion

Generating and displaying QR codes in Swift is straightforward and requires no external libraries. Core Image and UIKit provide all the necessary tools to add QR code support to an app in just a few lines of code, with options to customize the appearance as needed.