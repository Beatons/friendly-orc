const test = '(((())))))))';

const difference = (str) => {
  const left = str.replace(')', '').length;
  const right = str.replace('(', '').length;
  return right - left > 0 ? right - left : 0;
};

difference(test);
