import { Request, Response } from 'express';
import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/domain/utils/body-props-is-empty';
import { CreateAddressUseCase } from 'modules/addresses/use-cases/create-address/create-address-use-case';
import jwt from 'jsonwebtoken';
import { SECRET } from 'config';

export interface CreateAddressBodyProps {
  name: string;
  address: string;
  address2: string | null;
  district: string | null;
  city: string;
  state: string | null;
  postalCode: string;
}

export class CreateAddressController {
  constructor(private createAddressUseCase: CreateAddressUseCase) {}
  async handle(request: Request, response: Response) {
    if (!request.cookies.session_id) {
      return response.status(401).json(new ValidationError({}));
    }

    const {
      name,
      address,
      address2,
      district,
      city,
      state,
      postalCode,
    }: CreateAddressBodyProps = await request.body;

    if (bodyPropsIsEmpty({ name, address, city, postalCode })) {
      return response.status(400).json(
        new ValidationError({
          message: 'Some field is empty',
          action: 'Verify all fields and try again',
        })
      );
    }

    try {
      const decoded = jwt.verify(await request.cookies.session_id, SECRET);
      const responseOrError = await this.createAddressUseCase.execute({
        name,
        address,
        address2,
        district,
        city,
        state,
        postalCode,
        userId: (<{ id: string }>decoded).id,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(201).send();
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
