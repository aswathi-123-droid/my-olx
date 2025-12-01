import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import router from './router.jsx'
import { store } from './app/store.js'
import { onAuthStateChanged } from 'firebase/auth'
import { setUser } from './features/authSlice.js'
import { auth } from './firebaseConfig.js'


onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }));
  } else {
    store.dispatch(setUser(null));
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}>
        <App />
       </RouterProvider>
    </Provider>
  </StrictMode>,
)
