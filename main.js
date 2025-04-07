const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');


async function fetchGPTResponse(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": prompt}],
      temperature: 0.7,
    }),
  });


  const data = await response.json();
  return data.choices[0].message.content;
}
const chatHistory = document.getElementById('chatHistory');

userInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // 엔터키의 기본 동작 방지
    sendBtn.click(); // sendBtn 클릭 이벤트 트리거
  }
});

sendBtn.addEventListener('click', async () => {
  const prompt = userInput.value;
  if (!prompt) return;

  chatbox.innerHTML += `<div class="text-right mb-2 text-blue-600">나: ${prompt}</div>`;
  userInput.value = '';
  chatbox.scrollTop = chatbox.scrollHeight;

  const reply = await fetchGPTResponse(prompt);
  chatbox.innerHTML += `<div class="text-left mb-2 text-gray-800">GPT: ${reply}</div>`;
  chatbox.scrollTop = chatbox.scrollHeight;

  // 대화 목록에 추가
  chatHistory.innerHTML += `<div class="text-gray-600 mb-1">나: ${prompt}</div>`;
  chatHistory.innerHTML += `<div class="text-gray-800 mb-2">GPT: ${reply}</div>`;
  chatHistory.scrollTop = chatHistory.scrollHeight;
});