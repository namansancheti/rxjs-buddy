import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.askRxJSBuddy', () => {
		const operators = [
			'switchMap',
			'flatMap',
			'mergeMap',
			'concatMap',
			'debounceTime',
			'auditTime',
			'throttleTime',
		];
		vscode.window.showQuickPick(operators).then(selectedOperator => {
			vscode.window.showInformationMessage(`You selected: ${selectedOperator}`);
		})
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
