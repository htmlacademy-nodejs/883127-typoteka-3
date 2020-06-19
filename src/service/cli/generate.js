'use strict';

const moment = require(`moment`);
const fs = require(`fs`);

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const DEFAULT_PUBLICATION = 1;
const FILE_NAME = `mocks.json`;
const MAX_PUBLICATION = 1000;

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const TEXT_RESTRICT = 5;

const MONTH_RESTRICT = 3;

const getDate = () => {
  const nowDate = new Date();
  const minDate = new Date(moment(nowDate).subtract(MONTH_RESTRICT, `months`).format());
  const randomDate = new Date(getRandomInt(nowDate.getTime(), minDate.getTime()));
  return moment(randomDate).format(`YYYY-MM-DD h:mm:ss`);
};

const generatePublication = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(1, TEXT_RESTRICT).join(` `),
    fullText: shuffle(SENTENCES).slice(1, TEXT_RESTRICT).join(` `),
    createdDate: getDate(),
    category: shuffle(CATEGORIES).slice(1, getRandomInt(1, 5)).join(` `),
  }))
);

const writeFile = (content) => {
  fs.writeFile(FILE_NAME, content, (err) => {
    if (err) {
      return console.error(`\x1b[31m%s\x1b[0m`, `Can't write data to file...`);
    }

    return console.info(`\x1b[32m%s\x1b[0m`, `Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || DEFAULT_PUBLICATION;
    const content = JSON.stringify(generatePublication(countPublication));

    process.on(`exit`, (code) => {
      console.log(`About to exit with code: ${code}`);
    });

    if (countPublication > MAX_PUBLICATION) {
      console.error(`\x1b[31m%s\x1b[0m`, `Не больше 1000 публикаций`);
      process.exit(1);
    } else {
      writeFile(content);
    }
  }
};
