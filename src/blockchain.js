const EDGECHAINS_API_KEY = "";
const EDGECHAINS_NODE_URL = "https://api.smith.langchain.com";


async function storeStoryOnBlockchain(story) {
    if (!story) {
        alert("No story available to store on the blockchain.");
        return;
    }

    try {
        
        const transactionData = {
            api_key: EDGECHAINS_API_KEY,
            node_url: EDGECHAINS_NODE_URL,
            transaction: {
                storyHash: btoa(story), 
                timestamp: new Date().toISOString(),
                userId: "user123",
            },
        };

        
        const response = await axios.post(`${EDGECHAINS_NODE_URL}/store`, transactionData);

        if (response.data?.tx_hash) {
            alert(`Story successfully stored on blockchain. TX Hash: ${response.data.tx_hash}`);
        } else {
            alert("Failed to store story on blockchain.");
        }
    } catch (err) {
        console.error(err);
        alert("Failed to store story on blockchain.");
    }
}

document.getElementById("storeBtn").addEventListener("click", async () => {
    const story = localStorage.getItem("generatedStory");
    await storeStoryOnBlockchain(story);
});
