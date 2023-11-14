import * as React from 'react'
import {
  Route,
  RouteProps,
  SwitchProps as BaseSwitchProps,
  match,
} from 'react-router'
import { Location } from 'history'

export type RenderProps = {
  location: Location
  match: match
  children: React.ReactElement | null
}

export type SwitchProps = BaseSwitchProps & {
  createKey?: (
    route: React.ReactElement<RouteProps, typeof Route>,
    match: match
  ) => string
  component?: React.ComponentType<RenderProps>
  render?: (props: RenderProps) => React.ReactElement | null
}

declare const Switch: React.ComponentType<SwitchProps>
export default Switch
