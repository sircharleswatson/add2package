# Add2Package

_____
#### WARNING:
> This package is highly experimental and is not recommended for use in production applications.
Becaue of the way the packaging system works, it will most likely not get much better. However, you may attempt to use it in your app but be warned that there are lots of quirks. That being said, I'm currently using it on a live (non-production) app and it is working pretty well.
_____

Are you tired of listing all of your Meteor package's files out by hand?

_**Well I've got a solution for you!**_

Introducing, **Add2Package** - the insanely easy way to add lots of files to your `package.js`

### Why?

See above.

Just kidding. You know why I made this package? Have you ever tried adding [Semantic-UI](https://github.com/Semantic-Org/Semantic-UI-Meteor) to a Meteor package? It easily can be 200+ files and there is no way I'm going to add them all by hand to the `package.js` file.

Thus, **Add2Package** was born.

### How?

As it stands, the only difficult part of using this "package" is that you can't use it directly from atmosphere.
In other words, you can't do `meteor add scw:add2package`.

To get around that, the only way to use it is to clone this repo to your `PACKAGE_DIRS` and make sure you export that variable in your terminal shell. ([more info on that here](https://dweldon.silvrback.com/local-packages))

This package creates a few global functions that you can use in your packages.

**Please read the [quirks](https://github.com/sircharleswatson/add2package#quirks) at the bottom before trying to use this!**

#### Let me show you...

```javascript
Package.describe({
  name: 'my-fancy-dancy-package',
  version: '0.0.0',
  summary: "we gotta be stylish. so lets's add some styles"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');

  api.use([
    'flemay:less-autoprefixer@1.1.0',
    'semantic:ui@2.1.4'
  ]);


  setTimeout(function() {

    // You have to tell us what folder your package is in
    // and pass in a reference to the api
    packageFolder('stargazing-styles', api);

    // Then it's really simple after that

    // Add the Semantic UI Themes
    addFiles('client/lib/semantic-ui/themes/**/*.*', 'client');

    // Add the definitions and site files
    addFiles('client/lib/semantic-ui/+(definitions|site)/**/*.*', 'client');

    // Add everything else not in the semantic-ui directory
    addFiles('client/lib/semantic-ui/!(definitions|site|themes)', 'client');

  }, 100)

})
```

Here's another example without all the comments:

```javascript
Package.describe({
  name: 'my:components',
  version: '0.0.0'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2')
  api.use([
    'ecmascript',
    'react'
  ])

  setTimeout(function() {
    packageFolder('my-components', api)

    addFiles('lib/components-list.jsx')
    addFiles('lib/forms/**/!(auth-box).jsx')
    addFiles('lib/forms/**/auth-box.jsx')
    addFiles('lib/layouts/**.*')
  }, 100)
})
```

**Note:** You must use the `setTimeout()` as shown above or it won't work. You also may need to play with the delay a bit.

### What's this [Glob](https://github.com/isaacs/node-glob) stuff you mentioned?

Glob lets you:
> Match files using the patterns the shell uses, like stars and stuff.
>
> "Globs" are the patterns you type when you do stuff like ls *.js on the command line, or put build/* in a .gitignore file.


##### Here's a little on how to use them...

* `*` Matches 0 or more characters in a single path portion
* `?` Matches 1 character
* `[...]` Matches a range of characters, similar to a RegExp range.
  If the first character of the range is `!` or `^` then it matches
  any character not in the range.
* `!(pattern|pattern|pattern)` Matches anything that does not match
  any of the patterns provided.
* `?(pattern|pattern|pattern)` Matches zero or one occurrence of the
  patterns provided.
* `+(pattern|pattern|pattern)` Matches one or more occurrences of the
  patterns provided.
* `*(a|b|c)` Matches zero or more occurrences of the patterns provided
* `@(pattern|pat*|pat?erN)` Matches exactly one of the patterns
  provided
* `**` If a "globstar" is alone in a path portion, then it matches
  zero or more directories and subdirectories searching for matches.
  It does not crawl symlinked directories.

You can read more about globs [here](https://github.com/isaacs/node-glob)


# API

## Add2Package Methods

### packageFolder(name, api)

Create a reference to the folder your package resides in and the api defined by that package.

**Arguments**
* name - **String** Must be the name of the *directory* your `package.js` file resides in. _**Not the name of your package**_
* api - **Object** This needs to be the `api` object passed to `Package.onUse()` in the callback.

### addFiles(pattern, target)

This method basically matches the `api.addFiles` method but it allows you to define a glob to match multiple files at once.

**Arguments**
* pattern - **String** Pattern to be matched.
* target - **Array or String** Any target allowed by the normal `api.addFiles` method. Also allows the use of `"both"` to add files to the `client` and the `server`.

### addAssets(pattern, target)

Same as `addFiles()` but used to add assets.


# Quirks

* Must be a local package cloned to your `PACKAGE_DIRS`
* Must add your files in the callback of a `setTimeout()`
* Will not work for stand-alone packages
  * In other words, you can't add this package to a package that will be published to Atmosphere. It will only work if it's available in your local packages as mentioned above.

_____

### Shout outs

Thanks to the random stackoverflow citizen who provided the initial code to get me inspired to do this (I can't find your post anymore but I know you're out there)

<img src="http://i.imgur.com/NNzJ8G8.gif" alt="random citizen" height="150">

Also, thanks **BIG TIME** to @rfox90 who posted about globs [here](http://ahref.co.uk/blog/2015/07/31/automatic-package.js-management/) and how to use them in package.js