import type { ForgeConfig } from '@electron-forge/shared-types'
import { join, resolve } from 'node:path'
import { MakerDeb } from '@electron-forge/maker-deb'
import { MakerSquirrel } from '@electron-forge/maker-squirrel'
import { MakerZIP } from '@electron-forge/maker-zip'

const config: ForgeConfig = {
  packagerConfig: {
    name: '油腻_w4vo',
    asar: true,
    icon: join(resolve(), './public/icon'),
    appBundleId: 'com.w4vo.app',
    extraResource: [
      './migrations',
    ],
  },
  makers: [
    new MakerSquirrel(
      {
        authors: 'Electron contributors',
      },
      ['win32'],
    ),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({}, ['linux']),
  ],
  hooks: {
    preStart: async () => {
      console.log('Building runtime code with Bun...')
    },
  },
}

export default config
