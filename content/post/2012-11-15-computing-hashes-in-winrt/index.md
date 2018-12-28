+++
title = "Computing hashes in WinRT"
author = "Igor Kulman"
date = "2012-11-15"
url = "/computing-hashes-in-winrt/"
categories = ["WinRT"]
tags = ["Csharp","Hashing","MD5","SHA1","WinRT"]
+++
If you ever generated a MD5 or SHA hash in C# you problaby uset the classes from the System.Security.Cryptography namespace. This namespace is not available in WinRT, you have to use the Windows.Security.Cryptography.Core instead. This namespace contians a class called HashAlgorithmProvider that can be used to generate hashes using MD5 and SHA (SHA1, SHA256, SHA384, SHA512). A simple method to generate a hash for a string using a given algorithm may look like this

{{< highlight csharp >}}
public static string GetHash(string algoritm, string s)
{
    HashAlgorithmProvider alg = HashAlgorithmProvider.OpenAlgorithm(algoritm);
    IBuffer buff = CryptographicBuffer.ConvertStringToBinary(s, BinaryStringEncoding.Utf8);
    var hashed = alg.HashData(buff);
    var res = CryptographicBuffer.EncodeToHexString(hashed);
    return res;
}
{{< / highlight >}}

<!--more-->

Specifing the algoritm by its string name is not a good idea in my opinion, although you can use the names from the HashAlgorithmNames class. I would rather make the GetHash method private and create public method for all the algorithms

{{< highlight csharp >}}
public static string GetSha1(string s)
{
    return GetHash(HashAlgorithmNames.Sha1, s);
}

public static string GetSha256(string s)
{
    return GetHash(HashAlgorithmNames.Sha256, s);
}       

public static string GetSha384(string s)
{
    return GetHash(HashAlgorithmNames.Sha384, s);
}

public static string GetSha512(string s)
{
    return GetHash(HashAlgorithmNames.Sha512, s);
}

public static string GetMD5(string s)
{
    return GetHash(HashAlgorithmNames.Md5, s);
}
{{< / highlight >}}
