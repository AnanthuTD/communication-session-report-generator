"use client";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
	const [hovered, setHovered] = useState("");

	const reports = [
		{
			name: "Communication Session Report",
			path: "/communication",
			description: "View detailed reports of communication sessions.",
		},
		{
			name: "Audio Task Report",
			path: "/audio",
			description: "Access reports related to audio tasks and activities.",
		},
		{
			name: "Manage Members",
			path: "/manage-members",
			description: "Manage and organize team members efficiently.",
		},
	];

	return (
		<div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-6">
			<h1 className="text-4xl font-bold mb-10 text-center drop-shadow-lg">
				Report Generator BCR64
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{reports.map((report) => (
					<div
						key={report.name}
						className={`p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
							hovered === report.name ? "scale-105 shadow-2xl" : "scale-100"
						}`}
						onMouseEnter={() => setHovered(report.name)}
						onMouseLeave={() => setHovered("")}
					>
						<Link href={report.path}>
							<div className="flex flex-col items-center text-center">
								<h2 className="text-2xl font-semibold mb-4 text-gray-800">
									{report.name}
								</h2>
								<p className="text-gray-600">
									{hovered === report.name
										? report.description
										: "Click to explore more details"}
								</p>
								<button className="mt-6 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all duration-300">
									View Report
								</button>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
