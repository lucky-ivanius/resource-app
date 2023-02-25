const isProduction = process.env.NODE_ENV === 'production';
const origin = {
  origin: isProduction ? 'http://localhost:3000/' : '*'
};

export { isProduction, origin };
