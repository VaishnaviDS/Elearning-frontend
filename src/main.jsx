import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'
export const server='https://e-learnserver.onrender.com'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserContextProvider>
  <CourseContextProvider>
  <App />
  </CourseContextProvider>
  </UserContextProvider>
  </StrictMode>,
)
