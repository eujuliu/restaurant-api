import { Response } from 'express';
import { InternalServerError, ValidationError } from 'core/domain/errors';
import { bodyPropsIsEmpty } from 'core/controller/utils/body-props-is-empty';
import { CreateAddressUseCase } from 'modules/addresses/use-cases/create-address/create-address-use-case';
import { CustomRequest } from 'infra/http/middleware/auth';

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
  async handle(request: CustomRequest, response: Response) {
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
      const decoded = request.decoded as { id: string };
      const responseOrError = await this.createAddressUseCase.execute({
        name,
        address,
        address2,
        district,
        city,
        state,
        postalCode,
        userId: decoded.id,
      });

      if (responseOrError.isLeft()) {
        return response
          .status(responseOrError.value.statusCode)
          .json(responseOrError.value);
      }

      return response.status(201).json({
        message: `Address ${address} was created successfully`,
      });
    } catch (err) {
      return response
        .status(500)
        .json(new InternalServerError({ message: (err as Error).message }));
    }
  }
}
