+++
title = "Reading Excel sheets using F# without COM"
author = "Igor Kulman"
date = "2013-02-06"
url = "/reading-excel-sheets-using-f-without-com/"
categories = ["Functional programming"]
tags = ["Excel","Fsharp","Mono"]
+++
I needed to create an utility that would read Excel 2010 files (.xlsx) and generate XML files from them according to some specific rules. The catch was that the utility needed to run on MacOS instead of Windows.

Reading and writing Excel files from .NET is [very easy using the Microsoft.Office.Interop assemblies][1] but they use Excel through COM and that makes them unusable outside of Windows. I found some 3rd party libraries for working with Excel and analzyed them with [The Mono Migration Analzyer][2] (MoMA). MoMA is a handy tool that analyzes .NET assemblies and tells you if they will run on Mono. Many of the Excel libraries I found were unusable for my use-case because they were using PInvoke calls. Only the [ExcelPackage library][3] runs on Mono.

I wanted to use the ExcelPackage from F# not C# so I wrote a [very simple F# wrapper][4], that you can freely use. For now it contains just a few methods

<!--more-->

Excel.getWorksheets
  
Excel.getWorksheetByIndex
  
Excel.getWorksheetByName
  
Excel.getMaxRowNumber
  
Excel.getMaxColNumber
  
Excel.getContent
  
Excel.getColumn
  
Excel.getRow

but I will be adding a few more soon. The usage is really simple. For example, if you want to read the whole sheet number 1 from a file called text.xlsx, use

{{< highlight fsharp >}}
let data = 
        "test.xlsx"
        |> Excel.getWorksheetByIndex 1
        |> Excel.getContent 

data 
    |> Seq.iter (fun x-> printfn "%s" x)
{{< / highlight >}}

**EDIT**: Now available as a Nuget package:

{{< highlight powershell >}}
PM> Install-Package ExcelPackageF
{{< / highlight >}}

{{% github-repo "igorkulman/ExcelPackageF" %}}


 [1]: http://blogs.msdn.com/b/jackhu/archive/2011/04/19/fsharp-amp-excel-io-reading-and-writeing-to-excel.aspx
 [2]: http://www.mono-project.com/MoMA
 [3]: http://excelpackage.codeplex.com/
 [4]: https://github.com/igorkulman/ExcelPackageF
