import logger from '../config/logger';

const onError = (error: Error) => {
  logger.error(error);
};

export default onError;
