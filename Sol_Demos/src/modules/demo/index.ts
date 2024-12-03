import { StartBackgroundServiceController } from './applications/features/startBackgroundService';
import { StopBackgroundServiceController } from './applications/features/stopBackgroundService';

export const demoModule = ([] = [
	StartBackgroundServiceController,
	StopBackgroundServiceController,
]);
