import { BlockEntity, BlockIdentity } from "@logseq/libs/dist/LSPlugin.user";

export const send = async (uuid: BlockIdentity): Promise<void> => {
  try {
    const blk = await logseq.Editor.getBlock(uuid, { includeChildren: true });
    const currGraph = await logseq.App.getCurrentGraph();
    if (!blk || !currGraph) throw new Error();

    let content: string = "";
    if (blk.children!.length > 0) {
      const findAllChildBlocks = (blocks: BlockEntity[]) => {
        for (const b of blocks) {
          content += b.content + "%0A%0A";
          if (b.children!.length > 0) {
            findAllChildBlocks(b.children as BlockEntity[]);
          }
        }
      };
      findAllChildBlocks(blk.children as BlockEntity[]);
    }

    content += `logseq://graph/${currGraph.name}`;

    window.open(
      `things:///add?title=${encodeURIComponent(
        blk.content,
      )}&notes=${content}?block-id=${uuid}& x - success`,
    );

    await logseq.UI.showMsg("Successfully sent to Things!", "success");
  } catch (e) {
    console.error(e);
    await logseq.UI.showMsg(
      `Sending to Things failed ${(e as Error).message}`,
      "error",
    );
  }
};
