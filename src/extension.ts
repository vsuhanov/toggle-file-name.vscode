import * as vscode from 'vscode';
import {homedir} from 'os';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('toggle-file.toggleFile', async ({ fileName, splitType = 'vertical' }: { fileName: string, splitType: 'vertical' | 'horizontal' }) => {
		if (!fileName) {
			vscode.window.showErrorMessage('No file name provided');
			return;
		}

		const resolvedFileName = fileName.replace('~', homedir());
		const columnToShowIn = splitType === 'vertical' ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active;

		const editor = findEditorByFileName(resolvedFileName);

		if (editor) {
			if (vscode.window.activeTextEditor === editor) {
				await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
			} else {
				vscode.window.showTextDocument(editor.document, editor.viewColumn);
			}
		} else {
			const uri = vscode.Uri.file(resolvedFileName);

			await vscode.commands.executeCommand('vscode.open', uri, columnToShowIn);
		}
	});

	context.subscriptions.push(disposable);
}

function findEditorByFileName(fileName: string): vscode.TextEditor | undefined {
	return vscode.window.visibleTextEditors.find(editor => editor.document.fileName.includes(fileName));
}

export function deactivate() { }
// The module 'vscode' contains the VS Code extensibility API