export default async function send(block) {
  const blk = await logseq.Editor.getBlock(block.uuid);
  try {
    const currGraph = await logseq.App.getCurrentGraph();

    window.open(
      `things:///add?title=${encodeURIComponent(
        blk!.content
      )}&notes=logseq://graph/${currGraph!.name}?block-id=${blk?.uuid}`
    );

    logseq.UI.showMsg("Successfully sent to Things!", "success");
  } catch (e) {
    logseq.UI.showMsg("Sending to Things failed", "error");
    throw new Error(e);
  }
}
