/* ==========================================
   FAT TO FIT CHATBOT
========================================== */

(function() {

    // Wait until chatbot.html is loaded
    const waitForChat = setInterval(() => {

        const chatbot = document.getElementById("chatbot");
        const chatIcon = document.getElementById("chatIcon");
        const closeChat = document.getElementById("closeChat");
        const sendBtn = document.getElementById("sendBtn");
        const input = document.getElementById("userInput");
        const chatBody = document.getElementById("chat-body");

        if (chatbot && chatIcon && closeChat && sendBtn && input && chatBody) {

            clearInterval(waitForChat);

            // Open Chat
            chatIcon.onclick = function () {
                chatbot.style.display = "flex";
                chatIcon.style.display = "none";
                input.focus();
            };

            // Close Chat
            closeChat.onclick = function () {
                chatbot.style.display = "none";
                chatIcon.style.display = "block";
            };

            // Send Button
            sendBtn.onclick = sendMessage;

            // Enter Key
            input.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    sendMessage();
                }
            });

            function sendMessage() {

                let msg = input.value.trim();

                if (msg == "") return;

                addUser(msg);

                input.value = "";

                showTyping();

                setTimeout(() => {

                    removeTyping();

                    botReply(msg);

                }, 800);

            }

            function addUser(text) {

                let div = document.createElement("div");

                div.className = "user";

                div.innerHTML = text;

                chatBody.appendChild(div);

                scrollBottom();

            }

            function addBot(text) {

                let div = document.createElement("div");

                div.className = "bot";

                div.innerHTML = text;

                chatBody.appendChild(div);

                scrollBottom();

            }

            function showTyping() {

                let typing = document.createElement("div");

                typing.className = "typing";

                typing.id = "typing";

                typing.innerHTML =
                    "<span></span><span></span><span></span>";

                chatBody.appendChild(typing);

                scrollBottom();

            }

            function removeTyping() {

                let t = document.getElementById("typing");

                if (t) t.remove();

            }

            function scrollBottom() {

                chatBody.scrollTop = chatBody.scrollHeight;

            }

            function botReply(message) {

                let msg = message.toLowerCase();

                let reply = knowledge.default;

                if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {

                    reply = knowledge.hello;

                }

                else if (msg.includes("join") || msg.includes("register")) {

                    reply = knowledge.join;

                }

                else if (msg.includes("group")) {

                    reply = knowledge.group;

                }

                else if (msg.includes("channel")) {

                    reply = knowledge.channel;

                }

                else if (msg.includes("facebook")) {

                    reply = knowledge.facebook;

                }

                else if (msg.includes("instagram")) {

                    reply = knowledge.instagram;

                }

                else if (msg.includes("telegram")) {

                    reply = knowledge.telegram;

                }

                else if (msg.includes("diet")) {

                    reply = knowledge.diet;

                }

                else if (msg.includes("exercise") || msg.includes("workout")) {

                    reply = knowledge.exercise;

                }

                else if (msg.includes("weight loss")) {

                    reply = knowledge.weightloss;

                }

                else if (msg.includes("weight gain")) {

                    reply = knowledge.weightgain;

                }

                else if (msg.includes("bmi")) {

                    reply = knowledge.bmi;

                }

                else if (msg.includes("bp")) {

                    reply = knowledge.bp;

                }

                else if (msg.includes("sugar") || msg.includes("diabetes")) {

                    reply = knowledge.sugar;

                }

                else if (msg.includes("thyroid")) {

                    reply = knowledge.thyroid;

                }

                else if (msg.includes("pcos")) {

                    reply = knowledge.pcos;

                }

                else if (msg.includes("water")) {

                    reply = knowledge.water;

                }

                else if (msg.includes("sleep")) {

                    reply = knowledge.sleep;

                }

                else if (msg.includes("contact") || msg.includes("phone")) {

                    reply = knowledge.contact;

                }

                else if (msg.includes("fees") || msg.includes("price") || msg.includes("free")) {

                    reply = knowledge.free;

                }

                else if (msg.includes("timing")) {

                    reply = knowledge.timing;

                }

                else if (msg.includes("coach")) {

                    reply = knowledge.coach;

                }

                else if (msg.includes("motivation")) {

                    reply = knowledge.motivation;

                }

                else if (msg.includes("thanks") || msg.includes("thank")) {

                    reply = knowledge.thanks;

                }

                else if (msg.includes("bye")) {

                    reply = knowledge.bye;

                }

                addBot(reply);

            }

            // Quick Buttons
            window.quickReply = function (text) {

                input.value = text;

                sendMessage();

            };

        }

    }, 300);

})();