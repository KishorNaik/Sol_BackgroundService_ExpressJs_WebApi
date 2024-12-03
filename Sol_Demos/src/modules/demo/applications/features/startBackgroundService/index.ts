import { StatusCodes } from 'http-status-codes';
import { HttpCode, JsonController, OnUndefined, Post, Res } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { BackgroundService, IBackgroundService } from '../../shared/jobs/backgroundService';
import Container from 'typedi';
import { DataResponseFactory } from '@/shared/models/response/data.Response';
import { Response } from 'express';
import { logger, stream } from '@/shared/utils/logger';

@JsonController(`/api/v1/demo`)
@OpenAPI({ tags: ['demo'] })
export class StartBackgroundServiceController {
	private readonly _backgroundService: IBackgroundService;

	public constructor() {
		this._backgroundService = Container.get(BackgroundService);
	}

	@Post('/start')
	@OpenAPI({ summary: 'Start Background Service', tags: ['demo'] })
	@HttpCode(StatusCodes.OK)
	@OnUndefined(StatusCodes.BAD_REQUEST)
	public async startAsync(@Res() res: Response) {
    logger.info('API:Start Background Service');
		this._backgroundService.startService();
		return res
			.status(<number>StatusCodes.OK)
			.json(DataResponseFactory.success(StatusCodes.OK, 'Background Service Started'));
	}
}
