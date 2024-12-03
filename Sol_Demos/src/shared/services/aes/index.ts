import { AESRequestDTO } from '@/shared/models/request/aes.RequestDTO';
import { DataResponse, DataResponseFactory } from '@/shared/models/response/data.Response';
import { aes } from '@/shared/utils/aes';
import { validateOrRejectAsync } from '@/shared/utils/dtoValidation';
import { StatusCodes } from 'http-status-codes';

export const aesDecryptionAndValidationWrapperAsync = async <TRequest extends object>(
	request: AESRequestDTO,
	requestClass: new () => TRequest
): Promise<DataResponse<TRequest>> => {
	try {
		// Decrypt
		const requestBody: string = request.body;
		const decryptRequestBodyStr: string = await aes.decryptAsync(requestBody);
		const requestBodyObject: TRequest = JSON.parse(decryptRequestBodyStr);

		// Validation
		const validationResult = await validateOrRejectAsync<TRequest>(
			requestBodyObject,
			requestClass
		);
		if (validationResult.isErr())
			return DataResponseFactory.Response(
				false,
				StatusCodes.BAD_REQUEST,
				null,
				validationResult.error.message
			);

		// Return
		return DataResponseFactory.Response<TRequest>(
			true,
			StatusCodes.OK,
			requestBodyObject as TRequest,
			null
		);
	} catch (ex) {
		return DataResponseFactory.Response(
			false,
			StatusCodes.INTERNAL_SERVER_ERROR,
			null,
			ex.message
		);
	}
};
