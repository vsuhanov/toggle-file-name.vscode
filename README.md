# toggle-file 

## Features

Allows you to bind a hotkey that will toggle a file into view. 

Triggering the action will open the file in a split view. If it's already open and is visible in any of the split views it will be focused there. If it is currently focused editor it will close it. 

## Extension Settings

action accepts a `fileName` and `splitType` as args

define custom keybind: 
```json
    {
        "key": "space 1",
        "command": "toggle-file.toggleFile",
        "args": {
            "fileName": "/path/to-your-togglable/file.md"
        },
        "when": "!inputFocus && !editorFocus"
    },
```

## How I use it with neovim vscode extension

So far I could not figure out how to configure hotkeys in vscode so that they work in all cases but the insert mode so I configure them in two places like that: 
in keybindings for vscode
```json 
    {
        "key": "space 1",
        "command": "toggle-file.toggleFile",
        "args": {
            "fileName": "/Users/vitaly/Daily Notes.md"
        },
        "when": "!inputFocus && !editorFocus"
    },
```

and in my lua config I have the following
```lua
keymap({"v", "n"}, "<leader>1", function()
  vscode.call('toggle-file.toggleFile', {
    args = {
      fileName = '/Users/vitaly/Daily Notes.md'
    }
  })
end, opts)
```