const mutations = {
  addListItem: (_, { listItem }, { dataSources }) =>
    dataSources.userId.addListItemsByUserId({ listItem }),
  addListItems: (_, { listItems }, { dataSources }) =>
    dataSources.userId.addListItemsByUserId({ listItem })
};

module.exports = mutations;
