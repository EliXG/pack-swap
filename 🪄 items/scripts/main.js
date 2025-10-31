import { world } from "@minecraft/server";

// Configuration for which slots to swap
const config = {
  slotA: 0,
  slotB: 8
};

world.beforeEvents.itemUse.subscribe(event => {
  const player = event.source;
  if (!player || player.typeId !== "minecraft:player") return;

  const item = event.itemStack;
  if (!item || item.typeId !== "custom:swap_tool") return;

  const inv = player.getComponent("inventory").container;

  const itemA = inv.getItem(config.slotA);
  const itemB = inv.getItem(config.slotB);

  inv.setItem(config.slotA, itemB);
  inv.setItem(config.slotB, itemA);

  player.sendMessage(`§aSwapped hotbar slots ${config.slotA + 1} and ${config.slotB + 1}!`);
});
