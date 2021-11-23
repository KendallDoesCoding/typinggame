            // create a speed typing game

            const startGameButton = document.getElementById("button");
            const input = document.getElementById("input");
            const mainContent = document.getElementById("main-content");
            const statContent = document.getElementById("stats");
            const textDisplay = document.getElementById("text-display");
            const wpmDisplay = document.getElementById("wpm-display");
            const scoreDisplay = document.getElementById("score-display");
            const timeDisplay = document.getElementById("time-display");
            const form = document.getElementById("form");
            const splittedAlice = alice.split(" ");

            const state = {
                currentWord: "",
                score: 0,
                timeElapsed: 0,
                gameLength: 30, // 30 sec
            };

            /**
            * Get a random word from Alice
            */
            function getRandomWord() {
                return splittedAlice[
                    Math.floor(Math.random() * splittedAlice.length)
                ];
            }

            function renderStats() {
                timeDisplay.textContent = state.gameLength - state.timeElapsed;
                scoreDisplay.textContent = state.score;
                wpmDisplay.textContent = calcWpm().toFixed(2);
            }

            function nextWord() {
                const word = getRandomWord();
                textDisplay.textContent = word;
                state.currentWord = word;
            }

            function calcWpm(){
                return Number(state.score / (state.timeElapsed / 60))
            }

            function createWordSpan(color, content) {
                const span = document.createElement("span");
                const style = "background-color: " + color;
                // add colour to it: defining the styles
                span.setAttribute("style", style);
                span.className = "typed-word";

                span.textContent = content;
                return span;
            }

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                // get input value
                const userInput = input.value;

                // if no input dont do anything
                if (userInput === "") {
                    return;
                }

                // check user entered the correct input
                const isCorrect = userInput === state.currentWord;

                // give it the appropriate color
                let span;
                if (isCorrect) {
                    // if correct, add the word to the list with green background
                    span = createWordSpan('greenyellow', userInput);
                    state.score += 1;
                } else {
                    // if incorrect, add the word to the list with red background
                    span = createWordSpan('red', userInput);
                }

                mainContent.appendChild(span);

                // finally we clear the text input
                input.value = "";

                // show next word and render stat
                nextWord();
                renderStats();
            });

            function startClock() {
                // add 1 sec per running sec
                setInterval(function () {
                    state.timeElapsed += 1;
                    renderStats();

                    // end the game
                    if (state.timeElapsed === state.gameLength) {
                        alert("Game over. Your WPM is: " + wpmDisplay.textContent);
                        // refresh the page
                        window.location.reload();
                    }
                }, 1000);
            }

            startGameButton.addEventListener("click", function (event) {
                // hide the start game button
                startGameButton.className = "hide";
                // show the input field
                input.className = "";
                // show the stat
                statContent.className = "";

                // focus cursor on the text field so user can type right away
                input.focus();
                // show the word
                nextWord();

                startClock();
            });
