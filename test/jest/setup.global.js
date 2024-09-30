'use strict';

import removeTmpPath from '../helpers/remove-temp-path.mjs';

module.exports = async() => {
  await removeTmpPath();
};
