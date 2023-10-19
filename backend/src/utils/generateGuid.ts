import { v1 as uuidv1, v4 as uuidv4 } from 'uuid';
export const generateGuid = () => ({
  guid: uuidv4(),
  token: uuidv1(),
});
