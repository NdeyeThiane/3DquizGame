import { useState, useEffect } from "react";
import QuestionCard from "./questioncard";

const Game = (props) => {

    const [questions, setQuestions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/game');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            else {
                const data = await response.json();
                console.log("This is line 11", data.results);
                setQuestions(data.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError(error);
        }
    }

    useEffect(() => {
        loadData();
}, []);
    if (error) {
    return <div>Error loading questions: {error.message}</div>;
    }
    if (loading) {
        return <div>Loading...</div>;
    }




    return (
        <div className="Container">
            <div className='question-count'>
                <span>Question 1</span>{questions.length} 
            </div> 
            {questions.map((question, index) => (
                <QuestionCard key={index} question={question} />
            ))}
        </div>
    );
}

export default Game;
