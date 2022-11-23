import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Country = () => {
	let { id } = useParams();
	const [status, setStatus] = useState(null);
	const [initialLoadError, setInitialLoadError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [country, setCountry] = useState({ title: undefined, season: undefined });
	const auth = useContext(AuthContext);
	const hs = { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${auth.getToken()}`,
	 };
	const url = `http://localhost:8000/api/countries`;

	useEffect(() => {
		if (id)
			fetch(`${url}/${id}`)
				.then((res) => res.json())
				.then(
					(res) => {
						setCountry(res);
						setIsLoaded(true);
					},
					(err) => {
						setInitialLoadError(err);
						setIsLoaded(true);
					}
				);
		else setIsLoaded(true);
	}, [id, url]);

	const createItem = (e) => {
		e.preventDefault();
		fetch(url, { method: "POST", headers: hs, body: JSON.stringify(country) }).then(
			(res) => {
				if (res.status === 200 || res.status === 201) {
					setStatus({ message: res.statusText });
				} else if (res.status === 401) {
					setStatus({ message: res.statusText });
				} else if (res.status === 422) {
					setStatus({ message: res.statusText });
				}
			},
			(err) => {
				setStatus(err);
			}
		);
	};

	const updateItem = (e) => {
		e.preventDefault();
		fetch(`${url}/${id}`, { method: "PUT", headers: hs, body: JSON.stringify(country) }).then(
			(res) => {
				if (res.status === 200) {
					setStatus({ message: res.statusText });
				} else if (res.status === 401) {
					setStatus({ message: res.statusText });
				} else if (res.status === 422) {
					setStatus({ message: res.statusText });
				}
			},
			(err) => {
				setStatus(err);
			}
		);
	};

	if (!isLoaded) {
		return <div>Loading...</div>;
	} else if (initialLoadError) {
		return <div>Error: {initialLoadError.message}</div>;
	} else {
		return (
			<div className="d-flex aligns-items-center justify-content-center">
				<div className="card w-50">
					<div className="card-header">Country {id ? `nr: ${id} edit` : `creation`} page</div>
					<div className="card-body">
						<form onSubmit={(e) => (id ? updateItem(e) : createItem(e))}>
							<div className="my-2 text-danger">{status === null ? "" : status.message}</div>
							<div className="form-group d-grid gap-2">
								<input
									className="form-control"
									onChange={(e) => setCountry({ ...country, title: e.target.value })}
									onFocus={() => country.title ?? setCountry({ ...country, title: "" })}
									value={country.title ?? "New title"}
								/>
								<textarea
									className="form-control"
									onChange={(e) => setCountry({ ...country, season: e.target.value })}
									onFocus={() => country.season ?? setCountry({ ...country, season: "" })}
									value={country.season ?? "New season"}
								/>
								<input className="btn btn-primary" type="submit" value="Submit" />
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
};

export default Country;