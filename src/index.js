import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'
import invariant from 'invariant'
import matchPath from 'react-router/matchPath'

/**
 * The public API for rendering the first <Route> that matches.
 */
class Switch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired
    }).isRequired
  }

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  }

  componentWillMount() {
    invariant(
      this.context.router,
      'You should not use <Switch> outside a <Router>'
    )
  }

  componentWillReceiveProps(nextProps) {
    warning(
      !(nextProps.location && !this.props.location),
      '<Switch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<Switch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )
  }

  render() {
    const { route } = this.context.router
    const { children, render, component } = this.props
    const location = this.props.location || route.location

    let match, child
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) return

      const { path: pathProp, exact, strict, sensitive, from } = element.props
      const path = pathProp || from

      if (match == null) {
        child = element
        match = path ? matchPath(location.pathname, { path, exact, strict, sensitive }) : route.match
      }
    })

    const routeElement = match
      ? React.cloneElement(child, {
        location,
        computedMatch: match,
        key: child.key != null ? child.key : child.props.path
      })
      : null

    const props = { location, match, children: routeElement }
    if (component) return React.createElement(component, props)
    if (render) return render(props)
    return routeElement
  }
}

export default Switch
