import JSConfetti from "js-confetti";

export default function winConfetti() {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    emojis: ["🐰"],
    emojiSize: 70,
    confettiNumber: 100,
  });
}
