"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("dotenv/config");
var _discord = require("discord.js");
var client = new _discord.Client({
  intents: [_discord.GatewayIntentBits.Guilds, _discord.GatewayIntentBits.GuildMessages, _discord.GatewayIntentBits.GuildMembers, _discord.GatewayIntentBits.DirectMessages, _discord.GatewayIntentBits.MessageContent]
});
var locales = {
  'es-ES': {
    'vote': 'Ya votaste',
    'poll': 'Encuesta hecha por '
  },
  'en-US': {
    'vote': 'You already voted',
    'poll': 'Poll made by '
  }
};
var sessions = [];
function createPollEmbed(interaction) {
  var erase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var optionArguments = [];
  var buttons = [];
  var embededResults = [];
  var total_options = parseInt(interaction.options.getString('total_options'));
  var numberOfButtons = total_options < 6 && total_options > 1 ? total_options : 2;
  for (var i = 0; i < numberOfButtons; i++) optionArguments.push(interaction.options.getString("choice_".concat(i + 1)));
  for (var _i = 0; _i < numberOfButtons; _i++) {
    buttons.push(new _discord.ButtonBuilder().setCustomId("button_".concat(_i)).setLabel("".concat(optionArguments[_i])).setStyle(_discord.ButtonStyle.Secondary));
    embededResults.push({
      name: "".concat(optionArguments[_i]),
      value: '0',
      inline: true
    });
  }
  var optionsRow = new _discord.ActionRowBuilder().addComponents(buttons);
  var pollMessage = new _discord.EmbedBuilder().setColor(0xf5dd42).setTitle(interaction.options.getString('question')).setDescription(locales[interaction.locale].poll + interaction.user.username).addFields(embededResults);
  return erase ? {
    embeds: [pollMessage],
    components: [new _discord.ActionRowBuilder().addComponents(buttons.map(function (item) {
      return item.setDisabled(true);
    }))],
    fetchReply: true
  } : {
    embeds: [pollMessage],
    components: [optionsRow],
    fetchReply: true
  };
}
function createSession(messageId) {
  sessions.push({
    id: messageId,
    users: []
  });
}
function joinSession(messageId, userId) {
  for (var i = 0; i < sessions.length; i++) {
    if (sessions[i].id == messageId) sessions[i].users.push(userId);
  }
}
function checkInSession(messageId, userId) {
  for (var i = 0; i < sessions.length; i++) {
    if (sessions[i].id == messageId) return sessions[i].users.includes(userId);
  }
  return false;
}
client.once('ready', function () {
  console.log("Bot ".concat(client.user.tag, " is up and running!"));
});
client.on('interactionCreate', function () {
  var _ref = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(interaction) {
    var interactionEmbedMessage, interactionEdit, interactionFields, responseValid;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (interaction.isButton()) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return");
        case 2:
          interactionEmbedMessage = interaction.message.embeds.pop();
          interactionEdit = new _discord.EmbedBuilder().setColor(interactionEmbedMessage.hexColor).setTitle(interactionEmbedMessage.title).setDescription(interactionEmbedMessage.description);
          interactionFields = interactionEmbedMessage.fields;
          responseValid = true;
          if (checkInSession(interaction.message.id, interaction.user.id)) {
            responseValid = false;
          }
          if (!responseValid) {
            _context.next = 32;
            break;
          }
          _context.t0 = interaction.customId;
          _context.next = _context.t0 === 'button_0' ? 11 : _context.t0 === 'button_1' ? 15 : _context.t0 === 'button_2' ? 19 : _context.t0 === 'button_3' ? 23 : 27;
          break;
        case 11:
          joinSession(interaction.message.id, interaction.user.id);
          interactionFields[0].value = (parseInt(interactionFields[0].value) + 1).toString();
          interactionEdit.addFields(interactionFields);
          return _context.abrupt("break", 28);
        case 15:
          joinSession(interaction.message.id, interaction.user.id);
          interactionFields[1].value = (parseInt(interactionFields[1].value) + 1).toString();
          interactionEdit.addFields(interactionFields);
          return _context.abrupt("break", 28);
        case 19:
          joinSession(interaction.message.id, interaction.user.id);
          interactionFields[2].value = (parseInt(interactionFields[2].value) + 1).toString();
          interactionEdit.addFields(interactionFields);
          return _context.abrupt("break", 28);
        case 23:
          joinSession(interaction.message.id, interaction.user.id);
          interactionFields[3].value = (parseInt(interactionFields[3].value) + 1).toString();
          interactionEdit.addFields(interactionFields);
          return _context.abrupt("break", 28);
        case 27:
          return _context.abrupt("break", 28);
        case 28:
          _context.next = 30;
          return interaction.update({
            embeds: [interactionEdit]
          });
        case 30:
          _context.next = 34;
          break;
        case 32:
          _context.next = 34;
          return interaction.reply({
            content: locales[interaction.locale].vote,
            ephemeral: true
          });
        case 34:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
client.on('interactionCreate', function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee3(interaction) {
    var commandName, timeout, msg, reply;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (interaction.isChatInputCommand()) {
            _context3.next = 2;
            break;
          }
          return _context3.abrupt("return");
        case 2:
          commandName = interaction.commandName;
          if (!(commandName === 'poll')) {
            _context3.next = 17;
            break;
          }
          timeout = interaction.options.getString('timeout');
          msg = createPollEmbed(interaction);
          _context3.prev = 6;
          _context3.next = 9;
          return interaction.reply(msg);
        case 9:
          reply = _context3.sent;
          createSession(reply.id);
          setTimeout((0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee2() {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return interaction.editReply(createPollEmbed(interaction, true));
                case 2:
                  return _context2.abrupt("return", _context2.sent);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          })), timeout);
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](6);
          console.log(_context3.t0);
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[6, 14]]);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
client.login(process.env.TOKEN);