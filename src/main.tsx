import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './admin/error/index.tsx'
import './index.css'
import { menuItems } from './constants.tsx'
import { BlankPage } from './admin/blankPage/index.tsx'
import { AuthProvider } from './components/authentication/authProvider.tsx'
import { ProtectedRoutes } from './components/authentication/protectedRoutes.tsx'
import { Web } from './web'
import { Movies } from './web'
import { Player } from './web/player/index.tsx'

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
				<Route path="/" element={<Web />} errorElement={<ErrorPage />}>
					<Route index element={<Movies />} />
					<Route path=':type/videos' element={<Movies />} />
					<Route path='play/:id' element={<Player />} />
				</Route>
				<Route element={<ProtectedRoutes />} >
					<Route path="dashboard" element={<App />} errorElement={<ErrorPage />}>
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