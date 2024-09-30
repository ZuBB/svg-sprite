import stylusPreprocessor from 'stylus';
import lessPreprocessor from 'less';

export async function stylus(...args) {
  return new Promise((resolve, reject) => {
    stylusPreprocessor.render(...args, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

export async function less(...args) {
  return new Promise((resolve, reject) => {
    lessPreprocessor.render(...args, (error, result) => {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}
