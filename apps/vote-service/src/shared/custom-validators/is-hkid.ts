import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import validid from 'validid';

@ValidatorConstraint({ name: 'isHkid', async: false })
export class IsHkid implements ValidatorConstraintInterface {

    validate(propertyValue: string) {
        if (!propertyValue) {
            return true;
        }
        return validid.hkid(propertyValue);
    }

    defaultMessage() {
        return 'Invalid hkid';
    }
}