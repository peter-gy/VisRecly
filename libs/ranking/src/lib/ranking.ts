import { Draco } from '@visrecly/draco-web';

export async function rank(data: any[]) {
  const draco = new Draco(data);
  return await draco.solve();
}
