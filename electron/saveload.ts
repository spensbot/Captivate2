const { ipcMain } = require('electron')
const { dialog } = require('electron')
import { promises } from 'fs'

const LOAD_FILE = 'load-file'
const SAVE_FILE = 'save-file'
const SELECT_FILES = 'select-files'

ipcMain.handle(LOAD_FILE, async (event, title: string, fileFilters: Electron.FileFilter[]) => {
  const dialogResult = await dialog.showOpenDialog({
    title: title,
    filters: fileFilters,
    properties: ['openFile']
  })
  if (!dialogResult.canceled && dialogResult.filePaths.length > 0) {
    return await promises.readFile(dialogResult.filePaths[0], 'utf8')
  } else {
    throw new Error('User cancelled the file load')
  }
})

ipcMain.handle(SAVE_FILE, async (event, title: string, data: string, fileFilters: Electron.FileFilter[]) => {
  const dialogResult = await dialog.showSaveDialog({
    title: title,
    filters: fileFilters,
    properties: ['createDirectory']
  })
  if (!dialogResult.canceled && dialogResult.filePath !== undefined) {
    return await promises.writeFile(dialogResult.filePath, data)
  } else {
    throw new Error('User cancelled the file save')
  }
})

ipcMain.handle(SELECT_FILES, async (event, title: string, fileFilters: Electron.FileFilter[]) => {
  const dialogResult = await dialog.showOpenDialog({
    title: title,
    filters: fileFilters,
    buttonLabel: 'select',
    properties: ['openFile', 'multiSelections']
  })
  if (!dialogResult.canceled && dialogResult.filePaths.length > 0) {
    return dialogResult.filePaths
  } else {
    throw new Error('User cancelled the file select')
  }
})
