# react-router-transition-switch

[![Build Status](https://travis-ci.org/jcoreio/react-router-transition-switch.svg?branch=master)](https://travis-ci.org/jcoreio/react-router-transition-switch)
[![Coverage Status](https://codecov.io/gh/jcoreio/react-router-transition-switch/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/react-router-transition-switch)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a variant of `<Switch>` that's much easier to use with transition components and solves some problems.

The current recommended transition approach for `react-router` is
```js
import {Route, Switch} from 'react-router-dom'
import Fader from 'react-fader'

<Route render={({ location }) => (
  <Fader>
    <Switch key={location.key} location={location}>
      <Route path="/red" component={Red}/>
      <Route path="/green" component={Green} />
      <Route path="/blue" component={Blue} />
    </Switch>
  </Fader>
)}/>
```

This has several problems:
1. All `<Switch>`es transition on every `location` change, even if:
   a. only the last part of the URL changed and you only want the innermost nested `<Switch>` to transition
   b. you have the same component for two different paths and don't want to transition that component
   c. you don't want to transition in some case for any other reason
2. You have to pass a `location` to the `<Switch>` for it to work

`react-router-transition-switch` simplifies the above example to
```js
import {Route} from 'react-router-dom'
import Switch from 'react-router-transition-switch'
import Fader from 'react-fader'

<Switch component={Fader}>
  <Route path="/red" component={Red}/>
  <Route path="/green" component={Green} />
  <Route path="/blue" component={Blue} />
</Switch>
```

## Differences from `react-router`'s `<Switch>`:
1. You can pass it a `component` or `render` prop.  It will use them to wrap the matched `<Route>` if given
2. By default it clones the matched `<Route>` with `key={match.url}` unless you gave the `<Route>` a key yourself.
   This way the `Fader` will only perform a transition when
   a. if you provide `key`s yourself, the matched `<Route>` has a different `key` than the last
   b. otherwise, the *matched portion* of the `location` is different from the last`
3. You can pass it a `createKey` prop, which is a function taking the `(route, match)`
   and returning the key to use.

## `component` example

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

## `render` example

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

## Preventing transitions in certain cases

If you want to prevent transitions between certain `<Route>`s, give them the same `key`.  This will not cause problems
because `<Switch>` only renders one of the child `<Route>`s it was passed, so there will never be duplicate keys during
React's reconciliation step.

```js
<Router>
  <Switch component={Fader}>
    <Route key="home" exact path="/" component={Home} />
    <Route key="orders" exact path="/orders" component={Orders} />
    <Route key="orders" path="/orders/:orderId" component={Orders} />
    <Route key="about" path="/about" component={About} />
  </Switch>
</Router>
```

## Forcing transitions in certain cases

If you have to pass in an array of `<Route>`s, they will already have
keys, hence changes between subroutes will not transition since
`react-router-transition-switch` does not override existing keys with the
`match.url`.

In this case, you can use the `createKey` prop to force a unique key for
every `match`:

```js
<Router>
  <Switch component={Fader} createKey={(child, match) => match.url}>
    {routes}
  </Switch>
</Router>
```

