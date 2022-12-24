"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
require("dotenv/config");
var _discord = require("discord.js");
var commands = [new _discord.SlashCommandBuilder().setName('poll').setDescription('Ask a question and define up to 4 answers').addStringOption(function (args) {
  return args.setName('question').setDescription('Your question goes here').setRequired(true);
}).addStringOption(function (args) {
  return args.setName('total_options').setDescription('The number of options you want to add').setRequired(true).addChoices({
    name: '2',
    value: '2'
  }, {
    name: '3',
    value: '3'
  }, {
    name: '4',
    value: '4'
  });
}).addStringOption(function (args) {
  return args.setName('timeout').setDescription('How much time will your poll last?').setRequired(true).addChoices({
    name: '5 seconds',
    value: '5000'
  }, {
    name: '15 minutes',
    value: '900000'
  }, {
    name: '30 minutes',
    value: '1800000'
  }, {
    name: '1 hour',
    value: '3600000'
  }, {
    name: '2 hours',
    value: '7200000'
  });
}).addStringOption(function (args) {
  return args.setName('choice_1').setDescription('Write the first choice').setRequired(true);
}).addStringOption(function (args) {
  return args.setName('choice_2').setDescription('Write the second choice').setRequired(true);
}).addStringOption(function (args) {
  return args.setName('choice_3').setDescription('Write the third choice').setRequired(false);
}).addStringOption(function (args) {
  return args.setName('choice_4').setDescription('Write the fourth choice').setRequired(false);
})];
commands = commands.map(function (command) {
  return command.toJSON();
});
var rest = new _discord.REST({
  version: '10'
}).setToken(process.env.TOKEN);
(0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee() {
  var data;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.prev = 0;
        console.log("Started refreshing ".concat(commands.length, " application (/) commands."));
        _context.next = 4;
        return rest.put(_discord.Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD), {
          body: commands
        });
      case 4:
        data = _context.sent;
        console.log("Successfully registered ".concat(data.length, " application commands."));
        _context.next = 14;
        break;
      case 8:
        _context.prev = 8;
        _context.t0 = _context["catch"](0);
        console.error(_context.t0);
        console.log('Perhaps you forgot to add your token to the .env file?');
        console.log('Or maybe you have not invited the bot to your server yet?');
        console.log("https://discord.com/api/oauth2/authorize?client_id=".concat(process.env.CLIENT, "&permissions=256064&scope=bot"));
      case 14:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[0, 8]]);
}))();