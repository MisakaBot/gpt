import { GPT } from './gpt';

import { Context, Schema } from 'koishi';

export const name = 'gpt';

export interface Config {
  apiKey: string;
  model?: string;
  httpProxy?: string;
}

export const Config: Schema<Config> = Schema.object({
  apiKey: Schema.string().required(),
  model: Schema.string(),
  httpProxy: Schema.string(),
});

export function apply(ctx: Context, config: Config) {
  const gpt = new GPT({
    apiKey: config.apiKey,
    httpProxy: config.httpProxy,
    model: config.model,
  });
  ctx
    .command('gpt.chat <content:text>', 'Send message to gpt.')
    .alias('gc')
    .action(async ({ session }, content) => {
      const res = await gpt.newChat(content);
      return res;
    });
  ctx.command('gpt.info').action(() => {
    return gpt.getInfo();
  });
  ctx.command('gpt.clear').action(() => {
    gpt.clearChat();
    return 'Cleared!';
  });
  ctx.command('gpt.init <content:text>').action((_, content) => {
    gpt.initial = content;
    return 'Init success!';
  });
}
