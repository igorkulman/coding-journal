+++
title = "Fun with F# Type Providers: SQL"
author = "Igor Kulman"
date = "2012-11-27"
url = "/fun-with-f-type-providers-sql/"
categories = ["Functional programming"]
tags = ["Fsharp","Functional programming","SQL"]
+++
F# is a great language with a great potential that lets you express yourself more clearly and compactly. One of the best features that comes with F# 3.0 shipped with Visual Studio 2012 is Type Providers.

**What are Type Providers?**

According to MSDN documentation, an F# type provider is a component that provides types, properties, and methods for use in your program. Type providers are a significant part of F# 3.0 support for information-rich programming. The key to information-rich programming is to eliminate barriers to working with diverse information sources found on the Internet and in modern enterprise environments. One significant barrier to including a source of information into a program is the need to represent that information as types, properties, and methods for use in a programming language environment. Writing these types manually is very time-consuming and difficult to maintain. A common alternative is to use a code generator which adds files to your project; however, the conventional types of code generation do not integrate well into exploratory modes of programming supported by F# because the generated code must be replaced each time a service reference is adjusted.

**Available Type Providers**

F# comes with Type Providers for SQL, WSDL and OData, but you can also [create your own][1] or use one created by the community. A example may be the [Type Provider for R][2].

**Using Type Provider for SQL**

In this article I will show you how to use the Type Prvoder for SQL. If you want to use SQL with a language like C#, you need to create an EF or LINQ to SQL model from the database and recreate it every time the database schema changes. Type Provider for SQL makes this for you and lets you concentrace on working with the actual data.

**Schema information**

First you need to define a datasource. The only thing needed for this is a connection string. The connection string can be changed at runtime but you must provide a valid one for the compilation time so the F# compiler can &#8220;detect&#8221; the structure of your data. Let us create a module, that will hold our connection string and schema information.

{{< highlight csharp >}}
open System
open System.Data
open System.Data.Linq
open Microsoft.FSharp.Data.TypeProviders
open Microsoft.FSharp.Linq

module DataSource =

    [<Literal>]
    let connectionString = "Data Source=.\SQLEXPRESS;Initial Catalog=Manual;Integrated Security=True"
   
    type dbSchema = SqlDataConnection<connectionString>
{{< / highlight >}}

That is everything you need, if the schema of your database changes the F# compiler will notice.

**Querying the database**

With the schema information in place we can now start querying the database. We will create a Factory class with the connection string as a parameter

{{< highlight csharp >}}
open DataSource
open System.ServiceModel

module DealerFactory =

    type Factory(connectionString) =
        let db = DataSource.dbSchema.GetDataContext(connectionString)
{{< / highlight >}}

Now create a method, write db. and wait for a moment. IntelliSense will show you all the available tables in the database. If you query a table and write a dot again, you will be shown all the columns of the table. Pretty cool. 

You can query the database using the query { expression }, where expression is a normal F# expression, for example

{{< highlight csharp >}}
member this.GetList(latitude,longitude,max) =

            let query =
                    query {
                        for d in db.Dealer do
                        where (d.Latitude.HasValue && d.Longitude.HasValue)
                        sortBy (abs (d.Longitude.Value-longitude))
                        select d
                    }

            query |> Seq.take max
{{< / highlight >}}

Notice how the IntelliSense offers you a complete list of the columns if you write d. in the where clause.

**Inserting and updating data**

Inserting data is basically identical to the C# approach when using LINQ to SQL

{{< highlight csharp >}}
let record = new DataSource.dbSchema.ServiceTypes.Dealer(GlobalId=dealer.GlobalID,
                                                         ImporterId=int dealerId,
                                                         ...
                                                         )
db.Dealer.InsertOnSubmit(record)      
db.DataContext.SubmitChanges()
{{< / highlight >}}

The same is true for updating the data

{{< highlight csharp >}}
//select the record to be updated
let query =
             query {
                 for d in db.SkodaDealer do
                 where (d.GlobalId=dealer.GlobalID)
                 select d
              }

let record = query |> Seq.head

//update some fields

record.City <- dealer.City 
record.Name <- dealer.Name

db.DataContext.SubmitChanges()
{{< / highlight >}}

**Conclusion**

In my opinion, Type Providers are the best feature of F# so far. It is a real shame that Microsoft does not push this language and it cannot be used everywhere where C# can. But things are getting better and you can now create an F# Worker Role in your Azure project. 

If you are new to F# and want to learn in, definitely check out the [Try F# project][3].

 [1]: http://msdn.microsoft.com/en-us/library/hh361034.aspx
 [2]: http://techblog.bluemountaincapital.com/2012/08/01/announcing-the-f-r-type-provider/
 [3]: http://www.tryfsharp.org/
