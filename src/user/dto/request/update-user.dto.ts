import { Language } from '../../../common/enum/language.enum';

export class UpdateUserDTO {
  name: string;
  email: string;
  language?: Language;
  secondaryEmail?: string;
}
