import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IntlProvider } from 'react-intl'
import { selectLocale } from 'store/modules/auth'

export class LanguageProvider extends Component {
  static propTypes = {
    locale: PropTypes.string,
    messages: PropTypes.object,
    children: PropTypes.element.isRequired,
  }

  render() {
    const { locale, messages, children } = this.props
    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    )
  }
}

const selectors = createStructuredSelector({
  locale: selectLocale,
})

export default connect(selectors)(LanguageProvider)
