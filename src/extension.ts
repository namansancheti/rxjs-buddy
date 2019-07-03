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
			if (selectedOperator) {
				const { diagramLink, description, documentationLink } = getInfoForOperator(selectedOperator);
				if (diagramLink) {
					vscode.window.showInformationMessage(`${selectedOperator}: ${description}`, 'Diagram', 'Docs').then(selectedOption => {
						if (selectedOption) {
							vscode.window.showInformationMessage(`You selected: ${selectedOption}`);
						}
					});
				} else {
					vscode.window.showInformationMessage(`${selectedOperator}: ${description}`, 'Docs').then(selectedOption => {
						if (selectedOption) {
							vscode.window.showInformationMessage(`You selected: ${selectedOption}`);
						}
					});
				}
			}
		})
	});

	context.subscriptions.push(disposable);
}

function getInfoForOperator(operator: string) {
	let description = '';
	let diagramLink = '';
	let documentationLink = '';
	switch(operator) {
		case 'switchMap':
			diagramLink = 'https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/switchMap.png';
			description = 'Projects each source value to an Observable which is merged in the output Observable, emitting values only from the most recently projected Observable.';
			documentationLink = 'https://rxjs-dev.firebaseapp.com/api/operators/switchMap';
			break;
		case 'flatMap':
			diagramLink = 'https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/mergeMap.png';
			description = 'Projects each source value to an Observable which is merged in the output Observable.';
			documentationLink = 'https://rxjs-dev.firebaseapp.com/api/operators/flatMap';
		default:
	}
	return {
		description,
		diagramLink,
		documentationLink
	}
}

export function deactivate() {}
