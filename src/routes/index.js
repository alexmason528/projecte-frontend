import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ScrollToTop } from 'components'
import { userIsAuthenticated, userIsNotAuthenticated } from 'utils/auth-wrappers'
import { MainLayout } from 'containers/Layouts'
import { AuthPage, VerifyEmailPage, PasswordResetPage, Dashboard, AddItemPage, PublicUserPage, Page404 } from './Pages'
import UserRoutes from './User'
import ItemRoutes from './Item'

const Routes = () => (
  <BrowserRouter>
    <MainLayout>
      <ScrollToTop>
        <Route path="/auth" component={userIsNotAuthenticated(AuthPage)} />
        <Route path="/add-item" component={userIsAuthenticated(AddItemPage)} />
        <Route path="/me" component={userIsAuthenticated(UserRoutes)} />
        <Route path="/item/:type" component={ItemRoutes} />
        <Route path="/user/:id" component={PublicUserPage} />
        <Route exact path="/verify-email" component={VerifyEmailPage} />
        <Route exact path="/password-reset" component={PasswordResetPage} />
        <Route path="/error-404" component={Page404} />
        <Route exact path="/" component={Dashboard} />
      </ScrollToTop>
    </MainLayout>
  </BrowserRouter>
)

export default Routes
