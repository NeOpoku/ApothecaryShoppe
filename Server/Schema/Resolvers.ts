saveHerb: async (_, { herb }, context) => {
  if (!context.user) throw new Error('Not authenticated');
  return await User.findByIdAndUpdate(
    context.user._id,
    { $addToSet: { savedHerbs: herb } },
    { new: true }
  );
}
me: async (_, __, context) => {
  if (!context.user) throw new Error('Not authenticated');
  return await User.findById(context.user._id);
}