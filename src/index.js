#!/usr/bin/env node
/**
 * Copyright (c) Junaid Javed, All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this project.
 */

const prompts = require('prompts')

const cli = require('./helpers/cli')
const init = require('./helpers/init')
const git = require('./commands/git')
const emoji = require('./helpers/emoji')
const initGit = require('./helpers/init-git')
const commitChanges = require('./helpers/commit-changes')
const { chainOpts, singleOpt } = require('./helpers/prompt-options')

const flags = cli.flags
const inputs = cli.input
//
;(async () => {
  await init()

  inputs.includes('help') && cli.showHelp()
  flags.debug && console.log(flags, inputs)
  flags.version && cli.showVersion()

  if (!(await git.isInitialized())) await initGit(prompts, singleOpt)

  if (flags.title.length && Object.keys(emoji).includes(inputs[0])) {
    await commitChanges({ ...flags, label: inputs[0] })
  }

  const result = await prompts(chainOpts, { onCancel: () => process.exit(1) })
  await commitChanges(result)
})()
