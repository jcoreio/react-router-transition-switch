// @flow

import * as React from 'react'
import {mount} from 'enzyme'
import {configure as configureEnzyme} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configureEnzyme({ adapter: new Adapter() })
import {expect} from 'chai'
import {createMemoryHistory} from 'history'
import {Router, Route} from 'react-router-dom'
import Switch from '../src'
import sinon from 'sinon'

describe('react-router-transition-switch', () => {
  it('render prop works', () => {
    const render = sinon.spy(({children}) => children)

    const Home = () => <div>Home</div>
    const About = () => <div>About</div>
    const Account = () => <div>Account</div>

    const history = createMemoryHistory({
      initialEntries: ['/account/profile'],
      initialIndex: 0,
    })

    const comp = mount(
      <Router history={history}>
        <Switch render={render}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/account" component={Account} />
        </Switch>
      </Router>
    )

    expect(comp.text()).to.equal('Account')

    expect(render.args[0][0].children.key).to.equal('/account')
    expect(render.args[0][0].children.type).to.equal(Route)
    expect(render.args[0][0].match.url).to.equal('/account')
    expect(render.args[0][0].location.pathname).to.equal('/account/profile')
  })
  it("doesn't overwrite existing route keys", () => {
    const render = sinon.spy(({children}) => children)

    const Home = () => <div>Home</div>
    const About = () => <div>About</div>
    const Account = () => <div>Account</div>

    const history = createMemoryHistory({
      initialEntries: ['/account/profile'],
      initialIndex: 0,
    })

    const comp = mount(
      <Router history={history}>
        <Switch render={render}>
          <Route key={0} exact path="/" component={Home} />
          <Route key={1} path="/about" component={About} />
          <Route key={2} path="/account" component={Account} />
        </Switch>
      </Router>
    )

    expect(comp.text()).to.equal('Account')
    expect(render.args[0][0].children.key).to.equal('2')
  })
  it('uses provided createKey function if given', () => {
    const render = sinon.spy(({children}) => children)

    const Home = () => <div>Home</div>
    const About = () => <div>About</div>
    const Account = () => <div>Account</div>

    const history = createMemoryHistory({
      initialEntries: ['/account/profile'],
      initialIndex: 0,
    })

    const comp = mount(
      <Router history={history}>
        <Switch render={render} createKey={child => child.key * 2}>
          <Route key={0} exact path="/" component={Home} />
          <Route key={1} path="/about" component={About} />
          <Route key={2} path="/account" component={Account} />
        </Switch>
      </Router>
    )

    expect(comp.text()).to.equal('Account')
    expect(render.args[0][0].children.key).to.equal('4')
  })
  it('component prop works', () => {
    const render = sinon.spy(({children}) => children)

    const Home = () => <div>Home</div>
    const About = () => <div>About</div>
    const Account = () => <div>Account</div>

    const history = createMemoryHistory({
      initialEntries: ['/account/profile'],
      initialIndex: 0,
    })

    const comp = mount(
      <Router history={history}>
        <Switch component={render}>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/account" component={Account} />
        </Switch>
      </Router>
    )

    expect(comp.text()).to.equal('Account')
    expect(render.args[0][0].children.key).to.equal('/account')
    expect(render.args[0][0].children.type).to.equal(Route)
    expect(render.args[0][0].match.url).to.equal('/account')
    expect(render.args[0][0].location.pathname).to.equal('/account/profile')
  })
})
