import removeTmpPath from '../helpers/remove-temp-path.mjs';

export default async function globalSetup() {
  await removeTmpPath();
}
