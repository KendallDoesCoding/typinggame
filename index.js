const typingDiv = document.getElementById("typing");
const statsDiv = document.getElementById("stats");
const startGameBtn = document.getElementById("start-game");

const pharagraphs = [
  `The Moon is a barren, rocky world without air and water. It has dark lava plain on its surface. The Moon is filled with craters. It has no light of its own. It gets its light from the Sun. The Moon keeps changing its shape as it moves round the Earth. It spins on its axis in 27.3 days stars were named after the Edwin Aldrin were the first ones to set their foot on the Moon on 21 July 1969. They reached the Moon in their space craft named Apollo II.`,
    `Avatar: The Last Airbender, also known as Avatar: The Legend of Aang in some regions, is an American animated television series produced by Nickelodeon Animation Studios. It was co-created by Michael Dante DiMartino and Bryan Konietzko, with Aaron Ehasz serving as head writer. It aired on Nickelodeon for three seasons, from February 2005 to July 2008.`,
    `Avatar is set in an Asiatic-inspired world in which certain people can telekinetically manipulate one of the four classical elements, water, earth, fire, or air—through practices known as "bending", inspired by Chinese martial arts. The only individual who can bend all four elements, the "Avatar", is responsible for maintaining balance between the world's four nations, and serves as the bridge between the physical world and the spirit world. The series is presented in a style that combines anime with American cartoons, and relies on the imagery of mainly East Asian culture, with some South Asian, New World, and Inuit and Sireniki influences.`,
    `Rickrolling, alternatively Rick-rolling or Rickroll, is a prank and an Internet meme involving an unexpected appearance of the music video for the 1987 song "Never Gonna Give You Up," performed by the English singer Rick Astley. The meme is a type of bait and switch using a disguised hyperlink that leads to the music video. When victims click on a seemingly unrelated link, the site with the music video loads instead of what was expected, and they have been "Rickrolled". The meme has also extended to using the song's lyrics, or singing it, in unexpected contexts. Astley himself has also been Rickrolled several times.`,
    `YouTube is an American online video sharing and social media platform owned by Google. It was launched on February 14, 2005 by Steve Chen, Chad Hurley, and Jawed Karim. It is the second most visited website, with more than one billion monthly users.`,
];

const startGame = () => {
  startGameBtn.classList.add("hidden");
  typingDiv.innerHTML = "";
  statsDiv.innerHTML = "";

  const text = pharagraphs[parseInt(Math.random() * pharagraphs.length)];

  const characters = text.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
  });

  let cursorIndex = 0;
  let cursorCharacter = characters[cursorIndex];
  cursorCharacter.classList.add("cursor");

  let startTime = null;

  const keydown = ({ key }) => {
    if (!startTime) {
      startTime = new Date();
    }

    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.add("done");
      cursorCharacter = characters[++cursorIndex];
    }

    if (cursorIndex >= characters.length) {
      // game ended
      const endTime = new Date();
      const delta = endTime - startTime;
      const seconds = delta / 1000;
      const numberOfWords = text.split(" ").length;
      const wps = numberOfWords / seconds;
      const wpm = wps * 60.0;
      document.getElementById("stats").innerText = `wpm = ${parseInt(wpm)}`;
      document.removeEventListener("keydown", keydown);
      startGameBtn.classList.remove("hidden");
      return;
    }

    cursorCharacter.classList.add("cursor");
  };

  document.addEventListener("keydown", keydown);
};
