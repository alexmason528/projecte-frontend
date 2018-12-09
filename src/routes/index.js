import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import ScrollToTop from 'components/ScrollToTop'
import { userIsAuthenticated, userIsNotAuthenticated } from 'utils/auth-wrappers'
import MainLayout from 'containers/MainLayout'
import UserDetailLayout from 'containers/UserDetailLayout'
import Auth from 'containers/Auth'
import Dashboard from 'containers/Dashboard'
import Profile from 'containers/Profile'
import MyListings from 'containers/MyListings'
import WatchList from 'containers/WatchList'
import Notifications from 'containers/Notifications'
import VerifyEmail from 'containers/VerifyEmail'

const UserRoutes = () => (
  <UserDetailLayout>
    <Switch>
      <Redirect exact from="/me" to="/me/profile" />
      <Route path="/me/profile" component={Profile} />
      <Route path="/me/listings" component={MyListings} />
      <Route path="/me/watchlist" component={WatchList} />
      <Route path="/me/notifications" component={Notifications} />
    </Switch>
  </UserDetailLayout>
)

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
      <ScrollToTop>
        <Route path="/auth" component={userIsNotAuthenticated(Auth)} />
        <Route path="/me" component={userIsAuthenticated(UserRoutes)} />
        <Route path="/verify-email" component={VerifyEmail} />
        <Route exact path="/" component={Dashboard} />
      </ScrollToTop>
    </MainLayout>
  </BrowserRouter>
)

export default Routes
