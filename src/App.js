import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './components/AuthContext';
import Countries from './components/Countries';
import Country from './components/Country';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	return (
		<BrowserRouter>
		<AuthProvider>
			<Header />
			<div className="container py-3">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/countries" element={<Countries />} />
					<Route path="/countries/:id" element={<Country />} />
					<Route path="/countries/create" element={<Country />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</div>
			</AuthProvider>
		</BrowserRouter>
	);
}



export default App;
