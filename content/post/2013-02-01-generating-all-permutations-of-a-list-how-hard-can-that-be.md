+++
title = "Generating all permutations of a list … how hard can that be?"
author = "Igor Kulman"
date = "2013-02-01"
url = "/generating-all-permutations-of-a-list-how-hard-can-that-be/"
categories = ["Functional programming","Programming in general"]
tags = ["Csharp","Fsharp"]
+++
While reading an article that had nothing in common with programming I came upon a sudden need to find a way to generate all the permutations of a list, or more exactly a string (it is just a list of characters). As lazy as I am I tried to google a few examples of C# code that does exactly that. I was horrified that programmers could come up with the complicated ways I found. Not to mention programmers writing a ton of unit test and classes before actualy writing the code that solves to problem. 

The problem is naturally recursive. All the permutations of a list of n items consit of each of the n items combined with all the permutations of the list without the actual item. So if you have a list of let&#8217;s say items (a,b,c), all the permutations are (a+permutation((b,c)) + (b+permutations((a,c))) + (c+permutations((a,b)).

First I came up with F# code to solve it, after some yield googling:

<!--more-->

{{< highlight fsharp >}}
let rec permutations (input: 'a list) = seq {
    if (input.IsEmpty) then 
        yield []
    else
        
            for i in input do
            yield! input
                    |> List.filter (fun x-> x<> i) 
                    |> permutations
                    |> Seq.map (fun x->i::x)
    }
{{< / highlight >}}

When I started to think about a C# solution I got stuck. The functional solution was still resonating in my head so I ended up basically rewriting F# to C#:

{{< highlight fsharp >}}
public IEnumerable<IEnumerable<T>> Permutation<T>(IEnumerable<T> input)
{            
    if (input == null || !input.Any()) yield break;
    if (input.Count() == 1) yield return input;

    foreach (var item in input)
    {
        var next  = input.Where(l => !l.Equals(item)).ToList();
        foreach (var perm in Permutation(next))
        {
            yield return (new List<T>{item}).Concat(perm);
        }
    }
}
{{< / highlight >}}

Looking for other functional solutions I found a realy neat way to generate permutations in Haskell, thanks to the generators

{{< highlight fsharp >}}
perms [] = [[]]
perms xs = [ x:ps | x <- xs , ps <- perms ( xs\\[x] ) ]
{{< / highlight >}}
