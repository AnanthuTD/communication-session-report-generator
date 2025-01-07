"use client";
import { useEffect, useState } from "react";
import { parse } from "papaparse"; // For CSV parsing
import { saveAs } from "file-saver"; // For CSV download
import {
	deleteMember,
	getMembers,
	saveMember,
	updateCoordinator,
} from "../actions/actions";

export default function ManageMembers() {
	const [members, setMembers] = useState([]);
	const [name, setName] = useState("");
	const [role, setRole] = useState("Member"); // Default to "Member"
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [optOutAudio, setOptOutAudio] = useState(false);
	const [optOutCommunication, setOptOutCommunication] = useState(false);

	useEffect(() => {
		fetchMembers();
	}, []);

	const fetchMembers = async () => {
		setIsLoading(true);
		const data = await getMembers();
		setMembers(data);
		setIsLoading(false);
	};

	const addMember = async () => {
		const newMember = {
			Name: name,
			Role: role,
			OptOutAudio: optOutAudio,
			OptOutCommunication: optOutCommunication,
		};

		saveMember([newMember]);
		setName("");
		setRole("Member"); // Reset role to default
		setOptOutAudio(false);
		setOptOutCommunication(false);
		fetchMembers();
	};

	const handleDeleteMember = async (memberName) => {
		const confirmDelete = window.confirm(
			`Are you sure you want to delete ${memberName}?`
		);
		if (confirmDelete) {
			deleteMember(memberName);
			fetchMembers();
		}
	};

	const handleCSVUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			parse(file, {
				header: true,
				complete: (results) => {
					setMembers((prev) => [...prev, ...results.data]);
				},
			});
		}
	};

	const downloadCSV = () => {
		const csvContent = [
			["Name", "Role", "OptOutAudio", "OptOutCommunication", "Coordinator"],
			...members.map((member) => [
				member.Name,
				member.Role,
				member.OptOutAudio ? "Yes" : "No",
				member.OptOutCommunication ? "Yes" : "No",
				member.Coordinator ? "Yes" : "No", // Add Coordinator status
			]),
		]
			.map((row) => row.join(","))
			.join("\n");
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		saveAs(blob, "members.csv");
	};

	const updateCoordinatorStatus = async (memberName, isCoordinator) => {
		// Update the member's coordinator status and save it
		await updateCoordinator(memberName, isCoordinator);
		fetchMembers();
	};

	const filteredMembers = members.filter(
		(member) =>
			member.Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
			member.Role?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Manage Members</h1>

			<div className="mb-4">
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Name"
					className="border rounded p-2 mr-2 text-black"
				/>
				<select
					value={role}
					onChange={(e) => setRole(e.target.value)}
					className="border rounded p-2 mr-2 text-black"
				>
					<option value="Member">Member</option>
					<option value="Trainer">Trainer</option>
				</select>
				<div className="mb-4">
					<label className="mr-2">Opt Out of Audio</label>
					<input
						type="checkbox"
						checked={optOutAudio}
						onChange={(e) => setOptOutAudio(e.target.checked)}
					/>
					<label className="ml-4 mr-2">Opt Out of Communication</label>
					<input
						type="checkbox"
						checked={optOutCommunication}
						onChange={(e) => setOptOutCommunication(e.target.checked)}
					/>
				</div>
				<button
					onClick={addMember}
					className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
				>
					Add Member
				</button>
				<button
					onClick={downloadCSV}
					className="bg-green-500 text-white px-4 py-2 rounded ml-2"
				>
					Download CSV
				</button>
			</div>

			<div className="mb-4">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search by Name or Role"
					className="border rounded p-2 w-full text-black"
				/>
			</div>

			<table className="table-auto w-full border-collapse border border-gray-300">
				<thead>
					<tr>
						<th className="border px-4 py-2">Name</th>
						<th className="border px-4 py-2">Role</th>
						<th className="border px-4 py-2">Opt Out Audio</th>
						<th className="border px-4 py-2">Opt Out Communication</th>
						<th className="border px-4 py-2">Coordinator</th> {/* New column */}
						<th className="border px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{isLoading ? (
						<tr>
							<td colSpan="6" className="text-center p-4">
								Loading...
							</td>
						</tr>
					) : (
						filteredMembers.map((member, index) => {
							return (
								<tr key={index}>
									<td className="border px-4 py-2">{member.Name}</td>
									<td className="border px-4 py-2">{member.Role}</td>
									<td className="border px-4 py-2">
										{member.OptOutAudio ? "Yes" : "No"}
									</td>
									<td className="border px-4 py-2">
										{member.OptOutCommunication ? "Yes" : "No"}
									</td>
									<td className="border px-4 py-2">
										<input
											type="checkbox"
											checked={member.Coordinator || false}
											onChange={(e) =>
												updateCoordinatorStatus(member.Name, e.target.checked)
											}
										/>
									</td>
									<td className="border px-4 py-2 text-center">
										<button
											onClick={() => handleDeleteMember(member.Name)}
											className="text-red-500 hover:text-red-700"
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</div>
	);
}
