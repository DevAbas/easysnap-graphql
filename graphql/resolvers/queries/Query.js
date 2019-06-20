const Query = {
  user: (parent, args) => {
    return {
      username: 'devabas',
      createdAt: '10/11/2012',
    };
  },
};

module.exports = Query;
