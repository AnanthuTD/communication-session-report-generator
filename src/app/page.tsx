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
	];

	return (
		<div className="container mx-auto p-6 dark:bg-gray-900 dark:text-white">
			<h1 className="text-3xl font-bold mb-8 text-center">Report Generator</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{reports.map((report) => (
					<div
						key={report.name}
						className="p-6 border rounded-lg shadow-md transition-transform transform hover:scale-105 dark:border-gray-700"
						onMouseEnter={() => setHovered(report.name)}
						onMouseLeave={() => setHovered("")}
					>
						<Link href={report.path}>
							<a className="flex flex-col items-center justify-center text-center">
								<h2 className="text-xl font-semibold mb-4">{report.name}</h2>
								<p className="text-gray-600 dark:text-gray-400">
									{hovered === report.name ? report.description : "Click to view"}
								</p>
								<button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
									View Report
								</button>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
