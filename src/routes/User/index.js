import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { UserDetailLayout } from 'containers/Layouts'
import Profile from './Profile'
import MyListings from './MyListings'
import WatchList from './WatchList'

const Routes = () => (
  <UserDetailLayout>
    <Switch>
      <Redirect exact from="/me" to="/me/profile" />
      <Route path="/me/profile" component={Profile} />
      <Route path="/me/listings" component={MyListings} />
      <Route path="/me/watchlist" component={WatchList} />
    </Switch>
  </UserDetailLayout>
)

export default Routes
