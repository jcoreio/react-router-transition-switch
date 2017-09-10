import React from 'react'
import {Router, Route} from 'react-router-dom'
import Switch from '../src'
import sinon from 'sinon'
import {mount} from 'enzyme'
import {expect} from 'chai'
import {createMemoryHistory} from 'history'

describe('react-router-better-switch', () => {
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

