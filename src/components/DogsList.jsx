    import React, { useState } from "react";
    import "../styles/DogsList.css";
    import DogsCard from "./DogsCard";

    function DogsList() {
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    async function loadDogs(count = 5) {
        setError(null);
        setLoading(true);

        try {
        const newDogs = [];
        let attempts = 0;

        while (newDogs.length < count && attempts < count * 9) {
            attempts++;

            const res = await fetch("https://random.dog/woof.json");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const url = data.url || data.file || "";

            console.log("Dog URL:", url);

            if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
            newDogs.push(url);
            }
        }

        if (newDogs.length === 0) {
            throw new Error("Не удалось получить изображения. Попробуйте ещё раз.");
        }

        setDogs(newDogs);
        console.log("All loaded dog URLs:", newDogs);
        } catch (err) {
        setError(err.message || "Ошибка при загрузке");
        } finally {
        setLoading(false);
        }
    }

    const filteredDogs = dogs.filter((url) =>
        url.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dogs-list-container">
        <h2>Random Dog Gallery</h2>

        <div className="search-section">
            <input
            type="text"
            placeholder="Search by part of URL (e.g. jpg, png)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={() => setSearch("")}>Clear</button>
        </div>

        <button onClick={() => loadDogs(5)} disabled={loading}>
            {loading ? "Loading..." : "Load Dogs"}
        </button>

        {error && <p className="error-message">{error}</p>}

        {filteredDogs.length > 0 ? (
            <ul className="dogs-list">
            {filteredDogs.map((url, index) => (
                <DogsCard key={url || index} url={url} />
            ))}
            </ul>
        ) : (
            <ul className="dogs-list no-dogs">
            <li className="no-results-card">
                <p>No dogs found 🐾</p>
            </li>
            </ul>
        )}
        </div>
    );
    }

    export default DogsList;
