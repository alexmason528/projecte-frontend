import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { RouteWithProps } from 'components'
import { Page404 } from 'routes/Pages'
import ListPage from './List'
import AddPage from './Add'
import DetailPage from './Detail'

const Routes = ({ match }) => (
  <Switch>
    <RouteWithProps exact path={`${match.url}`} component={ListPage} {...match.params} />
    <RouteWithProps exact path={`${match.url}/new`} component={AddPage} {...match.params} />
    <RouteWithProps exact path={`${match.url}/:id`} component={DetailPage} {...match.params} />
    <Route path="*" component={Page404} />
  </Switch>
)

export default withRouter(Routes)
