import "@logseq/libs";
import send from "./send";

async function main() {
  console.log("logseq-sendtothings3-plugin loaded");

  await logseq.Editor.registerBlockContextMenuItem(
    "Send to Things3",
    async function (block) {
      await send(block);
    }
  );

  await logseq.Editor.registerSlashCommand(
    "Send to Things3",
    async function (block) {
      await send(block);
    }
  );
}

logseq.ready(main).catch(console.error);
