import { logger } from '@/shared/utils/logger';
import { EventEmitter } from 'events';
import { Service } from 'typedi';

export interface IBackgroundService {
	startService(): void;
	stopService(): void;
}

@Service()
export class BackgroundService extends EventEmitter implements IBackgroundService {
	private isRunning: boolean = false;
	private isIntervalId: NodeJS.Timeout | null = null;

	public constructor() {
		super();
	}

	public startService(): void {
		if (!this.isRunning) {
			this.isRunning = true;
			this.emit('start');
      //logger.info('Job:Start Background Service');
			this.isIntervalId = setInterval(() => {
        logger.info('Job:Background service is running....');
			}, 5000);
		}
	}

	public stopService(): void {
		if (this.isRunning) {
			this.isRunning = false;
			this.emit('stop');
			if (this.isIntervalId) {
        logger.info('Job:Background service is stopped....');
				clearInterval(this.isIntervalId);
				this.isIntervalId = null;
			}
		}
	}
}
