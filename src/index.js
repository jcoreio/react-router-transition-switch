import * as React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'
import {matchPath, withRouter} from 'react-router'

class TransitionSwitch extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    createKey: PropTypes.func,
  }

  static defaultProps = {
    createKey(child, match) {
      return child.key != null ? child.key : match.url
    }
  }

  componentWillReceiveProps(nextProps) {
    warning(
      !(nextProps.location && !this.props.location),
      '<TransitionSwitch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!nextProps.location && this.props.location),
      '<TransitionSwitch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )
  }

  render() {
    const { children, render, component, createKey, location, match: routeMatch } = this.props

    let match, child
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) return

      const { path: pathProp, exact, strict, sensitive, from } = element.props
      const path = pathProp || from

      if (match == null) {
        child = element
        match = path ? matchPath(location.pathname, { path, exact, strict, sensitive }) : routeMatch
      }
    })

    const routeElement = match
      ? React.cloneElement(child, {
        location,
        computedMatch: match,
        key: createKey(child, match)
      })
      : null

    const props = { location, match, children: routeElement }
    if (component) return React.createElement(component, props)
    if (render) return render(props)
    return routeElement
  }
}

export default withRouter(TransitionSwitch)
