export default async function(title: string, content: string): Promise<string>{
    const response = 
    `
    <div class="card">
        <div class="card-header">
            ${title}
        </div>
        <div class="card-body">
            <p class="card-text">${content}</p>
        </div>
    </div>\n
    `;
    return response;
}