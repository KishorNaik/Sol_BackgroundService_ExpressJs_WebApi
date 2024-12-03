import { App } from '@/app';
import { ValidateEnv } from '@/shared/utils/validateEnv';
import { demoModule } from './modules/demo';

ValidateEnv();

const app = new App([...demoModule]);
app.listen();
