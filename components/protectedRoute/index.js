import { useRouter } from 'next/router'
import { useContext } from 'react'
import AuthContext from '../../contexts/authContext'
const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const Router = useRouter()

      const { user, isLoading } = useContext(AuthContext)
      console.log(`User ${user},Loading ${isLoading}`, user)
      // If there is no access token we redirect to "/" page.
      if (isLoading) {
        return <h1>Loading..</h1>
      }
      if (!user) {
        Router.replace('/login')
        return null
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />
    }

    // If we are on server, return null
    return null
  }
}

export default withAuth
