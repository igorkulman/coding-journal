---
title: Displaying PDF files in Windows Store apps
author: Igor Kulman
layout: post
date: 2013-03-27
url: /displaying-pdf-files-in-windows-store-apps/
dsq_thread_id:
  - 1179173189
categories:
  - WinRT
tags:
  - 'c#'
  - pdf
  - winrt
---
Displaying PDF files in a mobile apps is a valid use case and there are many iOS and Android app that do it. WinRT has no APIs for displaying PDF files. The only thing you can do with a PDF in WinRT is to display it in the default PDF viewer app using the Windows.System.Launcher.LaunchFileAsync method. This is typicaly not what you want to do. This method takes the user out of your app and more importantly the PDF can be copied, shared, etc. 

<img src="http://www.tecflap.com/wp-content/uploads/2011/04/pdf_ipad.jpg" width="605" height="371" class="alignnone" />

There are a few 3rd party components for displaying PDF files in Windows Store apps, each has some problems and restrictions.

**ComponentOne PDFViewer**

[ComponentOne][1] has a [PDFViewer component][2] as part of their [Studio for WinRT XAML][3] package. This package costs $895. There are [many limitations][4] when using this component that you need to be aware of. If you want to have more control over the rendered PDF files, you can get all the pages as FrameworkElements and do not need to use the PDFViewer as one monolitic component. It does not support all the fonts and complex documents are rendered really messed up, it was not usable for me at all.

**Foxit Embedded PDF SDK**

Foxit has a [Embedded PDF SDK for Windows RT][5] and [Embedded PDF SDK for Windows Store Apps][6] (what is the difference?). If you want to try it, you have to fill in a registration form. There is no information about pricing and you need to fill in another form to ask for a quotation. You can get the pages of the PDF files as images if you want more control, but the component only works with StorageFiles. It cannot open a custom stream (e.g: file in isolated storage with custom encryption).

**TallComponents PDFRasterizer**

TallComponents has a PDFRasterizer component that is currently in beta. You need to [join the beta program][7] to get access. The final version should be out in 6-8 weeks. PDFRasterizer costs 1490€ for a single app. It is just a rasterizer, you can get the pages of the PDF files as images and that is all. It works well with differents fonts and complex documents. 

**PDFTron Mobile PDF SDK**

[PDFTron][8] has a [Mobile PDF SDK][9] that works with Windows Store apps. To get a trial version you have to fill in a form where you have to describe your app. The pricing is not clear, it dependes on many factors and you need to write them an email to get a price. You can get pages from the PDF file but not in a usable format like an image.

So which PDF solution should you use? That dependes on your needs. I am afraid you will have to check each of them out by yourself and assess it according to your needs.

 [1]: http://www.componentone.com
 [2]: http://www.componentone.com/SuperProducts/PdfViewerWinRT/
 [3]: http://www.componentone.com/SuperProducts/StudioWinRTXAML/
 [4]: http://helpcentral.componentone.com/nethelp/PdfViewerWinRT/#!Documents/pdfviewerlimitations1.htm
 [5]: http://www.foxitsoftware.com/products/sdk/embedded/winrt/
 [6]: http://www.foxitsoftware.com/products/sdk/embedded/win8/
 [7]: https://www.tallcomponents.com/betaprogram.aspx
 [8]: http://www.pdftron.com/index.html
 [9]: http://www.pdftron.com/pdfnet/mobile/windows8_winrt_pdf_library.html