// 该文件用于定义默认状态的映射表
import singleSelectDefaultSelect from './SingleSelect';
import singlePicSelectDefaultSelect from './SinglePicSelect';
import multiSelectDefaultSelect from './MultiSelect';
import inputDefaultStatus from './Input';

export const defaultStatusMap = {
  'single-select': singleSelectDefaultSelect,
  'single-pic-select': singlePicSelectDefaultSelect,
  'multi-select': multiSelectDefaultSelect,
  'input': inputDefaultStatus,
};
