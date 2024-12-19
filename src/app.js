const OPENAI_API_KEY = "";


document.getElementById("generateBtn").addEventListener("click", async () => {
    const prompt = document.getElementById("prompt").value;
    const storyOutput = document.getElementById("storyOutput");
    const loading = document.getElementById("loading");

    if (!prompt) return alert("Please enter a story prompt!");

    loading.style.display = "block";
    storyOutput.innerHTML = "";

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "mistralai/mistral-7b-instruct:free",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: { Authorization: `Bearer ${OPENROUTER_API_KEY}` },
            }
        );

        const story = response.data.choices[0].text.trim();
        storyOutput.innerHTML = `<strong>Story:</strong><br>${story}`;
        localStorage.setItem("generatedStory", story);
    } catch (err) {
        console.error(err);
        alert("Failed to generate story. Check your API key.");
    } finally {
        loading.style.display = "none";
    }
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
