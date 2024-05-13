import { Block } from "@infrastructure/models/blockModel";
import { PageCard } from "@infrastructure/models/pageCardModel";

function filterLinks(blocks: Block[]) {
    const links = new Set();
    blocks.forEach(block => {
        if (block.css_link) {
            links.add(block.css_link);
        }
    });
    return Array.from(links);
}
export default async function(pageCard: PageCard): Promise<string>{
    const blocks = filterLinks(pageCard.blocks);
    let response = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${pageCard.name}</title>
    `;
    blocks.forEach(link => {
        response += `<link rel="stylesheet" href="${link}">\n`;
    });
    response += 
    `
    </head>\n
    `;
    return response;
}