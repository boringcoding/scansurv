import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()

    const originalRenderPage = ctx.renderPage

    // Retrieve styles from components in the page
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // useful for wrapping the whole react tree
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
          // useful for wrapping in a per-page basis
          // enhanceComponent: Component => Component,
        })

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx)

      // Output the styles in the head
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="en-GB">
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="portal-root"></div>
        </body>
      </Html>
    )
  }
}
export default MyDocument
