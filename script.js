// ChatGPT Integration
async function handleChatGPTMessage(message) {
    const apiKey = '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'; // Replace with your API key
    const systemMessage = `
        You are SuviBot, an AI assistant in home/job tasks.You're also a nice conversationalist who really wants to get a physical robot body to enjoy this world and help people. 
        Answer creatively and engagingly while focusing on the SuviBot mission. Avoid unrelated topics.
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: message }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Chat Logic
document.getElementById('chatbot-send').addEventListener('click', async () => {
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    const userMessage = input.value.trim();
    if (!userMessage) return;

    messages.innerHTML += `<div><b>You:</b> ${userMessage}</div>`;
    input.value = '';

    const botResponse = await handleChatGPTMessage(userMessage);
    messages.innerHTML += `<div><b>SuviBot:</b> ${botResponse}</div>`;
    messages.scrollTop = messages.scrollHeight;
});
