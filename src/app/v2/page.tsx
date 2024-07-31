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
	const [informedNames, setInformedNames] = useState([]);
	const [uninformedNames, setUninformedNames] = useState(names);

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

	useEffect(() => {
		setUninformedNames(
			names.filter((name) => 
				!selectedNames.includes(name) && 
				!informedNames.includes(name) &&
				name.toLowerCase().includes(searchTerm.toLowerCase())
			)
		);
	}, [selectedNames, informedNames, searchTerm]);

	const moveToInformed = (name) => {
		setInformedNames((prevInformed) => [...prevInformed, name]);
		setUninformedNames((prevUninformed) => 
			prevUninformed.filter((item) => item !== name)
		);
	};

	const moveToUninformed = (name) => {
		setInformedNames((prevInformed) => 
			prevInformed.filter((item) => item !== name)
		);
		setUninformedNames((prevUninformed) => [...prevUninformed, name]);
	};

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
${uninformedNames
	.filter((name) => !selectedNames.includes(name))
	.map((name) => `🔴 ${name}`)
	.join("\n")}

Informed:
${informedNames.map((name) => `✅ ${name}`).join("\n")}

Uninformed:
${uninformedNames.map((name) => `🔴 ${name}`).join("\n")}

🔗 tldv link: ${tldvLink}
	`;
	};

	const generateReport = () => {
		return (
			<div className="border rounded p-4 min-h-[200px] bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg">
				<p className="font-bold text-xl">*Communication Session Report*</p>
				<p>➖➖➖➖➖➖➖➖➖➖➖➖➖</p>

				<br />

				<div className="space-y-2">
					<p>
						🖥 <span className="font-bold">BCR 64</span>
					</p>
					<p>
						📆{" "}
						<input
							type="date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							className="border rounded p-1 w-full dark:bg-gray-700 dark:border-gray-600"
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
							className="border rounded p-1 w-full dark:bg-gray-700 dark:border-gray-600"
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
							className="border rounded p-1 w-full dark:bg-gray-700 dark:border-gray-600"
						/>
					</p>
					<p>Session Timing:</p>
					<p>
						Start:{" "}
						<input
							type="text"
							value={formatTime(startTime)}
							onChange={(e) => setStartTime(parseTime(e.target.value))}
							className="border rounded p-1 dark:bg-gray-700 dark:border-gray-600"
						/>
					</p>
					<p>
						End:{" "}
						<input
							type="text"
							value={formatTime(endTime)}
							onChange={(e) => setEndTime(parseTime(e.target.value))}
							className="border rounded p-1 dark:bg-gray-700 dark:border-gray-600"
						/>
					</p>
					<p>
						Objective:{" "}
						<input
							type="text"
							value={objective}
							onChange={(e) => setObjective(e.target.value)}
							className="border rounded p-1 w-full dark:bg-gray-700 dark:border-gray-600"
						/>
					</p>
					<p>
						Additional notes:{" "}
						<input
							type="text"
							value={customText}
							onChange={(e) => setCustomText(e.target.value)}
							className="border rounded p-1 w-full dark:bg-gray-700 dark:border-gray-600"
						/>
					</p>
					<p>
						🔗 tldv link:{" "}
						<input
							type="text"
							value={tldvLink}
							onChange={(e) => setTldvLink(e.target.value)}
							className="border rounded p-1 w-full dark:bg-gray-700 dark:border-gray-600"
						/>
					</p>
				</div>

				<br />

				<p className="text-green-600 font-bold text-lg">Attendees 🟢🟢🟢</p>
				<ul className="list-disc list-inside mb-4">
					{selectedNames.map((name) => (
						<li key={name} className="ml-4">
							✅ {name}
						</li>
					))}
				</ul>
				<p className="text-red-600 font-bold text-lg">Absentees 🔴🔴🔴</p>
				<ul className="list-disc list-inside mb-4">
					{uninformedNames
						.filter((name) => !selectedNames.includes(name))
						.map((name) => (
							<li key={name} className="ml-4">
								🔴 {name}
							</li>
						))}
				</ul>
				<p className="text-green-600 font-bold text-lg">Informed:</p>
				<ul className="list-disc list-inside mb-4">
					{informedNames.map((name) => (
						<li key={name} className="ml-4">
							✅ {name}
						</li>
					))}
				</ul>
				<p className="text-red-600 font-bold text-lg">Uninformed:</p>
				<ul className="list-disc list-inside mb-4">
					{uninformedNames.map((name) => (
						<li key={name} className="ml-4">
							🔴 {name}
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4 text-center">Selection Page</h1>

			{/* Search Bar */}
			<div className="flex justify-center mb-4">
				<input
					type="text"
					placeholder="Search names..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="border rounded p-2 w-1/2 dark:bg-gray-700 dark:border-gray-600"
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{/* Uninformed Names */}
				<div className="border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
					<h2 className="text-xl font-bold mb-2 text-center">Uninformed Names</h2>
					<ul className="list-disc list-inside">
						{uninformedNames.map((name) => (
							<li key={name} className="ml-4">
								{name}
								<button
									onClick={() => moveToInformed(name)}
									className="ml-2 text-blue-500 hover:text-blue-700"
								>
									Informed
								</button>
								<button
									onClick={() => handleSelect(name)}
									className="ml-2 text-green-500 hover:text-green-700"
								>
									Select
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Informed Names */}
				<div className="border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
					<h2 className="text-xl font-bold mb-2 text-center">Informed Names</h2>
					<ul className="list-disc list-inside">
						{informedNames.map((name) => (
							<li key={name} className="ml-4">
								{name}
								<button
									onClick={() => moveToUninformed(name)}
									className="ml-2 text-red-500 hover:text-red-700"
								>
									Uninformed
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Selected Names */}
				<div className="border rounded p-4 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-lg">
					<h2 className="text-xl font-bold mb-2 text-center">Selected Names</h2>
					<ul className="list-disc list-inside">
						{selectedNames.map((name) => (
							<li key={name} className="ml-4">
								{name}
								<button
									onClick={() => handleUnselect(name)}
									className="ml-2 text-red-500 hover:text-red-700"
								>
									Unselect
								</button>
							</li>
						))}
					</ul>
					<button
						onClick={handleClearSelection}
						className="bg-red-500 text-white py-1 px-2 rounded mt-4 w-full hover:bg-red-600"
					>
						Clear Selection
					</button>
				</div>
			</div>

			{/* Report Section */}
			<div className="mt-8">{generateReport()}</div>

			{/* Copy to Clipboard Button */}
			<div className="flex justify-center mt-4">
				<button
					onClick={() => copyToClipboard(generatePlainTextReport())}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
				>
					Copy Report to Clipboard
				</button>
			</div>

			{/* Popup Message */}
			{popupMessage && (
				<div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
					{popupMessage}
				</div>
			)}
		</div>
	);
}
