import { readFile, writeFile } from "node:fs/promises";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from "satori";

const element = {
  key: '',
  type: 'div',
  props: {
    style: {
      height: '100%',
      width: '100%',
      backgroundColor: 'pink',
      display: 'flex'
    },
    children: [
      'foo',
      {
        type: 'img',
        props: {
          src: "https://picsum.photos/200/300",
          width: 200,
          height: 300
        }
      },
      'bar',
    ]
  }
};

const main = async () => {
  const result = await satori(element, {
    width: 400,
    height: 400,
    fonts: [
      {
        name: 'Inter',
        data: await readFile(`${dirname(fileURLToPath(import.meta.url))}/inter-latin-ext-400-normal.woff`),
        weight: 400,
        style: 'normal',
      },
    ],
  });
  return writeFile('result.svg', result, { encoding: 'utf8' });
};

void main();
