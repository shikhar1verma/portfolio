function dateFormat(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  });
}
module.exports = dateFormat;
