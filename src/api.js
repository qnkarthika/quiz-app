export async function fetchQuizData() {
    try {
        const response = await fetch("https://api.jsonserve.com/Uw5CrX");
        if (!response.ok) {
            throw new Error("Failed to fetch quiz data");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching quiz data:", error);
        return []; // Return empty array if error occurs
    }
}
