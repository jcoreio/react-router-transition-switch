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

  componentDidUpdate(prevProps) {
    warning(
      !(prevProps.overrideLocation && !this.props.overrideLocation),
      '<TransitionSwitch> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    )

    warning(
      !(!prevProps.overrideLocation && this.props.overrideLocation),
      '<TransitionSwitch> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    )
  }

  render() {
    const { children, render, component, createKey, match: routeMatch } = this.props
    const location = this.props.overrideLocation || this.props.location

    let match, element
    React.Children.forEach(children, child => {
      if (match == null && React.isValidElement(child)) {
        const { path: pathProp, exact, strict, sensitive, from } = child.props
        const path = pathProp || from

        element = child
        match = path ? matchPath(location.pathname, { path, exact, strict, sensitive }) : routeMatch
      }
    })

    const routeElement = match
      ? React.cloneElement(element, {
        location,
        computedMatch: match,
        key: createKey(element, match)
      })
      : null

    const props = { location, match, children: routeElement }
    if (component) return React.createElement(component, props)
    if (render) return render(props)
    return routeElement
  }
}

const TransitionSwitch2 = withRouter(TransitionSwitch)

const TransitionSwitch3 = ({location, ...props}) => (
  <TransitionSwitch2 overrideLocation={location} {...props} />
)

export default TransitionSwitch3
