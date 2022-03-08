import readline from "readline";

export default function getOrder() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false,
    });

    rl.once("line", function (line) {
      resolve(line);
      rl.close();
    });
  });
}
