const typingDiv = document.getElementById("typing")

const text =   `The Moon is a barren, rocky world without air and water. It has dark lava plain on its surface. The Moon is filled with craters. It has no light of its own. It gets its light from the Sun. The Moo keeps changing its shape as it moves round the Earth. It spins on its axis in 27.3 days stars were named after the Edwin Aldrin were the first ones to set their foot on the Moon on 21 July 1969. They reached the Moon in their space craft named Apollo II.`

const characters = text.split('').map(char =>  {
    const span = document.createElement('span')
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
});

let cursorIndex = 0;
let  cursorCharacter = characters[cursorIndex];
cursorCharacter.classList.add('cursor')

let startTime = null;
let endDate = null;

const keyListener = document.addEventListener('keydown', ({ key }) => {
    console.log(key);
    if (!startTime) {
        startTime = new Date()
    }
    if (key === cursorCharacter.innerText) {
        cursorCharacter.classList.remove("cursor");
        cursorCharacter.classList.add("done");
        cursorCharacter = characters[++cursorIndex];        
    }
    if (cursorIndex >= characters.length) {
        endTime = new Date();
        const delta = endTime - startTime;
        const seconds = delta / 1000;
        const numberOfWords = text.split(" ").Length;
        const wps = numberOfWords / seconds;
        const wpm = wps * 60.0;
        document.getElementById('stats').innerText = `wpm = ${wpm}`;
        //display the wpm, cpm
        document.removeEventListener("keydown", keyListener);
        return;
    }
    cursorCharacter.classList.add("cursor")

})