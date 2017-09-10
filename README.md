# @jcoreio/react-router-better-switch

[![Build Status](https://travis-ci.org/jcoreio/react-router-better-switch.svg?branch=master)](https://travis-ci.org/jcoreio/react-router-better-switch)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/react-router-better-switch/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/react-router-better-switch?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

The way you want `react-router`'s <Switch> to work.  If you give it a `component` or `render` prop, it wraps the
matched `<Route>` with it.  In addition, it picks uses the `path` as the `key` for the matched `<Route>` (if you
didn't give it your own `key`); this makes nested transitions work much better than the recommended method of
`<Switch key={location.key} location={location}>`.

## Example

```js
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Fader from 'react-fader'
import Switch from '@jcoreio/react-router-better-switch'

<Router>
  <Switch component={Fader}>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/account" component={Account} />
  </Switch>
</Router>
```

