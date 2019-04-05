const WARM = ["Nothing happens.", "There's movement inside the egg!"];

const TALK = [
  "Nothing happens. What did you expect?",
  "You think you hear a noise from inside the egg. Was it your imagination?"
];

const SENTENCES = {
  "T-rex": {
    sleep: [
      "T-Rex fell over and slept.",
      "T-Rex curled up at your feet and slept."
    ],
    feed: ["T-Rex ate hungrily.", "T-Rex tried to eat you! How rude!"],
    play: [
      "You threw a large stick. T-Rex caught it with its mouth.",
      "You threw a ball. T-Rex couldn't catch the ball with its small arms."
    ]
  },
  Pteryl: {
    sleep: [
      "Pterodactyl curled up and slept.",
      "Pterodactyl stretched its wings. It didn't seem tired."
    ],
    feed: [
      "Pterodactyl hungrily snapped up the food.",
      "Pterodactyl almost bit your hand!"
    ],
    play: [
      "Pterodactyl flapped its wings excitedly.",
      "You threw a ball into the air. Pterodactyl flew up and caught it in its mouth."
    ]
  },
  Stego: {
    sleep: [
      "Stegosaurus curled up at your feet and slept.",
      "Stegosaurus yawned."
    ],
    feed: [
      "Stegosaurus happily ate the food you gave it.",
      "Stegosaurus sniffed the air. Is it not hungry?"
    ],
    play: [
      "Stegosaurus wagged its tail like a dog. You played fetch.",
      "Stegosaurus yawned. It didn't want to play."
    ]
  },
  Bront: {
    sleep: [
      "Brontosaurus curled up and slept near your feet.",
      "Brontosaurus tilted its head to the side. It didn't seem sleepy."
    ],
    feed: [
      "Brontosaurus lowered its head to your level and ate the leaves in your hand.",
      "Brontosaurus sniffed the air. It didn't seem hungry."
    ],
    play: [
      "Brontosaurus did a little dance. It seemed happy to play.",
      "Brontosaurus wagged its tail lazily. It didn't seem interested in playing."
    ]
  }
};

