import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Users = () => {
    var [users, setUsers] = useState([]);

	const deleteUser = async (userId) => {
        try {
          const response = await axios.delete(`/api/users/${userId}`);
          console.log(response.data.message); // Log the message from the server
          // Handle any additional logic here, such as updating UI after deletion
        } catch (error) {
          console.error("Error deleting user:", error);
          // Handle errors, such as displaying an error message to the user
        }
      };
      
      // Example usage:
      // Call this function with the ID of the user you want to delete
      deleteUser('user123');

	useEffect(() => {
		axios
			.get("http://localhost:4000/getUserById")
			.then((response) => {
				console.log("response: ", response.data);
				setUsers(response.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const blockValues = (id) => {
		console.log("Restrict clicked" + id);
		axios.put("http://localhost:9453/blockuser/" + id).then((response) => {
			console.log("response:", response.data);
			if (response.data === "Blocked") {
				alert("Blocked");
				window.location.reload(false);
			}
		});
	};

	return (
		<div>
			<Navbar />
			<div style={{ padding: 60 }}>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell style={{ color: "brown" }}>Username</TableCell>
								<TableCell style={{ color: "brown" }}>Delete</TableCell>
								<TableCell style={{ color: "brown" }}>Restrict</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((value, index) => {
								return (
									<TableRow>
										<TableCell>{value.username}</TableCell>

										<TableCell key={index}>
											<Button
												name={value._id}
												onClick={() => handleDelete(value.username, value._id)}
											>
												<DeleteIcon />
											</Button>
										</TableCell>
										<TableCell key={index}>
											<Button
												variant='outlined'
												color='error'
												onClick={() => blockValues(value._id)}
											>
												RESTRICT
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
  );
}

export default Users;
