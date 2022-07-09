const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

// TODO: check if i need this|User.belongsToMany(Post, {
//   foreignKey: 'user_id'
// });

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

// TODO: check if needed|User.belongsToMany(Comment, {
//   foreignKey: 'user_id'
// });

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

// TODO: check if needed|Post.belongsToMany(User, {
//   foreignKey: 'post_id'
// });

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };