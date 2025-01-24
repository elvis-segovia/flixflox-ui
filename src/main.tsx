import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/error'
import './index.css'
import { menuItems } from './constants.tsx'
import { BlankPage } from './pages/blankPage'
import { AuthProvider } from './components/authentication/authProvider.tsx'
import { ProtectedRoutes } from './components/authentication/protectedRoutes.tsx'

const getChildRoutes = (item: any) => {
	if (item.children) {
		return (<Route key={item.key}>
			<Route path={item.to} element={item.component ? item.component : <BlankPage />} />
			{item.children.map((child: any) => (
				getChildRoutes(child)
			))}
		</Route>)
	}
	return <Route key={item.key} path={item.to} element={item.component ? item.component : <BlankPage />} />
}

const router = (
	<Router>
		<AuthProvider>
			<Routes>
				<Route element={<ProtectedRoutes />} >
					<Route path="/" element={<App />} errorElement={<ErrorPage />}>
						{menuItems.map((item) => {
							return getChildRoutes(item)
						})}
					</Route>
				</Route>
				<Route path='/logout' element={<ErrorPage />} />
			</Routes>
		</AuthProvider>
	</Router>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
	router
)