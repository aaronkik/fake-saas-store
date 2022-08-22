import apiHandlers from './api-handlers';
import sendgridHandlers from './sendgrid-handlers';

const handlers = [...apiHandlers, ...sendgridHandlers];

export default handlers;
