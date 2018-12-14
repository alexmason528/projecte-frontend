import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Page404 } from 'routes/Pages'
import ListPage from './List'
import AddPage from './Add'
import DetailPage from './Detail'

const Routes = ({ match }) => (
  <Switch>
    <Route exact path={`${match.url}`} component={ListPage} />
    <Route exact path={`${match.url}/new`} component={AddPage} />
    <Route exact path={`${match.url}/:id`} component={DetailPage} />
    <Route path="*" component={Page404} />
  </Switch>
)

export default withRouter(Routes)
