import { IWebsiteRepository } from '@interfaces/IWebsiteReposity';

export class AddUser {
    constructor(private websiteRepository: IWebsiteRepository) {}

    async execute({ userEmail, userRole, websiteId, requesterID }: {
        userEmail: string;
        userRole: string;
        websiteId: string;
        requesterID: number; 
    }): Promise<void> {
        if (!userEmail || !userRole || !websiteId) {
            throw new Error('Заполните необходимые поля!');
        }

        const website = await this.websiteRepository.findByPk(websiteId);

        if (!website) {
            throw new Error("Website not found");
        }

        if (website.owner !== requesterID) {
            throw new Error("You are not the owner of this website");
        }

        await this.websiteRepository.addUserToWebsite(websiteId, { userEmail, userRole });
    }
}
