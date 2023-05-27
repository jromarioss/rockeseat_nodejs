import { resolve } from 'path'
import { rename, stat, unlink } from 'fs/promises'

import uploadConfig from '@/config/upload'

import { StorageProvider } from '../StorageProvider'

export class LocalStorageProvider implements StorageProvider {
  async save(file: string, folder: string) {
    await rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(`${uploadConfig.tmpFolder}/${folder}`, file),
    )

    return file
  }

  async delete(file: string, folder: string) {
    const filename = resolve(`${uploadConfig.tmpFolder}/${folder}`, file)

    try {
      await stat(filename)
    } catch {
      return
    }
    await unlink(filename)
  }
}
