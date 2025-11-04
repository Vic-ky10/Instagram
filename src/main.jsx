import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewStory from './Feeds/ViewStory.jsx'
import Profile from './SideBar/Profile.jsx'
import Followers from './Followers.jsx'
import {FollowersProvider} from './FollowersProvider.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/story/:id/:next', element: <ViewStory /> },
  { path: '/profile', element: <Profile /> },
  { path: '/followers', element: <Followers /> }
])

createRoot(document.getElementById('root')).render(
  <FollowersProvider>
    <RouterProvider router={router} />
  </FollowersProvider>
)
