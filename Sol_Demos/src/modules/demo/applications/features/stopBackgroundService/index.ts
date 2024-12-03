import { StatusCodes } from 'http-status-codes';
import { HttpCode, JsonController, OnUndefined, Post, Res } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { BackgroundService, IBackgroundService } from '../../shared/jobs/backgroundService';
import Container from 'typedi';
import { DataResponseFactory } from '@/shared/models/response/data.Response';
import { Response } from 'express';
import { logger } from '@/shared/utils/logger';

@JsonController(`/api/v1/demo`)
@OpenAPI({ tags: ['demo'] })
export class StopBackgroundServiceController {
	private readonly _backgroundService: IBackgroundService;

	public constructor() {
		this._backgroundService = Container.get(BackgroundService);
	}

	@Post('/stop')
	@OpenAPI({ summary: 'Start Background Service', tags: ['demo'] })
	@HttpCode(StatusCodes.OK)
	@OnUndefined(StatusCodes.BAD_REQUEST)
	public async stopAsync(@Res() res: Response) {
    logger.info('API:Stop Background Service');
		this._backgroundService.stopService();
		return res
			.status(<number>StatusCodes.OK)
			.json(DataResponseFactory.success(StatusCodes.OK, 'Background Service Stooped'));
	}
}
