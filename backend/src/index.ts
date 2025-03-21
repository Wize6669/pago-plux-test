import { app } from './app';
import { config } from './config';

const port = config['PORT'];

app.listen(port, () => console.log(`Server running on PORT ${port}`));