const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const dateFormat = require('../utils/dateFormat');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('events')
                    .populate('comments')
                    .populate('friends')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('events')
                .populate('comments')
                .populate('friends')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }) 
                .select('-__v -password')
                .populate('events')
                .populate('comments')
                .populate('friends')
        },
        events: async () => {
            return Event.find()
                .populate('comments')
                .populate('attendees');
        },
        userEvents: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Event.find(params).sort({ createdAt: -1 })
                .populate('comments')
                .populate('attendees');
        },
        singleEvent: async (parent, { _id }) => {
            return Event.findOne({ _id })
                .populate('comments')
                .populate('attendees');
        },
        searchEvents: async(parent, { city }) => {
            const params = city ? { city } : {};
            return Event.find(params)
                .populate('comments')
                .populate('attendees');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addComment: async (parent, { eventId, commentText }, context) => {
            if (context.user) {
                const updatedEvent = await Event.findOneAndUpdate(
                    { _id: eventId},
                    { $push: { comments: {commentText, username: context.user.username} } },
                    { new: true }
                );
                return updatedEvent;
            }
        },
        addEvent: async (parent, { input: {name, date, time, address, city, state, zip, description, image} }, context) => {
            if (context.user) {
                const newEvent = {
                    name,
                    date,
                    time,
                    address,
                    city, 
                    state, 
                    zip,
                    description,
                    image
                }
                const createdEvent = await Event.create({ ...newEvent, username: context.user.username });
                    
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { events: createdEvent._id } },
                    { new: true }
                );
                return createdEvent;
            } 
            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');

              return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addAttendee: async (parent, { eventId }, context) => {
            if (context.user) {
                const updatedEvent = await Event.findOneAndUpdate(
                    { _id: eventId },
                    { $addToSet: { attendees: context.user._id } },
                    { new: true }
                ).populate('attendees');
                return updatedEvent;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};
module.exports = resolvers;