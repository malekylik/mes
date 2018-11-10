import { OAKFieldsName } from '../consts';

export interface OAK {
    [OAKFieldsName.leukocytosis]: string,
    [OAKFieldsName.neutrophilia]: number,
    [OAKFieldsName.lymphocytosis]: number,
}
