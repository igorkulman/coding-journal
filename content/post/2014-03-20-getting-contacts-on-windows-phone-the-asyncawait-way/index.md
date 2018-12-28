+++
title = "Getting contacts on Windows Phone the async/await way"
author = "Igor Kulman"
date = "2014-03-20"
url = "/getting-contacts-on-windows-phone-the-asyncawait-way/"
categories = ["Windows Phone"]
tags = ["Csharp","Windows Phone"]
+++
Getting contacts info on Windows Phone means using a callback based API provided by the Windows Phone SDK

{{< highlight csharp >}}
private void ButtonContacts_Click(object sender, RoutedEventArgs e)
{
    Contacts cons = new Contacts();

    //Identify the method that runs after the asynchronous search completes.
    cons.SearchCompleted += new EventHandler<ContactsSearchEventArgs>(Contacts_SearchCompleted);

    //Start the asynchronous search.
    cons.SearchAsync(String.Empty, FilterKind.None, "Contacts Test #1");
}

void Contacts_SearchCompleted(object sender, ContactsSearchEventArgs e)
{
    //Do something with the results.
    MessageBox.Show(e.Results.Count().ToString());
}
{{< / highlight >}}

I really dislike all the callback-based API so I was looking for a way to convert it to an async/await based API. And it is quite easy to do so

<!--more-->

{{< highlight csharp >}}
    /// <summary>
    /// Address book wrapper
    /// Needs address book permissions to work
    /// </summary>
    public class AddressBookService : IAddressBookService
    {
        /// <summary>
        /// Gets a list of contacts in device address book
        /// </summary>
        /// <returns>List of contact</returns>
        public Task<List<Contact>> GetContacts()
        {
            var t = new TaskCompletionSource<List<Contact>>();
            SearchContacts(s => t.TrySetResult(s));
            return t.Task;
        }

        /// <summary>
        /// Gets a list of contacts in device address book filtered by search criteria
        /// </summary>
        /// <param name="searchTerm">Search term</param>
        /// <param name="filter">Filter</param>
        /// <returns>List of contact</returns>
        public Task<List<Contact>> Search(string searchTerm, FilterKind filter)
        {
            var t = new TaskCompletionSource<List<Contact>>();
            SearchContacts(s => t.TrySetResult(s),filter,searchTerm);
            return t.Task;
        }

        /// <summary>
        /// Gets a list of contacts in device address book filtered by search criteria
        /// </summary>
        /// <param name="searchTerm">Search term</param>
        /// <param name="callback">Callback</param>
        /// <param name="filter">Filter</param>
        /// <returns>List of contact</returns>
        private void SearchContacts(Action<List<Contact>> callback, FilterKind filter = FilterKind.None, string searchTerm = null)
        {
            var cons = new Contacts();
            cons.SearchCompleted += (s, e) => callback(e.Results.ToList());
            cons.SearchAsync(String.IsNullOrEmpty(searchTerm) ? string.Empty : searchTerm, filter, null);
        }
    }
{{< / highlight >}}

You can find this implementation in my [Kulman.WP8][1] library (also [available on Nuget][2])

 [1]: https://github.com/igorkulman/Kulman.WP8
 [2]: http://www.nuget.org/packages/Kulman.WP8/

{{% github-repo "igorkulman/Kulman.WP8" %}}
