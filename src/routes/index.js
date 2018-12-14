import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ScrollToTop } from 'components'
import { userIsAuthenticated, userIsNotAuthenticated } from 'utils/auth-wrappers'
import { MainLayout } from 'containers/Layouts'
import { AuthPage, VerifyEmailPage, Dashboard, AddItemPage } from './Pages'
import UserRoutes from './User'
import ItemRoutes from './Item'

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
      <ScrollToTop>
        <Route path="/auth" component={userIsNotAuthenticated(AuthPage)} />
        <Route path="/add-item" component={userIsAuthenticated(AddItemPage)} />
        <Route path="/me" component={userIsAuthenticated(UserRoutes)} />
        <Route path="/art" component={userIsAuthenticated(ItemRoutes)} />
        <Route path="/automobile" component={userIsAuthenticated(ItemRoutes)} />
        <Route path="/real-estate" component={userIsAuthenticated(ItemRoutes)} />
        <Route path="/valuable" component={userIsAuthenticated(ItemRoutes)} />
        <Route exact path="/verify-email" component={VerifyEmailPage} />
        <Route exact path="/" component={Dashboard} />
      </ScrollToTop>
    </MainLayout>
  </BrowserRouter>
)

export default Routes
