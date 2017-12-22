+++
Categories = ["Swift", "iOS"]
Description = "About a month ago I stumbled on a series of blog post called Let's build a simple interpreter by Ruslan Spivak. In these blog posts the author write about building a simple interpreter for the Pascal programming language in Python. It is very well written and explained, I would even say that all the concepts are explained better than in the compiler course I took at the university. I felt a bit nostalgic and wanted to tackle an algorithmically challenging problem, so I decided to follow along and write a simple Pascal interpreter in Swift, the language I switched to from C# nearly a year ago"
Tags = ["Swift", "iOS"]
author = "Igor Kulman"
date = "2019-01-10T09:29:12+01:00"
title = "Writing a simple Pascal interpreter in Swift"
url = "/writing-a-pascal-interpreter-in-swift"
share_img = "/images/factorial.gif"

+++

About a month ago I stumbled on a series of blog post called [Let's build a simple interpreter by Ruslan Spivak](https://ruslanspivak.com/lsbasi-part1/). In these blog posts the author write about building a simple interpreter for the `Pascal` programming language in `Python`. It is very well written and explained, I would even say that all the concepts are explained better than in the compiler course I took at the university.

In that class I had to write a `Pascal` compiler not interpreter in `C++` and with tools like `lex` and `yacc` so I remembered most concepts but the interpreter is a bit different than a compiler and not using any external tools makes you think more about the problem.

I felt a bit nostalgic and wanted to tackle an algorithmically challenging problem, especially because  `Pascal` was my first programming language back in high school so I decided to follow along and write a simple `Pascal` interpreter in `Swift`, the language [I switched to from C# nearly a year ago](https://blog.kulman.sk/my-experience-with-swift-after-9-months/).

Swift is a different language than `Python` so I had to do many things differently, especially those where the Python implementation relayed on the dynamicity of the language. 

But the biggest challenge was that the series ended before introducing function calling and the call stack so I had to come with a good way to do this. I also wanted to support recursion and basic loops and flow controls.

I managed to achieve everything I wanted and my project was born, the [Swift Pascal Interpreter, available on Github](https://github.com/igorkulman/SwiftPascalInterpreter).

The current implementation has support for arithmetic expressions, if statements with simple conditions, loops, variables, functions and procedures and even some standard Pascal function.

{{% img-responsive "/images/factorial.gif" %}}

<!--more-->

The goal was to be able to interpret a `Pascal` program like [factorial computation](https://github.com/igorkulman/SwiftPascalInterpreter/blob/master/Examples/factorial.pas) or a [simple number guessing game](https://github.com/igorkulman/SwiftPascalInterpreter/blob/master/Examples/game.pas).

The interpreter is a framework that can be used with macOS and some small changes also iOS and the Github project contains a command line utility for interpreting `Pascal` programs (as shown in the Gif above) and a Playground. 

In the Playground you can try out all the parts independently; the `Lexer` that reads the programs as text and converts them into a stream of tokens, the `Parser` that reads the stream of tokens and a builds an abstract syntax tree of the program, the `Semantic Analyzer` that checks the abstract syntax tree and builds a symbols table and finally the `Interpreter` that executes the program. There is a complete [explanation of the structure in the README file](https://github.com/igorkulman/SwiftPascalInterpreter).

You can also access many useful extensions, like printing the abstract syntax tree of the program in a "graphic" representation. There are many things missing, like support for arrays and records or most of the default functions. 

{{% img-responsive "/images/playground.png" %}}

You can find all the important info about the project in the [on Github](https://github.com/igorkulman/SwiftPascalInterpreter), especially in the README file that I meticulously crafted. 