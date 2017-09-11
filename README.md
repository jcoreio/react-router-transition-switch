# react-router-transition-switch

[![Build Status](https://travis-ci.org/jcoreio/react-router-transition-switch.svg?branch=master)](https://travis-ci.org/jcoreio/react-router-transition-switch)
[![Coverage Status](https://coveralls.io/repos/github/jcoreio/react-router-transition-switch/badge.svg?branch=master)](https://coveralls.io/github/jcoreio/react-router-transition-switch?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a variant of `<Switch>` that's easier to use with transition components like `react-fader` or
`react-view-slider` than [the recommended approach](https://github.com/ReactTraining/react-router/issues/4351#issuecomment-281196606).
Unlike `react-router-transition`, it's not limited to using `react-motion`; you can give it any transition component
you want.

## Example

```js
import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Fader from 'react-fader'
import Switch from 'react-router-transition-switch'

...

<Router>
  <Switch component={Fader}>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/account" component={Account} />
    <Route path="/users/:userId" component={User} />
  </Switch>
</Router>
```

For the location `/users/andy/profile`, the `<Switch>` will render:
```js
<Fader>
  <Route key="/users/andy/profile" path="/users/:userId" component={User} />
</Fader>
```

Notice that it makes `match.url` the `key` of the matched `<Route>`, so that `<Fader>` (or whatever transition component
you use) knows to perform a transition.  If you provide custom `key`s on the `<Route>`s you pass to `<Switch>`, it won't
overwrite them.

As with `<Route>`, you may pass a `render` function instead of a `component`:

```js
<Router>
  <Switch render={({children}) => (
    <ReactCSSTransitionGroup
      transitionName="example"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}
    >
      {children}
    </ReactCSSTransitionGroup>
  )}>
    ...
  </Switch>
</Router>
```
