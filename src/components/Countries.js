import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Countries = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [countries, setCountries] = useState([]);
	const auth = useContext(AuthContext);


    useEffect(() => {
		fetch("https://maggots.herokuapp.com/api/countries")
			.then((res) => res.json())
			.then(
				(res) => {
					setCountries(res);
					setIsLoaded(true);
				},
				(err) => {
					setError(err);
					setIsLoaded(true);
				}
			);
	}, []);

	const deleteCountry = (id, e) => {
		fetch("https://maggots.herokuapp.com/api/countries/" + id, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${auth.getToken()}`,

			},
		}).then(
			(res) => {
				if (res.status === 200) {
					const remaining = countries.filter((p) => id !== p.id);
					setCountries(remaining);
				} else{
					setError({ message: res.statusText });
				}
			},
			(err) => {
				console.log(err);
				setError(err);
				setIsLoaded(true);
			}
		);
	};


	if (!isLoaded) {
		return <div>Loading...</div>;
	} else if (error) {
		return <div>Error: {error.message}</div>;
	} else {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Season</th>
						<th>
							<span className="float-end mx-1">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{countries.map((countries) => (
						<tr key={countries.id}>
							<td className="col-lg-3">{countries.title}</td>
							<td className="col-lg-7 overflow-hidden" style={{ minWidth: "200px", maxHeight: "5px" }}>
								{countries.season}
							</td>
							<td className="col-lg-2" style={{ minWidth: "200px" }}>
								<button
									onClick={(e) => navigate(`/countries/${countries.id}`)}
									className="float-end btn btn-warning mx-1"
								>
									Edit
								</button>
								<button
									onClick={(e) => deleteCountry(countries.id, e)}
									className="float-end btn btn-danger mx-1"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
					<tr>
						<td colSpan="3"></td>
					</tr>
					<tr>
						<td colSpan="3" className="border border-3 border-start-0 border-bottom-0 border-end-0">
							<button
								onClick={(e) => navigate(`/countries/create`)}
								className="btn btn btn-success float-end mx-1"
							>
								Add new country
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		);
	}
}


export default Countries;
