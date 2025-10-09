// это отвечает за локигу - кнопку, загрузку, хранение списка
import React, { useState } from "react";
import '../styles/DogsList.css'


function DogsList() {

    const [dogs , setDogs] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState(null);

    async function loadDogs(count = 5){
        setError(null);
        setLoading(true);

        try {
            const newDogs = [];
            let attempts = 0;

            while(newDogs.length < count && attempts < count*9){
                attempts++;

                const res = await fetch("https://random.dog/woof.json");
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const url = data.url || data.file || "";

                const lower = url.toLowerCase();
                if(lower.endsWith(".mp4") || lower.endsWith(".webm")) {
                    continue;
                }

                newDogs.push(url);
                } 
            
                if(newDogs.length === 0){
                    throw new Error("Не удалось получить изображение. Попробуйте еще раз.")
                }

                setDogs(newDogs);

        } catch (err){
            setError(err.message || "Ошибка при загрузке"); 
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="dogs-list-container">
            <h2>Random Dog Gallery</h2>

        <button onClick={() => loadDogs(5)} disabled={loading}>
            {loading ? "Loading.." : "Load Dogs"}
        </button>

        

        </div>
    );
 
}

export default DogsList; 