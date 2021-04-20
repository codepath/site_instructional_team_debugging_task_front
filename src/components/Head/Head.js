import Helmet from "react-helmet"

const Head = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>AirBnB Clone</title>
        <link rel="canonical" href="https://airbnb-clone.io" />
      </Helmet>
    </>
  )
}

export default Head
