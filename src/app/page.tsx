"use client";
import { useState, useEffect } from "react";

const names = [
	"ANEENA THASNEEM C A",
	"Abhilash B R",
	"Ahamed irfan",
	"Amal Ramakrishnan",
	"Ananthu T D",
	"Aswanth P",
	"Aswin K",
	"Ayshath mezna A",
	"Diyana sherin km",
	"Farhana sherin oc",
	"Husna K",
	"Jayasree",
	"Joel Thomas",
	"Krishna Priya K",
	"Mariyammath Thabsira G",
	"Masroora k",
	"Muhammed sinan",
	"Nasrin Gafoor KP",
	"Preethi Sreejit",
	"Rejina K K",
	"Rento Augustine",
	"SAHLA M",
	"Sarath C R",
	"Shanid V V",
	"Sharmi Rajendran",
	"Subhana Thasni TP",
	"Thanveer",
];

const defaultCoordinators = ["Muhammed Sinan", "Aswin K"];

const fetchCoordinators = async () => {
	// Replace with actual API call
	return ["Muhammed Sinan", "Aswin K"];
};

const formatTime = (time) => {
	const [hours, minutes] = time.split(":").map(Number);
	const ampm = hours >= 12 ? "PM" : "AM";
	const hour = hours % 12 || 12;
	return `${hour}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
};

const parseTime = (time) => {
	const [timePart, ampm] = time.split(" ");
	let [hours, minutes] = timePart.split(":").map(Number);
	if (ampm === "PM" && hours < 12) hours += 12;
	if (ampm === "AM" && hours === 12) hours = 0;
	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}`;
};

export default function SelectionPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedNames, setSelectedNames] = useState([]);
	const [reportWriter, setReportWriter] = useState("Ananthu T D");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // defaults to current date
	const [objective, setObjective] = useState("Orientation");
	const [activity, setActivity] = useState("Orientation");
	const [tldvLink, setTldvLink] = useState("");
	const [customText, setCustomText] = useState("");
	const [coordinators, setCoordinators] = useState(defaultCoordinators);
	const [startTime, setStartTime] = useState("14:00"); // default to 2:00 PM
	const [endTime, setEndTime] = useState("15:00"); // default to 3:00 PM
	const [popupMessage, setPopupMessage] = useState("");

	useEffect(() => {
		const loadCoordinators = async () => {
			try {
				const fetchedCoordinators = await fetchCoordinators();
				setCoordinators(fetchedCoordinators);
			} catch (error) {
				console.error("Failed to fetch coordinators", error);
			}
		};

		loadCoordinators();
	}, []);

	const filteredNames = names.filter((name) =>
		name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSelect = (name) => {
		setSelectedNames((prevSelected) =>
			prevSelected.includes(name) ? prevSelected : [...prevSelected, name]
		);
	};

	const handleUnselect = (name) => {
		setSelectedNames((prevSelected) =>
			prevSelected.filter((item) => item !== name)
		);
	};

	const handleClearSelection = () => {
		setSelectedNames([]);
	};

	const showPopup = (message) => {
		setPopupMessage(message);
		setTimeout(() => setPopupMessage(""), 2000); // Hide message after 2 seconds
	};

	const copyToClipboard = (text) => {
		navigator.clipboard
			.writeText(text)
			.then(() => showPopup("Copied to clipboard"))
			.catch((error) =>
				console.error("Failed to copy text to clipboard", error)
			);
	};

	const generatePlainTextReport = () => {
		return `
*Communication Session Report*

➖➖➖➖➖➖➖➖➖➖➖➖➖

🖥 BCR 64

📆 Date: ${date}

👩‍💻 Trainer: Divya Bharathi

👨🏻‍💼 Coordinator: ${coordinators.join(", ")}

📝 Report by: ${reportWriter}

📑 Activity: ${activity}

Session Timing:
Start: ${formatTime(startTime)}
End: ${formatTime(endTime)}

Objective: ${objective}

${customText}

Attendees 🟢🟢🟢
${selectedNames.map((name) => `✅ ${name}`).join("\n")}

Absentees 🔴🔴🔴
${filteredNames
	.filter((name) => !selectedNames.includes(name))
	.map((name) => `🔴 ${name}`)
	.join("\n")}

🔗 tldv link: ${tldvLink}
	`;
	};

	const generateReport = () => {
		return (
			<div className="border rounded p-4 min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
				<p className="font-bold text-xl">*Communication Session Report*</p>
				<p>➖➖➖➖➖➖➖➖➖➖➖➖➖</p>

				<br />

				<div>
					<p>
						🖥 <span className="font-bold">BCR 64</span>
					</p>
					<p>
						📆{" "}
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
						/>
					</p>
					<p>
						👩‍💻 Trainer: <span className="font-bold">Divya Bharathi</span>
					</p>
					<p>👨🏻‍💼 Coordinator: {coordinators.join(", ")}</p>
					<p>
						📝 Report by:{" "}
						<select
							value={reportWriter}
							onChange={(e) => setReportWriter(e.target.value)}
							className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
						>
							{names.map((name) => (
								<option key={name} value={name}>
									{name}
								</option>
							))}
						</select>
					</p>
					<p>
						📑 Activity:{" "}
						<input
							type="text"
							value={activity}
							onChange={(e) => setActivity(e.target.value)}
							className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
						/>
					</p>
					<p>Session Timing:</p>
					<p>
						Start:{" "}
						<input
							type="text"
							value={formatTime(startTime)}
							onChange={(e) => setStartTime(parseTime(e.target.value))}
							className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
						/>
					</p>
					<p>
						End:{" "}
						<input
							type="text"
							value={formatTime(endTime)}
							onChange={(e) => setEndTime(parseTime(e.target.value))}
							className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
						/>
					</p>
				</div>

				<br />
				<br />

				<p>
					Objective:{" "}
					<input
						type="text"
						value={objective}
						onChange={(e) => setObjective(e.target.value)}
						className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
					/>
				</p>

				<textarea
					value={customText}
					onChange={(e) => setCustomText(e.target.value)}
					className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
					rows="4"
				/>

				<br />
				<br />

				<p>Attendees 🟢🟢🟢</p>
				<br />
				{selectedNames.map((name) => (
					<p key={name}>✅ {name}</p>
				))}

				<br />
				<br />

				<p>Absentees 🔴🔴🔴</p>
				<br />
				{filteredNames
					.filter((name) => !selectedNames.includes(name))
					.map((name) => (
						<p key={name}>🔴 {name}</p>
					))}

				<br />

				<p>
					🔗 tldv link :{" "}
					<input
						type="text"
						value={tldvLink}
						onChange={(e) => setTldvLink(e.target.value)}
						className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
					/>
				</p>
			</div>
		);
	};

	return (
		<div className="container mx-auto p-4 dark:bg-gray-900 dark:text-white">
			<h1 className="text-2xl font-bold mb-6">Selection Page</h1>
			<input
				type="text"
				placeholder="Search names..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="w-full p-2 mb-4 border rounded dark:bg-gray-800 dark:border-gray-700"
			/>
			<div className="flex gap-6">
				<div>
					<h3 className="text-lg font-semibold mb-2">Unselected Names</h3>
					<div className="border rounded p-4 min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
						{filteredNames
							.filter((name) => !selectedNames.includes(name))
							.map((name, index) => (
								<div
									key={index}
									onClick={() => handleSelect(name)}
									className="cursor-pointer p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
								>
									{name}
								</div>
							))}
					</div>
					<button
						onClick={() =>
							copyToClipboard(
								filteredNames
									.filter((name) => !selectedNames.includes(name))
									.join("\n")
							)
						}
						aria-label="Copy selected names to clipboard"
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
					>
						Copy Unselected Names
					</button>
				</div>
				<div>
					<h3 className="text-lg font-semibold mb-2">Selected Names</h3>
					<div className="border rounded p-4 min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
						{selectedNames.map((name, index) => (
							<div
								key={index}
								onClick={() => handleUnselect(name)}
								className="cursor-pointer p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
							>
								{name}
							</div>
						))}
					</div>
					<button
						onClick={() => copyToClipboard(selectedNames.join("\n"))}
						aria-label="Copy selected names to clipboard"
						className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
					>
						Copy Selected Names
					</button>
					<button
						onClick={handleClearSelection}
						aria-label="Clear all selections"
						className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
					>
						Clear Selection
					</button>
				</div>
			</div>

			<div className="mt-10">
				<button
					onClick={() => copyToClipboard(generatePlainTextReport())}
					aria-label="Copy entire report to clipboard"
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
				>
					Copy Full Report
				</button>
			</div>

			<div className="mt-10">
				<h3 className="text-lg font-semibold mb-4">Report Preview</h3>
				{generateReport()}
			</div>

			{/* Popup Message */}
			{popupMessage && (
				<div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
					{popupMessage}
				</div>
			)}
		</div>
	);
}
