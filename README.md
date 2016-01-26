# Deconst Control

**Extremely WIP** prototypes for deconst sites and instances

## Installation

In your site and instance repos:

```
$ npm install --save deconst-control
```

## Usage

This module exports constructors for **sites** and **instances**. Let’s clarify that terminology:

A **site** is a discrete collection of templates and assets, along with configuration data that maps content, rewrites, and template routes to specific URL requests. Each site typically has its own domain name.

An **instance** is just a collection of sites.

deconst sites themselves are just NPM packages that export an instance of `DeconstControl.Site` (from this package). To properly export your site for use by deconst, simply include something like this as your package's `main` entrypoint (usually `index.js`):

```javascript
// index.js

// Naturally, you’ll want to have installed and saved `deconst-control` as a
// dependency of your site module.
var DeconstControl = require('deconst-control');

// Create a new instance of DeconstControl.Site and configure it to load files
// from the current directory
var site = new DeconstControl.Site({
  baseDir: __dirname
});

// Export the site for use by a deconst instance
module.exports = site;
```

To create a deconst instance, simply create an NPM package that includes all of your desired sites as dependencies, then export an instance of `DeconstControl.Instance`, passing it an array of site objects:

```javascript
var DeconstControl = require('deconst-control');

// Maybe you store this is a JSON file or something, I don’t really care.
var siteModules = [
  'site-1.example.com',
  'site-2.example.com'
]

var sites = [];

siteModules.forEach(function (site) {
  // Each site is exporting an instance of `DeconstControl.Site`, so `sites`
  // ends up being an array of those objects.
  sites.push(require(site))
});

module.exports = new DeconstControl.Instance({
  sites: sites
});
```
