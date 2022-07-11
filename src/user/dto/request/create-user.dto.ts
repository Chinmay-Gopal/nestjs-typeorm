import { IPhoto } from '../../../photo/interface/photo.interface';
import { Language } from '../../../common/enum/language.enum';

export class CreateUserDTO {
  name: string;
  email: string;
  language?: Language;
  secondaryEmail?: string;
  photos?: IPhoto[];
}
