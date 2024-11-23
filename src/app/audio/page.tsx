"use client";
import { useState, useEffect } from "react";

const names = [
  "Abhilash B R",
  "Ahamed Irfan",
  "Amal Ramakrishnan",
  "Ananthu TD",
  "Aneena Thasneem C A",
  "Anas A M",
  "Arun Thomas",
  "Aswanth P",
  "Aswin K",
  "Devaraj",
  "Diyana Sherin K M",
  "Farhana Sherin O C",
  "Husna K",
  "Jayashree",
  "Joel Thomas",
  "Krishna Priya K",
  "Mariyammath Thabsira G",
  "Masroora K",
  "Muhammed Sinan",
  "Muhammed Uwais",
  "Nasrin Gafoor K P",
  "Preethi Sreejith",
  "Rento Augustine",
  "Sahla M",
  "Shanid V V",
  "Shibla P",
  "Subhana Thasni TP",
  "Swathish",
  "Thanveer",
  "Vishnu",
  "Rejina",
];

function sort(array: string[] = []) {
  return array.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

const defaultCoordinators = ["Rento", "Masroora"];

const fetchCoordinators = async () => {
  // Replace with actual API call
  return ["Rento", "Masroora"];
};

export default function SelectionPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [reportWriter, setReportWriter] = useState("Ananthu T D");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // defaults to current date
  const [topic, setTopic] = useState("Orientation");
  const [customText, setCustomText] = useState("");
  const [coordinators, setCoordinators] = useState(defaultCoordinators);
  const [popupMessage, setPopupMessage] = useState("");
  const [informedNames, setInformedNames] = useState<string[]>([]);
  const [uninformedNames, setUninformedNames] = useState<string[]>(names);

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
      names.filter(
        (name) =>
          !selectedNames.includes(name) &&
          !informedNames.includes(name) &&
          name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [selectedNames, informedNames, searchTerm]);

  const moveToInformed = (name: string) => {
    setInformedNames((prevInformed) => sort([...prevInformed, name]));
    setUninformedNames((prevUninformed) =>
      sort(prevUninformed.filter((item) => item !== name))
    );
  };

  const moveToUninformed = (name: string) => {
    setInformedNames((prevInformed) =>
      prevInformed.filter((item) => item !== name)
    );
    setUninformedNames((prevUninformed) => [...prevUninformed, name]);
  };

  const handleSelect = (name: string) => {
    setSelectedNames((prevSelected) =>
      prevSelected.includes(name) ? prevSelected : [...prevSelected, name]
    );
  };

  const handleUnselect = (name: string) => {
    setSelectedNames((prevSelected) =>
      sort(prevSelected.filter((item) => item !== name))
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
*🎤 Audio Task Submission Report*

➖➖➖➖➖➖➖➖➖➖➖➖➖

🖥 BCR 64

📆 Date: ${date}

👩‍💻 Trainer: Divya Bharathi, Afzal Nazar

👨🏻‍💼 Coordinator: ${coordinators.join(", ")}

📝 Report by: ${reportWriter}

📑 Topic: ${topic}

${customText}

Submitted 🟢🟢🟢
${sort(selectedNames)
  .map((name) => `✅ ${name}`)
  .join("\n")}

Not Submitted 🔴🔴🔴
${sort([...uninformedNames, ...informedNames])
  .map((name) => `🔴 ${name}`)
  .join("\n")}

Informed:
${sort(informedNames)
  .map((name) => `✅ ${name}`)
  .join("\n")}

Uninformed:
${sort(uninformedNames)
  .map((name) => `🔴 ${name}`)
  .join("\n")}

	`;
  };

  const generateReport = () => {
    return (
      <div className="border rounded p-4 min-h-[200px] dark:bg-gray-800 dark:border-gray-700">
        <p className="font-bold text-xl">*🎤 Audio Task Submission Report *</p>
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
            👩‍💻 Trainer:{" "}
            <span className="font-bold">Divya Bharathi, Afzal Nazar</span>
          </p>
          <p>👨🏻‍💼 Coordinator: {coordinators.join(", ")}</p>
          <p>
            📝 Report by:{" "}
            <select
              value={reportWriter}
              onChange={(e) => setReportWriter(e.target.value)}
              className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
            >
              {sort(names).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </p>
          <p>
            📑 Topic:{" "}
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border rounded p-1 dark:bg-gray-800 dark:border-gray-700"
            />
          </p>
        </div>

        <br />
        <br />

        <p>
          Additional notes:{" "}
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            rows={4}
          />
        </p>

        <br />

        <br />

        <p className="text-green-600 font-bold text-lg">Submitted 🟢🟢🟢</p>
        <ul className="list-disc list-inside mb-4">
          {sort(selectedNames).map((name) => (
            <li key={name} className="ml-4">
              ✅ {name}
            </li>
          ))}
        </ul>
        <p className="text-red-600 font-bold text-lg">Not Submitted 🔴🔴🔴</p>
        <ul className="list-disc list-inside mb-4">
          {sort(names)
            .filter((name) => !selectedNames.includes(name))
            .map((name) => (
              <li key={name} className="ml-4">
                🔴 {name}
              </li>
            ))}
        </ul>
        <p className="text-green-600 font-bold text-lg">Informed:</p>
        <ul className="list-disc list-inside mb-4">
          {sort(informedNames).map((name) => (
            <li key={name} className="ml-4">
              ✅ {name}
            </li>
          ))}
        </ul>
        <p className="text-red-600 font-bold text-lg">Uninformed:</p>
        <ul className="list-disc list-inside mb-4">
          {sort(uninformedNames).map((name) => (
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
      <h1 className="text-3xl font-bold mb-4 text-center">
        Audio Task Submission Report Page
      </h1>

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
          <h2 className="text-xl font-bold mb-2 text-center">
            Uninformed Names
          </h2>
          <ul className="list-disc list-inside">
            {sort(uninformedNames).map((name) => (
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
            {sort(informedNames).map((name) => (
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
            {sort(selectedNames).map((name) => (
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
