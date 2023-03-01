import "@logseq/libs";

async function main() {
  console.log("logseq-sendtothings3-plugin loaded");

  await logseq.Editor.registerBlockContextMenuItem(
    "Send to Things3",
    async function (block) {
      const blk = await logseq.Editor.getBlock(block.uuid);
      try {
        window.open(
          `things:///add?title=${blk?.content}&notes=logseq://graph/logseq?block-id=${blk?.uuid}`
        );
        logseq.UI.showMsg("Successfully sent to Things!", "success");
      } catch (e) {
        logseq.UI.showMsg("Sending to Things failed", "error");
        throw new Error(e);
      }
    }
  );
}

logseq.ready(main).catch(console.error);
