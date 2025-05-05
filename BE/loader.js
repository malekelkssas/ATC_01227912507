import { pathToFileURL } from 'url';
import path from 'path';

export function resolve(specifier, context, defaultResolve) {
  if (specifier.startsWith('@/')) {
    const basePath = path.resolve(process.cwd(), 'dist');
    const filePath = path.join(basePath, specifier.slice(2));
    const withExtension = filePath.endsWith('.js') ? filePath : `${filePath}.js`;
    return defaultResolve(pathToFileURL(withExtension).href, context);
  }

  return defaultResolve(specifier, context);
}
