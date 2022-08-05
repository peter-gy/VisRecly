import { Draco } from '@visrecly/draco-web';

export async function rank(data: any[]) {
  const draco = new Draco(data);
  const solution = await draco.solve();
  console.log(solution);
  return solution;
}
