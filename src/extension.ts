import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.askRxJSBuddy', () => {
		vscode.window.showInformationMessage('RxJS buddy is activated!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
