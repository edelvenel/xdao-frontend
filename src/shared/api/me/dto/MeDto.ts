export interface MeDto {
  id: number;
  firstName: string;
  lastName: string | null;
  languageCode: string;
  username: string | null;
  isPremium: boolean;
  addedToAttachmentMenu: boolean;
  allowsWriteToPm: boolean;
  photoUrl: string | null;
  isBot: boolean;
}
