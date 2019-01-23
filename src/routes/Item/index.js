import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { RouteWithProps } from 'components'
import { Page404 } from 'routes/Pages'
import { userIsAuthenticated } from 'utils/auth-wrappers'
import ListPage from './List'
import AddPage from './Add'
import DetailPage from './Detail'
import EditPage from './Edit'

const Routes = ({ match }) => (
  <Switch>
    <RouteWithProps exact path={`${match.url}`} component={ListPage} {...match.params} />
    <RouteWithProps exact path={`${match.url}/new`} component={userIsAuthenticated(AddPage)} {...match.params} />
    <RouteWithProps exact path={`${match.url}/:slug`} component={DetailPage} {...match.params} />
    <RouteWithProps exact path={`${match.url}/:slug/edit`} component={EditPage} {...match.params} />
    <Route path="*" component={Page404} />
  </Switch>
)

export default withRouter(Routes)
