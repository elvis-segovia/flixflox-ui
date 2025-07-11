import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ErrorPage } from './pages/admin/error/index.tsx'
import './index.css'
import { menuItems } from './constants.tsx'
import { BlankPage } from './pages/admin/blankPage/index.tsx'
import { AuthProvider } from './components/authentication/authProvider.tsx'
import { ProtectedRoutes } from './components/authentication/protectedRoutes.tsx'
import { Movies, Player, Users, Web } from './pages/web'
import LoginForm from './pages/admin/login/index.tsx'

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
				<Route path='/' element={<ProtectedRoutes />} >
					<Route index element={<Users />} />
					<Route path="web" element={<Web />} errorElement={<ErrorPage />}>
						<Route path="catalog" element={<Movies />} />
						<Route path=':type/videos' element={<Movies />} />
						<Route path='play/:id/season/:season/episode/:episode' element={<Player />} />
						<Route path='play/:id' element={<Player />} />
					</Route>
					<Route path="dashboard" element={<App />} errorElement={<ErrorPage />}>
						{menuItems.map((item) => {
							return getChildRoutes(item)
						})}
					</Route>
				</Route>
				<Route path='/login' element={<LoginForm />} />
				<Route path='/logout' element={<ErrorPage />} />
			</Routes>
		</AuthProvider>
	</Router>
)

ReactDOM.createRoot(document.getElementById('root')!).render(
	router
)