import createThemeProvider from './create-theme-provider';
import createWithTheme from './create-with-theme';
import createThemeListener from './create-theme-listener';
import defaultChannel from './channel';

export var channel = defaultChannel;
export var withTheme = createWithTheme();
export var ThemeProvider = createThemeProvider();
export var themeListener = createThemeListener();
export function createTheming() {
  var customChannel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultChannel;

  return {
    channel: customChannel,
    withTheme: createWithTheme(customChannel),
    ThemeProvider: createThemeProvider(customChannel),
    themeListener: createThemeListener(customChannel)
  };
}

export default {
  channel: defaultChannel,
  withTheme: withTheme,
  ThemeProvider: ThemeProvider,
  themeListener: themeListener,
  createTheming: createTheming
};